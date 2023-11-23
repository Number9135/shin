import { configureStore } from "@reduxjs/toolkit";
import authReducer from './AuthSlice';
import clothRducer from './ClothSlice';
import predestinatorUserReducer from './PredestinatorSlice';

 export const store = configureStore({
  reducer: {
    auth : authReducer,
    cloth : clothRducer,
    predestinatorUser : predestinatorUserReducer,
  },
});

