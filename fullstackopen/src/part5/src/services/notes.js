import axios from 'axios'
// const jwt = require('jsonwebtoken')
const baseUrl = 'http://localhost:3001/api/notes'
// const User = require('../models/user')
// const Note = require('../models/note')

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}
// const getTokenFrom = request => {
//   const authorization = request.get('authorization')
//   if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
//     return authorization.substring(7)
//   }
//   return null
// }

const create = async (newObject) => {
    const config = {
        headers: { Authorization: token },
      }
    
      const response = await axios.post(baseUrl, newObject, config)
      return response.data
    }

    //   const request = axios.post(baseUrl, newObject)
//   return request.then(response => response.data)


//   const body = request.body
//   const token = getTokenFrom(request)
//   const decodedToken = jwt.verify(token, process.env.SECRET)
//   if (!decodedToken.id) {
//       return response.status(401).json({ error: 'token missing or invalid' })
//     }
//     const user = await User.findById(decodedToken.id)
    
//     const note = new Note({
//         content: body.content,
//         important: body.important === undefined ? false : body.important,
//         date: new Date(),
//         user: user._id
//     })
    
//     const savedNote = await note.save()
//     await user.save()
//     response.status(201).json(savedNote)
// }

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

const noteService = {
    getAll,
    create,
    update,
    setToken
  }

export default noteService


//Cypress Test
// import axios from 'axios'
// const baseUrl = '/api/notes'

// let token = null

// const setToken = newToken => {
//   token = `Bearer ${newToken}`
// }

// const getAll = () => {
//   const request = axios.get(baseUrl)
//   return request.then(response => response.data)
// }

// const create = async newObject => {
//   const config = {
//     headers: { Authorization: token },
//   }

//   const response = await axios.post(baseUrl, newObject, config)
//   return response.data
// }

// const update = (id, newObject) => {
//   const request = axios.put(`${ baseUrl }/${id}`, newObject)
//   return request.then(response => response.data)
// }

// // export default { getAll, create, update, setToken }
// const noteService = {
//       getAll,
//       create,
//       update,
//       setToken
//     }
  
//   export default noteService