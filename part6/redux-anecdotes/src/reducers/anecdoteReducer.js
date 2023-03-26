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

// const initialState = anecdotesAtStart.map(asObject)
const initialState = JSON.parse(localStorage.getItem('anecdotes')) || anecdotesAtStart.map(asObject)

// const reducer = (state = initialState, action) => {
//   switch(action.type) {
//     case 'NEW_ANECDOTE':
//       return [...state, action.payload]
//     case 'VOTE':
//       const id = action.payload.id
//       const vote = action.payload.vote
//       return state.map(anecdote =>
//         anecdote.id !== id ? anecdote : { ...anecdote, votes: anecdote.votes + vote })
//     default:
//       return state
//   }
// }
const reducer = (state = initialState, action) => {
  switch(action.type) {
    case 'NEW_ANECDOTE':
      const newState = [...state, action.payload]
      localStorage.setItem('anecdotes', JSON.stringify(newState))
      return newState
    case 'VOTE':
      const id = action.payload.id
      const vote = action.payload.vote
      const updatedState = state.map(anecdote =>
        anecdote.id !== id ? anecdote : { ...anecdote, votes: anecdote.votes + vote })
      localStorage.setItem('anecdotes', JSON.stringify(updatedState))
      return updatedState
    default:
      return state
  }
}


export const addVote = (id) => {
  return {
    type: 'VOTE',
    payload: { id, vote: 1 }
  }
}  

export const generateId = () =>
    Number((Math.random() * 1000000).toFixed(0))


export const createAnecdote = (content) => {
  return {
    type: 'NEW_ANECDOTE',
    payload: {
      content,
      id: generateId(),
      votes: 0
    }
  }
}

export default reducer