import React, { Component } from "react";
import axios from "axios";
class App extends Component {
  state = {
    user: null
  };

  componentDidMount() {
    // When the app loads, try and get the current user
  }

  setUser = user => {
    // Set the current user into state.
  };

  getCurrentUser = () => {
    // 1. Try and retrieve the user's token
    // 2. If they have a token, make a request to /user/current for their user details
    // 3. Pass the token as an Authorization Header
    // 4. If a successful response returns, store the user in state.
  };
  render() {
    // 1. Add React-Router to control what view the user sees
    // 2. If there is an active user in state, send them to the dashboard.
    // 3. If there's no user, send them to the login screen.
    // 4. If a logged in user tries to hit the login screen, redirect them to the dashboard.
    return (
      <div className="App">
        <h1>Authentication App</h1>
      </div>
    );
  }
}

export default App;
