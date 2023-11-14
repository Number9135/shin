import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isName : '',
    isSex : '',
    isJoinDate : '',
    isMajor : '',
    isFloor : '',
    isUpperSize : '',
    isLowerSize : '',
    isCardigan : '',

}


const userInfoSlice = createSlice({
    name : "userData",
    initialState,
    reducers : {
        selectName : (state, action) => { state.isName = action.payload; },
        selectSex : (state, action) => { state.isSex = action.payload; },
        selectJoinDate : (state, action) => { state.isJoinDate = action.payload; },
        selectMajor : (state, action) => { state.isMajor = action.payload; },
        selectName : (state, action) => { state.isName = action.payload; },
        selectName : (state, action) => { state.isName = action.payload; },
    }
})