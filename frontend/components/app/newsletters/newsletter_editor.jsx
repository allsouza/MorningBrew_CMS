import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { updateNewsletter } from '../../../actions/newsletter_actions';
import { createPublishing, removePublishing } from '../../../util/newsletters_api_util';
import StoriesOrder from './stories_order';
import StoryView from '../stories/story_view';
import { fetchStories } from '../../../actions/story_actions';

function NewsletterEditor({newsletter, stories, action, removePublishing, addPublishing, getStories}) {
    const [date, setDate] = useState(newsletter.date)
    const [selectedStories, setSelectedStories] = useState(new Set(newsletter.story_order))
    const [storyList, setStoryList] = useState(Array.from(selectedStories))
    const history = useHistory();
    console.log(newsletter.story_order)

    function toggleSelect(ele) {
        ele.classList.toggle('selected')
        Array.from(ele.classList).includes('selected') ? selectedStories.add(parseInt(ele.id)) : selectedStories.delete(parseInt(ele.id))
        setSelectedStories(selectedStories)
        setStoryList(Array.from(selectedStories))
    }

    function save() {
        updatePublishings()
        newsletter.date = date;
        newsletter.html = document.querySelector('.newsletter-preview').innerHTML;
        newsletter.story_order = storyList.join(',');
        action(newsletter)
        getStories()
        history.push('/app/newsletters')
    }

    async function updatePublishings() {
        const toRemove = newsletter.story_order.filter(story => !storyList.includes(story))
        newsletter.story_order.forEach(story => {
            if(selectedStories.has(story)){
                selectedStories.delete(story)
            } 
        })
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
                    {Object.values(stories).sort((a,b) => a.updated_at > b.updated_at ? -1 : 1).map(story => {
                        return <li  id={story.id}
                                    key={story.id}                        
                                    className={selectedStories.has(story.id) ? "selected" : ""}
                                    onClick={e => toggleSelect(e.target)}>
                            {story.title}
                        </li>
                    })}
                </ul>
            </label>

            <StoriesOrder stories={storyList} save={setStoryList} allStories={stories}/>

            <div className="newsletter-preview">
                <ul>
                    <h1>MorningBrew ({date})</h1>
                    {storyList.map( story => {
                        return (<li key={story} 
                            dangerouslySetInnerHTML={{__html: stories[story].html}}
                            style={{padding: '20px 0', borderBottom: '1px solid black', listStyle: 'none'}}></li>)
                        }
                    )}
                </ul>
            </div>
            <div className="buttons">
                <button onClick={() => history.goBack()}>Cancel</button>
                <button onClick={save}>Save</button>
            </div>
        </div>
    )
}

const mSTP = (state, ownProps) => {
    return({
        newsletter: state.entities.newsletters[ownProps.match.params.newsletter_id],
        stories: state.entities.stories
})}

const mDTP = dispatch => ({
    action: newsletter => dispatch(updateNewsletter(newsletter)),
    addPublishing: (story_id, newsletter_id) => (createPublishing(story_id, newsletter_id)),
    removePublishing: (story_id, newsletter_id) => (removePublishing(story_id, newsletter_id)),
    getStories: () => dispatch(fetchStories())
})

export default connect(mSTP, mDTP)(NewsletterEditor)