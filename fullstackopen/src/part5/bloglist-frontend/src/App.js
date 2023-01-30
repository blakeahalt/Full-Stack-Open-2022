import { useState, useEffect, useRef } from 'react'

import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import './App.css'


const App = () => {
  const [blogs, setBlogs] = useState([])
  // const [newUrl, setNewUrl] = useState('') // moved to BlogForm.js
  // const [newTitle, setNewTitle] = useState('') // moved to BlogForm.js
  // const [newAuthor, setNewAuthor] = useState('') // moved to BlogForm.js
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  // const [toggleView, setToggleView] = useState(true)
  const [expandAll, setExpandAll] = useState(true)
  const [isExpanded, setIsExpanded] = useState(false)


  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll()
    .then(blogs => blogs.sort((a,b) => b.likes-a.likes))
    .then(sortedBlogs => setBlogs(sortedBlogs))  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      setUser(user)
    }
  }, [])

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
      setSuccessMessage(`Logged in with ${username}!`)
            setTimeout(() => {
              setSuccessMessage(null)
            }, 5000)
    } catch (exception) {
      console.log('nah')
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }
  
  const addBlog = (blogToAdd) => {
      blogFormRef.current.toggleVisibility() 
      blogService
        .create(blogToAdd)
        .then(returnedBlog => {
          setBlogs([...blogs, returnedBlog])
        })
        .then(() => {setSuccessMessage(`A new blog '${blogToAdd.title}' by ${blogToAdd.author} has been added`)
            setTimeout(() => {
              setSuccessMessage(null)
            }, 5000)
        })
  }

// Like button click handler
  const saveLike = async (likedBlogId) => {
    console.log('likedBlog', likedBlogId)
    let blog = blogs.find(b => b.id === likedBlogId)
    blog.likes += 1
    await blogService.update(likedBlogId, blog)
    blogService.getAll()
      .then(blogs => { setBlogs(blogs) })
      .then(() => {
        setSuccessMessage(`You liked '${blog.title}'`)
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
      })
  }

// Delete button click handler
  const deleteBlog = async (blogId) => {
    try {
      let blog = blogs.find(b => b.id === blogId)
      let res = window.confirm(`Remove ${blog.title} by ${blog.author}?`)
      if (res) {
      await blogService.remove(blogId)
      blogService.getAll()
        .then(blogs => { setBlogs(blogs) })
        .then(() => {
          setSuccessMessage(`Deleted blog '${blog.title}'!`)
          setTimeout(() => {
            setSuccessMessage(null)
          }, 5000)
        })
      } 
    }
    catch {
      setErrorMessage(`Unauthorized to Delete`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    } 
  }

  
  const handleLogOut =(e) => {
    e.preventDefault()
    window.localStorage.clear()
    setUser(null)
  }

  // const handleUrlChange = (event) => {  // moved to BlogForm.js
  //   setNewUrl(event.target.value)
  // }
  // const handleTitleChange = (event) => {  // moved to BlogForm.js
  //   setNewTitle(event.target.value)
  // }
  // const handleAuthorChange = (event) => {  // moved to BlogForm.js
  //   setNewAuthor(event.target.value)
  // }


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
      <button style={{marginTop: 10}} type="submit">login</button>
    </form>      
  )


  const blogForm = () => (
    <Togglable buttonLabel='new blog' ref={blogFormRef}>
      <BlogForm createBlog={addBlog} />
    </Togglable>
  )

  const handleExpandAll = () => {
    setExpandAll(!expandAll);
    setIsExpanded(!isExpanded);
  }
  
  return (
    <div>
      <h2>blogs</h2>

      <Notification errorMessage={errorMessage} successMessage={successMessage}  />

      {user === null ?
      loginForm() :
      <>
        <div>
          {user.name} logged in
          <button  style={{marginLeft: 10, marginBottom: 10}} onClick={handleLogOut}>Logout</button>
          {blogForm()}
        </div>
        <br/>

        {Object.keys(blogs).map(blogKey => {
          return(<Blog 
            user={user.name} 
            key={blogKey} 
            blogs={blogs} 
            blog={blogs[blogKey]} 
            deleteBlog={deleteBlog} 
            saveLike={saveLike}
            setExpandAll={setExpandAll}
            expandAll={expandAll}
            isExpanded={isExpanded}
            setIsExpanded={setIsExpanded}
            />
            )})}
          <button onClick={handleExpandAll}>{expandAll ? 'Expand All' : 'Collapse All'}</button>

      </>
      }
    </div>
  )
}

export default App
