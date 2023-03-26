import { useSelector, useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector(state => state.sort((a, b) => b.votes - a.votes))

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
    
export default AnecdoteList