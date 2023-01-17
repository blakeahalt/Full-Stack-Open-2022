import axios from 'axios'
const jwt = require('jsonwebtoken')
const baseUrl = 'http://localhost:3001/api/blogs'
const User = require('../models/user')


const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const create = async (blogObject, user, response, request) => {
    // const body = request.body
    const token = getTokenFrom(User)
    const decodedToken = jwt.verify(token, process.env.SECRET)
    
    if (!decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
    }

    // const user = await User.findById(decodedToken.id)
    const config = {
      headers: { Authorization: token },
    }
  
    response = await axios.post(baseUrl, blogObject, config)
    // return response.data
    const savedBlog = await user.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
  
    response.status(201).json(savedBlog)
  }

const blogService = { getAll, setToken, create }
export default blogService