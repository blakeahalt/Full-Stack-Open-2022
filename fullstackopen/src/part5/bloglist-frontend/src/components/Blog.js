import { useState, useEffect } from 'react'


const Blog = ({blog, deleteBlog, saveLike, user, expandAll}) => {
    const [toggleView, setToggleView] = useState(true)

    useEffect(() => {
      expandAll ? setToggleView(true) : setToggleView(false);
    }, [expandAll])
    

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
  <div style={{marginLeft: 5}}>
    <div>URL: {blog.url}</div>
    <div>Title: {blog.title}</div>
    <div>Author: {blog.author}</div>
    <div>likes: {blog.likes}
    <button style = {{marginLeft: 10}} onClick={(event) => saveLike(blog.id)}>Like</button>  
    </div>
    <div>User: {user}</div>
    <button style = {{marginTop: 10, marginBottom: 5, marginLeft: 5}} onClick={(event) => deleteBlog(blog.id)}>Delete</button>
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