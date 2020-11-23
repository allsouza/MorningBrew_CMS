import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './login';
import SignUp from './signup';

export default function Splash() {
    return(
        <div className="splash">
            <h1>Welcome to the Morning Brew CMS</h1>
            <Switch>
                <Route exact path='/' component={Login} />
                <Route path='/sign_up' component={SignUp} />
            </Switch> 
        </div>
    )
}