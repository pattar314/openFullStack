import axios from 'axios'
const baseUrl = '/api/blogs'


const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

//TODO set up a list sorter service it could probably be used as the central truth for blog list
const sortBlogs = (blogs) => {
  blogs.sort((a, b) => {
    return a.likes - b.likes
  })
  return blogs.reverse()
}


export default { getAll, sortBlogs }