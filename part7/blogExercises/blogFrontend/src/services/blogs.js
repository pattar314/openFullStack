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


export default { getAllBlogs, sortBlogs }