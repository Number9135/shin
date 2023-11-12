import { createSlice } from "@reduxjs/toolkit";

initialState = {
    upperSize : null,
    lowerSize : null,
    cardigan : null,
}

const clothSlice = createSlice({
    name : "cloth",
    initialState,
    reducers : {
        selectUpper : (state, action) => { state.upperSize = action.payload; },
        selectLower : (state, action) => { state.lowerSize = action.payload; },
        selectCardigan : (state, action) => { state.cardigan = action.payload; },
    }
})

export const {selectCardigan, selectUpper, selectLower} = clothSlice.actions;
export default clothSlice.reducer;