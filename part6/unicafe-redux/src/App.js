// import { createNote, generateId, toggleImportanceOf } from './reducers/noteReducer'
// import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import Notes from './components/Notes'
import NewNote from './components/NewNote'
import VisibilityFilter from './components/VisibilityFilter'
// import noteService from './services/notes'
// import { setNotes } from './reducers/noteReducer'
import { useDispatch } from 'react-redux'
import { initializeNotes } from './reducers/noteReducer'

const App = () => {

  const dispatch = useDispatch()
  
  useEffect(() => {
    // noteService
      // .getAll().then(notes => dispatch(setNotes(notes)))
      dispatch(initializeNotes())
  }, [dispatch])

  return(
    <div>
      <NewNote />
      <VisibilityFilter />
      <Notes />
    </div>
  )
}

export default App