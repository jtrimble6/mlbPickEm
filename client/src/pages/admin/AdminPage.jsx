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

                <div className="row adminRow">
                  <div id='adminActions' className='col-6'>
                    <h3>Admin Controls</h3>
                    <Button
                        color='warning'
                        className='adminSignup'
                        data-url='/manageAdmins'
                        onClick={this.setRedirect}
                      >
                      Add Admin
                    </Button>
                    <Button
                        color='warning'
                        className='addChallengeButton'
                        data-url='/manageChallenges'
                        onClick={this.setRedirect}
                      >
                      Manage Challenges
                    </Button>
                    {/* <Button
                        color='warning'
                        className='editChallengeButton'
                        data-url='/editChallenge'
                        onClick={this.setRedirect}
                      >
                      Edit Challenges
                    </Button> */}
                    </div>

                    <div id='adminActions' className='col-6' >
                      <h3>Sporting Event Schedules</h3>
                      <Button
                          color='primary'
                          className='nbaGamesButton'
                          data-url='/nbaGames'
                          onClick={this.setRedirect}
                        >
                        NBA Season
                      </Button>
                      <Button
                          color='primary'
                          className='nbaGamesButton'
                          data-url='/nbaPlayoffGames'
                          onClick={this.setRedirect}
                        >
                        NBA Playoffs
                      </Button>
                      <Button
                          color='primary'
                          className='nbaGamesButton'
                          data-url='/mlbGames'
                          onClick={this.setRedirect}
                        >
                        MLB Season
                      </Button>
                    </div>
                  </div>


                <div className="row adminRow">
                  <div id='adminActions' className='col-6' >
                    <h3>Users</h3>
                      <Button
                        color='danger'
                        className='userButtons'
                        data-url='/usersPage'
                        onClick={this.setRedirect}
                      >
                        Active Users
                      </Button>
                      {/* <Button
                        color='danger'
                        className='challengeButtons'
                        data-url='/challengePage'
                        onClick={this.setRedirect}
                      >
                        Challenge Users 
                      </Button> */}
                  </div>

                  <div id='adminActions' className='col-6'> 
                    <h3>Challenge Data</h3>
                      <Button
                        color='success'
                        className='challengeButtons'
                        data-url='/challengeTeams'
                        onClick={this.setRedirect}
                      >
                      Challenge Teams
                    </Button>
                    <Button
                      color='success'
                      className='challengeButtons'
                      data-url='/mlbPickEmDB'
                      onClick={this.setRedirect}
                    >
                      MLB Pick Em Challenges 
                    </Button>
                    <Button
                      color='success'
                      className='challengeButtons'
                      data-url='/nbaPickEmDB'
                      data-challengeid='6080977b16093c2245f11ffd'
                      onClick={this.setRedirect}
                    >
                      NBA Pick Em Challenges
                    </Button>
                    <Button
                      color='success'
                      className='challengeButtons'
                      data-url='/nbaPlayoffDB'
                      data-challengeid='5c9d00af9c45e400175c56a3'
                      onClick={this.setRedirect}
                    >
                      NBA Playoff Challenges
                    </Button>
                    <Button
                      color='success'
                      className='challengeButtons'
                      data-url='/mastersDB'
                      data-challengeid='5caa6602ba5ec50017ed6184'
                      onClick={this.setRedirect}
                    >
                      Golf Challenges
                    </Button>
                    <Button
                          color='success'
                          className='challengeButtons'
                          data-url='/nflDivisionAdmin'
                          onClick={this.setRedirect}
                        >
                      NFL Divisional Challenges
                    </Button>
                  </div>
                </div>

                <div className="row adminRow">
                  <div id='adminActions' className='col-6'> 
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
                </div>
            </div>
        )
    }
}

export default AdminPage