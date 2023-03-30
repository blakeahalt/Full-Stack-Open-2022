import { createSlice } from '@reduxjs/toolkit';
import anecdoteService from '../services/anecdotes';

import axios from 'axios';

const baseUrl = 'http://localhost:3001/anecdotes';

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = JSON.parse(localStorage.getItem('anecdotes')) || anecdotesAtStart.map(asObject)

export const generateId = () => {
  const id = Math.floor(Math.random() * 100000)
  return id.toString()
}

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: initialState,
  reducers: {
    setAnecdotes(state, action) {
      return action.payload.sort((a, b) => b.votes - a.votes);
    },
    createAnecdote: (state, action) => {
      state.push(action.payload);
      // localStorage.setItem('anecdotes', JSON.stringify(state));
    },
    addVote: (state, action) => {
      const id = action.payload;
      const votingAnecdote = state.find((anecdote) => anecdote.id === id);
      const updatedAnecdote = {
          ...votingAnecdote,
          votes: votingAnecdote.votes + 1,
      };
      axios.put(`${baseUrl}/${id}`, updatedAnecdote)
      const updatedState = state.map((anecdote) =>
          anecdote.id === id ? updatedAnecdote : anecdote
      ).sort((a, b) => b.votes - a.votes);
      // localStorage.setItem('anecdotes', JSON.stringify(updatedState));
      return updatedState;
    },
    deleteAnecdote: (state, action) => {
      const id = action.payload;
      // axios.delete(`${baseUrl}/${id}`)
      const updatedState = state.filter((anecdote) => anecdote.id !== id);
        // localStorage.setItem('anecdotes', JSON.stringify(updatedState));
      return updatedState;
      // });
    },
    
}
});

// export default reducer
export const { setAnecdotes, addVote, createAnecdote, deleteAnecdote } =
    anecdoteSlice.actions;

  export const initializeAnecdotes = () => {
    return async (dispatch) => {
        const anecdotes = await anecdoteService.getAll();
        dispatch(setAnecdotes(anecdotes));
    };
  };
  
  export const createNew = (anecdote) => {
      return async (dispatch) => {
          const newAnecdote = await anecdoteService.create(anecdote);
          dispatch(createAnecdote(newAnecdote));
      };
  };
  
  export const voteFor = (id, anecdote) => {
      return async (dispatch) => {
          const votingAnecdote = await anecdoteService.update(id, anecdote);
          dispatch(addVote(votingAnecdote.id));
      };
  };
  
  export const deleteAnecdotes = (id) => {
      return async (dispatch) => {
        await anecdoteService.toDelete(id);
        dispatch(deleteAnecdote(id));
      };
  };
  

export default anecdoteSlice.reducer;
