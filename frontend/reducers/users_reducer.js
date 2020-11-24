import { RECEIVE_ALL_USERS, RECEIVE_CURRENT_USER } from "../actions/user_actions";

export default function usersReducer(state={}, action) {
    Object.freeze(state);
    let newState = Object.assign({}, state);

    switch (action.type) {
        case RECEIVE_ALL_USERS:
            action.users.forEach(user => newState[user.id] = user);
            return newState;
        case RECEIVE_CURRENT_USER:
            newState[action.user.id] = action.user;
            return newState;
        default:
            return state;
    }
}