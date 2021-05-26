import { createReducer } from '@reduxjs/toolkit'
import initialState from "../state.js";

const request = createReducer(initialState, {
    MSG_SELECT_IDLECMD: (state, action) => {

    }
})


export default request;
