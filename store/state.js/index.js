// we only keep the gameboard state here
// if the user is asked to do an action that is not considered part of the board
const initialState = {
    turn: 0,
    phase: 0,
    player: [
        {
            hand: [],
            mzone: [],
            szone: [],
        },
        {
            hand: []
        }
    ],
};

export default initialState;
