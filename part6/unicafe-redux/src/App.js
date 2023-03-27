// import { createNote, generateId, toggleImportanceOf } from './reducers/noteReducer'
// import { useSelector, useDispatch } from 'react-redux'
import NewNote from './components/NewNote'
import Notes from './components/Notes'
import VisibilityFilter from './components/VisibilityFilter'

const App = () => {
  // *Moved to ./components/NewNote
  // const dispatch = useDispatch()
  // const notes = useSelector(state => state)

  // *Don't need here - imported from noteReducer in NewNote
  // const createNote = (content) => {
  //   return {
  //     type: 'NEW_NOTE',
  //     payload: {
  //       content,
  //       important: false,
  //       id: generateId()
  //     }
  //   }
  // }

  // *Don't need here - imported from noteReducer in Notes
  // const toggleImportanceOf = (id) => {
  //   return {
  //     type: 'TOGGLE_IMPORTANCE',
  //     payload: { id }
  //   }
  // }


  // *Moved to ./components/NewNote
  // const addNote = (event) => {
  //   event.preventDefault()
  //   const content = event.target.note.value
  //   event.target.note.value = ''
  //   dispatch(createNote(content))
  // }

  // *Moved to ./reducers/noteReducer
  // const toggleImportance = (id) => {
  //   dispatch(toggleImportanceOf(id))
  // }

  // *Moved to ./components/VisibilityFilter
  // const filterSelected = (value) => {
  //   console.log(value)
  // }
  return(
    <div>
      <NewNote />
      <VisibilityFilter />
      <Notes />
    </div>
  )
}

export default App