import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import StoryIndexItem from './story_index_item';
import { fetchStories } from '../../../actions/story_actions';

function StoriesIndex({stories, fetchStories}) {

    useEffect(() => {
        fetchStories()
    }, [])

    return(
        <div className='stories-index'>
        <h1>Stories Index</h1>
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