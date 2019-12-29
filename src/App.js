import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import axios from 'axios';
import About from './components/pages/About';
import Header from './components/layout/Header';
import Todos from './components/Todos';
import AddTodo from './components/AddTodo';
import './App.css';

class App extends Component {
  state = {
    todos: [
      /*{
        id: 1,
        desc: 'Dry clean underwear',
        complete: false
      },
      {
        id: 2,
        desc: 'Take Breakfast',
        complete: false
      },
      {
        id: 3,
        desc: 'Go to college',
        complete: false
      }*/
    ]
  }

  //just after App component mounts, make request to jsonplaceholder for fake data
  componentDidMount() {
    axios.get('https://jsonplaceholder.typicode.com/todos?_limit=10')
      .then(res => this.setState({ todos: res.data }));
  }

  //map, filter functions return an array
  //Delete Todo
  delTodo = (id) => {
    axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
    .then(
      res => this.setState({ todos: [...this.state.todos.filter(todo => todo.id !== id)] })
    );
  }

  // Mark Complete
  markComplete = (id) => {
    this.setState({
      todos: this.state.todos.map(todo => {
        if (todo.id === id) {
          todo.complete = !todo.complete;
        }
        return todo; //this is the new modified object (returned inside curly braces)
      })
    });
  }

  //Add Todo
  addTodo = (title) => {
    axios.post('https://jsonplaceholder.typicode.com/todos',
      {
        title,
        complete: false
      })
      .then(
        res => this.setState({ todos: [...this.state.todos, res.data] })
      );
  }

  render() {
    return (
      <Router>
        <div className="App">
          <div className="container">
            <Header />
            <Route exact path="/" render={props => (
              <React.Fragment>
                <AddTodo addTodo={this.addTodo} />
                {/*after adding a todo, the state updates and hence Todos component re-renders*/}
                <Todos todos={this.state.todos} markComplete={this.markComplete} delTodo={this.delTodo} />
              </React.Fragment>
            )} />
            <Route path="/about" component={About} />
          </div>
        </div>
      </Router>

    );
  }
}

export default App;
