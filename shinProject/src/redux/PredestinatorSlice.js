import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    exists : '',
}


const predestinatorSlice = createSlice({
    name : "predestinatorUser",
    initialState,
    reducers : {
        selectExists : (state, action) => { state.exists = action.payload; },
    }
})

export const {selectExists} = predestinatorSlice.actions;
export default predestinatorSlice.reducer;