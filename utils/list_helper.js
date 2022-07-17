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
	// return {`title: ${fav.title}, author: ${fav.author}, like: ${fav.likes}`}
	return { "title: fav.title, author: fav.author, like: fav.likes" }
}
}


module.exports = {
	dummy,
	totalLikes,
	favoriteBlog
}