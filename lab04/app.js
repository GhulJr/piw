'use strict';

class SearchComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = { searchQuery: '' };

        this.handleChange = this.handleChange.bind(this);
    }

   handleChange(event) {
       this.setState({ searchQuery: event.target.value });
       this.props.searchStudent(this.state);
   }
    
    render() {
        return <div>
            <input type="text" value={this.state.searchQuery} onChange={this.handleChange} placeholder="Title..." />
            <button type="submit" onClick={this.handleChange}>Search</button>
        </div>
    }
}

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
        if(!(this.state.isNameInvalid || this.state.isEmailInvalid || this.state.isDescriptionInvalid) && 
        this.state.isNameInitialized && this.state.isEmailInitialized && this.state.isDescriptionInitialized) {
            
            this.props.addStudent(this.state);
            
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
        return <div>
            <div><h3>Add student</h3></div>
            <div>
                <input type="text" value={this.state.name} onChange={this.handleChangeName} placeholder="Name..."></input>
                { this.state.isNameInvalid ? <label>Description must not be empty!</label> : null }
            </div>
            <div>
                <input type="text" value={this.state.email} onChange={this.handleChangeEmail} placeholder="Email..."></input>
                { this.state.isEmailInvalid ? <label>Invalid email format!</label> : null }
            </div>
            <div>
                <input type="text" value={this.state.description} onChange={this.handleChangeDescription} placeholder="Description..."></input>
                { this.state.isDescriptionInvalid ? <label>Description must not be empty!</label> : null }
            </div>
            <div><button type="submit" onClick={this.handleSubmit}>Add</button></div>
        </div>
    }
}

const ListItem = (props) => {

    return <li>
        <div>
            <div><label><b>Name:</b> {props.name}</label></div>
            <div><label><b>Email:</b> {props.email}</label></div>
            <div><label><b>Description:</b> {props.description}</label></div>
        </div>
    </li>
}

const SearchResultsCount = (props) => {
return <div>
    
</div>
}

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
    this.setState({
        isSearching: (_State.searchQuery.length > 0),
        queriedStudents: this.state.savedStudents.filter(student => student.name.localeCompare(_State.searchQuery))
    });
}

render() {

    const listItems = (this.state.isSearching ? this.state.queriedStudents : this.state.savedStudents).map((props) =>
        <ListItem name={props.name} email={props.email} description={props.description}/>
    );

    return <div>
        <div><SearchComponent searchStudent={this.searchStudent}/></div>
        <div><AddStudent addStudent={this.addStudent}/></div>
        <div>{ this.state.isSearching ? <SearchResultsCount/> : null }</div>
        <div><ul>{listItems}</ul></div>
    </div>
}
}

ReactDOM.render(
    <App/>,
    document.getElementById('root')
);
