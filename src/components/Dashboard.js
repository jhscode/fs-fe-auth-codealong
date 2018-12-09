import React from "react";
import axios from "axios";
import { getToken } from "../services/tokenService";
import Logout from './Logout';


class Dashboard extends React.Component {
  state = {
    todo: "",
    todos: []
  };
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  componentDidMount() {
    // 1. When the dashboard loads, get the user's token
    // 2. Send a GET request to /todo and pass the token to grab a list of ONLY this user's todos
    // 3. If we get a successful response, store the todos in state.
  }
  handleSubmit = e => {
    e.preventDefault();
    const { todo } = this.state;

    // 1. Get the user's token
    // 2. Send a POST to /todo with
    //  a - the body containing the TODO we wish to post
    //  b - the Authorization Header Bearer <token>
  };
  render() {
    return (
      <div>
        <h1>Dashboard</h1>
        <form onSubmit={this.handleSubmit}>
          <input name="todo" type="text" onChange={this.handleChange} />
          <button>Add Todo</button>
        </form>
        <ul>
          {this.state.todos.map(todo => {
            return <li>{JSON.stringify(todo, null, 3)}</li>;
          })}
        </ul>
        <Logout setUser={this.props.setUser} />
      </div>
    );
  }
}

export default Dashboard;
