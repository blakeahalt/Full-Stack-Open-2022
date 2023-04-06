import { useNotificationDispatch } from '../NotificationContext';
import { useMutation, useQueryClient, useQuery } from 'react-query';
import { getAnecdotes } from '../requests';
import VoteButton from './VoteButton';
import DeleteButton from './DeleteButton';

const AnecdoteList = () => {
  const result = useQuery('anecdotes', getAnecdotes, {
    refetchOnWindowFocus: false
  })
  console.log(result)
  
  if ( result.isLoading ) {
  return <div>loading data...</div>
  }

  const anecdotes = result.data

  return (
    <div>
     {anecdotes.sort((a, b) => b.votes - a.votes).map((anecdote, index) => (
        <div key={`anecdote_${anecdote.id}_${index}`} style={{ border: '1px solid black', padding: '5px', margin: '1vh', display: 'flex', flexDirection: 'row'}}>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <div style={{display: 'flex', flexDirection: 'column' }}>
              <VoteButton anecdote={anecdote}/>
              <DeleteButton id={anecdote.id} content={anecdote.content} />
            </div>
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
      ))}

    </div>
  );
};

export default AnecdoteList;

