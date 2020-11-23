import React from 'react';
import { Provider } from 'react-redux';
import { HashRouter, Route } from 'react-router-dom';
import {AuthRoute, ProtectedRoute} from '../util/route_util';
import App from './app/App';

import Splash from './splash/splash'

export default function Root({store}) {
    return(
        <Provider store={store}>
            <HashRouter>
                <AuthRoute path='/' component={Splash} />
                <ProtectedRoute path='/app' component={App} />
            </HashRouter>
        </Provider>
    )
}