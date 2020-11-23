import {LOGOUT_CURRENT_USER, RECEIVE_CURRENT_USER} from '../actions/user_actions'

export default function sessionReducer(state={}, action){
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_CURRENT_USER:
            return {user: action.user};
        case LOGOUT_CURRENT_USER:
            return {user: null};
        default:
            return state;  
    }
}