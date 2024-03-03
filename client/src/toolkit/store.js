import { configureStore } from "@reduxjs/toolkit";
import user from './user.js'

export const store = configureStore({
    reducer : {
       userDetails : user
    }
})

