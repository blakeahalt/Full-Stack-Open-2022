const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../App')

const api = supertest(app)
const Note = require('../models/note')

const initialNotes = [
  {
    content: 'HTML is easy',
    date: new Date(),
    important: false,
  },
  {
    content: 'Browser can execute only Javascript',
    date: new Date(),
    important: true,
  },
]

beforeEach(async () => {
  await Note.deleteMany({})
  let noteObject = new Note(initialNotes[0])
  await noteObject.save()
  noteObject = new Note(initialNotes[1])
  await noteObject.save()
})

// const blogs = [
//   {
//     _id: '5a422aa71b54a676234d17f8',
//     title: 'Go To Statement Considered Harmful',
//     author: 'Edsger W. Dijkstra',
//     url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
//     likes: 5,
//     __v: 0
//   },
//   {
//     _id: '5a422aa71b54a676234d17f8',
//     title: 'Go To Statement Considered Harmful',
//     author: 'Edsger W. Dijkstra',
//     url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
//     likes: 5,
//     __v: 0
//   },
//   {
//     _id: '5a422b3a1b54a676234d17f9',
//     title: 'Canonical string reduction',
//     author: 'Edsger W. Dijkstra',
//     url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
//     likes: 12,
//     __v: 0
//   },
//   {
//     _id: '5a422b891b54a676234d17fa',
//     title: 'First class tests',
//     author: 'Robert C. Martin',
//     url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
//     likes: 10,
//     __v: 0
//   },
//   {
//     _id: '5a422ba71b54a676234d17fb',
//     title: 'TDD harms architecture',
//     author: 'Robert C. Martin',
//     url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
//     likes: 0,
//     __v: 0
//   },
//   {
//     _id: '5a422bc61b54a676234d17fc',
//     title: 'Type wars',
//     author: 'Robert C. Martin',
//     url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
//     likes: 2,
//     __v: 0
//   }
// ]

test('notes are returned as json', async () => {
  await api
    .get('/api/notes')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

// test('there are two notes', async () => {
//   const response = await api.get('/api/notes')

//   expect(response.body).toHaveLength(initialNotes.length)
// })

// test('the first note is about HTTP methods', async () => {
//   const response = await api.get('/api/notes')

//   expect(response.body[0].content).toBe('HTML is easy')
// })

test('all notes are returned', async () => {
  const response = await api.get('/api/notes')

  expect(response.body).toHaveLength(initialNotes.length)
})

test('a specific note is within the returned notes', async () => {
  const response = await api.get('/api/notes')

  const contents = response.body.map(r => r.content)
  expect(contents).toContain(
    'Browser can execute only Javascript'
  )
})



afterAll(() => {
  mongoose.connection.close()
})