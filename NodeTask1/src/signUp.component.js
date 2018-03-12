import { connect } from 'react-redux';
import React from 'react';

import ErrorMsg from './error.component';
import blogService from './blogs-api.service';

class SignUp extends React.Component {
    checkLogin(name, pass) {
        blogService.sendRequest({url: '/api/signup', method: 'PUT', body: JSON.stringify({name: name, pass: pass})})
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
                        message: 'Please choose another name, this one is curently used'
                    });
                }
            })
            .catch(err => console.log(err));
    }

    openMainPage() {
        this.props.history.push('/');
    }

    render() {
        let name, pass, confirmPass;

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
                <input className='form-input' placeholder='Confirm password...' type="password" ref={node => {
                    confirmPass = node;
                }} />
                <button className='form-submit' onClick={() => {
                    if (pass.value !== confirmPass.value) {
                        this.props.dispatch({
                            type: 'ERROR',
                            message: 'Please enter the same password in both of the input fields'
                        });
                    } else if (name.value && pass.value && confirmPass.value) {
                        this.checkLogin(name.value, pass.value);
                        name.value = '';
                        pass.value = '';
                        confirmPass.value = '';
                    } else {
                        this.props.dispatch({
                            type: 'ERROR',
                            message: 'Please enter all necessary data'
                        });
                    }

                }}>Sign Up</button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        reduxState: state
    }
};

const ConnectedSignUp = connect(mapStateToProps)(SignUp);

export default ConnectedSignUp;
