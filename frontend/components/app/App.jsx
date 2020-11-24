import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Switch } from 'react-router-dom';
import { getUsers, logout } from '../../actions/user_actions';
import { fetchStories } from '../../actions/story_actions';
import { fetchNewsletters } from '../../actions/newsletter_actions';
import { ProtectedRoute } from '../../util/route_util';
import Header from './header/header';
import StoriesIndex from './stories/stories_index';
import NewsletterIndex from './newsletters/newsletters_index';
import { EditStory, NewStory } from './stories/story_editor';
import StoryView from './stories/story_view';
import NewsletterEditor from './newsletters/newsletter_editor';

function App({getUsers, getNewsletters, getStories}) {

    useEffect(() => {
        getUsers()
        getStories()
        getNewsletters()
    }, [])

    return(
        <div className='app'>
            <Header />
            <Switch>
                <ProtectedRoute exact path='/app/stories' component={StoriesIndex} />
                <ProtectedRoute exact path='/app/stories/new' component={NewStory} />
                <ProtectedRoute exact path='/app/stories/:story_id' component={EditStory} />
                <ProtectedRoute exact path='/app/stories/:story_id/template' component={StoryView} />
                <ProtectedRoute exact path='/app/newsletters' component={NewsletterIndex} />
                <ProtectedRoute exact path='/app/newsletters/:newsletter_id' component={NewsletterEditor} />
            </Switch>
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