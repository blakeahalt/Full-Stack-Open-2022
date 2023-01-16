const supertest = require('supertest')
const mongoose = require('mongoose')
// const helper = require('./test_helper')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const app = require('../App')
const api = supertest(app)
const Blog = require('../models/blogs')
const User = require('../models/user')
const config = require('../utils/config')
const blogs = require('../utils/for_testing').blogs
const helper = require('./test_helper')
const listHelper = require('../utils/list_helper')


beforeEach(async () => {
  await Blog.deleteMany({})

  // for (let note of helper.initialNotes) {
  //   let noteObject = new Note(note)
  //   await noteObject.save()
  // }

  const blogObjects = blogs
    .map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
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

describe('total likes', () => {
  blogs
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
  ]

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })

  test('when list has several blogs, equals the likes of all blogs', () => {
    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(29)
  })
})

describe('favorite blog', () => {
  blogs
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
  ]
  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.favoriteBlog(listWithOneBlog)
    expect(result).toBe(listWithOneBlog)
  })

  test('when list has several blogs, equals the likes of all blogs', () => {
    const result = listHelper.favoriteBlog(blogs)
    expect(result).toBe('title: Canonical string reduction, author: Edsger W. Dijkstra, likes: 12')
  })
})

describe('most blogs', () => {
  blogs
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
  ]
  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.mostBlogs(listWithOneBlog)
    expect(result).toBe(listWithOneBlog)
  })

  test('when list has several blogs, equals the likes of all blogs', () => {
    const result = listHelper.mostBlogs(blogs)
    expect(result).toBe('author: Robert C. Martin, blogs: 3')
  })
})

describe('most likes', () => {
  blogs
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
  ]
  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.mostLikes(listWithOneBlog)
    expect(result).toBe(listWithOneBlog)
  })

  test('when list has several blogs, equals the likes of all blogs', () => {
    const result = listHelper.mostLikes(blogs)
    expect(result).toBe('author: Edsger W. Dijkstra, likes: 17')
  })
})

describe('when there is initially some blogs saved', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(blogs.length)
  })
})

describe('viewing a specific blog', () => {
  test('verifies that the unique identifier property of the blog posts is named id', () => {
    const blogPost = Blog(blogs)
    expect(blogPost.id).toBeDefined()
  })
})

describe('addition of a new blog', () => {
  let token = null
  beforeEach(async () => {
    await Blog.deleteMany({})
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

  test('verifies HTTP POST request to /api/blogs successfully creates a new blog post', async () => {
    const newBlog = {
      _id: '5a422aa71b54a676234d17f9',
      title: 'newBlog test',
      author: 'test Author',
      url: 'test.url.com',
      likes: 5,
      __v: 0
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(1)

    const contents = blogsAtEnd.map(blog => blog.title)
    expect(contents).toContain(
      'newBlog test'
    )
  })

  test('blog without likes is missing', async () => {
    const newBlog = {
      _id: '5a422aa71b54a676234d17f9',
      title: 'newBlog test',
      author: 'test Author',
      url: 'test.url.com',
      __v: 0
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(1)
    expect(newBlog.likes).not.toBeDefined()
  })

  test('blog without title or url returns status 400 Bad Request', async () => {
    const newBlogs = [{
      _id: '5a422aa71b54a676234d17f9',
      author: 'test Author',
      url: 'test.url.com',
      likes: 5,
      __v: 0
    },
    { _id: '5a422aa71b54a676234d17f9',
      title: 'newBlog test',
      author: 'test Author',
      likes: 5,
      __v: 0
    }
    ]

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlogs)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(0)
  })

  test('fails with status 401 if user is unauthorized', async () => {
    const newBlog = {
      title: 'blog to be added',
      author: 'Blake',
      url: 'http://www.test.com/',
      likes: 1
    }

    token = 'incorrect-token'
    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(401)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(0)
  })
})

describe('update a blog', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
  })

  test('succeeds with status 204', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send({ likes: blogToUpdate.likes + 5 })
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    const updatedBlog = blogsAtEnd[0]
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
    expect(updatedBlog.likes).toBe(blogToUpdate.likes + 5)
  })
})

describe('deletion of a blog', () => {
  let token = null
  beforeEach(async () => {
    await Blog.deleteMany({})
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

    const blog = {
      title: 'title',
      author: 'author',
      url: 'http://www.blog.com',
      likes: 1
    }
    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(blog)
  })

  test('succeeds with status code 204 if id is valid and user is authorized', async () => {

    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1)
    const titles = blogsAtEnd.map(blog => blog.title)
    expect(titles).not.toContain(blogToDelete.title)
  })

  test('fails with status 401 if user is unauthorized', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]
    token = 'incorrect-token'
    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(401)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(1)
  })
})









afterAll(() => {
  mongoose.connection.close()
})