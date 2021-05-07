'use strict';

import React from 'react';
import './App.css';
import SearchComponent from './components/SearchComponent';
import AddStudent from './components/AddStudent';
import ListItem from './components/ListItem';
import SearchResultsCount from './components/SearchResultsCount';

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isSearching: false,
      counter: 0,
      savedStudents: [],
      queriedStudents: []
    }

    this.addStudent = this.addStudent.bind(this);
    this.searchStudent = this.searchStudent.bind(this);
  }

  addStudent(_State) {
    this.setState({
      savedStudents: this.state.savedStudents.concat(
        {
          name: _State.name,
          email: _State.email,
          description: _State.description
        }
      )
    });
  }

  searchStudent(_State) {
    let queriedStudents = this.state.savedStudents.filter(student => student.name === _State.searchQuery);
    let counter = queriedStudents.length;

    this.setState({
      isSearching: (_State.searchQuery.length > 0),
      queriedStudents: queriedStudents,
      counter: counter
    });
  }

  render() {

    const listItems = (this.state.isSearching ? this.state.queriedStudents : this.state.savedStudents).map((props) =>
      <ListItem name={props.name} email={props.email} description={props.description} />
    );

    return <div>
      <div><SearchComponent searchStudent={this.searchStudent} /></div>
      <div><AddStudent addStudent={this.addStudent} /></div>
      <div class="bordered">{this.state.isSearching ? <SearchResultsCount counter={this.state.counter} /> : null}</div>
      <div class="bordered"><ul>{listItems}</ul></div>
    </div>
  }
}

export default App;
