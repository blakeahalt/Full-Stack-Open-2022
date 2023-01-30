// import { useState } from 'react' 
// const NoteForm = ({ createNote }) => {
//   const [newNote, setNewNote] = useState('') 
//   const handleChange = (event) => {
//     setNewNote(event.target.value)
//   }
//   const addNote = (event) => {
//     event.preventDefault()
//     createNote({
//       content: newNote,
//       important: true,
//       // important: Math.random() > 0.5,
//     })
//     setNewNote('')
//   }
//   return (
//     <div className='formDiv'>
//       <h2>Create a new note</h2>
//       <form onSubmit={addNote}>
//       <input
//           value={newNote}
//           onChange={handleChange}
//           // placeholder='write note content here'  //Method#1
//           id='note-input'                        //Method#2
//         />
//         {/* <input
//           value={newNote}
//           onChange={handleChange}
//         />    */}
//         <button style={{marginLeft: 10, marginBottom: 10}} type="submit">save</button>
//       </form>
//     </div>
//   )
// }
// export default NoteForm
//Cypress Test
// import { useState } from 'react'
// const NoteForm = ({ createNote }) => {
//   const [newNote, setNewNote] = useState('')
//   const addNote = (event) => {
//     event.preventDefault()
//     createNote({
//       content: newNote,
//       important: true,
//     })
//     setNewNote('')
//   }
//   return (
//     <div>
//       <h2>Create a new note</h2>
//       <form onSubmit={addNote}>
//         <input
//           id='note-input'
//           value={newNote}
//           onChange={event => setNewNote(event.target.value)}
//         />
//         <button type="submit">save</button>
//       </form>
//     </div>
//   )
// }
// export default NoteForm
"use strict";