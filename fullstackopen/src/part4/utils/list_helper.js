const _ = require('lodash')

const dummy = (blogs) => {
  return Number(blogs + 1)
}

const totalLikes = (blogs) => {
  if (blogs.length === 0) {
    return 0
  } else if (blogs.length === 1) {
    return blogs[0].likes
  } else {
    return blogs.reduce((total, blog) => total + blog.likes, 0)
  }
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return 'No favorites'
  } else if (blogs.length === 1) {
    return blogs
  } else {
    const fav = blogs.reduce((prev, current) => (prev.likes > current.likes ? prev : current))
    return `title: ${fav.title}, author: ${fav.author}, likes: ${fav.likes}`
  }
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return 'No Blogs'
  } else if (blogs.length === 1) {
    return blogs
  } else {
    const authorBlogs = _.groupBy(blogs, 'author')
    const authorBlogCounts = _.mapValues(authorBlogs, (blogs) => blogs.length)
    const maxBlogAuthor = _.maxBy(Object.entries(authorBlogCounts), ([author, count]) => count)
    return `author: ${maxBlogAuthor[0]}, blogs: ${maxBlogAuthor[1]}`
  }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return 0
  } else if (blogs.length === 1) {
    return blogs
  } else {
    const authorBlogs = _.groupBy(blogs, 'author')
    const authorLikes = _.mapValues(authorBlogs, (blogs) => {return _.sumBy(blogs, 'likes')})
    const maxLikesAuthor = _.maxBy(Object.entries(authorLikes), ([author, likes]) => likes)
    return `author: ${maxLikesAuthor[0]}, likes: ${maxLikesAuthor[1]}`
  }
}


module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}