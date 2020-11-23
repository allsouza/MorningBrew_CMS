import React from 'react';
import { connect } from 'react-redux';

function StoryIndexItem({story, author}) {
    return(
        <li>
            <h1>{story.title}</h1>
            <p>by {`${author.firstName} ${author.lastName}`}</p>
        </li>
    )
}

const mSTP = (state, ownProps) => {
    return({
        author: state.entities.users[ownProps.story.author_id],
        story: ownProps.story
    })
}

export default connect(mSTP)(StoryIndexItem);