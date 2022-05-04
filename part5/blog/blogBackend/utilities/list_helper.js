
const dummy = (blogs) => {
  blogs
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (likes, current) => likes + current.likes

  return blogs.length === 0
    ?  0
    :  blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  let highest = 0
  let favorite = null
  for ( let blog of blogs){
    if (blog.likes > highest){
      highest = blog.likes
      favorite = blog
    }
  }
  return {
    title: favorite.title,
    author: favorite.author,
    likes: favorite.likes
  }

}

/*
const mostBlogs = (blogs) => {
  // sorts the list into authors and how many times they appear
  let stepOne = _.countBy(blogs, 'author')
  let stepTwo = _.sortBy(stepOne)
  console.log('step one', stepOne)
  console.log('stepTwo', stepTwo)


  let mapped = _.mapKeys(stepOne, (key, value) => {
    if(key in authors === false){
      authors.concat({ key: 0 })
    }
    authors[key] += 1
  })
   console.log('length: ', stepOne.length)
  let most = stepOne
  console.log('most: ', most)
  let author = Object.keys(most)
  let toReturn = {
    'author': author,
    'blogs': most[0]
  }
  console.log('toReturn: ', toReturn)
  return toReturn
}
*/


module.exports = { dummy, totalLikes, favoriteBlog }