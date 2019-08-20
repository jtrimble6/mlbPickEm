import React, { Component } from 'react'
import API from '../../utils/API'
import NflDivisionActionNav from '../../components/nav/NflDivisionActionNav'
import NflDivisionLeaderboard from '../../components/leaderboards/NflDivisionLeaderboard'
import moment from 'moment';
import '../../css/leaderboardPage.css'

class NflLeadboardPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            redirect: false,
            username: '',
            profPic: '',
            firstName: '',
            lastName: '',
            wins: [],
            winsCount: 0,
            myPicks: [],
            todaysPick: 'No Pick',
            thisWeek: '',
            chalValue: '',
            myValue: '',
            prevWeek: 0,
            challengeData: {}
        }
        this.getUserData = this.getUserData.bind(this);
        this.getWeek = this.getWeek.bind(this);
        this.getChallengeData = this.getChallengeData.bind(this);
        this.getSchedule = this.getSchedule.bind(this);
      }

    componentDidMount() {
        this.getWeek()
        this.getChallengeData();
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

    getSchedule = (week) => {
      // let week = this.state.thisWeek
      
      let self = this
      // self.setState({ yesterday: week })
      // this.getGames()

      // PULL GAMES FROM LAST WEEK
      API.getNflGamesByDate(week)
        .then(res => {
            let games = []
            let thisWeeksGameIds = []
            // console.log('LAST WEEKS GAMES: ', res.data)
            res.data.forEach((game) => {
              let splitDate = game.gameDate.split('T')
              let gameDate = splitDate[0]
              let gameInfo = {
                  gameWeek: game.gameWeek,
                  id: game.gameId,
                  date: gameDate,
                  start: game.gameDate,
                  status: game.gameStatus,
                  homeTeam: game.homeTeam,
                  awayTeam: game.awayTeam,
                  gameWinner: game.gameResult,
                  title: game.homeAlias + ' vs ' + game.awayAlias,
                  color: 'yellow',
                  textColor: 'black',
                  borderColor: 'blue'
                }
                games.push(gameInfo)
                thisWeeksGameIds.push(gameInfo.id)
                self.setState({ 
                  thisWeeksGames: games, 
                  thisWeeksGameIds: thisWeeksGameIds 
                })
                // self.setState({ lastWeeksGameIds: lastWeeksGameIds })
                // console.log('LAST WEEKS GAMES: ', games)
              })

            

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
            this.getSchedule(nflWeeks[w].week)
          } else {
            // console.log('NOT THIS WEEK: ', nflWeeks[w].week)
          } 
        }
  
      }

      getSchedule = (week) => {
        // let week = this.state.thisWeek
        
        let self = this
        // self.setState({ yesterday: week })
        // this.getGames()
  
        // PULL GAMES FROM LAST WEEK
        API.getNflGamesByDate(week)
          .then(res => {
              let games = []
              let thisWeeksGameIds = []
              // console.log('LAST WEEKS GAMES: ', res.data)
              res.data.forEach((game) => {
                let splitDate = game.gameDate.split('T')
                let gameDate = splitDate[0]
                let gameInfo = {
                    gameWeek: game.gameWeek,
                    id: game.gameId,
                    date: gameDate,
                    start: game.gameDate,
                    status: game.gameStatus,
                    homeTeam: game.homeTeam,
                    awayTeam: game.awayTeam,
                    gameWinner: game.gameResult,
                    title: game.homeAlias + ' vs ' + game.awayAlias,
                    color: 'yellow',
                    textColor: 'black',
                    borderColor: 'blue'
                  }
                  games.push(gameInfo)
                  thisWeeksGameIds.push(gameInfo.id)
                  self.setState({ 
                    thisWeeksGames: games, 
                    thisWeeksGameIds: thisWeeksGameIds 
                  })
                  // self.setState({ lastWeeksGameIds: lastWeeksGameIds })
                  // console.log('LAST WEEKS GAMES: ', games)
                })
  
              
  
          })
            .catch(err => console.log(err))
        }

    getUserData = () => {
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

        // console.log(localUser)
        API.getUser(localUser)
          .then(response => {
            let winsCount = response.data[0].wins.length
              this.setState({
                  id: response.data[0]._id,
                  username: response.data[0].username,
                  firstName: response.data[0].firstName,
                  lastName: response.data[0].lastName,
                  profPic: response.data[0].img,
                  wins: response.data[0].wins,
                  winsCount: winsCount,
                  myPicks: response.data[0].picks
              })
              this.getTodaysPick()
            //   console.log('ID: ', this.state.id)
            //   console.log('Username: ', this.state.username)
            //   console.log('First name: ', this.state.firstName)
            //   console.log('Last name: ', this.state.lastName)
            //   console.log('Wins Count: ', this.state.winsCount)
            //   console.log('My picks: ', this.state.myPicks)
          })
          .catch(err => console.log(err))
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
            <div id='leaderboardPage'>
              <NflDivisionActionNav />
              
              <NflDivisionLeaderboard 
                thisWeek={this.state.thisWeek}
                prevWeek={this.state.prevWeek}
                chalValue={this.state.chalValue}
                myValue={this.state.myValue}  
              />
               
                
            </div>
        )
    }

}

export default NflLeadboardPage