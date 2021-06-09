import {createAction} from "@reduxjs/toolkit";

export const draw = createAction('MSG_DRAW');

export const new_turn = createAction('MSG_NEW_TURN');

export const new_phase = createAction('MSG_NEW_PHASE');

export const select_idlecmd = createAction('MSG_SELECT_IDLECMD');

export const select_chain = createAction('MSG_SELECT_CHAIN');

export const select_place = createAction('MSG_SELECT_PLACE');

export const retry = createAction('MSG_RETRY');

export const move = createAction('MSG_MOVE');

export const chained = createAction('MSG_CHAINED');

export const chain_solving = createAction('MSG_CHAIN_SOLVING');

export const select_card = createAction('MSG_SELECT_CARD');

export const shuffle_hand = createAction('MSG_SHUFFLE_HAND');

export const confirm_cards = createAction('MSG_CONFIRM_CARDS');

export const shuffle_deck = createAction('MSG_SHUFFLE_DECK');

export const chain_solved = createAction('MSG_CHAIN_SOLVED');

export const chain_end = createAction('MSG_CHAIN_END');

export const select_position = createAction('MSG_SELECT_POSITION');


export const select_battlecmd = createAction('MSG_SELECT_BATTLECMD');
