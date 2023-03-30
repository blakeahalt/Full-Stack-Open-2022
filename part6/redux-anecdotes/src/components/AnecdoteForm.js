import { connect } from 'react-redux';
import { useDispatch } from 'react-redux'
import { createNew, generateId } from '../reducers/anecdoteReducer'
import { notifyMessage } from '../reducers/notificationReducer';
import anecdoteService from '../services/anecdotes'


const NewAnecdote = (props) => {
  const dispatch = useDispatch()

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.new.value
    event.target.new.value = ''
    dispatch(createNew(content))
    dispatch(notifyMessage(`Created new anecdote: ${content}`, 3));
    };

  return (
    <>
      <h2>Create New:</h2>
        <form onSubmit={addAnecdote}>
            <input style={{ width: '50vw', marginLeft: '15px', marginRight: '5px' }} name="new" />
            <button type="submit">create</button>
        </form>
    </>
  )
}

// export default NewAnecdote
const mapDispatchToProps = {
  createNew,
  notifyMessage,
  generateId,
};

export default connect(null, mapDispatchToProps)(NewAnecdote);
