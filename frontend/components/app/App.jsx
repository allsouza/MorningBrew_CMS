import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Switch } from 'react-router-dom';
import { getUsers, logout } from '../../actions/user_actions';
import { Route } from 'react-router-dom';
import { ProtectedRoute } from '../../util/route_util';
import Header from './header/header';
import StoriesIndex from './stories/stories_index';
import NewsletterIndex from './newsletters/newsletters_index';

function App({getUsers}) {

    useEffect(() => {
        getUsers()
    }, [])

    return(
        <div className='app'>
            <Header />
            <Switch>
                <ProtectedRoute path='/app/stories' component={StoriesIndex} />
                <ProtectedRoute path='/app/newsletters' component={NewsletterIndex} />
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