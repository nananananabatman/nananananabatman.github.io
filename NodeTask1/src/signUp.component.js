import { connect } from 'react-redux';
import React from 'react';

async function callApi(name, pass) {
    const response = await fetch('/api/signup', {
        method: 'PUT',
        body: JSON.stringify({name: name, pass: pass}),
        headers: {"Content-Type": "application/json"}
    });
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
}

class SignUp extends React.Component {
    checkLogin(name, pass) {
        callApi(name, pass)
            .then(res => {
                if (res.user) {
                    this.props.dispatch({
                        type: 'LOGIN',
                        user: res.user
                    });
                    localStorage.setItem('currentUser', res.user);
                    this.props.history.push('/');
                } else {
                    console.log('Please choose another name, this one is curently used');
                }
            })
            .catch(err => console.log(err));
    }

    render() {
        let name, pass, confirmPass;

        return (
            <div className='form'>
                <input className='form-input' placeholder='Enter your name...' ref={node => {
                    name = node;
                }} />
                <input className='form-input' placeholder='Enter your password...' ref={node => {
                    pass = node;
                }} />
                <input className='form-input' placeholder='Confirm password...' ref={node => {
                    confirmPass = node;
                }} />
                <button className='form-submit' onClick={() => {
                    if (pass.value !== confirmPass.value) {
                        console.log('Please enter the same password in both of the input fields');
                    }
                    if (name.value && pass.value && confirmPass.value) {
                        this.checkLogin(name.value, pass.value);
                        name.value = '';
                        pass.value = '';
                        confirmPass.value = '';
                    } else {
                        console.log('Please enter all necessary data');
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
