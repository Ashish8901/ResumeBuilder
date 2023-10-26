import {createSlice} from "@reduxjs/toolkit";


const initialState = {
    heading : "",
    education : "",
    workHistory : "",
    skills : "",
    summary : "",
    finalize : ""
}

const activeHeaderSlice = createSlice({
    name : "headers/activeHeaders",
    initialState,
    reducers : {
        changeActive : (state, {payload})=>{
            state.heading = payload.heading;
            state.education = payload.education;
            state.workHistory = payload.workHistory;
            state.skills = payload.skills;
            state.summary = payload.summary
            state.finalize = payload.finalize
        }
    }
})
export const { changeActive } = activeHeaderSlice.actions;
export default activeHeaderSlice.reducer;
