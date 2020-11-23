import { combineReducers } from "redux"
import newslettersReducer from "./newsletters_reducer";
import usersReducer from './users_reducer';
import storiesReducer from './stories_reducer';

const entitiesReducer = combineReducers({
    users: usersReducer,
    stories: storiesReducer,
    newsletters: newslettersReducer
})

export default entitiesReducer;