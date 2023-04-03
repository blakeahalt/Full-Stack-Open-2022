import { useEffect } from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import Filter from './components/Filter'
// import anecdoteService from './services/anecdotes'
// import { useDispatch } from 'react-redux'
// import { initializeAnecdotes } from './reducers/anecdoteReducer'

import { useQuery } from 'react-query';


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

  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter />
      <AnecdoteList />
      <Notification />
      <AnecdoteForm />
    </div>
  )
}


export default App