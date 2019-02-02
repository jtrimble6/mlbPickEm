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
      this.getYesterdaysGames = this.getYesterdaysGames.bind(this);
      this.getResults = this.getResults.bind(this);
      this.findGameWinners = this.findGameWinners.bind(this);
      this.getSchedule = this.getSchedule.bind(this);
      this.findUserPicks = this.findUserPicks.bind(this);
      this.findUserWins = this.findUserWins.bind(this);
    }

    componentDidMount() {
      // this.getGames()
      this.getSchedule()
      // this.findUserPicks() 
      }

    postGames = (data) => {
      for (let i=0; i<data.length; i++) {
        console.log(data[i])
        // let gameDate = moment(data[i].scheduled).format('YYYY-MM-DD')
        let gameDateAdj = moment(data[i].scheduled).subtract(6, 'hours').format()
        let splitDate = gameDateAdj.split('T')
        let gameDate = splitDate[0]
        
        // let gameDate = onlyDate.replace(/-/g, "");
        console.log('This is the real time: ', gameDateAdj)
        console.log('This is the real date: ', gameDate)
        
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
        console.log('Game data!!: ', gameData)
        // API.postGames(gameData)
        //   .then(res=> console.log(res))
        //   .catch(err => console.log(err))
        }
      }

    getGames = () => {
      // const mlbKey = 't3ed9fy74zen5fynprhhkmw2'
      const nbaKey = '2kuh4yhq78h5rdmf9vrsprgg'
      let self = this
      $.ajax({
        // url: "https://cors-everywhere.herokuapp.com/http://api.sportradar.us/mlb/trial/v6.5/en/games/" + this.state.today + "/schedule.json?api_key=" + mlbKey,
        url: 'https://cors-everywhere.herokuapp.com/http://api.sportradar.us/nba/trial/v5/en/games/2018/REG/schedule.json?api_key=' + nbaKey,
        type: 'GET',
        success: function(data) {
          // console.log('GAMES: ', data.games);
          self.setState({ fullSchedule: data.games });
          console.log('FULL SCHEDULE: ', self.state.fullSchedule);
          self.postGames(data.games)
          }
        })
      }

    getYesterdaysGames = (date) => {
      console.log('THIS IS RUNNING')
      // let self = this
      let yesterdaysGames = this.state.scheduledGames
      // let yesterdayInt = 1
      // let yesterday = moment().subtract(1, 'days').format('YYYY-MM-DD')
      // self.setState({ gameDate: yesterday })
      // let yesterdayDate = yesterday.replace(/-/g, "");
      console.log('THIS IS YESTERDAY: ', date)
      console.log('THE GAMES: ', yesterdaysGames)
      // for (var b=0; b<yesterdayInt; b++) {
      //   let yesterday = moment().subtract(b, 'days').format('YYYY-MM-DD')
      //   self.setState({ gameDate: yesterday })
        // API.getGamesByDate(yesterday)
        // .then(res => {
        //   console.log('Yesterdays games: ', res.data)
        //   for (var k=0; k<res.data.length; k++) {
        //     // console.log('Game ID: ', res.data[k].gameId)
        //     let thisGameId = res.data[k].gameId
        //     yesterdaysGames.push(thisGameId)
        //     self.setState({ gameIds: yesterdaysGames })
        //   }
        //   // this.getResults()
        // })
        // .catch(err => console.log(err))
        // }
      }
    
    getResults = () => {
      let self = this
      let gameIds = self.state.gameIds
      let gameResults = []
      console.log('ONLY THESE GAME IDS: ', gameIds)
      const nbaKey = '2kuh4yhq78h5rdmf9vrsprgg'
      for (var m=0; m<gameIds.length; m++) {
        let k = m
        // console.log('Need each result: ', gameIds[k])
        setTimeout ( 
          function() {
            $.ajax({
              url: 'https://cors-everywhere.herokuapp.com/http://api.sportradar.us/nba/trial/v5/en/games/' + gameIds[k] + '/boxscore.json?api_key=' + nbaKey,
              type: 'GET',
              success: function(data) {
                // console.log('Game results: ', data)
                gameResults.push(data)
                self.setState({gameResults: gameResults})
                self.findGameWinners()
              }
            })
          }, 1500*k)
      }
      }

    findGameWinners = () => {
      console.log('Showing results: ', this.state.gameResults)
      let gameResults = this.state.gameResults
      let winningTeams = []
      for (var x=0; x<gameResults.length; x++) {
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
          // console.log('Winning Teams: ', winningTeams)
          this.setState({ winningTeams: winningTeams })
        }

      // console.log('WINNING TEAMS: ', winningTeams)

      this.postGameWinners()

      }

    postGameWinners = () => {
        let gameWinners = this.state.winningTeams
        console.log("Getting game winners: ", gameWinners)
        for (var y=0; y<gameWinners.length; y++) {
          
          let gameDate = gameWinners[y].gameDate
          let gameId = gameWinners[y].gameId
          let gameResult = { gameResult: gameWinners[y].winningTeam }

          // console.log('ALL THE INFO: ', gameDate + ' ' + gameId + ' ' + gameResult)
  
          API.updateGame(gameDate, gameId, gameResult)
            .then(res => console.log(res))
            .catch(err => console.log(err))
        }
      }

      getSchedule = () => {
        console.log('Getting schedule...')
        let date = '2019-02-01'
        let self = this
        self.setState({ today: date })
        // this.getGames()
        API.getGamesByDate(date)
          .then(res => {
              let games = []
              let gameIds = []
              console.log('LOOKING AT THE GAMES FOR YESTERDAY: ', res.data)
              res.data.forEach((game) => {
                  let splitDate = game.gameDate.split('T')
                  let gameDate = splitDate[0]
                  
                  // let gameDate2 = moment(gameDate).format('YYYY-MM-DD')
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
              // self.getResults()
              self.findUserPicks()
              // self.findUserWins()
              // self.getYesterdaysGames(date)
              console.log('We have pulled the schedule')
              console.log('Here are all of the games: ', this.state.scheduledGames)
          })
            .catch(err => console.log(err))
      }

    findUserPicks = () => {
      let self = this
      console.log('running with it')
      API.getUser(this.props.username)
          .then(res => {
            self.setState({ userId: res.data[0].username })
            self.setState({ userPicks: res.data[0].picks })
            self.setState({ userWins: res.data[0].wins })
            self.findUserWins()
          })
          .catch(err => {console.log(err)
        })
      }

    findUserWins = () => {
      let userId = this.state.userId
      let today = this.state.today
      let userPicks = this.state.userPicks
      let schedule = this.state.scheduledGames
      let userWins = this.state.userWins
      let alreadyWon = false

      let thisPickDate = (picks) => {
        return picks.gameDate === today
      }
      let thisPick = userPicks.filter(thisPickDate)
      // console.log('THIS PICKKK: ', thisPick)
      console.log('TODAY: ', today)
      let thisPickTeam = thisPick[0].team
      console.log('THIS IS TODAYS PICK: ', thisPickTeam)
      let pickAlreadyWon = (wins) => {
        return wins.win === thisPickTeam
      }
      let thisPickWinner = userWins.filter(pickAlreadyWon)
      if (thisPickWinner.length > 0) {
        console.log('ALREADY A WINNER')
        alreadyWon = true
      }
      console.log('THIS PICK WINNER: ', thisPickWinner)

      console.log('User Picks: ', userPicks)
      console.log('User Wins: ', userWins)
      // console.log('HERE IS THE PICK: ', thisPick)
      // console.log('THIS PICK WON ALREADY: ', pickHasWon)
      // console.log('WHAT WE WORKING WITH: ', schedule)

      if (alreadyWon) {
        console.log('THIS PICK HAS DEF WON DUDE')
        return;
      } else {
        for (var s=0; s<schedule.length; s++) {
          let winner = schedule[s].gameWinner
          console.log('WINNER: ', winner)
          console.log('YOUR PICK: ', thisPickTeam)
  
          if (winner === thisPickTeam) {
            
            console.log('YOU WONNNNNN')
            console.log('USER ID: ', userId)
            console.log('OLD USER POINTS: ', userWins)
            console.log('NEW WIN: ', thisPickTeam)
            let newWin = { win: thisPickTeam }
            console.log('New Win: ', newWin)
            // API.addWin(userId, newWin)
            //   .then (res => {
            //     console.log(userId)
            //     console.log(newWin)
            //     console.log(res)
            //   })
            //   .catch(err => console.log(err))
          
          }
        }
      }

      

      }

    render() {
      let uuidv4 = require('uuid/v4')
      return (
        <div>
          <h1>Winning Picks</h1>
          {
            this.state.userWins.map((userWin) => (
              <p key={uuidv4()}>
                {userWin.win}
              </p>
            ))
          }
        </div>
      )
    }
}

export default Games