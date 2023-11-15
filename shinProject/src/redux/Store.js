import { configureStore } from "@reduxjs/toolkit";
import authReducer from './AuthSlice';
import clothRducer from './ClothSlice'
import userDataReducer from './UserInfoSlice'

 export const store = configureStore({
  reducer: {
    auth : authReducer,
    cloth : clothRducer,
    userData : userDataReducer,
  },
});

