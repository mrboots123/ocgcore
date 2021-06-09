// we only keep the gameboard state here
// if the user is asked to do an action that is not considered part of the board
const initialState = {
    turn: 0,
    phase: 0,
    activateableCards: [],
    player: [
        {
            HAND: [],
            MONSTERZONE: [0,0,0,0,0],
            SPELLZONE: [0,0,0,0,0],
            GRAVE: [],
            EXTRA: [],
        },
        {
            HAND: [],
            MONSTERZONE: [0,0,0,0,0],
            SPELLZONE: [0,0,0,0,0],
            GRAVE: [],
            EXTRA: [],
        }
    ],
    history: [],
};

export default initialState;
