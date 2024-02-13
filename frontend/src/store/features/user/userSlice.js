import { createSlice } from "@reduxjs/toolkit";

let jsonData = localStorage.getItem("user")
if(jsonData) {
   jsonData = JSON.parse(jsonData)
}

console.log(jsonData)

const initialState = {
  data: jsonData,

};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
      localStorage.setItem("user", JSON.stringify(state.data))
    },
  },
});
export const { setData } = userSlice.actions;
export default userSlice.reducer

