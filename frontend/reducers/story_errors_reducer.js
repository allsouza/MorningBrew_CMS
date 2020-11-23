import {RECEIVE_STORY, RECEIVE_ALL_STORIES, RECEIVE_STORY_ERRORS} from '../actions/story_actions';
import {CLEAR_ERRORS} from '../actions/error_actions';

export default function sessionErrorsReducer(state=[], action){
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_STORY_ERRORS:
            return action.errors.responseJSON
        case RECEIVE_STORY, RECEIVE_ALL_STORIES, CLEAR_ERRORS:
            return [];
        default:
            return state;
    }
}