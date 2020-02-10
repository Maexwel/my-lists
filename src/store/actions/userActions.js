import { constants as C } from './constants';

export const setUserAction = (val) => (
    {
        type: C.SET_USER,
        payload: val
    }
);