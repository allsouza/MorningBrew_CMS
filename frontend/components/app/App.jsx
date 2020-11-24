import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
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
                <Route exact path='/app/stories' component={StoriesIndex} />
                <Route exact path='/app/stories/new' component={NewStory} />
                <Route exact path='/app/stories/:story_id' component={EditStory} />
                <Route exact path='/app/stories/:story_id/template' component={StoryView} />
                <Route exact path='/app/newsletters' component={NewsletterIndex} />
                <Route exact path='/app/newsletters/:newsletter_id' component={NewsletterEditor} />
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