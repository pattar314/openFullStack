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

const findBlog = (userlist, id) => {
  userlist.find(u => {
    const blogList = u.blogList
    const foundBlog = blogList.find(b => b._id === id)
    if(foundBlog){
      return foundBlog
    }
    return null
  })
}


export default { getAllBlogs, sortBlogs, findBlog }