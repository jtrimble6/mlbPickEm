import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import API from '../../utils/API'
// import moment from 'moment'
// import { Redirect } from 'react-router-dom'
// import API from '../utils/API'
import AdminBar from '../../components/nav/AdminBar'
import { Button } from 'reactstrap'
import '../../css/adminPage.css'

class AdminPage extends Component {
  constructor(props) {
    super(props) 
    this.state = {
      username: '',
      allChallenges: [],
      url: '',
      redirect: false,
      signInError: false
      }
      this.handleChal = this.handleChal.bind(this)
      this.getAllChallenges = this.getAllChallenges.bind(this)
      this.setRedirect = this.setRedirect.bind(this)
      this.renderRedirect = this.renderRedirect.bind(this)

}

componentDidMount() {
  this.getAllChallenges()
}

handleChal = (event) => {
  console.log('TOGGLE CHAL: ', event.target)
}

getAllChallenges = () => {
  let self = this
  API.getChallenges()
    .then(res => {
      console.log('ALL CHALLENGES FOR ADMIN: ', res.data)
      self.setState({
        allChallenges: res.data
      })
      console.log('ALL CHAL STATE: ', this.state.allChallenges)
    })
}

setRedirect = (event) => {
  console.log('THIS EVENT: ', event.target.dataset.url)
  let url = event.target.dataset.url
  let challengeId = event.target.dataset.challengeid
  localStorage.setItem('userChallengeId', challengeId)
  this.setState({
    url: url,
    challengeId: challengeId,
    redirect: true
  })
}

renderRedirect = () => {
  if (this.state.redirect) {
    return <Redirect to={this.state.url} />
  }
  else {}
}

    render() {
      // let activeChallenges = this.state.allChallenges
      // let uuidv4 = require('uuid/v4')
        return(
            <div id='adminPage'>
            {(this.renderRedirect())}
              <AdminBar />
              
                <h1>Welcome Admin!</h1>

                <div id='adminActions'>
                  <h3>Controls</h3>
                  <Button
                      color='warning'
                      className='adminSignup'
                      data-url='/adminSignup'
                      onClick={this.setRedirect}
                    >
                    Add Admin
                  </Button>
                  <Button
                      color='warning'
                      className='addChallengeButton'
                      data-url='/addDeleteChallenge'
                      onClick={this.setRedirect}
                    >
                    Add/Delete Challenges
                  </Button>
                  <Button
                      color='warning'
                      className='editChallengeButton'
                      data-url='/editChallenge'
                      onClick={this.setRedirect}
                    >
                    Edit Challenges
                  </Button>
                  <Button
                      color='warning'
                      className='nbaGamesButton'
                      data-url='/nbaGames'
                      onClick={this.setRedirect}
                    >
                    NBA Games DB
                  </Button>
                  <Button
                      color='warning'
                      className='challengeButtons'
                      data-url='/mlbGames'
                      onClick={this.setRedirect}
                    >
                    MLB Games DB
                  </Button>
                  <Button
                      color='warning'
                      className='nbaGamesButton'
                      data-url='/nbaPlayoffGames'
                      onClick={this.setRedirect}
                    >
                    NBA Playoff Games (2019)
                  </Button>
                </div>
                <div id="adminUsers">
                  <h3>Users DB</h3>
                  <Button
                    color='danger'
                    className='userButtons'
                    data-url='/usersPage'
                    onClick={this.setRedirect}
                  >
                    Active Users
                  </Button>
                  <Button
                    color='danger'
                    className='challengeButtons'
                    data-url='/challengePage'
                    onClick={this.setRedirect}
                  >
                    Challenge Users 
                  </Button>

                </div>
                <div id="adminChals">
                  <h3>Active Challenges</h3>
                  <Button
                    color='success'
                    className='challengeButtons'
                    data-url='/mlbPickEmDB'
                    onClick={this.setRedirect}
                  >
                    MLB Pick Em Challenge 
                  </Button>
                  <Button
                    color='success'
                    className='challengeButtons'
                    data-url='/nbaPlayoffsDB'
                    data-challengeid='5c9d00af9c45e400175c56a3'
                    onClick={this.setRedirect}
                  >
                    NBA Playoff Challenge
                  </Button>
                  <Button
                    color='success'
                    className='challengeButtons'
                    data-url='/mastersDB'
                    data-challengeid='5caa6602ba5ec50017ed6184'
                    onClick={this.setRedirect}
                  >
                    Masters Challenge
                  </Button>
                </div>
                <div id="futureChals">
                  <h3>Future Challenges</h3>
                  <Button
                    disabled
                    color='secondary'
                    className='challengeButtons'
                  >
                    Future Challenges Will Appear Here
                  </Button>
                </div>
            </div>
        )
    }
}

export default AdminPage