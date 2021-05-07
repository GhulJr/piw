'use strict';

import React from 'react';
import '../App.css';

const ListItem = (props) => {

    return <li>
        <div class="listItem">
            <div><label><b>Name:</b> {props.name}</label></div>
            <div><label><b>Email:</b> {props.email}</label></div>
            <div><label><b>Description:</b> {props.description}</label></div>
        </div>
    </li>
}

export default ListItem;