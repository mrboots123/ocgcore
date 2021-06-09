import { createReducer } from '@reduxjs/toolkit'
import initialState from "../state.js";
import Socket from "../../socket";
import DataManager from "../../db";

//const socket = Socket.getInstance();
const dataManager = DataManager.getInstance();

const makeCard= (id) =>{
    return {...dataManager._datas.get(id), ...dataManager._strings.get(id)}
}
const info = createReducer(initialState, {
    MSG_DRAW: (state, action) => {
        const { player, cards } = action.payload;

        for(let i = 0; i < cards.length; i++){
            //state.player[player].HAND.splice(i, 1, {...dataManager._datas.get(cards[i].id), ...dataManager._strings.get(cards[i].id)});
            state.player[player].HAND.push(makeCard(cards[i].id))
        }
        state.history.push(action.payload)

    },
    MSG_NEW_PHASE: (state, action) => {
        const { phase } = action.payload;
        state.phase = phase;
        state.history.push(action.payload)
    },
    MSG_NEW_TURN: (state, action) => {
        const { player } = action.payload;
        state.turn = state.turn + 1;
        state.history.push(action.payload)
    },
    MSG_SELECT_IDLECMD: (state, action) => {
        const { player, activatable_cards, msetable_cards, ssetable_cards } = action.payload;
        state.activateableCards = activatable_cards.map(card => makeCard(card.id))

        activatable_cards.forEach((card, index) => {
            if(card.location === 'HAND'){
                state.player[player].HAND.splice(card.index, 1, {...state.player[player].HAND[card.index], activatable: true, activatableIndex: index})
            }
        });

        ssetable_cards.forEach(card => {
            if(card.location === 'HAND'){
                state.player[player].HAND.splice(card.index, 1, {...state.player[player].HAND[card.index], ssetable: true})
            }
        });

        msetable_cards.forEach(card => {
            if(card.location === 'HAND'){
                state.player[player].HAND.splice(card.index, 1, {...state.player[player].HAND[card.index], msetable: true})
            }
        });

        //todo: here we have selected the player.
        state.history.push(action.payload)
    },
    MSG_SELECT_CHAIN: (state, action) => {
        state.history.push(action.payload)
    },
    MSG_SELECT_PLACE: (state, action) => {
        state.history.push(action.payload)
    },
    MSG_RETRY: (state, action) => {
        const { history } = state;
        const previous = history[history.length - 1];
        const { player } = previous;
        //todo: send to user
    },
    MSG_MOVE: (state, action) => {
        const { id, currentController, currentIndex, currentLocation } = action.payload;
        state.player[currentController][currentLocation].splice(currentIndex, 1, id);
        state.history.push(action.payload)
    },
    MSG_CHAINED: (state, action) => {
        const { chain_link } = action.payload;
        state.chain_link = chain_link;
        state.history.push(action.payload)
    },
    MSG_CHAIN_SOLVING: (state, action) => {
        const { chain_link } = action.payload;
        state.chain_link = chain_link;
        state.history.push(action.payload)
    },
    MSG_SELECT_CARD: (state, action) => {
        const { player } = action.payload;
        console.log(action.payload)
        state.history.push(action.payload)
        //send to user
    },
    MSG_SHUFFLE_HAND: (state, action) => {
        const { player, codes } = action.payload;
        const shuffled = codes.map(code => makeCard(code));
        state.player[player].HAND = shuffled;
        state.history.push(action.payload)

    },
    MSG_CONFIRM_CARDS: (state, action) => {
        state.history.push(action.payload)
    },
    MSG_SHUFFLE_DECK: (state, action) => {
        const { player } = action.payload;
        state.history.push(action.payload);
        //deck is shuffled, but we dont care about setting that since its invis to us
        // this is mostly for ui anim
    },
    MSG_CHAIN_SOLVED: (state, action) => {
        state.history.push(action.payload)
        //currently only refreshes ui? look into more
    },
    MSG_CHAIN_END: (state, action) => {
        state.history.push(action.payload)
    },
    MSG_SELECT_POSITION: (state, action) => {
        state.history.push(action.payload)
    },
    MSG_SELECT_BATTLECMD: (state, action) => {
        state.history.push(action.payload)
    },
})


export default info;
