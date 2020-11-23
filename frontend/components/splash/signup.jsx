import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { clearErrors } from '../../actions/error_actions';
import { signup } from '../../actions/user_actions';

function SignUp({signUp, errors, clearErrors}) {
    const [username, setUsername] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('')
    const [password, setPassword] = useState('');

    function trySignUp() {
        signUp({
            username,
            first_name: firstName,
            last_name: lastName,
            password
        })
    }

    return(
        <div className='signup'>
            <form onSubmit={trySignUp}>
                <label>Username
                    <input  type="text"
                            value={username}
                            onChange={e => {
                                setUsername(e.target.value)
                                clearErrors()
                            }}
                    />
                </label>

                <label>First Name
                    <input  type="text"
                            value={firstName}
                            onChange={e => {
                                setFirstName(e.target.value)
                                clearErrors()
                            }}
                    />
                </label>

                <label>Last Name
                    <input  type="text"
                            value={lastName}
                            onChange={e => {
                                setLastName(e.target.value)
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
            <Link to='/'>Already have an account</Link>
        </div>
    )
}

const mSTP = state => {
    return({
    errors: state.errors.session
})}

const mDTP = dispatch => ({
    signUp: user => dispatch(signup(user)),
    clearErrors: () => dispatch(clearErrors())
})

export default connect(mSTP, mDTP)(SignUp)