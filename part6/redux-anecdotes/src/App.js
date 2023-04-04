import { useEffect } from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import Filter from './components/Filter'

// import anecdoteService from './services/anecdotes'
// import { useDispatch } from 'react-redux'
// import { initializeAnecdotes } from './reducers/anecdoteReducer'

import { useQuery } from 'react-query';
import { getAnecdotes } from './requests'


const App = () => {

  // const dispatch = useDispatch()
  
  // useEffect(() => {
  //   dispatch(initializeAnecdotes())
  // }, [dispatch])


// export default function useAnecdotes() {
//   return useQuery('anecdotes', getAnecdotes, {
//     refetchOnWindowFocus: false,
//     retry: 1,
//   });
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
      <h2>Anecdotes</h2>
      <Filter />
      <Notification />
      <AnecdoteList anecdotes={anecdotes} />
      <AnecdoteForm />
    </div>
  )
}


export default App