import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Footer from '../app/footer/footer';
import Login from './login';
import SignUp from './signup';

export default function Splash() {
    return(
        <div className="splash">
            <img src="https://morningbrew-oslo.s3.us-west-2.amazonaws.com/1582323261.jpg" alt="" />
            <h1>Welcome to the Morning Brew CMS</h1>
            <Switch>
                <Route exact path='/' component={Login} />
                <Route path='/sign_up' component={SignUp} />
            </Switch> 
            <Footer/>
        </div>
    )
}