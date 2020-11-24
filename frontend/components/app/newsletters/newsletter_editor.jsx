import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createNewsletter } from '../../../actions/newsletter_actions';
import StoryView from '../stories/story_view';
import StoriesOrder from './stories_order';

function NewsletterEditor({newsletter, stories, action}) {
    const [date, setDate] = useState(newsletter.date)
    const [html, sethtml] = useState(newsletter.html)
    const [storyList, setStoryList] = useState([])
    const [selectedStories, setSelectedStories] = useState(new Set())
    const history = useHistory();

    function toggleSelect(ele) {
        ele.classList.toggle('selected')
        Array.from(ele.classList).includes('selected') ? selectedStories.add(parseInt(ele.id)) : selectedStories.delete(parseInt(ele.id))
        setSelectedStories(selectedStories)
        setStoryList(Array.from(selectedStories).map(story => stories[story]))
    }

    function save() {
        newsletter.date = date;
        newsletter.html = html;
        action(newsletter)
        history.goBack()
    }

    console.log(storyList)
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

const newSTP = state => {
    const date = new Date(Date.now())
    let dateString = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
    return({
        newsletter: {date: dateString, html: "", stories: []},
        stories: state.entities.stories
})}

const newDTP = dispatch => ({
    action: newsletter => dispatch(createNewsletter(newsletter))
})

export const NewNewsletter = connect(newSTP, newDTP)(NewsletterEditor)