import { createReducer } from '@reduxjs/toolkit'
import initialState from "../state.js";
import Socket from "../../socket";
import DataManager from "../../db";

//const socket = Socket.getInstance();
const dataManager = DataManager.getInstance();

//todo: everytime a new command is issued, we need to clear the previous commands from the field
const makeCard= (id) =>{
    return {...dataManager._datas.get(id), ...dataManager._strings.get(id)}
}
const info = createReducer(initialState, {
    MSG_DRAW: (state, action) => {
        const { player, cards } = action.payload;

        for(let i = 0; i < cards.length; i++){
            state.field[player].HAND.push(cards[i]);
        }
        state.history.push(action.payload)

    },
    MSG_NEW_PHASE: (state, action) => {
        const { phase } = action.payload;
        state.history.push(action.payload)
    },
    MSG_NEW_TURN: (state, action) => {
        const { player } = action.payload;
        state.history.push(action.payload)
    },
    MSG_SELECT_IDLECMD: (state, action) => {
        const { player,
            activatable_cards,
            msetable_cards,
            repositionable_cards,
            spsummonable_cards,
            summonable_cards,
            ssetable_cards
        } = action.payload;

        activatable_cards.forEach((card, i) => {
            const { index, location } = card;
            state.field[player][location].splice(index, 1, { ...state.field[player][location][index], activatable: { index: index, responsei: i }});
        });

        msetable_cards.forEach((card, i) => {
            const { index, location } = card;
            state.field[player][location].splice(index, 1, { ...state.field[player][location][index], msetable: { index: index, responsei: i }});
        });

        spsummonable_cards.forEach((card, i) => {
            const { index, location } = card;
            state.field[player][location].splice(index, 1, { ...state.field[player][location][index], spsummonable: { index: index, responsei: i }});
        });

        // repositionable_cards.forEach(element => {
        //     for(const property in element){
        //         if(property !== 'id'){
        //
        //         }
        //     }
        // });

        repositionable_cards.forEach((card, i) => {

            const {index, location} = card;
            state.field[player][location].splice(index, 1, {
                ...state.field[player][location][index],
                repositionable: {index: index, responsei: i}
            });
        });

        summonable_cards.forEach((card, i) => {
            const { index, location } = card;
            state.field[player][location].splice(index, 1, { ...state.field[player][location][index], summonable: { index: index, responsei: i }});
        });

        ssetable_cards.forEach((card, i) => {
            const { index, location } = card;
            state.field[player][location].splice(index, 1, { ...state.field[player][location][index], ssetable: { index: index, responsei: i }});
        });


        state.history.push(action.payload)
    },
    MSG_SELECT_CHAIN: (state, action) => {
        console.log(action.payload)
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
        const {
            id,
            previousIndex,
            previousLocation,
            previousController,
            currentController,
            currentLocation,
            currentIndex,
            currentPosition,
        } = action.payload;


        state.field[previousController][previousLocation].splice(previousIndex, 1);
        state.field[currentController][currentLocation].splice(currentIndex, 1, { id: id });
        state.history.push(action.payload)
    },
    MSG_CHAINED: (state, action) => {
        const { chain_link } = action.payload;
        //state.chain_link = chain_link;
        state.history.push(action.payload)
    },
    MSG_CHAIN_SOLVING: (state, action) => {
        const { chain_link } = action.payload;
     //   state.chain_link = chain_link;
        state.history.push(action.payload)
    },
    MSG_SELECT_CARD: (state, action) => {
        const { player } = action.payload;
        state.history.push(action.payload)
        //send to user
    },
    MSG_SHUFFLE_HAND: (state, action) => {
        const { player, codes } = action.payload;
        state.field[player].HAND = codes.map(code => { return { id: code } });
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
        const { activatable_cards, attackable_cards } = action.payload;

        attackable_cards.forEach((card, i) => {
            const { diratt, id, index, location, player,  } = card;
            state.field[player][location].splice(index, 1, { ...state.field[player][location][index], attackable: { diratt: diratt, index: index, responsei: i }});
        });
        state.history.push(action.payload)
    },
})


export default info;
