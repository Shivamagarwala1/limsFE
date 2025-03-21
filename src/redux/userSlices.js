// src/features/auth/authSlice.js                                                                 
                                                                                                  
import { createSlice } from "@reduxjs/toolkit";                                                   
import { isloggedin } from "../service/localstroageService";                                      
                                                                                                  
const initialState = isloggedin()                                                                 
    ? JSON.parse(localStorage.getItem("imarsar_laboratory"))                                      
    : { user: null, token: null };                                                                
                                                                                                  
                                                                                                  
                                                                                                  
const userSlices = createSlice({                                                                  
    name: "userSliceName",                                                                        
    initialState,                                                                                 
    reducers: {                                                                                   
        loginUser: (state, action) => {                                                           
            state.user = action.payload.user;                                                     
            state.token = action.payload.token;                                                   
        },                                                                                        
        logout: (state) => {                                                                      
            state.user = null;                                                                    
            state.token = null;                                                                   
        },                                                                                        
    },                                                                                            
});                                                                                               
                                                                                                  
export const { loginUser, logout } = userSlices.actions;                                          
                                                                                                  
export default userSlices.reducer;                                                                