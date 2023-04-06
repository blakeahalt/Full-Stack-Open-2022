import { useQuery, useMutation, useQueryClient} from 'react-query'
import { getNotes, createNote, updateNote, deleteNote } from './requests'
import VisibilityFilter from './components/VisibilityFilter'
import { useSelector } from 'react-redux'
import DeleteButton from './components/DeleteButton'


const App = () => {
    const queryClient = useQueryClient()

    const newNoteMutation = useMutation(createNote, {
        onSuccess: (newNote) => {
            // queryClient.invalidateQueries('notes')
            const notes = queryClient.getQueryData('notes')
            queryClient.setQueryData('notes', notes.concat(newNote))
        }
    })

    const addNote = async (event) => {
      event.preventDefault()
      const content = event.target.note.value
      event.target.note.value = ''
      newNoteMutation.mutate({ content, important: true })
      console.log(content)
    }
  
    const updateNoteMutation = useMutation(updateNote, {
        onSuccess: () => {
          queryClient.invalidateQueries('notes')
        },
      })

    const selectedFilter = useSelector(state => state.filter)

    const toggleImportance = (note) => {
        updateNoteMutation.mutate({...note, important: !note.important })
      }

    const result = useQuery('notes', getNotes, {
        refetchOnWindowFocus: false
    })

    if ( result.isLoading ) {
    return <div>loading data...</div>
    }

    const notes = result.data
  
    return(
      <div>
        <h2>Notes app</h2>
        <form onSubmit={addNote}>
          <input name="note" />
          <button type="submit">add</button>
        </form>
        <VisibilityFilter />
        {notes.filter(note => {
          if (selectedFilter === 'ALL') {
            return true
          }
          return selectedFilter === 'IMPORTANT' ? note.important : !note.important
        }).map(note =>
          <div key={note.id} style={{ display: 'flex', flexDirection: 'row', margin: '5px' }}>
            <DeleteButton content={note.content} id={note.id} />
            <div onClick={() => toggleImportance(note)}>
            {note.content} 
            <strong> {note.important ? 'important' : ''}</strong>
          </div>
          </div>
        )}
      </div>
    )
  }
  
  export default App