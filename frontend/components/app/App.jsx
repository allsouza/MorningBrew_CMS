import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Switch } from 'react-router-dom';
import { getUsers, logout } from '../../actions/user_actions';
import { Route } from 'react-router-dom';
import { ProtectedRoute } from '../../util/route_util';
import Header from './header/header';
import StoriesIndex from './stories/stories_index';
import NewsletterIndex from './newsletters/newsletters_index';
import { EditStory, NewStory } from './stories/story_editor';
import StoryView from './stories/story_view';
import StoriesOrder from './newsletters/stories_order';
import { NewNewsletter } from './newsletters/newsletter_editor';

function App({getUsers}) {

    useEffect(() => {
        getUsers()
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
                <ProtectedRoute exact path='/app/newsletters/new' component={NewNewsletter} />
            </Switch>
        </div>
    )
}

const mSTP = state => ({
    currentUser: state.entities.users[state.session.id]
})

const mDTP = dispatch => ({
    logout: () => dispatch(logout()),
    getUsers: () => dispatch(getUsers())
})

export default connect(mSTP, mDTP)(App);