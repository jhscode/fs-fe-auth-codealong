import React from "react";
import axios from "axios";
import { getToken } from "../services/tokenService";

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
    const token = getToken();
    axios
      .get("/todo", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(res => {
        const { payload } = res.data;
        this.setState({ todos: payload });
      });
  }
  handleSubmit = e => {
    e.preventDefault();
    const { todo } = this.state;
    const token = getToken();
    axios
      .post(
        "/todo",
        {
          description: todo
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      .then(res => {
        console.log(res);
      });
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
        <button>Logout</button>
      </div>
    );
  }
}

export default Dashboard;
