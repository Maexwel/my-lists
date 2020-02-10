import { combineReducers } from 'redux';
import { view } from './viewReducer';
import { lang } from './langReducer';
import { user } from './userReducer';
import { constants as C } from '../actions/constants';

/** BASE OF ALL REDUCERS */
const appReducer = combineReducers({
    view, // { currentPage: { path, name, displayText} }
    lang, // { selectedLang, data, translation }
    user, // { email, username, app_user_id }
});

// Root reducer is used to clear the whole store. This is used for logout actions
const rootReducer = (state, action) => {
    if (action.type === C.CLEAR_ROOT) return appReducer({}, action);
    return appReducer(state, action);
}
export default rootReducer;