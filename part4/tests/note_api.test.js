const supertest = require('supertest')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const helper = require('./test_helper')
const app = require('../App')
const api = supertest(app)

const User = require('../models/user')
const Note = require('../models/note')

const config = require('../utils/config')


// const initialNotes = [
//   {
//     content: 'HTML is easy',
//     date: new Date(),
//     important: false,
//   },
//   {
//     content: 'Browser can execute only Javascript',
//     date: new Date(),
//     important: true,
//   },
// ]

beforeEach(async () => {
  await Note.deleteMany({})
  await Note.insertMany(helper.initialNotes)

  // for (let note of helper.initialNotes) {
  //   let noteObject = new Note(note)
  //   await noteObject.save()
  // }

  // const noteObjects = helper.initialNotes
  //   .map(note => new Note(note))
  // const promiseArray = noteObjects.map(note => note.save())
  // await Promise.all(promiseArray)

  // await Note.deleteMany({})
  // helper.initialNotes.forEach(async (note) => {
  //   let noteObject = new Note(note)
  //   await noteObject.save()
  // })

  // await Note.deleteMany({})
  // let noteObject = new Note(helper.initialNotes[0])
  // await noteObject.save()
  // noteObject = new Note(helper.initialNotes[1])
  // await noteObject.save()
})

describe('when there is initially some notes saved', () => {
  test('notes are returned as json', async () => {
    await api
      .get('/api/notes')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all notes are returned', async () => {
    const response = await api.get('/api/notes')

    expect(response.body).toHaveLength(helper.initialNotes.length)
  })

  test('a specific note is within the returned notes', async () => {
    const response = await api.get('/api/notes')

    const contents = response.body.map(r => r.content)

    expect(contents).toContain(
      'Browser can execute only Javascript'
    )
  })
})

describe('viewing a specific note', () => {
  test('succeeds with a valid id', async () => {
    const notesAtStart = await helper.notesInDb()

    const noteToView = notesAtStart[0]

    const resultNote = await api
      .get(`/api/notes/${noteToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const processedNoteToView = JSON.parse(JSON.stringify(noteToView))

    expect(resultNote.body).toEqual(processedNoteToView)
  })

  test('fails with statuscode 404 if note does not exist', async () => {
    const validNonexistingId = await helper.nonExistingId()

    console.log(validNonexistingId)

    await api
      .get(`/api/notes/${validNonexistingId}`)
      .expect(404)
  })

  test('fails with statuscode 400 if id is invalid', async () => {
    const invalidId = '5a3d5da59070081a82a3445'

    await api
      .get(`/api/notes/${invalidId}`)
      .expect(400)
  })
})

describe('addition of a new note', () => {
  test('succeeds with valid data', async () => {
    // let token=null
    await Note.deleteMany({})
    await User.deleteMany({})
    // await Note.deleteMany({})
    await Note.insertMany(helper.initialNotes)

    const passwordHash = await bcrypt.hash('secret', 10)
    const user = new User({
      username: 'test3',
      name: 'First User',
      passwordHash
    })
    await user.save()

    const userForToken = { username: user.username, id:user.id }
    let token = jwt.sign(userForToken, config.SECRET)

    const newNote = {
      content: 'async/await simplifies making async calls'
    }

    await api
      .post('/api/notes')
      .set('Authorization', `Bearer ${token}`)
      .send(newNote)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const notesAtEnd = await helper.notesInDb()
    expect(notesAtEnd).toHaveLength(helper.initialNotes.length + 1)

    const contents = notesAtEnd.map(n => n.content)
    expect(contents).toContain(
      'async/await simplifies making async calls'
    )
  })

  test('fails with status code 401 if data invalid', async () => {
    // let token=null
    await Note.deleteMany({})
    await Note.insertMany(helper.initialNotes)

    const passwordHash = await bcrypt.hash('secret', 10)
    const user = new User({
      username: 'test4',
      name: 'Second User',
      passwordHash
    })
    await user.save()

    const userForToken = { username: user.username, id:user.id }
    let token = jwt.sign(userForToken, config.SECRET)

    const newNote = {
      important: true
    }

    token = 'incorrect-token'
    await api
      .post('/api/notes')
      .set('Authorization', `Bearer ${token}`)
      .send(newNote)
      .expect(401)

    const notesAtEnd = await helper.notesInDb()
    expect(notesAtEnd).toHaveLength(helper.initialNotes.length)
  })
})

describe('deletion of a note', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const notesAtStart = await helper.notesInDb()
    const noteToDelete = notesAtStart[0]

    await api
      .delete(`/api/notes/${noteToDelete.id}`)
      .expect(204)

    const notesAtEnd = await helper.notesInDb()

    expect(notesAtEnd).toHaveLength(
      helper.initialNotes.length - 1
    )

    const contents = notesAtEnd.map(r => r.content)

    expect(contents).not.toContain(noteToDelete.content)
  })
})


describe('when there is initially one user in db', () => {
  let token = null
  beforeEach(async () => {
    await Note.deleteMany({})
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('secret', 10)
    const user = new User({
      username: 'root',
      name: 'First User',
      passwordHash
    })
    await user.save()

    const userForToken = { username: user.username, id:user.id }
    token = jwt.sign(userForToken, config.SECRET)
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .set('Authorization', `Bearer ${token}`)
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })
})

describe('adding users', () => {
  test('fails if username is too short', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'aa',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
      .expect({ error: 'username must be more than 3 characters' })

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).not.toContain(newUser.username)
  })

  test('fails if password is too short', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'test',
      name: 'Matti Luukkainen',
      password: 'aa',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
      .expect({ error: 'password must be more than 3 characters' })

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).not.toContain(newUser.username)
  })

  test('fails if no username', async () => {
    const newUser = {
      name: 'Matti Luukkainen',
      password: 'mluukkai',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
      .expect({ error: 'missing username' })
  })

  test('fails if no password', async () => {
    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
      .expect({ error: 'missing password' })
  })

  test('fails if username already exists', async () => {
    const existingUser = await User.findOne({ username: 'mluukkai' })
    if (existingUser) {
      const newUser = {
        username: 'mluukkai',
        name: 'Matti Luukkainen',
        password: 'mluukkai',
      }

      await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)
        .expect({ error: 'username must be unique' })
    }
  })
})



afterAll(() => {
  mongoose.connection.close()
})