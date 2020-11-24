import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createNewsletter } from '../../../actions/newsletter_actions';
import { createPublishing, removePublishing } from '../../../util/newsletters_api_util';
import StoryView from '../stories/story_view';
import StoriesOrder from './stories_order';

function NewsletterEditor({newsletter, stories, action, removePublishing, addPublishing}) {
    const [date, setDate] = useState(newsletter.date)
    const [html, sethtml] = useState(newsletter.html)
    const [storyList, setStoryList] = useState([])
    const [selectedStories, setSelectedStories] = useState(new Set())
    const history = useHistory();
    debugger

    function toggleSelect(ele) {
        ele.classList.toggle('selected')
        Array.from(ele.classList).includes('selected') ? selectedStories.add(parseInt(ele.id)) : selectedStories.delete(parseInt(ele.id))
        setSelectedStories(selectedStories)
        setStoryList(Array.from(selectedStories).map(story => stories[story]))
    }

    function save() {
        sethtml(document.querySelector('.newsletter-preview').innerHTML)
        updatePublishings()
        newsletter.date = date;
        newsletter.html = html;
        action(newsletter)
        history.goBack()
    }

    function updatePublishings() {
        const toRemove = newsletter.stories.filter(story => !selectedStories.has(story))
        newsletter.stories.forEach(story => {
            if(selectedStories.has(story)){
                selectedStories.delete(story)
            } 
        })
        debugger
        toRemove.forEach(story => removePublishing(story, newsletter.id))
        selectedStories.forEach(story => addPublishing(story, newsletter.id))
    }

    return(
        <div className="newsletter-editor">
            <label>Issue date
                <input type="date" value={date} onChange={e => setDate(e.target.value)} />
            </label>

            <label>Stories to include
                <ul className="stories-list">
                    {Object.values(stories).map(story => {
                        return <li  id={story.id}
                                    key={story.id}
                                    onClick={e => toggleSelect(e.target)}>
                            {story.title}
                        </li>
                    })}
                </ul>
            </label>

            <StoriesOrder stories={storyList} save={setStoryList} allStories={stories}/>

            <div className="newsletter-preview">
                <ul>
                    {storyList.map( story => {
                       return <li key={story.id}>
                           <StoryView story={story} type="newsletter"/>
                       </li> }
                    )}
                </ul>
            </div>

            <button onClick={save}>Save</button>
        </div>
    )
}

const mSTP = (state, ownProps) => {
    return({
        newsletter: state.entities.newsletters[ownProps.match.params.newsletter_id],
        stories: state.entities.stories
})}

const mDTP = dispatch => ({
    action: newsletter => dispatch(createNewsletter(newsletter)),
    addPublishing: (story_id, newsletter_id) => dispatch(createPublishing(story_id, newsletter_id)),
    removePublishing: (story_id, newsletter_id) => dispatch(removePublishing(story_id, newsletter_id))
})

export default connect(mSTP, mDTP)(NewsletterEditor)