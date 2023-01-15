// require('dotenv').config()
const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

// const mongoUrl = 'mongodb://localhost/bloglist'
// mongoose.connect(mongoUrl)

// const url = `mongodb+srv://fullstack:${password}@cluster0.nrpgtan.mongodb.net/Blog?retryWrites=true&w=majority`
const url = `mongodb+srv://fullstack:${password}@cluster0.nrpgtan.mongodb.net/Part4?retryWrites=true&w=majority`

mongoose.connect(url)

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

const Blog = mongoose.model('Blog', blogSchema)

const blog = new Blog({
  title: 'test_mongo',
  author: 'author test',
  url: 'url test',
  likes: 999,
})

if ( false ) {
  blog.save().then(() => {
    console.log('blog saved!')
    mongoose.connection.close()
  })
}

Blog.find({}).then(result => {
  result.forEach(blog => {
    console.log(blog)
  })
  mongoose.connection.close()
})