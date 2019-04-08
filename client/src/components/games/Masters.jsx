import React, { Component } from 'react'
import $ from 'jquery'
import moment from 'moment';
import API from '../../utils/API'
import '../../css/masters.css'

class Masters extends Component {
    constructor(props) {
      super(props);
      this.state = { 
        year: '',
        userId: '',
        userPicks: [],
        userScore: '',
        golfers: [],
        today: ''
      };
      this.postGolfers = this.postGolfers.bind(this);
      this.getGolfers = this.getGolfers.bind(this);
      this.getSatGolfers = this.getSatGolfers.bind(this);
      this.postSatGolfers = this.postSatGolfers.bind(this);
      this.pullSatGolfers = this.pullSatGolfers.bind(this);
      this.findUserPicks = this.findUserPicks.bind(this);
      this.findUserWins = this.findUserWins.bind(this);
      this.overridePickResult = this.overridePickResult.bind(this);
    }

    componentDidMount() {
      // this.getGolfers()
      // this.getSatGolfers()
      // this.pullSatGolfers()
      // this.getSchedule() 
      }

    postGolfers = (data) => {
      for (let i=0; i<data.length; i++) {
        let golfer = data[i]
        let golferData = {
          id: golfer.id,
          name: golfer.first_name + ' ' + golfer.last_name,
          position: 0,
          rounds: [],
          score: 0
        }
        console.log('GOLFER DATA: ', golferData)
        // debugger;

        //POST ENTIRE SCHEDULE
        API.postGolfers(golferData)
          .then(res=> console.log(res))
          .catch(err => console.log(err))
        }
      }

    postSatGolfers = (data) => {
      for (let i=0; i<data.length; i++) {
        let golfer = data[i]
        let golferData = {
          id: golfer.id,
          name: golfer.first_name + ' ' + golfer.last_name,
          position: golfer.position,
          rounds: golfer.rounds,
          score: golfer.score
        }
        console.log('GOLFER DATA: ', golferData)
        // debugger;

        //POST ENTIRE SCHEDULE
        API.postGolfers(golferData)
          .then(res=> console.log(res))
          .catch(err => console.log(err))
        }
      }

    pullSatGolfers = () => {
        // let self = this
        API.getGolfers()
          .then(res => {
            console.log('ALL SATURDAY GOLFERS: ', res.data )
          })
          .catch(err => console.log(err))

      }

    getSatGolfers = () => {
      let self = this
      const golfKey = 'm8rjy4udu5y27hnysddq6ecu'
      let top20 = []
      // API CALL TO PULL MASTERS LEADERBOARD AFTER FRIDAY
      $.ajax({
        // 2018 LEADERBOARD
        url: 'https://cors-everywhere.herokuapp.com/http://api.sportradar.us/golf-t2/leaderboard/pga/2018/tournaments/b404a8d5-5e33-4417-ae20-5d4d147042ee/leaderboard.json?api_key=' + golfKey,
        // 2019 LEADERBOARD
        // url: 'https://cors-everywhere.herokuapp.com/http://api.sportradar.us/golf-t2/leaderboard/pga/2019/tournaments/fdf12aec-74d2-4f2e-9e0b-00481a32fd34/leaderboard.json?api_key=' + golfKey,
        type: 'GET',
        success: function(data) {
          self.setState({ golfers: data.leaderboard });
          console.log('ALL DATA: ', data)
          console.log('LEADERBOARD: ', data.leaderboard)

          for (var l=0; l<20; l++) {
            let golfer = data.leaderboard[l]
            top20.push(golfer)
          }

          // POST ENTIRE SCHEDULE
          self.postSatGolfers(top20)
          }
        })
      }

    getGolfers = () => {
      let self = this
      const golfKey = 'm8rjy4udu5y27hnysddq6ecu'

      // API CALL TO PULL ENTIRE MASTERS FIELD
      $.ajax({
        url: 'https://cors-everywhere.herokuapp.com/http://api.sportradar.us/golf-t2/summary/pga/2019/tournaments/fdf12aec-74d2-4f2e-9e0b-00481a32fd34/summary.json?api_key=' + golfKey,
        type: 'GET',
        success: function(data) {
          self.setState({ golfers: data.field });
          console.log('ALL DATA: ', data)
          console.log('FIELD: ', data.field)

          // POST ENTIRE SCHEDULE
          self.postGolfers(data.field)
          }
        })
      }

