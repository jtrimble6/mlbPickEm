import React, { Component } from 'react'
import API from '../../utils/API'
// import MastersNav from '../../components/nav/mastersNav'
import MastersBar from '../../components/profile/mastersBar'
// import NbaPlayoffGames from '../../components/games/NbaPlayoffGames'
import MastersLeaderboard from '../../components/leaderboards/MastersLeaderboard'
//import Games from '../../components/games/Games'
import AdminBar from '../../components/nav/AdminBar'
import moment from 'moment';
import $ from 'jquery'
import '../../css/actionPage.css'

class MastersActionPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      redirect: false,
      challengeId: '',
      challengeData: {},
      challengeUsers: [],
      currentUser: {},
      username: '',
      firstName: '',
      lastName: '',
      par: 0,
      myPicks: [],
      todaysPick: 'No Pick'
    }
    this.handlePreloader = this.handlePreloader.bind(this)
    this.getChallengeData = this.getChallengeData.bind(this)
    this.getUserData = this.getUserData.bind(this)
    this.getTodaysPick = this.getTodaysPick.bind(this)
  }

    componentDidMount() {
    //   this.getChallengeData();
      // this.getUserData();
    }

    handlePreloader() {
      $(".se-pre-con").fadeOut("slow");
    }

    getChallengeData = () => {
      // console.log('CHALLENGE ID: ', localStorage.getItem('userChallengeId'))
      let self = this
      let challengeId = '5c9ba1f709237528c630baa8'
      // let challengeId = localStorage.getItem('userChallengeId')
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

        // FILTER OUT THIS USER AND SET STATE
        let chalFilter = (challengers) => {
          return challengers.username === localUser
        }
        let thisUser = chalUsers.filter(chalFilter)

        this.setState({
          currentUser: thisUser[0],
          username: thisUser[0].username,
          firstName: thisUser[0].firstName,
          lastName: thisUser[0].lastName,
          par: thisUser[0].par,
          parCount: thisUser[0].par,
          myPicks: thisUser[0].picks,
        })

        this.getTodaysPick()

        console.log('CURRENT LOSSES: ', this.state.lossesCount)
        // console.log('CHAL USERS DATA: ', this.state.challengeData.users)
    }

    getTodaysPick = () => {
        let today = moment().format('YYYY-MM-DD')
        let myPicks = this.state.myPicks
        for (var j=0; j<myPicks.length; j++) {
            let pickDate = myPicks[j].gameDate
            if (pickDate === today) {
              this.setState({todaysPick: myPicks[j].team})
            }
        }
      }

    render() {

        return (
            <div id='actionPage'>
              <AdminBar />
              <div className="se-pre-con"></div>
              {/* <MastersNav 
                challengeName={this.state.challengeData.challengeName}
              /> */}
              
              <MastersBar
                  username={this.state.username}
                  parCount={this.state.parCount}
                  todaysPick={this.state.todaysPick}
                /> 
              
              <div className='row'>
                <div className='calBoard col-md-9'>
                 
                </div>
                <div className='col-md-3'>
                {/* <NbaPlayoffGames
                /> */}
                <div className="leaders row">
                  <MastersLeaderboard   
                  />
                </div>

                {/* <div className="winningTeams row">
                  <Games 
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