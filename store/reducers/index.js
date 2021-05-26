import reduceReducers from 'reduce-reducers';
import initialState from "../state.js";
import info from './info'

const rootReducer = reduceReducers(initialState, info);

export default rootReducer;
