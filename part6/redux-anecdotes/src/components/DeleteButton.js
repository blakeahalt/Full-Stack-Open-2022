import { useMutation, useQueryClient } from 'react-query';
import { deleteAnecdote } from '../requests';
import { useNotificationDispatch } from '../NotificationContext';

function DeleteButton({ id, content }) {
  const queryClient = useQueryClient();
  const notificationDispatch = useNotificationDispatch();

  const deleteAnecdoteMutation = useMutation(deleteAnecdote, {
    onSuccess: () => {
      notificationDispatch({
        type: 'SET',
        payload: { message: `Successfully deleted: "${content}"` },
      });
      queryClient.invalidateQueries('anecdotes');
      setTimeout(() => {
        notificationDispatch({ type: 'RESET'});
      }, 3000)
    },
  });

  const handleDelete = () => {
    if (window.confirm(`Remove anecdote "${content}"?`)) {
      deleteAnecdoteMutation.mutate(id);
    }
  };

  return (
    <button onClick={handleDelete}>
      Delete
    </button>
  );
}

export default DeleteButton;
