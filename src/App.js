import React, { Component } from 'react'
import axios from 'axios'
import Login from './components/Login'
import Signup from './components/Signup'

class App extends Component {
  render () {
    return (
      <div className='App'>
        <Login />
        <Signup />
      </div>
    )
  }
}

export default App
