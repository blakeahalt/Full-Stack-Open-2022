import { useMutation, useQueryClient } from 'react-query';
import { updateAnecdote } from '../requests';
import { useNotificationDispatch } from '../NotificationContext';

function VoteButton({ anecdote }) {
  const queryClient = useQueryClient();
  const notificationDispatch = useNotificationDispatch();

  const updateAnecdoteMutation = useMutation(updateAnecdote, {
    onSuccess: (updatedAnecdote) => {
      const anecdotes = queryClient.getQueryData('anecdotes');
      const newAnecdotes = anecdotes.map((a) =>
        a.id === updatedAnecdote.id ? updatedAnecdote : a
      );
      queryClient.setQueryData('anecdotes', newAnecdotes);
      notificationDispatch({
        type: 'SET',
        payload: { message: `Voted for anecdote: "${updatedAnecdote.content}"` },
      });
      setTimeout(() => {
        notificationDispatch({ type: 'RESET'});
      }, 3000)
    },
  });

  const handleVote = () => {
    updateAnecdoteMutation.mutate({ ...anecdote, votes: (anecdote.votes || 0) + 1 });
  };

  return (
    <button onClick={handleVote}>
      Vote
    </button>
  );
}

export default VoteButton;
