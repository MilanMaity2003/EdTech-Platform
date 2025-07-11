 import { combineReducers } from "@reduxjs/toolkit";
 import authRecucer from "../slices/authSlice"
 import profileReducer from "../slices/profileSlice";
 import cartReducer from "../slices/cartSlice";
 const rootReducer = combineReducers({
    auth: authRecucer,
    profile: profileReducer,
    cart: cartReducer
 })
 export default rootReducer;