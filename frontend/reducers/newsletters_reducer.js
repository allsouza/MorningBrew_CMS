import { DELETE_NEWSLETTER, RECEIVE_ALL_NEWSLETTERS, RECEIVE_NEWSLETTER } from '../actions/newsletter_actions';

export default function newslettersReducer(state={}, action) {
    Object.freeze(state);
    const newState = Object.assign({}, state);

    switch (action.type) {
        case RECEIVE_ALL_NEWSLETTERS:
            action.newsletters.forEach(newsletter => newState[newsletter.id] = newsletter)
            break;
        case RECEIVE_NEWSLETTER:
            newState[action.newsletter.id] = action.newsletter;
            break;
        case DELETE_NEWSLETTER:
            delete newState[action.newsletterId]
            break;
        default:
            break;
    }

    return newState;
}