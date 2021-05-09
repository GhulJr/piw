'use strict';

import React from 'react';
import {
  Route,
  HashRouter,
  Link,
  Switch,
  NavLink
} from "react-router-dom";

import './App.css';
import ListItem from './components/ListItem';
import AddStudent from './components/AddStudent';
import SearchComponent from './components/SearchComponent';
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

    return (
      <HashRouter>
        <div>
          <ul>
            <li><NavLink to="/search">Search</NavLink></li>
            <li><NavLink to="/add-student">AddStudent</NavLink></li>
          </ul>
          <Switch>
            <Route path="/search" component={() => <div>
              <div><SearchComponent searchStudent={this.searchStudent} /></div>
              <div class="bordered">{this.state.isSearching ? <SearchResultsCount counter={this.state.counter} /> : null}</div>
              <div class="bordered"><ul>{listItems}</ul></div>
            </div>} />
            <Route path="/add-student" component={()=><AddStudent addStudent={this.addStudent}/>} />
          </Switch>
        </div>

      </HashRouter>
    );
  }
}

export default App;
