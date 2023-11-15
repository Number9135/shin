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
    isUserId : '',

}


const userInfoSlice = createSlice({
    name : "userData",
    initialState,
    reducers : {
        selectName : (state, action) => { state.isName = action.payload; },
        selectSex : (state, action) => { state.isSex = action.payload; },
        selectJoinDate : (state, action) => { state.isJoinDate = action.payload; },
        selectMajor : (state, action) => { state.isMajor = action.payload; },
        selectFloor : (state, action) => { state.isFloor = action.payload; },
        selectUpperSize : (state, action) => { state.isUpperSize = action.payload; },
        selectLowerSize : (state, action) => { state.isLowerSize = action.payload; },
        selectCardigan : (state, action) => { state.isCardigan = action.payload; },
        selectUserId : (state, action) => { state.isUserId = action.payload; },

    }
})

export const {
    selectName,
    selectSex,
    selectJoinDate,
    selectMajor,
    selectFloor,
    selectUpperSize,
    selectLowerSize,
    selectCardigan,
    selectUserId
} = userInfoSlice.actions;
export default userInfoSlice.reducer ;