import React, { Component } from 'react'
import $ from 'jquery'
import moment from 'moment';
import API from '../../utils/API'
import '../../css/games.css'

class Games extends Component {
    constructor(props) {
      super(props);
      this.state = { 
        year: '',
        userId: '',
        userPicks: [],
        userWins: [],
        fullSchedule: [],
        gameIds: [],
        gameResults: [],
        scheduledGames: [],
        winningTeams: [],
        gameDate: '',
        today: ''
      };
      this.postGames = this.postGames.bind(this);
      this.getGames = this.getGames.bind(this);
      this.getResults = this.getResults.bind(this);
      this.findGameWinners = this.findGameWinners.bind(this);
      this.getSchedule = this.getSchedule.bind(this);
      this.findUserPicks = this.findUserPicks.bind(this);
      this.findUserWins = this.findUserWins.bind(this);
    }

    componentDidMount() {
      // this.getGames()
      this.getSchedule() 
      }

    postGames = (data) => {
      for (let i=0; i<data.length; i++) {
        let gameDateAdj = moment(data[i].scheduled).subtract(6, 'hours').format()
        let splitDate = gameDateAdj.split('T')
        let gameDate = splitDate[0]
        
        let gameData = {
          gameDate: gameDate,
          gameTime: gameDateAdj,
          gameStatus: data[i].status,
          gameId: data[i].id,
          homeTeam: data[i].home.name,
          awayTeam: data[i].away.name,
          homeAlias: data[i].home.alias,
          awayAlias: data[i].away.alias,
          gameResult: 'none'
        }
    
        //POST ENTIRE SCHEDULE
        API.postGames(gameData)
          .then(res=> console.log(res))
          .catch(err => console.log(err))
        }
      }

    getGames = () => {
      let self = this

      // const mlbKey = 't3ed9fy74zen5fynprhhkmw2'
      // const nbaKey = '2kuh4yhq78h5rdmf9vrsprgg'
      // const nbaKey2 = '4y7q3vsbv9rdj9kbevdfng4j'
      const nbaKey3 = 'pucmd9ehjna2p25aa2qzkvn3'

      // API CALL TO PULL ENTIRE SEASON SCHEDULE
      $.ajax({
        // url: "https://cors-everywhere.herokuapp.com/http://api.sportradar.us/mlb/trial/v6.5/en/games/" + this.state.today + "/schedule.json?api_key=" + mlbKey,
        url: 'https://cors-everywhere.herokuapp.com/http://api.sportradar.us/nba/trial/v5/en/games/2018/REG/schedule.json?api_key=' + nbaKey3,
        type: 'GET',
        success: function(data) {
          self.setState({ fullSchedule: data.games });
          // POST ENTIRE SCHEDULE
          self.postGames(data.games)
          }
        })
      }
    
    getResults = () => {
      let self = this
      let gameIds = self.state.gameIds
      let gameResults = []
      
      // const nbaKey = '2kuh4yhq78h5rdmf9vrsprgg'
      // const nbaKey2 = '4y7q3vsbv9rdj9kbevdfng4j'
      const nbaKey3 = 'pucmd9ehjna2p25aa2qzkvn3'

      // API CALL TO GET EACH NBA GAME RESULT (DELAY 1.5 SECONDS)
      for (let m=0; m<gameIds.length; m++) {
        let k = m
        setTimeout ( 
          function() {
            $.ajax({
              url: 'https://cors-everywhere.herokuapp.com/http://api.sportradar.us/nba/trial/v5/en/games/' + gameIds[k] + '/boxscore.json?api_key=' + nbaKey3,
              type: 'GET',
              success: function(data) {
                console.log('Game results: ', data)
                gameResults.push(data)
                self.setState({gameResults: gameResults})
                self.findGameWinners()
              }
            })
          }, 1500*k)
      }
      }

