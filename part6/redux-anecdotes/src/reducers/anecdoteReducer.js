import { createSlice } from '@reduxjs/toolkit';
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

export const generateId = () =>
Number((Math.random() * 1000000).toFixed(0))

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: initialState,
  reducers: {
    createAnecdote: (state, action) => {
      state.push(action.payload);
      localStorage.setItem('anecdotes', JSON.stringify(state));
    },
    addVote: (state, action) => {
      const id = action.payload;
      const votingAnecdote = state.find((anecdote) => anecdote.id === id);
      const updatedAnecdote = {
          ...votingAnecdote,
          votes: votingAnecdote.votes + 1,
      };
      const updatedState = state.map((anecdote) =>
          anecdote.id === id ? updatedAnecdote : anecdote
      ).sort((a, b) => b.votes - a.votes);
      localStorage.setItem('anecdotes', JSON.stringify(updatedState));
      return updatedState;
    },
    deleteAnecdote: (state, action) => {
      const votes = action.payload;
      const updatedState = state.filter((anecdote) => anecdote.votes !== votes);
      localStorage.setItem('anecdotes', JSON.stringify(updatedState));
      return updatedState;
    },
}
});

// export default reducer
export const { setAnecdotes, addVote, createAnecdote, deleteAnecdote } =
    anecdoteSlice.actions;
export default anecdoteSlice.reducer;
