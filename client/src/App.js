import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Switch, Redirect } from 'react-router-dom';
import './App.css';
import API from './utils/API';
import Login from './pages/Login';
import Signup from './pages/Signup.jsx'
import About from './pages/AboutPage.jsx'
import AboutUser from './pages/AboutPageUser.jsx'
import Rules from './pages/RulesPage.jsx'
import MlbRulesPage from './pages/MlbRulesPage.jsx'
import Landing from './pages/LandingPage.jsx'
import ActionPage from './pages/ActionPage.jsx'
import PlayersPage from './pages/PlayerPage.jsx'
import Leaderboard from './pages/LeaderboardPage.jsx'


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
                  <MlbRulesPage />
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
                <ActionPage />
              ) : this.state.loggedIn === false ? (
                <Redirect to='/' />
              ) : (
                null
              )
            )} />
            <Route exact path='/leaderboard' render={() => (
              this.state.loggedIn === true ? (
                <Leaderboard />
              ) : this.state.loggedIn === false ? (
                <Redirect to='/' />
              ) : (
                null
              )
            )} />
            <Route exact path='/playerspage' render={() => (
              this.state.loggedIn === true ? (
                <PlayersPage />
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
