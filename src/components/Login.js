import React, { Component } from "react";
import axios from "axios";
import { setToken } from "../services/tokenService";
class Login extends Component {
  state = {
    email: "",
    password: ""
  };
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { email, password } = this.state;
    axios
      .post("/auth/login", {
        email,
        password
      })
      .then(res => {
        if (res.status === 200) {
          const token = res.data.payload;
          setToken(token);
          this.props.getCurrentUser();
        }
      });
  };
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <label htmlFor="login-email">Email: </label>
          <input
            type="email"
            onChange={this.handleChange}
            name="email"
            id="login-email"
            placeholder="email"
          />
        </div>
        <div>
          <label htmlFor="login-password">Password: </label>
          <input
            type="password"
            onChange={this.handleChange}
            name="password"
            id="login-password"
            placeholder="Enter your desired password"
          />
        </div>
        <div>
          <input type="submit" value="Log In" />
        </div>
      </form>
    );
  }
}

export default Login;
