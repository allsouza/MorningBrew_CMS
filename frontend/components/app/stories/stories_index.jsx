import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import StoryIndexItem from './story_index_item';
import { useHistory } from 'react-router-dom';

function StoriesIndex({stories}) {
    const history = useHistory();

    function newStory() {
        history.push('/app/stories/new')
    }

    return(
        <div className='stories-index'>
        <h1>Stories</h1>
        <button onClick={newStory}>Create new Story</button>
            <ul>
                {stories.map(story => {
                    return <StoryIndexItem story={story} key={story.id}/>
                })}
            </ul>
        </div>
    )
}

const mSTP = state => {
    return({
        stories: Object.values(state.entities.stories).sort((a,b) => a.updated_at > b.updated_at ? -1 : 1)
    })
}

const mDTP = dispatch => ({

})

export default connect(mSTP, mDTP)(StoriesIndex);