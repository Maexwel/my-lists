import { constants as C } from './constants';

export const setListAction = (val) => (
    {
        type: C.SET_LIST,
        payload: val
    }
);

export const updateListAction = (val) => (
    {
        type: C.UPDATE_LIST,
        payload: val
    }
);