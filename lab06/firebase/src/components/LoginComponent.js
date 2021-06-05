'use strict';

import React from 'react';
import '../App.css';
import fb from '../config.js';

class LoginComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            isEmailInvalid: false,
            isPasswordInvalid: false,
            isEmailInitialized: false,
            isPasswordInitialized: false
        };

        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);

        this.handleLogin = this.handleLogin.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
    }

    handleChangePassword(event) {
        const password = event.target.value;

        this.setState({
            isPasswordInitialized: true,
            password: password,
            isPasswordInvalid: password === ''
        });
    }

    handleChangeEmail(event) {
        const email = event.target.value;
        const emailPattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        this.setState({
            isEmailInitialized: true,
            email: email,
            isEmailInvalid: !emailPattern.test(email)
        });
    }

    handleLogin = async (event) => {
        if (!(this.state.isPasswordInvalid || this.state.isEmailInvalid) &&
            this.state.isPasswordInitialized && this.state.isEmailInitialized) {

            try {
                await fb.auth().signInWithEmailAndPassword(this.state.email, this.state.password);
            } catch (error) {
                alert(error);
            }

            this.setState({
                email: '',
                password: '',
                isPasswordInvalid: false,
                isEmailInvalid: false,
                isPasswordInitialized: false,
                isEmailInitialized: false,
            });
        }
    }

    handleRegister = async (event) => {
        if (!(this.state.isPasswordInvalid || this.state.isEmailInvalid) &&
            this.state.isPasswordInitialized && this.state.isEmailInitialized) {

            try {
                await fb.auth().createUserWithEmailAndPassword(this.state.email, this.state.password);
            } catch (error) {
                alert(error);
            }

            this.setState({
                email: '',
                password: '',
                isPasswordInvalid: false,
                isEmailInvalid: false,
                isPasswordInitialized: false,
                isEmailInitialized: false,
            });
        }
    }

    render() {
        return <div class="bordered">
            <div><h3>Login</h3></div>
            <div class="input">
                <input class="inputData" type="text" value={this.state.email} onChange={this.handleChangeEmail} placeholder="Email..."></input>
                {this.state.isEmailInvalid ? <label class="error">Invalid email format!</label> : null}
            </div>
            <div class="input">
                <input class="inputData" type="password" value={this.state.password} onChange={this.handleChangePassword} placeholder="Password..."></input>
                {this.state.isPasswordInvalid ? <label class="error">Password must not be empty!</label> : null}
            </div>
            <div><button class="addButton" type="submit" onClick={this.handleLogin}>Login</button></div>
            <div><button class="addButton" type="submit" onClick={this.handleRegister}>Signup</button></div>
        </div>
    }
}

export default LoginComponent;
