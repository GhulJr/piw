'use strict';

import React from 'react';
import '../App.css';
import fb from '../config.js';

class AddStudent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            name: '',
            email: '',
            description: '',
            isNameInvalid: false,
            isEmailInvalid: false,
            isDescriptionInvalid: false,
            isNameInitialized: false,
            isEmailInitialized: false,
            isDescriptionInitialized: false
        };

        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangeDescription = this.handleChangeDescription.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // Funkcyjne

    handleChangeName(event) {
        const name = event.target.value;

        this.setState({
            isNameInitialized: true,
            name: name,
            isNameInvalid: name === ''
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

    handleChangeDescription(event) {
        const description = event.target.value;

        this.setState({
            isDescriptionInitialized: true,
            description: description,
            isDescriptionInvalid: description === ''
        });
    }


    handleSubmit(event) {
        if (!(this.state.isNameInvalid || this.state.isEmailInvalid || this.state.isDescriptionInvalid) &&
            this.state.isNameInitialized && this.state.isEmailInitialized && this.state.isDescriptionInitialized) {

            fb.database().ref('users').push(this.state);

            this.setState({
                name: '',
                email: '',
                description: '',
                isNameInvalid: false,
                isEmailInvalid: false,
                isDescriptionInvalid: false,
                isNameInitialized: false,
                isEmailInitialized: false,
                isDescriptionInitialized: false
            });
        }
    }

    render() {
        return <div class="bordered">
            <div><h3>Add student</h3></div>
            <div class="input">
                <input class="inputData" type="text" value={this.state.name} onChange={this.handleChangeName} placeholder="Name..."></input>
                {this.state.isNameInvalid ? <label class="error">Description must not be empty!</label> : null}
            </div>
            <div class="input">
                <input class="inputData" type="text" value={this.state.email} onChange={this.handleChangeEmail} placeholder="Email..."></input>
                {this.state.isEmailInvalid ? <label class="error">Invalid email format!</label> : null}
            </div>
            <div class="input">
                <input class="inputData" type="text" value={this.state.description} onChange={this.handleChangeDescription} placeholder="Description..."></input>
                {this.state.isDescriptionInvalid ? <label class="error" l>Description must not be empty!</label> : null}
            </div>
            <div><button class="addButton" type="submit" onClick={this.handleSubmit}>Add</button></div>
        </div>
    }
}

export default AddStudent;
