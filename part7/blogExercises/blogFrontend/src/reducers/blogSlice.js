
import { createSlice } from '@reduxjs/toolkit'
import blogs from '../services/blogs'




export const initializeBlogs = () => {
  return async dispatch => {
    console.log('initializing blogs')
    const grab = await blogs.getAllBlogs()
    console.log('grab: ', grab)
    dispatch(setBlogs(grab))
  }
}


const blogSlice = createSlice({
  name: 'blogs',
  initialState: { blogList: [], blogAddInput: { author: '', title: '', url: '' } },
  reducers: {
    setAuthorInput: (state, action) => {
      return ({ ...state, blogAddInput: { ...state.blogAddInput, author: action.payload } })
    },
    setTitleInput: (state, action) => {
      return ({ ...state, blogAddInput: { ...state.blogAddInput, title: action.payload } })
    },
    setUrlInput: (state, action) => {
      return ({ ...state, blogAddInput: { ...state.blogAddInput, url: action.payload } })
    },
    resetInput: (state) => {
      return { ...state, blogAddInput: { author: '', title: '', url: '' } }
    },
    setBlogs: (state, action) => {
      console.log('setting blogs: ', action.payload)
      return { ...state, blogList: action.payload }
    },
    addBlog: (state, action) => {
      return { ...state, blogList: state.blogList.concat(action.payload) }
    },
    deleteBlog: ( state, action ) => {
      return { ...state, blogList: state.blogList.filter(i => i.id !== action.payload) }
    },
    updateBlog: (state, action) => {
      console.log('initial state in update on blogReducer: ', state)
      const updatedState = state.map( (i) => {
        if(i.id === action.payload.id){
          i = { ...action.payload }
        }})
      console.log('modified state: ', updatedState)
      return { ...state, blogList: updatedState }
    },
    addComment: ( state, action ) => {
      console.log('payload id: ', action.payload.id)
      console.log('payload comment: ', action.payload.comment)
      console.log('does the bloglist show: ', state.blogList)
      const toChange = state.blogList.find(i => i.id === action.payload.id)
      console.log('tochange: ', toChange)
      const newComments = toChange.comments.concat(action.payload.comment)
      const changedTarget = { ...toChange, comments: newComments }
      console.log('changed target: ', changedTarget)
      const newList = state.blogList.map(b => b.id === action.payload.id ? changedTarget : b)
      return { ...state, blogList: newList }
    },
    likeBlog: ( state, action ) => {
      console.log('former state: ', { ...state })
      const toChange = state.blogList.find(b => b.id === action.payload.id)
      const modified = { ...toChange, likes: toChange.likes + 1 }
      const modifiedBlogList = state.blogList.map(b => b.id === action.payload.id ? modified : b)
      console.log('modified state: ', { ...state, blogList: modifiedBlogList })
      return { ...state, blogList: modifiedBlogList }
    },
    likeComment: ( state, action ) => {
      return state.blogList.map(( i ) => {
        if(i.id === action.payload.blogID){
          i.map(( j ) => {
            if(j.id === action.payload.commentID){
              j.likes = j.likes + 1
            }
          })
        }
      })
    }
  }
})

export const { setBlogs, addBlog, deleteBlog, updateBlog, addComment, likeBlog, likeComment, setAuthorInput, setTitleInput, setUrlInput, resetInput } = blogSlice.actions
export default blogSlice.reducer