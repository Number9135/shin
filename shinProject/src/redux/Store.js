import { configureStore } from "@reduxjs/toolkit";
import authReducer from './AuthSlice';
import clothRducer from './ClothSlice'


 export const store = configureStore({
  reducer: {
    auth : authReducer,
    cloth : clothRducer,
  },
});

