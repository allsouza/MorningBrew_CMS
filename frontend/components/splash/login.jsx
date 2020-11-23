import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { clearErrors } from '../../actions/error_actions';
import { login } from '../../actions/user_actions';

function Login({login, errors, clearErrors}) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    function tryLogin() {
        login({username, password})
    }

    return(
        <div className='login'>
            <form onSubmit={tryLogin}>
                <label>Username
                    <input  type="text"
                            value={username}
                            onChange={e => {
                                setUsername(e.target.value)
                                clearErrors()
                            }}
                    />
                </label>

                <label>Password
                    <input  type="password"
                            value={password}
                            onChange={e => {
                                setPassword(e.target.value)
                                clearErrors()
                            }}
                    />
                </label>

                <div className="errors">
                    {errors.length > 0 ? <ul> {errors.map(error => <li key={error}>{error}</li> )} </ul> : null }
                </div>

                <input type="submit" value="Login"/>
            </form>
            <Link to='/sign_up'>Create an account</Link>
        </div>
    )
}


const mSTP = state => {
    return({
        errors: state.errors.session
    })
}

const mDTP = dispatch => ({
    login: user => dispatch(login(user)),
    clearErrors: () => dispatch(clearErrors())
})

export default connect(mSTP, mDTP)(Login);

