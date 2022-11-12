
import { createSlice } from '@reduxjs/toolkit'

const blogSlice = createSlice({
  name: 'blog',
  initialState:{},
  reducers: {
    setBlogs: (state, action) => {
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
      const modifiedState = state.map(i => {
        if(i.id === action.payload.id){
          state[i].comments.concat(action.payload.comment)
        }
      })
      console.log('modified state: ', modifiedState)
      return modifiedState
    },
    likeBlog: ( state, action ) => {
      return state.map(( i ) => {
        if(i.id === action.payload.id){
          i.likes = i.likes + 1
        }
      })
    },
    likeComment: ( state, action) => {
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