import { useMutation, useQueryClient } from 'react-query';
import { updateAnecdote } from './requests';
import { useNotificationDispatch } from '../NotificationContext';

export default function useUpdateAnecdote() {
  const queryClient = useQueryClient();
  const notificationDispatch = useNotificationDispatch();

  return useMutation(updateAnecdote, {
    onSuccess: (updatedAnecdote) => {
      //queryClient.invalidateQueries('anecdotes');
      const anecdotes = queryClient.getQueryData('anecdotes');
      const newAnecdotes = anecdotes.map((a) => (a.id === updatedAnecdote.id ? updatedAnecdote : a));
      queryClient.setQueryData('anecdotes', newAnecdotes);
      notificationDispatch({ type: 'SET', payload: `anecdote "${updatedAnecdote.content}" voted` });
    },
  });
}