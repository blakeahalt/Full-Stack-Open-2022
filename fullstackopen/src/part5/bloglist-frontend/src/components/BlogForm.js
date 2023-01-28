import { useState } from 'react' 

const BlogForm = ({ createBlog }) => {
    const [newUrl, setNewUrl] = useState('')    
    const [newTitle, setNewTitle] = useState('')
    const [newAuthor, setNewAuthor] = useState('')
    

    const handleUrlChange = (event) => {
        setNewUrl(event.target.value)
      }
      const handleTitleChange = (event) => {
        setNewTitle(event.target.value)
      }
      const handleAuthorChange = (event) => {
        setNewAuthor(event.target.value)
      }

  const addBlog = async (event) => {
    event.preventDefault()
    createBlog ({
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    })
  }

  return (
    <>
    <h2>create new</h2>
    <form onSubmit={addBlog}>
      <div >
        Url:<input
        id='url'
        style={{marginLeft: 10}}
        value={newUrl}
        onChange={handleUrlChange}
        />
      </div>
      <div  >
        Title: <input
        id='title'
        style={{marginLeft: 10}} 
        value={newTitle}
        onChange={handleTitleChange}
        />
      </div>
      <div >
        Author: <input
        id='author'
        style={{marginLeft: 10}}
        value={newAuthor}
        onChange={handleAuthorChange}
        
        />
      </div>
      <div style={{marginTop: 10, marginBottom: 5}}>
        <button id='submit' type="submit">create</button>
      </div>
    </form>  
    </>
  )
}

export default BlogForm