    findGameWinners = () => {
      // FIND GAME RESULTS FROM YESTERDAY
      let gameResults = this.state.gameResults
      let winningTeams = []
      for (let x=0; x<gameResults.length; x++) {
        let gameId = gameResults[x].id
        let gameDate = this.state.today
        let homeTeam = {
            team: gameResults[x].home.market + ' ' + gameResults[x].home.name ,
            points: gameResults[x].home.points
          }
        let awayTeam = {
            team: gameResults[x].away.market + ' ' + gameResults[x].away.name,
            points: gameResults[x].away.points
          }

        if (homeTeam.points > awayTeam.points) {
            winningTeams.push({gameId: gameId, gameDate: gameDate, winningTeam: homeTeam.team})
          } else {
            winningTeams.push({gameId: gameId, gameDate: gameDate, winningTeam: awayTeam.team})
          }
          this.setState({ winningTeams: winningTeams })
        }

      this.postGameWinners(this.state.winningTeams)

      }

    postGameWinners = (data) => {
      for (let y=0; y<data.length; y++) {
        let gameDate = data[y].gameDate
        let gameId = data[y].gameId
        let gameResult = { gameResult: data[y].winningTeam }
        API.updateGame(gameDate, gameId, gameResult)
          .then(res => console.log(res))
          .catch(err => console.log(err))
        } 
      }

    getSchedule = () => {
      let date = moment().subtract(1, 'day').format('YYYY-MM-DD')
      let self = this
      self.setState({ today: date })
      // this.getGames()

      // PULL GAMES FROM YESTERDAY
      API.getGamesByDate(date)
        .then(res => {
            let games = []
            let gameIds = []
            res.data.forEach((game) => {
              let splitDate = game.gameDate.split('T')
              let gameDate = splitDate[0]
              let gameInfo = {
                  id: game.gameId,
                  date: gameDate,
                  start: game.gameDate,
                  status: game.gameStatus,
                  homeTeam: game.homeTeam,
                  awayTeam: game.awayTeam,
                  gameWinner: game.gameResult.gameResult,
                  title: game.homeAlias + ' vs ' + game.awayAlias,
                  color: 'yellow',
                  textColor: 'black',
                  borderColor: 'blue'
                }
                games.push(gameInfo)
                gameIds.push(gameInfo.id)
                self.setState({ scheduledGames: games })
                self.setState({ gameIds: gameIds })
              })

            // GET RESULTS FROM YESTERDA IF THEY HAVEN'T BEEN PULLED(UNDEFINED)
            console.log('THESE GAMES: ', this.state.scheduledGames)
            if(this.state.scheduledGames[0].gameWinner === undefined) {
                self.getResults()
              }

            //FIND ALL USERS PICKS
            self.findUserPicks()

        })
          .catch(err => console.log(err))
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
      } 

      //CHECK TO SEE IF USER HAS ALREADY WON WITH THIS TEAM
      let pickAlreadyWon = (wins) => {
        return wins.win === thisPickTeam
      }
      console.log()
      let thisPickWinner = userWins.filter(pickAlreadyWon)
      if (thisPickWinner.length > 0) {
        //console.log('ALREADY A WINNER')
        alreadyWon = true
      }
  
      if (alreadyWon) {
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
            //debugger;
            // API.updatePick(userId, date, result) 
            // .then (res => {
            //   console.log(res)
            // })
            // .catch(err => console.log(err))

            //ADD NEW WINS TO USER DB
            API.addWin(userId, newWin)
              .then (res => {
                console.log(res)
              })
              .catch(err => console.log(err))
          
            }
          }

          // if (newWin === null) {
          //   let result = 'loss'
          //   console.log('THIS IS A LOSS: ', thisPick)
          //   API.updatePick(userId, date, result) 
          //   .then (res => {
          //     console.log(res)
          //   })
          //   .catch(err => console.log(err))
          // }
  
        // debugger;

        }

      }

    render() {
      let uuidv4 = require('uuid/v4')
      return (
        //RENDER USER WINNING PICKS
        <div className='winningPicks'>
          <h2>Winning Picks</h2> <hr />
          {
            this.state.userWins.map((userWin, i) => (
              <p key={uuidv4()}>
                {i+1}. {userWin.win}
              </p>
            ))
          }
        </div>
      )
    }
}

export default Games