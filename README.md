# react-express-boilerplate

This is an example of how to construct a simple react and express boilerplate. There are advantages and disadvantages to this particular approach which we'll discuss in class, but this is the quickest way to get started and organized on a small React/Express project.

If you plan to expand to larger projects, I would recommend splitting your application into two separate repositories: one for your express server, and one for your react app.

1. `create-react-app react-express-boilerplate && cd react-express-boilerplate`

2. `mkdir lib`

3. `npm install express --save`

4. `cd lib && touch server.js`

5. Inside `server.js:`

```javascript
const express = require("express");

const app = express();
const PORT = 8080;

app.get("/hello", (req, res) => {
  res.status(200).json({
    message: "hello world"
  });
});

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
```

6. `npm install concurrently --save-dev`

7. `npm install nodemon -g`

8. In `package.json`:

```json
{
  "name": "react-express-boilerplate",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "express": "^4.16.2",
    "react": "^16.2.0",
    "react-dom": "^16.2.0",
    "react-scripts": "1.1.1"
  },
  "proxy": "http://localhost:8080/",
  "scripts": {
    "client": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test --env=jsdom",
    "eject": "react-scripts eject",
    "server": "nodemon lib/server.js",
    "start":
      "concurrently --kill-others-on-fail \"npm run server\" \"npm run client\""
  },
  "devDependencies": {
    "concurrently": "^3.5.1"
  }
}
```

9. `npm install axios --save`

10. In `/src/App.js`:

```javascript
import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";

class App extends Component {
  componentDidMount() {
    axios.get("/hello").then(res => {
      console.log(res.data);
    });
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
```