    findUserPicks = () => {
      let self = this
      let thisUser = localStorage.getItem('user')
      //console.log('THIS USER: ', thisUser)

      //FIND USER WINS
      API.getUser(thisUser)
        .then(res => {
          self.setState({
            userWins: res.data[0].wins,
            userPicks: res.data[0].picks,
            userId: res.data[0].username
          })
        })

      // FIND ALL USERS PICKS 
      API.getUsers()
        .then(res => {
          let allUsers = res.data
          for(var u=0; u<allUsers.length; u++) {
            let thisUser = allUsers[u]
            let thisUserObj = {
              userId: thisUser.username,
              userPicks: thisUser.picks,
              userWins: thisUser.wins
              }
            // IF USER HAS MADE PICKS FIND THEIR WINS
            if (thisUser.picks.length > 0) {
              self.findUserWins(thisUserObj)
            }
            
          }
        })
      }

    findUserWins = (userData) => {
      let userId = userData.userId
      let today = this.state.today
      let userPicks = userData.userPicks
      let schedule = this.state.scheduledGames
      let userWins = userData.userWins
      let alreadyWon = false
      //FIND THIS USER'S PICK FOR TODAY
      let thisPickDate = (picks) => {
        return picks.gameDate === today
      }
      let thisPick = userPicks.filter(thisPickDate)
      let thisPickTeam = ''

      //IF THERE IS A PICK FOR TODAY MAKE THAT 'THISPICKTEAM'
      if (thisPick[0]) {
        thisPickTeam = thisPick[0].team
        console.log('THIS PICK RESULT: ',userId, thisPick[0].result)
        if (thisPick[0].result === 'pending') {
          console.log('THESE GAMES ARE STILL PENDING')
          //CHECK TO SEE IF USER HAS ALREADY WON WITH THIS TEAM
        let pickAlreadyWon = (wins) => {
          return wins.win === thisPickTeam
        }
        let thisPickWinner = userWins.filter(pickAlreadyWon)
        if (thisPickWinner.length > 0) {
          //console.log('ALREADY A WINNER')
          alreadyWon = true
        }
    
        if (alreadyWon) {
          console.log(userId, 'HAS ALREADY WON WITH THE: ', thisPickWinner[0].win)
          return;
        } else {
          let newWin = null
          let date = moment().subtract(1, 'day').format('YYYY-MM-DD')
          for (let s=0; s<schedule.length; s++) {
            let winner = schedule[s].gameWinner
            //!IMPORTANT MUST TRIM THE SPACES 
            let thisPick = thisPickTeam.trim()
            if (thisPick === winner) {
              let result = 'win'
              console.log('THIS IS A WINNER: ', thisPick)
              newWin = { win: thisPickTeam }

              // CHANGE PICK RESULT FOR WIN
              let newPick = {
                team: schedule[s].gameWinner,
                gameDate: schedule[s].date,
                gameId: schedule[s].id,
                result: result
              }
              console.log('NEW PICK: ', newPick)
              this.overridePickResult(userId, date, newPick) 
              
              //ADD NEW WINS TO USER DB
              API.addWin(userId, newWin)
                .then (res => {
                  console.log(res)
                })
                .catch(err => console.log(err))
            
              }
            }
    
            // CHANGE PICK RESULT FOR LOSS
            if (newWin === null && thisPick[0]) {
              let result = 'loss'
              let newPick = {
                team: thisPick[0].team,
                gameDate: thisPick[0].gameDate,
                gameId: thisPick[0].gameId,
                result: result
              }
              console.log('THIS IS A LOSS: ', thisPick)
              console.log('RESULT: ', newPick)
              this.overridePickResult(userId, date, newPick) 
              return;
            }
          }
        } else { return }
      } else { return }

      }

    overridePickResult(userId, date, newPick) {
      console.log(date)
      API.deletePick(userId, date)
        .then(res => {
            console.log(res)
        })
        .catch(err => {console.log(err)})
      API.savePick(userId, newPick)
        .then(res => { 
          console.log(res)
          })
        .catch(err => { console.log(err) } )  
      
        // this.toggle()
        // debugger;
        // document.location.reload()
      
      }

    render() {
    //   let uuidv4 = require('uuid/v4')
      return (
        //RENDER USER WINNING PICKS
        <div className='winningPicks'>
          
        </div>
      )
    }
}

export default Masters