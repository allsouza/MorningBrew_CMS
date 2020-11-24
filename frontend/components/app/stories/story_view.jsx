import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import '../../../../app/assets/stylesheets/components/story_template.css';
import 'quill/dist/quill.snow.css';
import { useHistory } from 'react-router-dom';

function StoryView({story}) {
    const history = useHistory();

    useEffect(() => {
        document.querySelector(`.story-view`).innerHTML=story.html
    }, [])
    
    return(
        <>
            <div className='story-view'></div>
            <button onClick={() => history.goBack()}>Back</button>
        </>
    )
}

const mSTP = (state, ownProps) => {
    return({
        story: state.entities.stories[ownProps.match.params.story_id]
    })
}

export default connect(mSTP)(StoryView)