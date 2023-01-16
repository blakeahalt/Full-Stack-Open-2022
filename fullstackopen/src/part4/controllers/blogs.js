const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const Blog = require('../models/blogs')
const User = require('../models/user')

////No longer need this function because we can use the middleware tokenExtractor instead
// const getTokenFrom = request => {
//   const authorization = request.get('authorization')
//   if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
//     return authorization.substring(7)
//   }
//   return null
// }

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})
//   Blog.findById(request.params.id)
//     .then(blog => {
//       if (blog) {
//         response.json(blog)
//       } else {
//         response.status(404).end()
//       }
//     })
//     .catch(error => next(error))
// })

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }

  // Blog.findById(request.params.id)
  //   .then(blog => {
  //     if (blog) {
  //       response.json(blog)
  //     } else {
  //       response.status(404).end()
  //     }
  //   })
  //   .catch(error => next(error))
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  //   const token = getTokenFrom(request)
  //   const decodedToken = jwt.verify(token, process.env.SECRET)
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)

  const blog = new Blog({
    url: body.url,
    title: body.title,
    author: body.author,
    user: user._id,
    likes: body.likes,
  })

  if (!blog.title || !blog.url) {
    response.status(400).end()
  }

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id) //this line enables created blogs to show up in /api/users when a user is logged in
  await user.save()
  response.status(201).json(savedBlog)
})


blogsRouter.delete('/:id', async (request, response) => {
  const { id } = request.params
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)
  const blog = await Blog.findById(id).populate('user', { id: 1 })

  if (!user) {
    response.status(400).json({ error: 'Unauthorized user' })
  }

  if (user._id.toString() !== blog.user.id.toString()) {
    return response.status(401).json({ error: 'Unauthorized user', user: user._id, blogUser: blog.user.id })
  }

  await Blog.findByIdAndRemove(id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  await Blog.findByIdAndUpdate(request.params.id, blog, { new:true })
  response.status(204).end()
})

module.exports = blogsRouter








// blogsRouter.post('/', async (request, response) => {
//   const body = request.body

//   const token = getTokenFrom(request)
//   const decodedToken = jwt.verify(token, process.env.SECRET)
//   if (!decodedToken.id) {
//     return response.status(401).json({ error: 'token missing or invalid' })
//   }
//   const user = await User.findById(decodedToken.id)

//   const blog = new Blog({
//     url: body.url,
//     title: body.title,
//     author: body.author,
//     user: user._id,
//     likes: body.likes,
//   })
//   if (!blog.title || !blog.url) {
//     response.status(400).end()
//   }
//   const savedBlog = await blog.save()
//   user.blogs = user.blogs.concat(savedBlog._id)
//   await user.save()
//   response.status(201).json(savedBlog)


//   // response.json(savedBlog)
//   // blog.save()
//   //   .then(savedBlog => {
//   //     response.json(savedBlog)
//   //   })
//   //   .catch(error => next(error))
// })


// blogsRouter.delete('/:id', async (request, response) => {
//   await Blog.findByIdAndRemove(request.params.id)
//   response.status(204).end()
//   // Blog.findByIdAndRemove(request.params.id)
//   //   .then(() => {
//   //     response.status(204).end()
//   //   })
//   //   .catch(error => next(error))
// })