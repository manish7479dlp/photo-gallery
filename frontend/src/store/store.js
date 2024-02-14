import {configureStore} from "@reduxjs/toolkit"
import userReducer from "./features/user/userSlice"
import publicUserRoute from "./features/user/publicUser"
const store = configureStore({
    reducer:{
        user: userReducer,
        publicUser: publicUserRoute
    }
})

export default store