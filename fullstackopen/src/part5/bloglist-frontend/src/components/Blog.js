const Blog = ({blog, deleteBlog, saveLike}) => (
  <>
  <div>
    {blog.title}, {blog.author}, {blog.likes}
    <button style = {{marginLeft: 10}} onClick={(event) => saveLike(blog.id)}>Like</button>  
    <button style = {{marginLeft: 10}} onClick={(event) => deleteBlog(blog.id)}>Delete</button>
  </div>
  </>
)

export default Blog