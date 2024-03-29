import axios from 'axios'
import { generateId } from '../reducers/anecdoteReducer'
const baseUrl = 'http://localhost:3001/anecdotes'



const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const create = async (content) => {
    
    const anecdoteObject = {content, id: generateId(), votes: 0}
    const response = await axios.post(baseUrl, anecdoteObject)
    return response.data
}

const update = async (id, newObj) => {
    const response = await axios.put(`${baseUrl}/${id}`, newObj)
    return response.data
}

const toDelete = async (id) => {
    const response = await axios.delete(`${baseUrl}/${id}`)
    return response.data
  }
  

export default { getAll, create, update, toDelete }