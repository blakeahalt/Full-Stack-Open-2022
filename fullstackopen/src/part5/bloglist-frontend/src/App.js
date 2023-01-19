import { useState, useEffect } from 'react'

import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newUrl, setNewUrl] = useState('')
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState({
    message:null,
    successful:null
  })

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      setUser(user)
    }
  }, [])

  const showNotification =(messageContent,successfulMode) => {
    setNotification({
      message: messageContent,
      successful: successfulMode
    })
    setTimeout(() => {
      setNotification({
        message:null,
        successful:null
      })
    },5000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogUser', JSON.stringify(user)
      ) 
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      console.log('logging in with', username, password)
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      // setNotification('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }
  
  const addBlog = async (event) => {
    event.preventDefault()
    const blogToAdd = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    }
      
    blogService
      .create(blogToAdd)
      .then(returnedBlog => {
        setBlogs([...blogs, returnedBlog])
        setNewTitle('')
        setNewAuthor('')
        setNewUrl('')
      })
  }
  
  const handleLogOut =(e) => {
    e.preventDefault()
    window.localStorage.clear()
    setUser(null)
  }

  const handleUrlChange = (event) => {
    setNewUrl(event.target.value)
  }
  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }
  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }


  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>      
  )

  const blogForm = () => (
    <form onSubmit={addBlog}>
      <div>
        Url:<input
          value={newUrl}
          onChange={handleUrlChange}
        />
      </div>
      <div>
        Title: <input
          value={newTitle}
          onChange={handleTitleChange}
        />
      </div>
      <div>
        Author: <input
          value={newAuthor}
          onChange={handleAuthorChange}
        />
      </div>
      <div>
        <button type="submit">save</button>
      </div>
    </form>  
  )

  return (
    <div>
      <h2>blogs</h2>

      {notification.message!==null && notification.successful!==null &&
        <Notification message={notification.message} successful={notification.successful}/>}
      <Notification message={errorMessage} />

      {user === null ?
      loginForm() :
      <div>
        <p>{user.name} logged-in</p>
        <button onClick={handleLogOut}>Logout</button>
        <h2>create new</h2>
        {blogForm()}
      </div>
    }
    <br/>
      {Object.keys(blogs).map(blogKey => {
        return(
          <Blog key={blogKey} blog={blogs[blogKey]} />)
        })}
      {/* {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )} */}
    </div>
  )
}

export default App
