import React, { Component } from 'react'
import API from '../../utils/API'
import MastersNav from '../../components/nav/MastersNav'
import MastersBar from '../../components/profile/mastersBar'
// import NbaPlayoffGames from '../../components/games/NbaPlayoffGames'
import MastersLeaderboard from '../../components/leaderboards/MastersLeaderboard'
// import Masters from '../../components/games/Masters'
import MastersBoard from '../../components/games/MastersBoard'
// import AdminBar from '../../components/nav/AdminBar'
import moment from 'moment';
import $ from 'jquery'
import '../../css/actionPage.css'

class MastersActionPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      redirect: false,
      userId: '',
      challengeId: '',
      challengeData: {},
      challengeUsers: [],
      currentUser: {},
      username: '',
      firstName: '',
      lastName: '',
      par: 0,
      parLeader: -9,
      myPicks: [],
      todaysPick: 'No Selection',
      todaysPick1: '',
      todaysPick2: ''
    }
    this.handlePreloader = this.handlePreloader.bind(this)
    this.getChallengeData = this.getChallengeData.bind(this)
    this.getUserData = this.getUserData.bind(this)
    this.getTodaysPick = this.getTodaysPick.bind(this)
  }

    componentDidMount() {
      this.getChallengeData();
      // this.getUserData();
    }

    handlePreloader() {
      $(".se-pre-con").fadeOut("slow");
    }

    getChallengeData = () => {
      // console.log('CHALLENGE ID: ', localStorage.getItem('userChallengeId'))
      let self = this

      // PRODUCTION
      // let challengeId = '5caa6602ba5ec50017ed6184'
      // let challengeId = localStorage.getItem('userChallengeId')

      // DEVELOPMENT
      // let challengeId = '5ca42756e334ea0fb2e7fffd'

      let challengeId = localStorage.getItem('userChallengeId')
      this.setState({
        challengeId: challengeId
      })
      API.getChallenge(challengeId)
        .then(res => {
          // console.log('this challenge data: ', res.data)
          self.setState({
            challengeData: res.data[0]
          })
          self.getUserData()
        })
        .catch(err => console.log(err))
    }

    getUserData = () => {
      window.addEventListener('load', this.handlePreloader());
        let localUser = localStorage.getItem('user')
        let chalUsers = this.state.challengeData.users
        // console.log('CHALLENGE: ', this.state.challengeData)

        // FIND LEADING SCORE
        let chalPoints = []
        for (var t=0; t<chalUsers.length; t++) {
          let points = parseInt(chalUsers[t].points)
          console.log('THIS POINT: ', points)
          chalPoints.push(points)
        }
        let leadingScore = Math.min.apply('Math', chalPoints)
        console.log('CHALLENGE LEADER POINTS: ', leadingScore)

        // FILTER OUT THIS USER AND SET STATE
        let chalFilter = (challengers) => {
          return challengers.username === localUser
        }
        let thisUser = chalUsers.filter(chalFilter)

        this.setState({
          currentUser: thisUser[0],
          userId: thisUser[0].username,
          username: thisUser[0].username,
          firstName: thisUser[0].firstName,
          lastName: thisUser[0].lastName,
          par: thisUser[0].points,
          myPicks: thisUser[0].picks,
          parLeader: leadingScore
        })

        this.getTodaysPick()

        // console.log('CURRENT USER: ', this.state.currentUser)
        // console.log('CHAL USERS DATA: ', this.state.challengeData.users)
    }

    getTodaysPick = () => {
        let today = moment().format('YYYY-MM-DD')
        let myPicks = this.state.myPicks
        for (var j=0; j<myPicks.length; j++) {
            let golfers = myPicks[j]
            let pickDate = golfers.gameDate
            if (pickDate === today) {
              this.setState({
                todaysPick1: golfers.golfer1,
                todaysPick2: golfers.golfer2,
              })
            }
            // this.setState({todaysPick: myPicks[j]})
            // console.log('MY GOLFER #1: ', this.state.todaysPick1)
            // console.log('MY GOLFER #2: ', this.state.todaysPick2)
        }
      }

    render() {

        return (
            <div id='actionPage'>
              {/* <AdminBar /> */}
              <div className="se-pre-con"></div>
              <MastersNav 
                challengeName={this.state.challengeData.challengeName}
              />
              
              <MastersBar
                  username={this.state.username}
                  par={this.state.par}
                  parLeader={this.state.parLeader}
                  userPicks={this.state.myPicks}
                  todaysPick={this.state.todaysPick}
                  todaysPicks={this.state.todaysPick1 + ' & ' + this.state.todaysPick2}
                  todaysPick1={this.state.todaysPick1}
                  todaysPick2={this.state.todaysPick2}
                /> 
              
              <div className='row'>

                <div className='mastersBoard col-md-9'>
                  
                  <MastersBoard 
                    userId={this.state.userId}
                    challengeId={this.state.challengeId}
                  />
                  
                </div>

                <div className='col-md-3'>

                  <div className="leaders row">
                    <MastersLeaderboard   
                      parLeader={this.state.parLeader}
                    />
                  </div>

                  {/* <div className="winningTeams row">
                    <Masters 
                      username={this.state.username}
                    />
                  </div> */}
                  
                </div>
              </div>
            </div>
        )
    }

}

export default MastersActionPage