import {configureStore} from "@reduxjs/toolkit"
import userReducer from "./features/user/userSlice"
import publicUserReducer from "./features/user/publicUserSlice"
const store = configureStore({
    reducer:{
        user: userReducer,
        publicUser: publicUserReducer
    }
})

export default store