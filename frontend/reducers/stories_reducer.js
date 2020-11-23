import { DELETE_STORY, RECEIVE_ALL_STORIES, RECEIVE_STORY } from '../actions/story_actions';

export default function storiesReducer(state={}, action) {
    Object.freeze(state);
    const newState = Object.assign({}, state);

    switch (action.type) {
        case RECEIVE_ALL_STORIES:
            action.stories.forEach(story => newState[story.id] = story)
            break;
        case RECEIVE_STORY:
            newState[action.story.id] = action.story;
            break;
        case DELETE_STORY:
            delete newState[action.storyId]
            break;
        default:
            break;
    }

    return newState;
}