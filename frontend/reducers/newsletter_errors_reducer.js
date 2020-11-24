import {RECEIVE_NEWSLETTER, RECEIVE_ALL_NEWSLETTERS, RECEIVE_NEWSLETTER_ERRORS} from '../actions/newsletter_actions';
import {CLEAR_ERRORS} from '../actions/error_actions';

export default function sessionErrorsReducer(state=[], action){
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_NEWSLETTER_ERRORS:
            debugger
            return action.errors.responseJSON
        case RECEIVE_NEWSLETTER, RECEIVE_ALL_NEWSLETTERS, CLEAR_ERRORS:
            return [];
        default:
            return state;
    }
}