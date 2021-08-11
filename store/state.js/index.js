// we only keep the gameboard state here
// if the user is asked to do an action that is not considered part of the board
const mzone1 = [{}, {}, {}, {}, {}];
const szone1 =  [{}, {}, {}, {}, {}];

Object.freeze(mzone1);
Object.freeze(szone1);

const mzone2 = [{}, {}, {}, {}, {}];
const szone2 =  [{}, {}, {}, {}, {}];

Object.freeze(mzone2);
Object.freeze(szone2);


const initialState = {
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
    turn: {

    },
    field: [
        {
            FZONE: [],
            MONSTERZONE: mzone1,
            GRAVE: [],
            EXTRA: [],
            SPELLZONE: szone2,
            DECK: [],
            HAND: [],
        },
        {
            FZONE: [],
            MONSTERZONE: mzone2,
            GRAVE: [],
            EXTRA: [],
            SPELLZONE: szone2,
            DECK: [],
            HAND: [],
        }
    ]
};

export default initialState;
