import { useDispatch } from 'react-redux'
// import { createAnecdote, appendAnecdote, addAnecdote } from '../reducers/anecdoteReducer'
import { connect } from 'react-redux'

import { createAnecdote, addVote } from '../reducers/anecdoteReducer'
// import { createNotification, notifyMessage, removeNotification, setNotification } from '../reducers/notificationReducer'
import { showTimedNotification } from '../reducers/notificationReducer';


// const NewAnecdote = () => {
//   const dispatch = useDispatch()

//   const addAnecdote = (event) => {
//     event.preventDefault()
//     const content = event.target.anecdote.value
//     event.target.anecdote.value = ''
//     dispatch(appendAnecdote(content))
//   }

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const handleSubmit = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = '';
    dispatch(createAnecdote(content));
    dispatch(showTimedNotification(`created anecdote "${content}"`));
  };

  return (
    <>
        <h2>create new</h2>
        <form onSubmit={handleSubmit}>
            <input name="anecdote" />
            <button type="submit">create</button>
        </form>
    </>
  )
}

// export default NewAnecdote

// const mapDispatchToProps = {
//   createAnecdote,
//   // notifyMessage
// }

export default AnecdoteForm
// export default connect(null, mapDispatchToProps)(AnecdoteForm)