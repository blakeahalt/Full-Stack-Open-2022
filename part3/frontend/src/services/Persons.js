import axios from 'axios'
// const baseUrl = 'http://localhost:3001/api/persons' //dev
const baseUrl = '/api/persons'  //production


const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const create = (newObject) => {
  const request = axios.post(baseUrl, newObject)
  return request.then((response) => response.data)
}

const remove = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`)
  return request.then((response) => response.data)
}

const removeAll = () => {
  const request = axios.delete(baseUrl)
  return request.then((response) => response.data)
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then((response) => response.data)
}

const noteService = {
  getAll,
  create,
  remove,
  update,
  removeAll
}

export default noteService