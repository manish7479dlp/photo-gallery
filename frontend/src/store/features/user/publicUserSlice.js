import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  data: [],

};

const publicUserSlice = createSlice({
  name: "publicUser",
  initialState,
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },
  },
});
export const { setData } = publicUserSlice.actions;
export default publicUserSlice.reducer

