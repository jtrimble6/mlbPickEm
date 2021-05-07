import React, { Component } from 'react'
import API from '../../utils/API'
import MlbActionNav from '../../components/nav/MlbActionNav'
import MlbPickEmBar from '../../components/profile/mlbPickEmBar'
import MlbCalendar from '../../components/calendar/MlbCalendar'
import Leaderboard from '../../components/leaderboards/MlbPickEmLeaderboard'
import Footer from '../../components/nav/Footer'
//import Games from '../../components/games/Games'
import moment from 'moment';
import $ from 'jquery'
import '../../css/actionPage.css'

class MlbActionPage extends Component {
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
      wins: [],
      winsCount: 0,
      lossesCount: 0,
      myPicks: [],
      todaysPick: 'No Pick'
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
      let challengeId = localStorage.getItem('userChallengeId')
      this.setState({
        challengeId: challengeId
      })
      API.getChallenge(challengeId)
        .then(res => {
          // console.log(res)
          self.setState({
            challengeData: res.data[0]
          })
          self.getUserData()
        })
        .catch(err => console.log(err))
    }

    getUserData = () => {
      window.addEventListener('load', this.handlePreloader());
      let challengeId = localStorage.getItem('userChallengeId')
      let localUser = localStorage.getItem('user')
      API.getUser(localUser)
          .then(res => {
            console.log('THE USER: ', res.data)
            let thisUser = res.data
            let filterChallengePicks = (picks) => {
              return picks.challengeId === challengeId
            }
            let filteredPicks = thisUser[0].picks.filter(filterChallengePicks)
            let filterWins = (picks) => {
              return picks.result === 'win' && picks.challengeId === challengeId
            }
            let filteredWins = thisUser[0].picks.filter(filterWins)
            let filterLosses = (picks) => {
              return picks.result === 'loss' && picks.challengeId === challengeId
            }
            let filteredLosses = thisUser[0].picks.filter(filterLosses)
            // console.log('FILTERED WINS: ', filteredWins)
            this.setState({
              userData: thisUser[0],
              currentUser: thisUser[0],
              username: thisUser[0].username,
              firstName: thisUser[0].firstName,
              lastName: thisUser[0].lastName,
              wins: filteredWins,
              winsCount: filteredWins.length,
              lossesCount: filteredLosses.length,
              myPicks: filteredPicks,
            }, () => {
              this.getTodaysPick()
            })
          })
          .catch(err => {console.log(err)})
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
              <div className="se-pre-con"></div>
              <MlbActionNav 
                challengeName={this.state.challengeData.challengeName}
              />
              
              <MlbPickEmBar
                  username={this.state.username}
                  winsCount={this.state.winsCount}
                  lossesCount={this.state.lossesCount}
                  todaysPick={this.state.todaysPick}
                />
              
              <div className='row calRow'>
                <div className='calBoard col-md-9'>
                  <MlbCalendar 
                    username={this.state.username}
                  />
                </div>
                <div className='col-md-3'>
                <div className="leaders row">
                  <Leaderboard   
                  />
                </div>

                {/* <div className="winningTeams row">
                  <Games 
                    username={this.state.username}
                  />
                </div> */}
                  
                </div>
              </div>
              <Footer />
            </div>
        )
    }

}

export default MlbActionPage