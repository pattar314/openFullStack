import { createSlice } from "@reduxjs/toolkit"

const filterSlice = createSlice({
  name: 'filter',
  initialState: null,
  reducers: {
    updateFilterText(state, action){
      return action.payload
    },
    clearFilterText(){
      return null
    }
  }
})



export const { updateFilterText, clearFilterText } = filterSlice.actions
export default filterSlice.reducer