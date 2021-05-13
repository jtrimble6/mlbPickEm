import React, { Component } from 'react'
import API from '../../utils/API'
import NhlPickEmActionNav from '../../components/nav/NbaPickEmActionNav'
import NhlPlayoffBar from '../../components/profile/nhlPlayoffBar'
import NhlPlayoffCalendar from '../../components/calendar/NhlPlayoffCalendar'
// import NhlPlayoffGames from '../../components/games/NhlPlayoffGames'
import NhlPlayoffLeaderboard from '../../components/leaderboards/NhlPlayoffLeaderboard'
//import Games from '../../components/games/Games'
// import AdminBar from '../../components/nav/AdminBar'
import moment from 'moment';
import $ from 'jquery'
import '../../css/actionPage.css'

class NhlPlayoffActionPage extends Component {
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
      losses: [],
      lossesCount: 0,
      winsCount: 0,
      pointsCount: 0,
      myPicks: [],
      today: moment().subtract(258, 'days').format('YYYY-MM-DD'),
      yesterday: moment().subtract(259, 'days').format('YYYY-MM-DD'),
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
      // let challengeId = '5c9ba1f709237528c630baa8' 
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
      let challengeId = localStorage.getItem('userChallengeId')
      API.getUser(localUser)
          .then(res => {
            // console.log('THE USER: ', res.data)
            let thisUser = res.data
            let filterWins = (picks) => {
              return picks.result === 'win' && picks.challengeId === challengeId
            }
            let filteredWins = thisUser[0].picks.filter(filterWins)
            let filterLosses = (picks) => {
              return picks.result === 'loss' && picks.challengeId === challengeId
            }
            let filteredLosses = thisUser[0].picks.filter(filterLosses)
            // console.log('FILTERED WINS: ', filteredWins)
            let pointsCount = 0
            filteredWins.forEach(win => {
              // console.log('THIS WIN: ', win)
              let winSeeding = win.teamSeed
              // console.log('Addition',pointsCount, winSeeding)
              pointsCount = pointsCount + winSeeding
              // console.log('Total: ', pointsCount)
            })
            this.setState({
              userData: thisUser[0],
              currentUser: thisUser[0],
              username: thisUser[0].username,
              firstName: thisUser[0].firstName,
              lastName: thisUser[0].lastName,
              pointsCount: pointsCount,
              wins: filteredWins,
              winsCount: filteredWins.length,
              lossesCount: filteredLosses.length,
              myPicks: thisUser[0].picks,
            }, () => {
              this.getTodaysPick()
            })
          })
          .catch(err => {console.log(err)})
      
        // let localUser = localStorage.getItem('user')
        // let chalUsers = this.state.challengeData.users

        // // FILTER OUT THIS USER AND SET STATE
        // let chalFilter = (challengers) => {
        //   return challengers.username === localUser
        // }
        // let thisUser = chalUsers.filter(chalFilter)

        // console.log('USER WINS: ', thisUser[0].wins)

        // this.setState({
        //   currentUser: thisUser[0],
        //   username: thisUser[0].username,
        //   firstName: thisUser[0].firstName,
        //   lastName: thisUser[0].lastName,
        //   losses: thisUser[0].points,
        //   lossesCount: thisUser[0].points,
        //   winsCount: thisUser[0].wins.length,
        //   myPicks: thisUser[0].picks
        // })

        // this.getTodaysPick()

        // console.log('CHAL USERS DATA: ', this.state.challengeData.users)
    }

    getTodaysPick = () => {
        let today = this.state.today
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
              <NhlPickEmActionNav 
                challengeName={this.state.challengeData.challengeName}
              />
              
              <NhlPlayoffBar
                username={this.state.username}
                lossesCount={this.state.lossesCount}
                winsCount={this.state.winsCount}
                todaysDate={this.state.today}
                todaysPick={this.state.todaysPick}
                pointsCount={this.state.pointsCount}
              /> 
              
              <div className='row calRow'>
                <div className='calBoard col-md-9'>
                  <NhlPlayoffCalendar 
                    todaysDate={this.state.today}
                    yesterdaysDate={this.state.yesterday}
                    username={this.state.username}
                  />
                </div>
                <div className='col-md-3 leaderboardCol'>
                <div className="leaders row">
                  <NhlPlayoffLeaderboard   
                    todaysDate={this.state.today}
                  />
                </div>
                  
                </div>
              </div>
            </div>
        )
    }

}

export default NhlPlayoffActionPage