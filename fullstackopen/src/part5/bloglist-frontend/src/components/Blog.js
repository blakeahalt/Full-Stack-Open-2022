import { useState, useEffect } from 'react'


const Blog = ({blog, deleteBlog, saveLike, user, expandAll}) => {
    const [toggleView, setToggleView] = useState(true)
    const [likes, setLikes] = useState(blog.likes)

    useEffect(() => {
      expandAll ? setToggleView(true) : setToggleView(false);
    }, [expandAll])
    
    const handleLike = () => {
      setLikes(likes + 1);
      saveLike(blog.id);
    };

    const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
  <>
  <div style={blogStyle}>

  {toggleView ? 
  <div style={{marginLeft: 5, marginBottom: 5}}>{blog.title} <button style = {{marginLeft: 10}} onClick={() => setToggleView(!toggleView)}>View</button></div> : 
  <>
  <div data-testid='view' id='view' style={{marginLeft: 5}}>
    <div data-testid='url' id='url'>URL: {blog.url}</div>
    <div data-testid='title' id='title'>Title: {blog.title}</div>
    <div data-testid='author' id='author'>Author: {blog.author}</div>
    <div data-testid='likes' id='likes'>likes: {blog.likes}
    <button data-testid='Like' id='Like' style = {{marginLeft: 10}} onClick={handleLike}>Like</button>  
    {/* <button data-testid='Like' id='Like' style = {{marginLeft: 10}} onClick={(event) => saveLike(blog.id)}>Like</button>   */}
    </div>
    <div>User: {user}</div>
    {user ? <button style = {{marginTop: 10, marginBottom: 5, marginLeft: 5}} onClick={(event) => deleteBlog(blog.id)}>Delete</button> : null}
    
    <button style = {{marginLeft: 10}} onClick={() => setToggleView(!toggleView)}>Collapse View</button>
  </div>
    </>
}
    {/* <button style = {{marginLeft: 10}} onClick={() => setToggleView(!toggleView)}>View</button>   */}
    

  </div>
  </>
  )
  }

export default Blog