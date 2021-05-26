import { createReducer } from '@reduxjs/toolkit'
import initialState from "../state.js";

const info = createReducer(initialState, {
    MSG_DRAW: (state, action) => {
        const { player, hand } = action.payload;
        state.player[player].hand = hand;
    },
    MSG_NEW_PHASE: (state, action) => {
        const { phase } = action.payload;
        state.phase = phase;
    },
    MSG_NEW_TURN: (state, action) => {
        const { turn } = action.payload;
        state.turn = turn;
    },
})


export default info;
