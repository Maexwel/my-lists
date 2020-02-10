import { constants as C } from '../actions/constants';

export const list = (state = {}, action) => {
    switch (action.type) {
        case C.SET_LIST:
            return action.payload;
        case C.UPDATE_LIST:
            return { ...state, ...action.payload };
        default:
            return state;
    }
}