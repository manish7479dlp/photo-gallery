import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {},
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setData: (state, action) => {
      data = action.payload;
    },
  },
});
export const { setData } = userSlice.actions;
export default userSlice.reducer
