import { connect } from 'react-redux';
import { createAnecdote, generateId } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer';


const NewAnecdote = (props) => {
  // const dispatch = useDispatch()

  const addAnecdote = (event) => {
    event.preventDefault()
    const anecdote = {
      content: event.target.new.value,
      id: generateId(),
      votes: 0,
      };
      props.createAnecdote(anecdote);
      props.setNotification(
          `Created new anecdote: ${event.target.new.value}`
      );
      event.target.new.value = '';
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