// // import { connect } from 'react-redux';
// // import { useDispatch } from 'react-redux'
// // import { createNew, generateId } from '../reducers/anecdoteReducer'
// // import { notifyMessage } from '../reducers/notificationReducer';
// // import anecdoteService from '../services/anecdotes'

// import { useQueryClient, useMutation } from 'react-query';
// import { createAnecdote } from './requests';
// import { useNotificationDispatch } from '../NotificationContext';

// const NewAnecdote = (props) => {
//   // const dispatch = useDispatch()
//   const queryClient = useQueryClient();
//   const notificationDispatch = useNotificationDispatch();

//   return useMutation(createAnecdote, {
//     onSuccess: (newAnecdote) => {
//       // queryClient.invalidateQueries('anecdotes');
//       const anecdotes = queryClient.getQueryData('anecdotes');
//       queryClient.setQueryData('anecdotes', anecdotes.concat(newAnecdote));
//       notificationDispatch({ type: 'SET', payload: `anecdote "${newAnecdote.content}" created` });
//       // const resetNotification = () => {
//         setTimeout(() => {
//           notificationDispatch({ type: 'RESET', payload: `anecdote "${newAnecdote.content}" deleted` });
//         }, 3000)
//       // };
//     },
//     onError: (err) => {
//       const errorMessage = err?.response?.data?.error;
//       if (errorMessage) {
//         notificationDispatch({ type: 'SET', payload: errorMessage });
//       }
//     },
//   });

//   return (
//     <>
//       <h2>Create New:</h2>
//         <form onSubmit={addAnecdote}>
//             <input style={{ width: '50vw', marginLeft: '15px', marginRight: '5px' }} name="new" />
//             <button type="submit">create</button>
//         </form>
//     </>
//   )
// }

// // export default NewAnecdote
// // const mapDispatchToProps = {
// //   createNew,
// //   notifyMessage,
// //   generateId,
// // };

// // export default connect(null, mapDispatchToProps)(NewAnecdote);
// export default NewAnecdote;


import { useQueryClient, useMutation } from 'react-query';
import { createAnecdote } from '../requests';
import { useNotificationDispatch } from '../NotificationContext';

function useCreateAnecdote() {
  const queryClient = useQueryClient();
  const notificationDispatch = useNotificationDispatch();

  return useMutation(createAnecdote, {
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData('anecdotes');
      queryClient.setQueryData('anecdotes', anecdotes?.concat(newAnecdote));
      notificationDispatch({ type: 'SET', payload: {message: `anecdote "${newAnecdote.content}" created` }});
      setTimeout(() => {
        notificationDispatch({ type: 'RESET'});
      }, 3000)
    },
    onError: (err) => {
      const errorMessage = err?.response?.data?.error;
      if (errorMessage) {
        notificationDispatch({ type: 'SET', payload: {message: errorMessage} });
        setTimeout(() => {
          notificationDispatch({ type: 'RESET'});
        }, 3000)
      }
    },
  });
}

const AnecdoteForm = () => {
  const createAnecdoteMutation = useCreateAnecdote();

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = '';
    createAnecdoteMutation.mutate({ content, votes: 0 });
  };

  return (
    <div >
      <h3>create new:</h3>
      <form style={{marginBottom: '15px', marginLeft: '10px', display: 'flex', flexDirection: 'row' }} onSubmit={onCreate}>
        <input name='anecdote' />
        <button type='submit'>create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;