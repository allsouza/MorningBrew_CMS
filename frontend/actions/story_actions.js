import * as StoriesApiUtil from '../util/stories_api_util';

export const RECEIVE_ALL_STORIES = "RECEIVE_ALL_STORIES";
export const RECEIVE_STORY = "RECEIVE_STORY";
export const DELETE_STORY = "DELETE_STORY";
export const RECEIVE_STORY_ERRORS = "RECEIVE_STORY_ERRORS";

const receiveAllStories = stories => ({
    type: RECEIVE_ALL_STORIES,
    stories
})

const receiveStory = story => ({
    type: RECEIVE_STORY,
    story
})

const deleteStory = storyId => ({
    type: DELETE_STORY,
    storyId
})

const receiveStoryErrors = errors => ({
    type: RECEIVE_STORY_ERRORS,
    errors
})

export const fetchStories = () => dispatch => {
    return StoriesApiUtil.fetchStories().then( stories => dispatch(receiveAllStories(stories)))
}

export const fetchStory = storyId => dispatch => {
    return StoriesApiUtil.fetchStory(storyId).then( story => dispatch(receiveStory(story)))
}

export const createStory = story => dispatch => {
    return StoriesApiUtil.createStory(story).then( story => dispatch(receiveStory(story)), errors => dispatch(receiveStoryErrors(errors)))
}

export const updateStory = story => dispatch => {
    return StoriesApiUtil.updateStory(story).then( story => dispatch(receiveStory(story)), errors => dispatch(receiveStoryErrors(errors)))
}

export const destroyStory = storyId => dispatch => {
    return StoriesApiUtil.deleteStory(storyId).then( () => dispatch(deleteStory(storyId)), errors => dispatch(receiveStoryErrors(errors)))
}