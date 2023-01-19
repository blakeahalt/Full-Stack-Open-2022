import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/blogs'

const getAll = async () => {
  const request = axios.get(baseUrl)
  const response = await request
  return response.data
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
  const url = `${ baseUrl }/${id}`
  const request = axios.put(url, newObject)
  return request.then(response => response.data)
}

const remove = async (blogId) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.delete(`${baseUrl}/${blogId}`,config)
  console.log(response)
  return response.data
}

const blogService = { getAll, setToken, create, update, remove }
export default blogService