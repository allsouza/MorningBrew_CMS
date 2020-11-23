import { combineReducers } from "redux";
import sessionErrorsReducer from './session_errors_reducer';
import storyErrorsReducer from './story_errors_reducer';
import newsletterErrorsReducer from './newsletter_errors_reducer';

const errorsReducer = combineReducers({
    session: sessionErrorsReducer,
    story: storyErrorsReducer,
    newsletter: newsletterErrorsReducer
})

export default errorsReducer;