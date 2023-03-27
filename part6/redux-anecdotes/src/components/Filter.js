import React, { useState } from 'react'
import { useSelector, useDispatch} from 'react-redux'
import { createAnecdote, addVote } from '../reducers/anecdoteReducer'

const Filter = () => {
  const [filter, setFilter] = useState('')
  const anecdotes = useSelector(state => {
    const filteredAnecdotes = state.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
    return filteredAnecdotes.sort((a, b) => b.votes - a.votes)
  })

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const Vote = ({ anecdote }) => {
    const dispatch = useDispatch()
  
    const handleVote = () => {
      dispatch(addVote(anecdote.id))
    }
  
    return (
        <button onClick={handleVote}>vote</button>
    )
  }

  return (
    <div>
      <div>
        Filter: <input value={filter} onChange={handleFilterChange} />
      </div>
      <br />
      {anecdotes.map(anecdote =>
        <div key={anecdote.id} style={{ margin: '1vh', display: 'flex', flexDirection: 'row'}}>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <Vote anecdote={anecdote} />
            <div style={{minWidth: '20px', margin: '10px', textAlign: 'center' }}>
                {anecdote.votes}
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <div style={{ lineHeight: 1.2, textAlign: 'left' }}>
                {anecdote.content}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Filter
