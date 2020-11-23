import React from 'react'
import { connect } from 'react-redux'
import { logout } from '../../../actions/user_actions'

function Header({user, logout}) {
    return(
        <div className='header'>
            <div className='left'>
                <h1>MorningBrew</h1>
            </div>
            <div className="center">
                <nav>
                    <a href="#/app/stories">Stories</a>
                    <a href="#/app/newsletters">Newsletters</a>
                </nav>
            </div>
            <div className="right">
                <p>Hello {user.firstName}</p>
                <button onClick={logout}>Logout</button>
            </div> 
        </div>
    )
}

const mSTP = state => ({
    user: state.entities.users[state.session.id]
})

const mDTP = dispatch => ({
    logout: () => dispatch(logout())
})

export default connect(mSTP, mDTP)(Header);