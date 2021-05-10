import React, { Component } from 'react'
import API from '../../utils/API'
import NbaPickEmActionNav from '../../components/nav/NbaPickEmActionNav'
import NbaPickEmBar from '../../components/profile/nbaPickEmBar'
import NbaPickEmCalendar from '../../components/calendar/NbaPickEmCalendar'
import Leaderboard from '../../components/leaderboards/NbaPickEmLeaderboard'
import Footer from '../../components/nav/Footer'
//import Games from '../../components/games/Games'
import moment from 'moment';
import $ from 'jquery'
import '../../css/actionPage.css'

class NbaPickEmActionPage extends Component {
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
      // let self = this
      let challengeId = localStorage.getItem('userChallengeId')
      this.setState({
        challengeId: challengeId
      })
      API.getChallenge(challengeId)
        .then(res => {
          // console.log(res)
          this.setState({
            challengeData: res.data[0]
          })
          this.getUserData()
        })
        .catch(err => console.log(err))
    }

    getUserData = () => {
      window.addEventListener('load', this.handlePreloader());
      let localUser = localStorage.getItem('user')
      let challengeId = localStorage.getItem('userChallengeId')
      API.getUser(localUser)
          .then(res => {
            // console.log('THE USER: ', res.data)
            let thisUser = res.data
            let filterWins = (picks) => {
              return picks.result === 'win' && picks.challengeId === challengeId
            }
            let filteredWins = thisUser[0].picks.filter(filterWins)
            // console.log('FILTERED WINS: ', filteredWins)
            this.setState({
              userData: thisUser[0],
              currentUser: thisUser[0],
              username: thisUser[0].username,
              firstName: thisUser[0].firstName,
              lastName: thisUser[0].lastName,
              wins: filteredWins,
              winsCount: filteredWins.length,
              myPicks: thisUser[0].picks,
            }, () => {
              this.getTodaysPick()
            })
          })
          .catch(err => {console.log(err)})
    }

    getTodaysPick = () => {
        let challengeId = localStorage.getItem('userChallengeId')
        let today = moment().format('YYYY-MM-DD')
        let myPicks = this.state.myPicks
        let filterTodaysPick = (pick) => {
          return pick.gameDate === today && pick.challengeId === challengeId 
        }
        let todaysPick = myPicks.filter(filterTodaysPick)
        if(todaysPick[0]) {
          this.setState({todaysPick: todaysPick[0].team})
        }
        // for (var j=0; j<myPicks.length; j++) {
        //     let pickDate = myPicks[j].gameDate
        //     if (pickDate === today) {
              
        //     }
        // }
      }

    render() {

        return (
            <div id='actionPage'>
              <div className="se-pre-con"></div>
              <NbaPickEmActionNav 
                challengeName={this.state.challengeData.challengeName}
              />
              
                <NbaPickEmBar
                  username={this.state.username}
                  winsCount={this.state.winsCount}
                  todaysPick={this.state.todaysPick}
                />
              
              <div className='row calRow'>
                <div className='calBoard col-md-9'>
                  <NbaPickEmCalendar 
                    username={this.state.username}
                  />
                </div>
                <div className='col-md-3 leaderboardCol'>
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

export default NbaPickEmActionPage