import { useQuery, useMutation, useQueryClient} from 'react-query'
import { getNotes, createNote, updateNote } from './requests'

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
    // const toggleImportance = (note) => {
    //   console.log('toggle importance of', note.id)
    // }
    const toggleImportance = (note) => {
        updateNoteMutation.mutate({...note, important: !note.important })
      }

    // const result = useQuery('notes', () => axios.get('http://localhost:3001/notes')
    //  .then(res => res.data))
    const result = useQuery('notes', getNotes, {
        refetchOnWindowFocus: false
    })
    console.log(result)
    
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
        {notes.map(note =>
          <li key={note.id} onClick={() => toggleImportance(note)}>
            {note.content} 
            <strong> {note.important ? 'important' : ''}</strong>
          </li>
        )}
      </div>
    )
  }
  
  export default App