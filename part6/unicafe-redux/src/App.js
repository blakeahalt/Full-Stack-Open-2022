// import { createNote, generateId, toggleImportanceOf } from './reducers/noteReducer'
// import { useSelector, useDispatch } from 'react-redux'
import NewNote from './components/NewNote'
import Notes from './components/Notes'

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

  // const toggleImportance = (id) => {
  //   dispatch(toggleImportanceOf(id))
  // }

  return(
    <div>
      <NewNote />
        {/* *Moved to ./components/NewNote
        <form onSubmit={addNote}>
          <input name="note" />
          <button type="submit">add</button>
        </form> */}
      <Notes />
        {/* *Moved to ./components/Notes
        <ul>
          {notes.map(note=>
            <li key={note.id} onClick={() => toggleImportance(note.id)}>
              {note.content} <strong>{note.important ? 'important' : ''}</strong>
            </li>
          )}
          </ul> */}
    </div>
  )
}

export default App