import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Switch, Redirect } from 'react-router-dom';
import './App.css';
import API from './utils/API';

import Login from './pages/Login';
import Signup from './pages/Signup.jsx'


import './App.css';

class App extends Component {

  state = {
    loggedIn: '',
    username: null,
    sessionID: null,
    userObject: {}
  }

  componentDidMount() {
    this.getUser()
  }

  updateUser = (userObject) => {
    this.setState(
      userObject
    )
    localStorage.setItem('user', this.state.username)
    localStorage.setItem('sessionID', this.state.sessionID)
  }

  getUser = () => {
    let localSessionID = localStorage.getItem('sessionID')
    if (!localSessionID || localSessionID === 'null') {
      this.setState({
        loggedIn: false
      })
      console.log(this.state.loggedIn)
    } else {
      API.checkSession(localSessionID)
        .then(response => {
          if (response.data._id === localSessionID) {
            this.setState({
              loggedIn: true
            })
            console.log(this.state.loggedIn)
          } else {
            this.setState({
              loggedIn: false
            })
            console.log(this.state.loggedIn)
          }
        }).catch(error => {
          console.log('Login Error: ', error)
        })
    }
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route exact path='/'
              render={() =>
                <Login 
                  updateUser={this.updateUser}
                />
              }
            />
            <Route exact path='/Signup'
              render={() =>
                <Signup
                  updateUser={this.updateUser}
                />}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
