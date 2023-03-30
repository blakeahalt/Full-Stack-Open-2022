import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import noteService from '../services/notes'

const baseUrl = 'http://localhost:3001/notes';

// const initialState = [];

const initialState = [
  {
    content: 'reducer defines how redux store works',
    important: true,
    id: 1,
  },
  {
    content: 'state of store can contain any data',
    important: false,
    id: 2,
  },
]

export const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

export const generateId = () =>
    Number((Math.random() * 1000000).toFixed(0))

    
const noteSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    // *createNote rewritten to below
    // createNote(state, action) {
    //   // const content = action.payload
    //   // state.push({
    //   //   content,
    //   //   important: false,
    //   //   id: generateId(),
    //   // })
    //   state.push(action.payload)
    // },
    toggleImportanceOf: (state, action) => {
      const id = action.payload;
      const noteToToggle = state.find((note) => note.id === id);
      const toggledNote = { ...noteToToggle, important: !noteToToggle.important };
    
      axios.put(`${baseUrl}/${id}`, toggledNote).then((response) => {
        state.map((note) => (note.id !== id ? note : response.data));
      });
      return state.map(note =>
            note.id !== id ? note : toggledNote 
          )     
    },
    
    appendNote(state, action) {
      state.push(action.payload)
    },
    setNotes(state, action) {
      return action.payload
    }
  },
})
  
export const { toggleImportanceOf, appendNote, setNotes } = noteSlice.actions

export const initializeNotes = () => {
  return async dispatch => {
    const notes = await noteService.getAll()
    dispatch(setNotes(notes))
  }
}

export const createNote = content => {
  return async dispatch => {
    const newNote = await noteService.createNew(content)
    dispatch(appendNote(newNote))
  }
}

export default noteSlice.reducer
