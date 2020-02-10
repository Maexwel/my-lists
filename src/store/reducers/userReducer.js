import { constants as C } from '../actions/constants';

export const user = (state = {}, action) => {
    switch (action.type) {
        case C.SET_USER:
            return action.payload;
        default:
            return state;
    }
}