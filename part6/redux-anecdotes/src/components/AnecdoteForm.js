import { connect } from 'react-redux';
import { useDispatch } from 'react-redux'
import { createAnecdote, generateId } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer';
import anecdoteService from '../services/anecdotes'


const NewAnecdote = (props) => {
  const dispatch = useDispatch()

  const addAnecdote = async (event) => {
    event.preventDefault()
    const anecdote = event.target.new.value
    event.target.new.value = ''
      const newAnecdote = await anecdoteService.create(anecdote);
      dispatch(createAnecdote(newAnecdote))
      props.setNotification(
          `Created new anecdote: ${event.target.new.value}`
      );
      // event.target.new.value = '';
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
  createAnecdote,
  setNotification,
  generateId,
};

export default connect(null, mapDispatchToProps)(NewAnecdote);
