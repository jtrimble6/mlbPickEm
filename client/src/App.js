import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
// import { createBrowserHistory } from 'history'
import { Switch, Redirect } from 'react-router-dom';
import './App.css';
import API from './utils/API';
import AdminLogin from './pages/forms/AdminLogin'
import AdminSignup from './pages/forms/AdminSignup'
import AdminPage from './pages/admin/AdminPage'
import AddDeleteChallenge from './pages/admin/AddDeleteChallengePage'
import EditChallengePage from './pages/admin/EditChallengePage'
import ChallengePage from './pages/admin/ChallengePage';
import MastersPage from './pages/admin/MastersPage';
import UsersPage from './pages/admin/UsersPage'
import NbaGamesPage from './pages/admin/NbaGamesPage'
import NbaPlayoffGamesPage from './pages/admin/NbaPlayoffGamesPage'
import MlbGamesPage from './pages/admin/MlbGamesPage'
import LogoutPage from './pages/landings/LogoutPage'
import Login from './pages/forms/Login'
import PasswordReset from './pages/forms/PasswordReset'
import UpdatePassword from './pages/forms/UpdatePassword'
import Signup from './pages/forms/Signup'
import About from './pages/abouts/AboutPage'
import Contact from './pages/contacts/ContactPage'
import ContactUser from './pages/contacts/ContactPageUser'
import AboutUser from './pages/abouts/AboutPageUser'
import Rules from './pages/rules/RulesPage'
import MlbRules from './pages/rules/MlbRulesPage'
import NbaPlayoffRules from './pages/rules/NbaPlayoffRulesPage'
import HomePage from './pages/landings/HomePage'
import LandingPage from './pages/landings/LandingPage'
import MlbActionPage from './pages/actions/MlbActionPage'
import NbaActionPage from './pages/actions/NbaActionPage'
import NbaPlayoffActionPage from './pages/actions/NbaPlayoffActionPage'
import MastersActionPage from './pages/actions/MastersActionPage'
import MlbLeaderboard from './pages/leaderboards/MlbLeaderboardPage'


import './App.css';
import MastersRules from './pages/rules/MastersRulesPage';




