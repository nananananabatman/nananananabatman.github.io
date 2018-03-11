import { createStore } from 'redux';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import 'babel-polyfill';
import 'whatwg-fetch';

import appReducer from './app.reducer'
import Home from './home.component';
import Login from './login.component';
import SignUp from './signUp.component';

let store = createStore(appReducer);

class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <Switch>
                    <Route path="/login" component={Login} />
                    <Route path="/signup" component={SignUp} />
                    <Route path="/" component={Home} />
                </Switch>
            </Provider>
        );
    }
};

ReactDOM.render((
    <BrowserRouter>
        <App />
    </BrowserRouter>
), document.getElementById('app'));
