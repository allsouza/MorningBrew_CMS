import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { destroyStory } from '../../../actions/story_actions';

function StoryIndexItem({story, author, destroy, currentUser}) {
    const history = useHistory();

    return(
        <li>
            <div className="first-line">
                <h1 onClick={() => history.push(`/app/stories/${story.id}/template`)}>{story.title}</h1>
                <h3>{story.tag}</h3>
            </div>
            <p>by {`${author.firstName} ${author.lastName}`}</p>
            
            { story.author_id === currentUser ? <div className="options">
                <button onClick={() => history.push(`/app/stories/${story.id}`)}>Edit</button>
                <button onClick={() => destroy(story.id)}>Delete</button>
            </div> : null }
        </li>
    )
}

const mSTP = (state, ownProps) => {
    return({
        author: state.entities.users[ownProps.story.author_id],
        story: ownProps.story,
        currentUser: state.session.id
    })
}

const mDTP = dispatch => ({
    destroy: (id) => dispatch(destroyStory(id))
})

export default connect(mSTP, mDTP)(StoryIndexItem);