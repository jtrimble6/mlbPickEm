import React, { Component } from 'react'
import API from '../../utils/API'
import moment from 'moment-timezone';
import NflDivisionActionNav from '../../components/nav/NflDivisionActionNav'
import NflDivisionBar from '../../components/profile/nflDivisionBar'
import NflDivisionCalendar from '../../components/calendar/NflDivisionCalendar'
import NflDivisionLeaderboard from '../../components/leaderboards/NflDivisionLeaderboard'
//import Games from '../../components/games/Games'
// import moment from 'moment';
import $ from 'jquery'
import '../../css/actionPage.css'

class NflDivisionActionPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      thisWeek: '',
      prevWeek: 0,
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
      chalValue: '',
      myValue: '',
      myPicks: [],
      todaysPick: 'No Pick',
      todaysPickValue: '',
      todaysPickStart: '',
    }
    this.handlePreloader = this.handlePreloader.bind(this)
    this.getChallengeData = this.getChallengeData.bind(this)
    this.getUserData = this.getUserData.bind(this)
    this.getTodaysPick = this.getTodaysPick.bind(this)
    this.getWeek = this.getWeek.bind(this)
  }

    componentDidMount() {
      this.getChallengeData();
      this.getWeek();
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
            challengeData: res.data[0],
            chalValue: res.data[0].parLine
          })
          self.getUserData()
        })
        .catch(err => console.log(err))
    }

    getWeek = () => {
      let nflWeeks = [
        {
          date: '2019-06-04',
          week: 1
        },
        {
          date: '2019-06-11',
          week: 2
        },
        {
          date: '2019-06-18',
          week: 3
        },
        {
          date: '2019-06-25',
          week: 4
        },
        {
          date: '2019-07-02',
          week: 5
        },
        {
          date: '2019-07-09',
          week: 6
        },
        {
          date: '2019-07-16',
          week: 7
        },
        {
          date: '2019-07-23',
          week: 8
        },
        {
          date: '2019-07-30',
          week: 9
        },
        {
          date: '2019-08-06',
          week: 10
        },
        {
          date: '2019-08-13',
          week: 11
        },
        {
          date: '2019-08-20',
          week: 12
        },
        {
          date: '2019-08-27',
          week: 13
        },
        {
          date: '2019-09-03',
          week: 14
        },
        {
          date: '2019-09-10',
          week: 15
        },
        {
          date: '2019-09-17',
          week: 16
        },
        {
          date: '2019-09-24',
          week: 17
        }
      ]

      let today = moment().format('YYYY-MM-DD')
      let _this = this
      for (let w=0; w<nflWeeks.length; w++) {
        let thisWeek = nflWeeks[w].date
        // let nextWeek = nflWeeks[w++].date
        // let prevWeek = nflWeeks[w--].date
        if(moment(today).isSameOrAfter(thisWeek) && moment(today).isBefore(moment(thisWeek).add(7, 'days').format('YYYY-MM-DD'))) {
          // console.log('THIS WEEK: ', nflWeeks[w].week)
          if (nflWeeks[w].week > 1) {
            _this.setState({
              prevWeek: nflWeeks[w].week - 1
            })
          }
          _this.setState({
            thisWeek: nflWeeks[w].week
          })
        } else {
          // console.log('NOT THIS WEEK: ', nflWeeks[w].week)
        } 
      }

    }

    getUserData = () => {
      window.addEventListener('load', this.handlePreloader());
        let localUser = localStorage.getItem('user')
        let chalUsers = this.state.challengeData.users
        // console.log('CHAL VALUE: ', this.state.chalValue)
        // FILTER OUT THIS USER AND SET STATE
        let chalFilter = (challengers) => {
          return challengers.username === localUser
        }
        let thisUser = chalUsers.filter(chalFilter)
        let userPicks = thisUser[0].picks
        let userValue = 0
        for (let s=0; s<userPicks.length; s++) {
          let thisValue = userPicks[s].teamValue
          userValue = userValue + thisValue
        }
        // console.log('FINAL USER VALUE: ', userValue)

        // console.log('USER WINS: ', thisUser[0].wins)

        // console.log('THIS USER: ', thisUser)
        this.setState({
          currentUser: thisUser[0],
          username: thisUser[0].username,
          firstName: thisUser[0].firstName,
          lastName: thisUser[0].lastName,
          wins: thisUser[0].wins,
          winsCount: thisUser[0].wins.length,
          myValue: userValue,
          myPicks: thisUser[0].picks,
        })

        this.getTodaysPick()

        // console.log('CURRENT USER PICKS: ', this.state.myPicks)
        // console.log('CHAL USERS DATA: ', this.state.challengeData.users)
    }

    getTodaysPick = () => {
        let today = this.state.thisWeek
        let myPicks = this.state.myPicks
        // console.log('MY PICKS: ', myPicks)
        // console.log('THIS WEEK: ', today)
        
        let todaysPickFunc = (picks) => {
          // console.log(picks.gameWeek === today)
          return picks.gameWeek === today
        }
        let todaysPick = 'No Pick'
        let todaysPickValue = ''
        let todaysPickStart = ''
        let todaysPickObj = myPicks.filter(todaysPickFunc)
        // let todaysPickStartAlt =
        // console.log('TODAYS PICK: ', todaysPickObj)
        if (todaysPickObj[0]) {
          todaysPick = todaysPickObj[0].team
          todaysPickValue = todaysPickObj[0].teamValue
          todaysPickStart = moment.tz(todaysPickObj[0].gameTime, 'America/New_York').subtract(1, 'hour').format()
        }
        
        // console.log('TODAYS PICK: ', todaysPick)
        this.setState({
          todaysPick: todaysPick,
          todaysPickValue: todaysPickValue,
          todaysPickStart: todaysPickStart
        })
        // for (var j=0; j<myPicks.length; j++) {
        //     let pickDate = myPicks[j].gameDate
        //     if (pickDate === today) {
        //       this.setState({todaysPick: myPicks[j].team})
        //     }
        // }
      }

    render() {

        return (
            <div id='actionPage'>
              <div className="se-pre-con"></div>
              <NflDivisionActionNav 
                challengeName={this.state.challengeData.challengeName}
              />
              
                <NflDivisionBar
                  username={this.state.username}
                  winsCount={this.state.winsCount}
                  myValue={this.state.myValue}
                  chalValue={this.state.chalValue}
                  todaysPick={this.state.todaysPick}
                  todaysPickValue={this.state.todaysPickValue}
                  todaysPickStart={this.state.todaysPickStart}
                  thisWeek={this.state.thisWeek}
                  prevWeek={this.state.prevWeek}

                />
              
              <div className='row'>
                <div className='calBoard col-md-9'>
                  <NflDivisionCalendar 
                    username={this.state.username}
                    thisWeek={this.state.thisWeek}
                    prevWeek={this.state.prevWeek}
                    chalValue={this.state.chalValue}
                    myValue={this.state.myValue}
                    todaysPickStart={this.state.todaysPickStart}
                  />
                </div>
                <div className='col-md leaderboardRow'>
                <div className="leaders row">
                  <NflDivisionLeaderboard 
                    thisWeek={this.state.thisWeek}
                    prevWeek={this.state.prevWeek}
                    chalValue={this.state.chalValue}
                    myValue={this.state.myValue}  
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

export default NflDivisionActionPage