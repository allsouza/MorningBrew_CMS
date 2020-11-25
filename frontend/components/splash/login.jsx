import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { clearErrors } from '../../actions/error_actions';
import { login } from '../../actions/user_actions';

function Login({login, errors, clearErrors}) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    function tryLogin(e) {
        e.preventDefault()
        login({username, password})
    }

    useEffect(() => {
        return () => {
            clearErrors()
        }
    }, [])
    
    return(
        <div className='login'>
            <form onSubmit={e => tryLogin(e)}>
                <input  type="text"
                        value={username}
                        placeholder="Username"
                        onChange={e => {
                            setUsername(e.target.value)
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

                <button>Login</button>
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

