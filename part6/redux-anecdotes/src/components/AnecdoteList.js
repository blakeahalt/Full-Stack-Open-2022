import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { setNotification, notifyMessage } from '../reducers/notificationReducer';
import { voteFor, deleteAnecdotes, initializeAnecdotes } from '../reducers/anecdoteReducer'

const Anecdote = (props) => {
    const dispatch = useDispatch()
    const voteHandler = (id) => {
        dispatch(voteFor(id, props.anecdote));
        dispatch(notifyMessage(`You voted for ${props.anecdote.content}`, 3));
    };

    const handleDeleteAnecdote = (id, content) => {
      if (window.confirm(`Remove anecdote '${content}'?`)) {
        dispatch(deleteAnecdotes(id));
        dispatch(notifyMessage(`Deleted anecdote: ${content}`, 3));
      }
    };

    return (
      <div style={{ height: 'auto', width: '7vh', display: 'flex', alignItems: 'center', flexDirection: 'column', textAlign: 'center' }}>
        <button  style={{ width: '100%' }} onClick={() => voteHandler(props.anecdote.id)}>
            vote
        </button>
        <button style={{ width: '100%' }} onClick={() => handleDeleteAnecdote(props.anecdote.id, props.anecdote.content)}>
            delete
          </button>
      </div>
    );
};

const AnecdoteList = () => {
  const filter = useSelector((state) => state.filter);
  const anecdotes = useSelector((state) => {
    const filteredAnecdotes = state.anecdotes.filter((anecdote) =>
      anecdote.content.toLowerCase().match(filter.toLowerCase())
    );
    return filteredAnecdotes.sort((a, b) => b.votes - a.votes);
  });

  return (
    <div >
      {anecdotes.map((anecdote, index) => (
        <div key={`anecdote_${anecdote.id}_${index}`} style={{ border: '1px solid black', padding: '5px', margin: '1vh', display: 'flex', flexDirection: 'row'}}>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <Anecdote anecdote={anecdote} />
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