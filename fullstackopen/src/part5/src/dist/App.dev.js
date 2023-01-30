// import { useState, useEffect, useRef } from 'react'
// import Note from './components/Note'
// import Notification from './components/Notification'
// import Footer from './components/Footer'
// import LoginForm from './components/LoginForm'
// import NoteForm from './components/NoteForm'
// import Togglable from './components/Togglable'
// import noteService from './services/notes'
// import loginService from './services/login'
// const App = () => {
//   const [notes, setNotes] = useState([])
//   const [showAll, setShowAll] = useState(true)
//   const [errorMessage, setErrorMessage] = useState(null)
//   const [username, setUsername] = useState('') 
//   const [password, setPassword] = useState('') 
//   const [user, setUser] = useState(null)
//   const [label, setLabel] = useState('')
//   const noteFormRef = useRef()
//   useEffect(() => {
//     noteService
//       .getAll()
//       .then(initialNotes => {
//         setNotes(initialNotes)
//       })
//   }, [label])
//   useEffect(() => {
//     const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
//     if (loggedUserJSON) {
//       const user = JSON.parse(loggedUserJSON)
//       setUser(user)
//       noteService.setToken(user.token)
//     }
//   }, [])
//   const updateLabel = (label) => {
//     setTimeout(() => {
//         setLabel(label);
//     }, 0);
// }
//   const handleLogin = async (event) => {
//     event.preventDefault()
//     try {
//       const user = await loginService.login({
//         username, password,
//       })
//       window.localStorage.setItem(
//         'loggedNoteappUser', JSON.stringify(user)
//       ) 
//       noteService.setToken(user.token)
//       setUser(user)
//       setUsername('')
//       setPassword('')
//       console.log('logging in with', username, password)
//     } catch (exception) {
//       setErrorMessage('Wrong credentials')
//       setTimeout(() => {
//         setErrorMessage(null)
//       }, 5000)
//     }
//   }
//   const handleLogOut =(e) => {
//     e.preventDefault()
//     window.localStorage.clear()
//     setUser(null)
//   }
//   const addNote = (noteObject) => {
//     noteFormRef.current.toggleVisibility()
//     noteService
//       .create(noteObject)
//       .then(returnedNote => {
//         setNotes(notes.concat(returnedNote))
//       })
//   }
//   // const addNote = (event) => {
//   //   event.preventDefault()
//   //   noteFormRef.current.toggleVisibility()
//   //   const noteObject = {
//   //       content: newNote,
//   //       date: new Date().toISOString(),
//   //       important: Math.random() > 0.5,
//   //       id: notes.length + 1,
//   //     }
//   //   noteService
//   //   .create(noteObject)
//   //   .then(returnedNote => {     
//   //     setNotes(notes.concat(returnedNote))
//   //     setNewNote('')
//   //   })
//   // }
//   // const addNote = (event) => {
//   //   event.preventDefault()
//     // const noteObject = {
//     //   content: newNote,
//     //   date: new Date().toISOString(),
//     //   important: Math.random() > 0.5,
//     //   id: notes.length + 1,
//     // }
//   //   noteService
//   //     .create(noteObject)
//   //     .then(returnedNote => {
//   //       setNotes(notes.concat(returnedNote))
//   //       setNewNote('')
//   //     })
//   // }
//   // const handleNoteChange = (event) => {
//   //   setNewNote(event.target.value)
//   // }
//   const toggleImportanceOf = id => {
//     const note = notes.find(n => n.id === id)
//     const changedNote = { ...note, important: !note.important }
//     noteService
//       .update(id, changedNote)
//       .then(returnedNote => {
//         setNotes(notes.map(note => note._id === id ? returnedNote : note))
//       })
//       .catch(error => {
//         setErrorMessage(
//           `Note '${note.content}' was already removed from server`
//         )
//         setTimeout(() => {
//           setErrorMessage(null)
//         }, 5000)
//         setNotes(notes.filter(n => n.id !== id))
//       })
//   }
//   // const loginForm = () => (
//   //   <form onSubmit={handleLogin}>
//   //     <div>
//   //       username
//   //         <input
//   //         type="text"
//   //         value={username}
//   //         name="Username"
//   //         onChange={({ target }) => setUsername(target.value)}
//   //       />
//   //     </div>
//   //     <div>
//   //       password
//   //         <input
//   //         type="password"
//   //         value={password}
//   //         name="Password"
//   //         onChange={({ target }) => setPassword(target.value)}
//   //       />
//   //     </div>
//   //     <button type="submit">login</button>
//   //   </form>      
//   // )
//   // const loginForm = () => {
//   //   const hideWhenVisible = { display: loginVisible ? 'none' : '' }
//   //   const showWhenVisible = { display: loginVisible ? '' : 'none' }
//   //   return (
//   //     <div>
//   //       <div style={hideWhenVisible}>
//   //         <button onClick={() => setLoginVisible(true)}>log in</button>
//   //       </div>
//   //       <div style={showWhenVisible}>
//   //         <LoginForm
//   //           username={username}
//   //           password={password}
//   //           handleUsernameChange={({ target }) => setUsername(target.value)}
//   //           handlePasswordChange={({ target }) => setPassword(target.value)}
//   //           handleSubmit={handleLogin}
//   //         />
//   //         <button onClick={() => setLoginVisible(false)}>cancel</button>
//   //       </div>
//   //     </div>
//   //   )
//   // }
//   const noteForm = () => (
//     <Togglable buttonLabel='new note' ref={noteFormRef}>
//       <NoteForm createNote={addNote} />
//     </Togglable>
//   )
//   // const NoteForm = ({ onSubmit, handleChange, value}) => {
//   //   return (
//   //     <div>
//   //       <h2>Create a new note</h2>
//   //       <form onSubmit={onSubmit}>
//   //         <input
//   //           value={value}
//   //           onChange={handleChange}
//   //         />
//   //         <button type="submit">save</button>
//   //       </form>
//   //     </div>
//   //   )
//   // }
//   // const noteForm = () => (
//   //   <form onSubmit={addNote}>
//   //     <input
//   //       value={newNote}
//   //       onChange={handleNoteChange}
//   //     />
//   //     <button type="submit">save</button>
//   //   </form>  
//   // )
//   const notesToShow = showAll
//     ? notes
//     : notes.filter(note => note.important)
//   return (
//     <div>
//       <h1>Notes</h1>
//       <Notification message={errorMessage} />
//       {user === null ?
//         <Togglable buttonLabel='login'>
//           <LoginForm
//             username={username}
//             password={password}
//             handleUsernameChange={({ target }) => setUsername(target.value)}
//             handlePasswordChange={({ target }) => setPassword(target.value)}
//             handleSubmit={handleLogin}
//           />
//         </Togglable> :
//       <div>
//         <p>{user.name} logged in</p>
//         <button onClick={handleLogOut}>Logout</button>
//       </div>
//     }
//       <div style={{marginTop: 10}}>
//         <button onClick={() => setShowAll(!showAll)}>
//           show {showAll ? 'important' : 'all' }
//         </button>
//       </div>   
//       <ul>
//         {notesToShow.map(note => 
//           <Note
//             key={note.id}
//             note={note}
//             toggleImportance={toggleImportanceOf}
//             updateLabel={updateLabel}
//           />
//         )}
//       </ul>
//         {noteForm()}
//       <Footer />
//     </div>
//   )
// }
// export default App
//Cypress test
// import { useState, useEffect, useRef } from 'react'
// import Note from './components/Note'
// import Notification from './components/Notification'
// import Footer from './components/Footer'
// import LoginForm from './components/LoginForm'
// import NoteForm from './components/NoteForm'
// import Togglable from './components/Togglable'
// import noteService from './services/notes'
// import loginService from './services/login'
// const App = () => {
//   const [notes, setNotes] = useState([])
//   const [showAll, setShowAll] = useState(true)
//   const [errorMessage, setErrorMessage] = useState(null)
//   const [username, setUsername] = useState('')
//   const [password, setPassword] = useState('')
//   const [user, setUser] = useState(null)
//   useEffect(() => {
//     noteService
//       .getAll()
//       .then(initialNotes => {
//         setNotes(initialNotes)
//       })
//   }, [])
//   useEffect(() => {
//     const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
//     if (loggedUserJSON) {
//       const user = JSON.parse(loggedUserJSON)
//       setUser(user)
//       noteService.setToken(user.token)
//     }
//   }, [])
//   const noteFormRef = useRef()
//   const handleLogin = async (event) => {
//     event.preventDefault()
//     try {
//       const user = await loginService.login({
//         username, password,
//       })
//       noteService.setToken(user.token)
//       window.localStorage.setItem(
//         'loggedNoteappUser', JSON.stringify(user)
//       )
//       setUser(user)
//       setUsername('')
//       setPassword('')
//     } catch (exception) {
//       setErrorMessage('wrong credentials')
//       setTimeout(() => {
//         setErrorMessage(null)
//       }, 5000)
//     }
//   }
//   const handleLogOut =(e) => {
//         e.preventDefault()
//         window.localStorage.clear()
//         setUser(null)
//       }
//   const addNote = (noteObject) => {
//     noteService
//       .create(noteObject)
//       .then(returnedNote => {
//         setNotes(notes.concat(returnedNote))
//         noteFormRef.current.toggleVisibility()
//       })
//   }
//   const notesToShow = showAll
//     ? notes
//     : notes.filter(note => note.important)
//   const toggleImportanceOf = id => {
//     const note = notes.find(n => n.id === id)
//     const changedNote = { ...note, important: !note.important }
//     noteService
//       .update(id, changedNote).then(returnedNote => {
//         setNotes(notes.map(note => note.id !== id ? note : returnedNote))
//       })
//       .catch(() => {
//         setErrorMessage(
//           `Note '${note.content}' was already removed from server`
//         )
//         setTimeout(() => {
//           setErrorMessage(null)
//         }, 5000)
//         setNotes(notes.filter(n => n.id !== id))
//       })
//   }
//   return (
//     <div>
//       <h1>Notes app</h1>
//       <Notification message={errorMessage} />
//       {!user &&
//         <Togglable buttonLabel="login">
//           <LoginForm
//             username={username}
//             password={password}
//             handleUsernameChange={({ target }) => setUsername(target.value)}
//             handlePasswordChange={({ target }) => setPassword(target.value)}
//             handleSubmit={handleLogin}
//           />
//         </Togglable>
//       }
//       {user &&
//         <div>
//           <p>{user.name} logged in</p>
//           <button onClick={handleLogOut}>Logout</button>
//           <Togglable buttonLabel="new note" ref={noteFormRef}>
//             <NoteForm createNote={addNote} />
//           </Togglable>
//         </div>
//       }
//       <div>
//         <button onClick={() => setShowAll(!showAll)}>
//           show {showAll ? 'important' : 'all' }
//         </button>
//       </div>
//       <ul>
//         {notesToShow.map(note =>
//           <Note
//             key={note.id}
//             note={note}
//             toggleImportance={() => toggleImportanceOf(note.id)}
//           />
//         )}
//       </ul>
//       <Footer />
//     </div>
//   )
// }
// export default App
"use strict";