import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Switch, Redirect } from 'react-router-dom';
import './App.css';
import API from './utils/API';
import Login from './pages/forms/Login';
import Signup from './pages/forms/Signup.jsx'
import About from './pages/abouts/AboutPage.jsx'
import AboutUser from './pages/abouts/AboutPageUser.jsx'
import Rules from './pages/rules/RulesPage.jsx'
import MlbRules from './pages/rules/MlbRulesPage.jsx'
import Landing from './pages/landings/LandingPage.jsx'
import MlbActionPage from './pages/actions/MlbActionPage.jsx'
import MlbLeaderboard from './pages/leaderboards/MlbLeaderboardPage.jsx'


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
      console.log("Session not null")
      API.checkSession(localSessionID)
        .then(response => {
          if (response.data._id === localSessionID) {
            console.log("Login confirmed");
            this.setState({
              loggedIn: true
            })
            console.log(this.state.loggedIn)
          } else {
            console.log("No matching sessions");
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
            <Route exact path='/login'
              render={() =>
                <Login 
                  updateUser={this.updateUser}
                />
              }
            />
            <Route exact path='/signup'
              render={() =>
                <Signup
                  updateUser={this.updateUser}
                />}
            />
            <Route exact path='/about'
              render={() =>
                <About
                  updateUser={this.updateUser}
                />}
            />
            <Route exact path='/aboutUser'
              render={() =>
                this.state.loggedIn === true ? (
                  <AboutUser />
                ) : this.state.loggedIn === false ? (
                  <Redirect to='/' />
                ) : (
                  null
                )}
            />
            <Route exact path='/rules'
              render={() =>
                <Rules
                  updateUser={this.updateUser}
                />}
            />
            <Route exact path='/mlbRules'
              render={() =>
                this.state.loggedIn === true ? (
                  <MlbRules />
                ) : this.state.loggedIn === false ? (
                  <Redirect to='/' />
                ) : (
                  null
                )}
            />
            <Route exact path='/logout'
            
            render={() => (
              
              <Redirect to='/' />
              
             )
            }
            />
            <Route exact path='/landing' render={() => (
              this.state.loggedIn === true ? (
                <Landing />
              ) : this.state.loggedIn === false ? (
                <Redirect to='/' />
              ) : (
                null
              )
            )} />
            <Route exact path='/action' render={() => (
              this.state.loggedIn === true ? (
                <MlbActionPage />
              ) : this.state.loggedIn === false ? (
                <Redirect to='/' />
              ) : (
                null
              )
            )} />
            <Route exact path='/leaderboard' render={() => (
              this.state.loggedIn === true ? (
                <MlbLeaderboard />
              ) : this.state.loggedIn === false ? (
                <Redirect to='/' />
              ) : (
                null
              )
            )} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
