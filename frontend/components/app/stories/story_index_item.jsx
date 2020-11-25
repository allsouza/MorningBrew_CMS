import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { destroyStory } from '../../../actions/story_actions';

function StoryIndexItem({story, author, destroy, currentUser, newsletters}) {
    const history = useHistory();
    
    return(
        <li>
            <div className="first-line">
                <div>
                    <h1>{story.title}</h1>
                    <p>by {`${author.firstName} ${author.lastName}`}</p>
                </div>
                <h3>{story.tag}</h3>
            </div>

            <p className="published">Published on: {story.published.map(issue => newsletters[issue].date).join(', ')}</p>
            
            <div className='buttons'>
                <button onClick={() => history.push(`/app/stories/${story.id}/preview`)}>Preview</button>
                { story.author_id === currentUser ? <div className="options">
                    <button onClick={() => history.push(`/app/stories/${story.id}`)}>Edit</button>
                    <button onClick={() => destroy(story.id)}>Delete</button>
                </div> : null }
            </div>
        </li>
    )
}

const mSTP = (state, ownProps) => {
    return({
        author: state.entities.users[ownProps.story.author_id],
        story: ownProps.story,
        newsletters: state.entities.newsletters,
        currentUser: state.session.id
    })
}

const mDTP = dispatch => ({
    destroy: (id) => dispatch(destroyStory(id))
})

export default connect(mSTP, mDTP)(StoryIndexItem);