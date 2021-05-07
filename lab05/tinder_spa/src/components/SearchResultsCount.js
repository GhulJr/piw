'use strict';

import React from 'react';
import '../App.css';

const SearchResultsCount = (props) => {

    return <div class="label">
        <label>Znaleziono: {props.counter}</label>
    </div>
}

export default SearchResultsCount;