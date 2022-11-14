
import { createSlice } from '@reduxjs/toolkit'

const blogSlice = createSlice({
  name: 'blogs',
  initialState:[],
  reducers: {
    setBlogs: (state, action) => {
      console.log('setting blogs: ', action.payload)
      return action.payload
    },
    addBlog: (state, action) => {
      return state.concat(action.payload)
    },
    deleteBlog: ( state, action ) => {
      return state.filter(i => i.id !== action.payload)
    },
    updateBlog: (state, action) => {
      console.log('initial state in update on blogReducer: ', state)
      const updatedState = state.map( (i) => {
        if(i.id === action.payload.id){
          i = { ...action.payload }
        }})
      console.log('modified state: ', updatedState)
      return updatedState
    },
    createComment: ( state, action ) => {
      const toChange = state.find(i => i.id === action.payload.id)
      const changedTarget = { ...toChange, comments: changedTarget.comments.concat(action.payload.comment) }
      state.map(b => b.id === action.payload.id ? changedTarget : b)
    },
    likeBlog: ( state, action ) => {
      console.log('action payload: ', action.payload)
      const toChange = state.find(b => b.id === action.payload.id)
      const modified = { ...toChange, likes: toChange.likes + 1 }
      const modifiedState = state.map(b => b.id === action.payload.id ? modified : b)
      return modifiedState
    },
    likeComment: ( state, action ) => {
      return state.map(( i ) => {
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

export const { setBlogs, addBlog, deleteBlog, updateBlog, createComment, likeBlog, likeComment } = blogSlice.actions
export default blogSlice.reducer