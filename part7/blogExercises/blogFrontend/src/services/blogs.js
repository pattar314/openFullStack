import axios from 'axios'
import { createAuthorization } from './auth'
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

const createComment = (id, comment) => {
  try {
    const auth = createAuthorization()
    const createdComments = axios.post(`/api/blogs/${id}/comments`,  { comment }, auth.options)
    if (createdComments.status === 200 || createdComments.status === 201){
      const data = createdComments.data
      console.log('updated comment data: ', data)
    }else {
      console.log('there was an error in else')
    }
  } catch(error){
    console.error('there was an error in create comment service: ', error)
  }
}


export default { getAllBlogs, sortBlogs, findBlog, createComment }