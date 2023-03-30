import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import Filter from './components/Filter'
import Notification from './components/Notification'

const App = () => {

  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter />
      <AnecdoteList />
      <Notification />
      <AnecdoteForm />
      <Notification />
    </div>
  )
}

export default App