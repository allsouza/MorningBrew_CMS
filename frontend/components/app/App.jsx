import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../../actions/user_actions';

function App({logout, currentUser}) {
    
    return(
        <div className='app'>
            <button onClick={logout}>Logout</button>
        </div>
    )
}

const mSTP = state => ({
    currentUser: state.session.user
})

const mDTP = dispatch => ({
    logout: () => dispatch(logout())
})

export default connect(mSTP, mDTP)(App);