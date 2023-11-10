import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userName : '',
    userEmail : '',
    password : '',
    loginState : false,
}

console.log('initialState:', initialState)

const authSlice = createSlice({
    name : "auth",
    initialState,
    reducers : {
        loginSuccess: (state, action) => {
        state.userName = action.payload.userName;
           state.userEmail = action.payload.userEmail;
           state.password = action.payload.password;
            state.loginState = action.payload.loginState;
 
          },
    }
})

export const { loginSuccess } = authSlice.actions;
export default authSlice.reducer;