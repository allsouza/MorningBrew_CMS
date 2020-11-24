import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import { connect, Provider } from 'react-redux'
import { updateStory, createStory, fetchStory } from '../../../actions/story_actions'
import ReactDOMServer from 'react-dom/server';
import Editor from '../editor/quill';
import Formater from './story_formater';
const juice = require('juice');

function StoryEditor({story, action, fetchStory}) {
    if(typeof story === 'number') {
        fetchStory(story)
    }
    
    const [title, setTitle] = useState(story.title)
    const [body, setBody] = useState(story.body)
    const [tag, setTag] = useState(story.tag)
    const [wordCount, setWordCount] = useState(0)
    const history = useHistory();


    function save() {
        story.title = title;
        story.body = body;
        story.tag = tag;
        story.html = ReactDOMServer.renderToString(<Formater story={{tag, title, body}} type="editor" />)
        action(story)
        history.push('/app/stories')
    }

    return(
        <div className="story-editor">
            <label>Title
            <input type="text" value={title} onChange={e => setTitle(e.target.value)}/>
            </label>

            <label>Tag
            <input type="text" value={tag} onChange={e => setTag(e.target.value)}/>
            </label>
            <Editor body={body} setBody={setBody} setWordCount={setWordCount}/>
            <div className="footer">
                {wordCount > 1 ? <span>{`${wordCount} words and counting`}</span> : null}
            </div>
            <div className="buttons">
                <button onClick={history.goBack}>Cancel</button>
                <button onClick={save}>Save</button>
            </div>
        </div>
    )
}

const newSTP = state => {
    return({
        story: {title: "", html: "", tag: "", body: ""}
    })
}

const newDTP = dispatch => ({
    action: story => dispatch(createStory(story))
})

export const NewStory = connect(newSTP, newDTP)(StoryEditor)

const editSTP = (state, ownProps) => {
    return({
        story: state.entities.stories[ownProps.match.params.story_id]
    })
}

const editDTP = dispatch => ({
    action: story => dispatch(updateStory(story)),
    fetchStory: id => dispatch(fetchStory(id))
})

export const EditStory = connect(editSTP, editDTP)(StoryEditor)