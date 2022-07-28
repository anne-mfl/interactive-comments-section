import { createSlice } from "@reduxjs/toolkit";
import data from '../data.json'

export const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState: {value: data.currentUser},
  reducers: {
    getCurrentUser: (state, action) => {
      return state.value.username
    }
  }
})

export const {getCurrentUser} = currentUserSlice.actions
export default currentUserSlice.reducer