import { createSlice } from "@reduxjs/toolkit";

export const deleteModalSlice = createSlice({
  name: 'deleteModal',
  initialState: {value: false},
  reducers: {
    setDeleteModal: (state, action) => {
      state.value = action.payload
    }
  }
})

export const { setDeleteModal } = deleteModalSlice.actions
export default deleteModalSlice.reducer;