class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      viewing: false,
      adminLoggedIn: '',
      userLoggedIn: '',
      userUsername: null,
      userSessionId: null,
      userObject: {}
    }
    // this.updateUser = this.updateUser.bind(this)
    // this.getAdmin = this.getAdmin.bind(this)
    this.updateUser = this.updateUser.bind(this)
    this.getUser = this.getUser.bind(this)
  }
  

  componentDidMount() {
    this.getUser()
    // this.getAdmin()
  }

  updateUser = (userObject) => {
    this.setState (
      userObject
    )
    localStorage.setItem('user', this.state.userUsername)
    localStorage.setItem('userSessionId', this.state.userSessionId)
    // console.log('LOCAL USER STORAGE: ', localStorage)
  }

  getAdmin = (username) => {
    let self = this
    API.getUser(username)
      .then(res => {
        // console.log('ADMIN USER INFO: ', res.data)
        if (res.data[0].admin) {
          self.setState({
            adminLoggedIn: true
          })
        }
      })
      .catch(err => console.log(err))
  }

  getUser = () => {
    let self = this
    console.log('HISTORY: ', window.history)
    let localUser = localStorage.getItem('user')
    let localUserID = localStorage.getItem('userSessionId')
    // console.log('USER ID: ', localUser)
    if (!localUserID || localUserID === 'null') {
      this.setState({
        userLoggedIn: false
      })
      // console.log(this.state.userLoggedIn)
    } else {
      API.checkUserSession(localUserID)
        .then(response => {
          if (response.data._id === localUserID) {
              this.setState({
                userLoggedIn: true
            })
            self.getAdmin(localUser)    
          } else {
            // console.log("No matching sessions");
            this.setState({
              userLoggedIn: false
            })
            // console.log(this.state.userLoggedIn)
          }
        }).catch(error => {
          console.log('Login Error: ', error)
        })
    }
  }

  render() {
    // const history = createBrowserHistory();
    // const location = history.location;
    // const unlisten = history.listen((location, action) => {
    //   // location is an object like window.location
    //   console.log(action, location.pathname, location.state);
    // });
    // history.push('/home', { some: 'state' });
    return (
      <Router>
        <div className="App">
          <Switch>
          <Route exact path='/'
              render={() =>
                <LandingPage 
                />
              }
            />
            <Route exact path='/signout'
              render={() =>
                <LogoutPage 
                />
              }
            />
            <Route exact path='/admin'
              render={() =>
                <AdminLogin 
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
            <Route exact path='/passwordReset'
              render={() =>
                <PasswordReset
                  updateUser={this.updateUser}
                />
              }
            />
             <Route exact path='/updatePassword'
              render={() =>
                <UpdatePassword
                  updateUser={this.updateUser}
                />
              }
            />
            <Route exact path='/adminSignup'
              render={() =>
                <AdminSignup
                  updateUser={this.updateUser}
                />
              }
            />
            <Route exact path='/signup'
              render={() =>
                <Signup
                  updateUser={this.updateUser}
                />
              }
            />
            <Route exact path='/contact'
              render={() =>
                <Contact
                  updateUser={this.updateUser}
                />
              }
            />
            <Route exact path='/contactUser'
              render={() =>
                this.state.userLoggedIn === true ? (
                  <ContactUser />
                ) : this.state.userLoggedIn === false ? (
                  <Redirect to='/login' />
                ) : (
                  null
                )}
            />
            <Route exact path='/about'
              render={() =>
                <About
                  updateUser={this.updateUser}
                />
              }
            />
            <Route exact path='/aboutUser'
              render={() =>
                this.state.userLoggedIn === true ? (
                  <AboutUser />
                ) : this.state.userLoggedIn === false ? (
                  <Redirect to='/login' />
                ) : (
                  null
                )}
            />
            <Route exact path='/rules'
              render={() =>
                <Rules
                  updateUser={this.updateUser}
                />
              }
            />
            <Route exact path='/mlbRules'
              render={() =>
                this.state.userLoggedIn === true ? (
                  <MlbRules />
                ) : this.state.userLoggedIn === false ? (
                  <Redirect to='/login' />
                ) : (
                  null
                )
              }
            />
            <Route exact path='/nbaPlayoffRules'
              render={() =>
                this.state.userLoggedIn === true ? (
                  <NbaPlayoffRules />
                ) : this.state.userLoggedIn === false ? (
                  <Redirect to='/login' />
                ) : (
                  null
                )
              }
            />
            <Route exact path='/mastersRules'
              render={() =>
                this.state.userLoggedIn === true ? (
                  <MastersRules />
                ) : this.state.userLoggedIn === false ? (
                  <Redirect to='/login' />
                ) : (
                  null
                )
              }
            />
            <Route exact path='/adminPage' render={() => (
              this.state.adminLoggedIn === true ? (
                <AdminPage 
                  username={this.state.userUsername}
                />
                ) : this.state.adminLoggedIn === false ? (
                  <Redirect to='/login' />
                ) : (
                  null
                )
              )
            } 
            />
            <Route exact path='/challengePage' render={() => (
              this.state.adminLoggedIn === true ? (
                <ChallengePage 
                  username={this.state.userUsername}
                />
              ) : this.state.adminLoggedIn === false ? (
                <Redirect to='/login' />
              ) : (
                null
              )
            )} />
            <Route exact path='/mastersDB' render={() => (
              this.state.adminLoggedIn === true ? (
                <MastersPage 
                  username={this.state.userUsername}
                />
              ) : this.state.adminLoggedIn === false ? (
                <Redirect to='/login' />
              ) : (
                null
              )
            )} />
            <Route exact path='/AddDeleteChallenge' render={() => (
              this.state.adminLoggedIn === true ? (
                <AddDeleteChallenge 
                  username={this.state.userUsername}
                />
              ) : this.state.adminLoggedIn === false ? (
                <Redirect to='/login' />
              ) : (
                null
              )
            )} />
            <Route exact path='/editChallenge' render={() => (
              this.state.adminLoggedIn === true ? (
                <EditChallengePage 
                  username={this.state.userUsername}
                />
              ) : this.state.adminLoggedIn === false ? (
                <Redirect to='/login' />
              ) : (
                null
              )
            )} />
            <Route exact path='/usersPage' render={() => (
              this.state.adminLoggedIn === true ? (
                <UsersPage 
                  username={this.state.userUsername}
                />
              ) : this.state.adminLoggedIn === false ? (
                <Redirect to='/login' />
              ) : (
                null
              )
            )} />
            <Route exact path='/nbaGames' render={() => (
              this.state.adminLoggedIn === true ? (
                <NbaGamesPage 
                  username={this.state.userUsername}
                />
              ) : this.state.adminLoggedIn === false ? (
                <Redirect to='/login' />
              ) : (
                null
              )
            )} />
            <Route exact path='/nbaPlayoffGames' render={() => (
              this.state.adminLoggedIn === true ? (
                <NbaPlayoffGamesPage 
                  username={this.state.userUsername}
                />
              ) : this.state.adminLoggedIn === false ? (
                <Redirect to='/login' />
              ) : (
                null
              )
            )} />
            <Route exact path='/mlbGames' render={() => (
              this.state.adminLoggedIn === true ? (
                <MlbGamesPage 
                  username={this.state.userUsername}
                />
              ) : this.state.adminLoggedIn === false ? (
                <Redirect to='/login' />
              ) : (
                null
              )
            )} />
            <Route exact path='/nbaPlayoffs' render={() => (
              this.state.userLoggedIn === true ? (
                <NbaPlayoffActionPage 
                  username={this.state.userUsername}
                />
              ) : this.state.userLoggedIn === false ? (
                <Redirect to='/login' />
              ) : (
                null
              )
            )} />
            <Route exact path='/masters' render={() => (
              this.state.userLoggedIn === true ? (
                <MastersActionPage 
                  username={this.state.userUsername}
                />
              ) : this.state.userLoggedIn === false ? (
                <Redirect to='/login' />
              ) : (
                null
              )
            )} />
            <Route exact path='/home' render={() => (
              this.state.userLoggedIn === true ? (
                <HomePage />
              ) : this.state.userLoggedIn === false ? (
                <Redirect to='/login' />
              ) : (
                null
              )
            )} />
            <Route exact path='/actionNba' render={() => (
              this.state.userLoggedIn === true ? (
                <NbaActionPage 
                  username={this.state.userUsername}
                />
              ) : this.state.userLoggedIn === false ? (
                <Redirect to='/login' />
              ) : (
                null
              )
            )} />
            <Route exact path='/actionMlb' render={() => (
              this.state.userLoggedIn === true ? (
                <MlbActionPage 
                  username={this.state.userUsername}
                />
              ) : this.state.userLoggedIn === false ? (
                <Redirect to='/login' />
              ) : (
                null
              )
            )} />
            <Route exact path='/leaderboard' render={() => (
              this.state.userLoggedIn === true ? (
                <MlbLeaderboard />
              ) : this.state.userLoggedIn === false ? (
                <Redirect to='/login' />
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
