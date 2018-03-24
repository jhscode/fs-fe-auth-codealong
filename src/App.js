import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";
import axios from "axios";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Logout from "./components/Logout";
import { getToken } from "./services/tokenService";
import Dashboard from "./components/Dashboard";

class App extends Component {
  state = {
    user: null
  };

  componentDidMount() {
    this.getCurrentUser();
  }

  setUser = user => {
    this.setState({ user });
  };

  getCurrentUser = () => {
    const token = getToken();
    if (token) {
      axios
        .get("/user/current", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then(res => {
          if (res.status === 200) {
            const user = res.data.payload;
            this.setUser(user);
          }
        });
    }
  };
  render() {
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route
              exact
              path="/login"
              render={props => {
                return this.state.user ? <Redirect to="/" /> : <Login />;
              }}
            />
            <Route
              render={props => {
                return this.state.user ? (
                  <Dashboard user={this.state.user} />
                ) : (
                  <Redirect to="/login" />
                );
              }}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
