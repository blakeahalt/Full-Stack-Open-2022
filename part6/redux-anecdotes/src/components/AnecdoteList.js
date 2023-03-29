import { useSelector, useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'

const Vote = ({ anecdote }) => {
  const dispatch = useDispatch()

  const handleVote = () => {
    dispatch(addVote(anecdote.id))
  }

  return (
    <button onClick={handleVote} style={{height: '25px', lineHeight: '20px'}}>
      vote
    </button>
    )
}


const AnecdoteList = () => {
  const filter = useSelector(state => state.filter)

    const anecdotes = useSelector(state => state.anecdotes)

    const filteredAnecdotes = anecdotes.filter((anecdote) => {
      if(filter === '') {
        return anecdote
      } else if(anecdote.content.toLowerCase().includes(filter.toLowerCase())) {
        return anecdote
      }
    })
    return (
        <div>
           {anecdotes.map(anecdote =>
          <div key={anecdote.id} style={{ margin: '1vh', display: 'flex', flexDirection: 'row', border: '1px solid black', padding: '1vh'}}>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
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
    
export default AnecdoteList