import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { clearErrors } from '../../actions/error_actions';
import { signup } from '../../actions/user_actions';

function SignUp({signUp, errors, clearErrors}) {
    const [username, setUsername] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('')
    const [password, setPassword] = useState('');

    function trySignUp(e) {
        e.preventDefault()
        signUp({
            username,
            first_name: firstName,
            last_name: lastName,
            password
        })
    }

    useEffect(() => {
        return () => {
            clearErrors()
        }
    }, [])

    return(
        <div className='signup'>
            <form onSubmit={e => trySignUp(e)}>
                <input  type="text"
                        value={username}
                        placeholder="Username"
                        onChange={e => {
                            setUsername(e.target.value)
                        }}
                />

                <input  type="text"
                        value={firstName}
                        placeholder="First Name"
                        onChange={e => {
                            setFirstName(e.target.value)
                        }}
                />

                <input  type="text"
                        value={lastName}
                        placeholder="Last name"
                        onChange={e => {
                            setLastName(e.target.value)
                        }}
                />

                <input  type="password"
                        value={password}
                        placeholder="Password"
                        onChange={e => {
                            setPassword(e.target.value)
                        }}
                />

                <div className="errors">
                    {errors.length > 0 ? <ul> {errors.map(error => <li key={error}>{error}</li> )} </ul> : null }
                </div>

                <button>Sign Up</button>
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