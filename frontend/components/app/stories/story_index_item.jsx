import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { fetchNewsletters } from '../../../actions/newsletter_actions';
import { destroyStory } from '../../../actions/story_actions';

function StoryIndexItem({story, author, destroy, currentUser, newsletters, getNewsletters}) {
    const history = useHistory();

    async function deleteStory() {
        await destroy(story.id)
        getNewsletters()
    }
    
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
                    <button onClick={deleteStory}>Delete</button>
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
    destroy: (id) => dispatch(destroyStory(id)),
    getNewsletters: () => dispatch(fetchNewsletters())
})

export default connect(mSTP, mDTP)(StoryIndexItem);