import { connect } from 'react-redux';
import React from 'react';

import ErrorMsg from './error.component';
import blogService from './blogs-api.service';

class Login extends React.Component {
    checkLogin(name, pass) {
        blogService.sendRequest({url: '/api/login', method: 'PUT', body: JSON.stringify({name: name, pass: pass})})
            .then(res => {
                if (res.user) {
                    this.props.dispatch({
                        type: 'LOGIN',
                        user: res.user
                    });
                    this.props.dispatch({type: 'CLEAR_ERROR'});
                    localStorage.setItem('currentUser', res.user);
                    this.props.history.push('/');
                } else {
                    this.props.dispatch({
                        type: 'ERROR',
                        message: 'Invalid login or password, please try again'
                    });
                }
            })
            .catch(err => console.log(err));
    }

    openMainPage() {
        this.props.history.push('/');
    }

    render() {
        let name, pass;

        return (
            <div className='form'>
                <span className="header"><button className="header-button" onClick={this.openMainPage.bind(this)}>Return to Main Page</button></span>
                <ErrorMsg />
                <input className='form-input' placeholder='Enter your name...' ref={node => {
                    name = node;
                }} />
                <input className='form-input' placeholder='Enter your password...' type="password" ref={node => {
                    pass = node;
                }} />
                <button className='form-submit' onClick={() => {
                    if (name.value && pass.value) {
                        this.checkLogin(name.value, pass.value);
                        name.value = '';
                        pass.value = '';
                    }
                }}>Log In</button>
                <button className='form-submit sign-up' onClick={() => {
                    this.props.history.push('signup');
                }}>Sign Up ></button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        reduxState: state
    }
};

const ConnectedLogin = connect(mapStateToProps)(Login);

export default ConnectedLogin;
