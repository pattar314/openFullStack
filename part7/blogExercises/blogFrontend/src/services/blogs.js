import axios from 'axios'
const baseUrl = '/api/blogs'


const getAllBlogs = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const sortBlogs = (blogs) => {
  blogs.sort((a, b) => {
    return a.likes - b.likes
  })
  return blogs.reverse()
}

const findBlog = async ( id ) => {
  const blogList = await getAllBlogs()
  console.log('bloglist: ', blogList)
  const foundBlog = blogList.find( b => {
    console.log(`b.id: ${b.id} === ${id}: ${b.id === id}`)
    return b.id === id
  })

  return foundBlog
}


export default { getAllBlogs, sortBlogs, findBlog }