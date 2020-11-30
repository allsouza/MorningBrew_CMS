import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import { connect, Provider } from 'react-redux'
import { updateStory, createStory, fetchStory } from '../../../actions/story_actions'
import Editor from '../editor/quill';
import Formater from './story_formater';
const computedStyleToInlineStyle = require("computed-style-to-inline-style");

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
        computedStyleToInlineStyle(document.querySelector('.story-view'), {
            recursive: true,
            properties: ["font-size", "text-decoration", "border-collapse", "table-layout", "margin", "padding", "border", "width", "max-width", "padding-top", "padding-bottom", "padding-right", "padding-left", "text-align", "font-family", "font-weight", "color", "margin-bottom", "margin-top", "margin-right", "margin-left", "letter-spacing", "line-height", "background-color", "display", "border-radius", "height"]
        });
        story.title = title;
        story.body = body;
        story.tag = tag;
        story.html = document.querySelector('.story-view').innerHTML
        action(story)
        history.push('/app/stories')
    }

    return(
        <div className="story-editor">
            <div className="first-line">
                <div>
                    <label>Title</label>
                    <input type="text" value={title} onChange={e => setTitle(e.target.value)}/>
                </div>
                <div>
                    <label>Tag</label>
                    <input type="text" value={tag} onChange={e => setTag(e.target.value)}/>
                </div>
            </div>
  
            <Editor body={body} setBody={setBody} setWordCount={setWordCount}/>
            <div className="footer">
                {wordCount > 1 ? <span>{`${wordCount} words and counting`}</span> : null}
            </div>
            <div className="buttons">
                <button onClick={history.goBack}>Cancel</button>
                <button onClick={save}>Save</button>
            </div>

            <div id="preview" style={{visibility:"visible"}}>
                <Formater story={{tag, title, body}} type="editor" />
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