import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import StoryIndexItem from './story_index_item';
import { fetchStories } from '../../../actions/story_actions';
import { useHistory } from 'react-router-dom';

function StoriesIndex({stories, fetchStories}) {
    const history = useHistory();

    useEffect(() => {
        fetchStories()
    }, [])

    function newStory() {
        history.push('/app/stories/new')
    }

    return(
        <div className='stories-index'>
        <h1>Stories Index</h1>
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
        stories: Object.values(state.entities.stories)
    })
}

const mDTP = dispatch => ({
    fetchStories: () => dispatch(fetchStories())
})

export default connect(mSTP, mDTP)(StoriesIndex);