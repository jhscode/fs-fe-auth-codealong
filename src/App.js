import React, { Component } from "react";
import axios from "axios";
import { 
  BrowserRouter as 
    Router, 
    Route, 
    Redirect 
  } from "react-router-dom";

import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Signup from './components/Signup';
import { getToken } from './services/tokenService';


class App extends Component {
  state = {
    user: null
  };

  componentDidMount() {
    // When the app loads, try and get the current user
    this.getCurrentUser();
  };

  setUser = user => {
    // Set the current user into state.
    this.setState({ user });
  };

  getCurrentUser = async () => {
    // 1. Try and retrieve the user's token
    const token = getToken();
    // 2. If they have a token, make a request to /user/current for their user details
    if (token) {
      try {
        const res = await axios.get('/user/current', {
          headers: {
            // 3. Pass the token as an Authorization Header
            Authorization: `Bearer ${token}`
          }
        })
        // 4. If a successful response returns, store the user in state.
        this.setUser(res.data);

      } catch(e) {
        console.log(e);
      }
    }
  };
  render() {
    // 1. Add React-Router to control what view the user sees
    // 2. If there is an active user in state, send them to the dashboard.
    // 3. If there's no user, send them to the login screen.
    // 4. If a logged in user tries to hit the login screen, redirect them to the dashboard.
    return (
      <div className="App">
        <h1>Authentication App</h1>
        <Router>
          <div>
            <Route
              exact
              path="/"
              render={() => (
                this.state.user ?
                  <Dashboard setUser={this.setUser}/>
                :
                  <Redirect to="/login" />
              )}
            />
            <Route
              path="/login"
              render={() => (
                this.state.user ?
                  <Redirect to="/" />
                :
                  <Login />
              )}
            />
            <Route
              path="/signup"
              render={() => (
                this.state.user ?
                <Redirect to="/" />
              :
                <Signup setUser={this.setUser} />
            
              )}
            />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
