'use strict';

import React from 'react';
import '../App.css';

class SearchComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = { searchQuery: '' };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ searchQuery: event.target.value });
    }

    handleSubmit(event) {
        this.props.searchStudent(this.state);
    }

    render() {
        return <div class="input">
            <input class="searchTerm" type="text" value={this.state.searchQuery} onChange={this.handleChange} placeholder="Search..." />
            <button class="searchButton" type="submit" onClick={this.handleSubmit}>Search</button>
        </div>
    }
}

export default SearchComponent;