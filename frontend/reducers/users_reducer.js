import { RECEIVE_ALL_USERS } from "../actions/user_actions";

export default function usersReducer(state={}, action) {
    Object.freeze(state);
    let newState = Object.assign({}, state);

    switch (action.type) {
        case RECEIVE_ALL_USERS:
            action.users.forEach(user => newState[user.id] = user);
            return newState;
        default:
            return state;
    }
}