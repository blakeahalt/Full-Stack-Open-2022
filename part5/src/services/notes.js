import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/notes'
// const baseUrl = '/api/notes'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const create = async (newObject) => {
    const config = {
        headers: { Authorization: token },
      }
    
      const response = await axios.post(baseUrl, newObject, config)
      return response.data
    }

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
