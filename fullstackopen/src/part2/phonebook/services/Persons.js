import axios from 'axios'
// const baseUrl = 'http://localhost:3001//api/persons'
const baseUrl = '/api/persons' // heroku

const getAll = async () => {
  const request = axios.get(baseUrl)
  const response = await request
  return response.data
}

const create = async newPeep => {
  const request = axios.post(baseUrl, newPeep)
  const response = await request
  return response.data
}

const update = async (id, updatedPerson) => {
  const request = axios.put(`${baseUrl}/${id}`, updatedPerson)
  const response = await request
  return response.data
}

const remove = async id => {
  const request = axios.delete(`${ baseUrl }/${ id }`, id);
  const res = await request
  return res.data
}

const noteService = {
  getAll,
  create,
  update,
  remove
}

export default noteService