 import {createSlice} from "@reduxjs/toolkit";
 const initialState = {
    user : localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null
 }
 const ProfileSlice = createSlice({
    name: "profile",
    initialState: initialState,
    reducers: {
        setUser(state, value) {
            state.user = value.payload;
        }
    }
 })
 export const{setUser} = ProfileSlice.actions;
 export default ProfileSlice.reducer;