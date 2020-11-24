import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { getUsers, logout } from '../../actions/user_actions';
import { fetchStories } from '../../actions/story_actions';
import { fetchNewsletters } from '../../actions/newsletter_actions';
import Header from './header/header';
import StoriesIndex from './stories/stories_index';
import NewsletterIndex from './newsletters/newsletters_index';
import { EditStory, NewStory } from './stories/story_editor';
import StoryView from './stories/story_view';
import NewsletterEditor from './newsletters/newsletter_editor';
import NewsletterPreview from './newsletters/newsletter_preview';

function App({getUsers, getNewsletters, getStories}) {
    const [ready, setReady] = useState(false)

    useEffect(() => {
        async function getData() {
            await getUsers()
            await getStories()
            await getNewsletters()
            setReady(true)
        }
        getData()
    }, [])

    return(
        <div className='app'>
            <Header />
            {ready ? <Switch>
                <Route exact path='/app/stories' component={StoriesIndex} />
                <Route exact path='/app/stories/new' component={NewStory} />
                <Route exact path='/app/stories/:story_id' component={EditStory} />
                <Route exact path='/app/stories/:story_id/preview' component={StoryView} />
                <Route exact path='/app/newsletters' component={NewsletterIndex} />
                <Route exact path='/app/newsletters/:newsletter_id' component={NewsletterEditor} />
                <Route exact path='/app/newsletters/:newsletter_id/preview' component={NewsletterPreview} />
            </Switch> :null }
        </div>
    )
}

const mSTP = state => ({
    currentUser: state.entities.users[state.session.id]
})

const mDTP = dispatch => ({
    logout: () => dispatch(logout()),
    getUsers: () => dispatch(getUsers()),
    getStories: () => dispatch(fetchStories()),
    getNewsletters: () => dispatch(fetchNewsletters())
})

export default connect(mSTP, mDTP)(App);