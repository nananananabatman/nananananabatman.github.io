import { connect } from 'react-redux';
import React from 'react';

async function callApi(name, pass) {
    const response = await fetch('/api/login', {
        method: 'PUT',
        body: JSON.stringify({name: name, pass: pass}),
        headers: {"Content-Type": "application/json"}
    });
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
}

class Login extends React.Component {
    checkLogin(name, pass) {
        callApi(name, pass)
            .then(res => {
                this.props.dispatch({
                    type: 'LOGIN',
                    user: res.user
                });
                localStorage.setItem('currentUser', res.user);
                this.props.history.push('/');
            })
            .catch(err => console.log(err));
    }

    render() {
        let name, pass;

        return (
            <div className='form'>
                <input className='form-input' placeholder='Enter your name...' ref={node => {
                    name = node;
                }} />
                <input className='form-input' placeholder='Enter your password...' ref={node => {
                    pass = node;
                }} />
                <button className='form-submit' onClick={() => {
                    if (name.value && pass.value) {
                        this.checkLogin(name.value, pass.value);
                        name.value = '';
                        pass.value = '';
                    }
                }}>Log In</button>
                <button onClick={() => {
                    this.props.history.push('signup');
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

const ConnectedLogin = connect(mapStateToProps)(Login);

export default ConnectedLogin;
