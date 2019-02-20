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
        // console.log('This is the real time: ', gameDateAdj)
        // console.log('This is the real date: ', gameDate)
        
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
          // console.log('FULL SCHEDULE: ', self.state.fullSchedule);
          self.postGames(data.games)
          }
        })
      }
    
    getResults = () => {
      let self = this
      let gameIds = self.state.gameIds
      let gameResults = []
      // console.log('ONLY THESE GAME IDS: ', gameIds)
      //const nbaKey = '2kuh4yhq78h5rdmf9vrsprgg'
      const nbaKey2 = '4y7q3vsbv9rdj9kbevdfng4j'
      for (let m=0; m<gameIds.length; m++) {
        let k = m
        // console.log('Need each result: ', gameIds[k])
        setTimeout ( 
          function() {
            $.ajax({
              url: 'https://cors-everywhere.herokuapp.com/http://api.sportradar.us/nba/trial/v5/en/games/' + gameIds[k] + '/boxscore.json?api_key=' + nbaKey2,
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
      // console.log('Showing results: ', this.state.gameResults)
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
          // console.log('Winning Teams: ', winningTeams)
          this.setState({ winningTeams: winningTeams })
        }

      // console.log('WINNING TEAMS: ', winningTeams)

      this.postGameWinners(this.state.winningTeams)

      }

    postGameWinners = (data) => {
        // console.log("Getting game winners: ", gameWinners)
        for (let y=0; y<data.length; y++) {

          //let game = {}
          // game = {
          //   gameId: data[y].gameId,
          //   winner: data[y].winningTeam,
          //   gameDate: data[y].gameDate
          // }
          // API.addResult(game)
          //   .then(res => {
          //     console.log(res)
          //   })
          //   .catch(err => console.log(err))
          //console.log('ALL THE INFO: ', game)

          let gameDate = data[y].gameDate
          let gameId = data[y].gameId
          let gameResult = { gameResult: data[y].winningTeam }
          API.updateGame(gameDate, gameId, gameResult)
            .then(res => console.log(res))
            .catch(err => console.log(err))
          }
          // console.log('ALL THE INFO: ', gameDate + ' ' + gameId + ' ' + gameResult)
          
  
          
      }

    getSchedule = () => {
      // console.log('Getting schedule...')
      let date = '2019-02-05'
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

            // GET RESULTS IF UNDEFINED AND USER PICKS
            if(this.state.scheduledGames[0].gameWinner === undefined) {
              console.log('DONT HAVE RESULTS')
              self.getResults()
            }
            self.findUserPicks()

            // console.log('We have pulled the schedule')
            console.log('Here are all of the games: ', this.state.scheduledGames)
        })
          .catch(err => console.log(err))
      }

    findUserPicks = () => {
      let self = this
      let localUser = localStorage.getItem('user')
      API.getUser(localUser)
          .then(res => {
            // console.log('BIG result: ', res.data)
            self.setState({ 
              userId: res.data[0].username,
              userPicks: res.data[0].picks,
              userWins: res.data[0].wins
             })
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
      // console.log('USER USER PICKS: ', userPicks)

      let thisPickDate = (picks) => {
        return picks.gameDate === today
      }
      let thisPick = userPicks.filter(thisPickDate)
      let thisPickTeam = thisPick[0].team
      // console.log('THIS IS TODAYS PICK: ', thisPickTeam)
      let pickAlreadyWon = (wins) => {
        return wins.win === thisPickTeam
      }
      let thisPickWinner = userWins.filter(pickAlreadyWon)
      if (thisPickWinner.length > 0) {
        console.log('ALREADY A WINNER')
        alreadyWon = true
      }
      // console.log('THIS PICK WINNER: ', thisPickWinner)

      console.log('User Picks: ', userPicks)
      console.log('User Wins: ', userWins)
      // console.log('HERE IS THE PICK: ', thisPick)
      // console.log('THIS PICK WON ALREADY: ', pickHasWon)
      // console.log('WHAT WE WORKING WITH: ', schedule)

      if (alreadyWon) {
        console.log('THIS PICK HAS DEF WON DUDE')
        return;
      } else {
        let gameNum = 1
        for (let s=0; s<schedule.length; s++) {
          let winner = schedule[s].gameWinner
          //MUST TRIM THE SPACES
          let thisPick = thisPickTeam.trim()
          console.log(
          'Game num:', gameNum, 
          '| WINNER:', winner, 
          '| YOUR PICK:', thisPick,
          '| DO THEY EQUAL?', winner === thisPickTeam
          )
          
          if (thisPick === winner) {
            console.log('Game num: ', gameNum, 'WINNER: ', winner, 'YOUR PICK: ', thisPickTeam)
            console.log('YOU WONNNNNN')
            console.log('NEW WIN: ', thisPickTeam)
            let newWin = { win: thisPickTeam }
            console.log('New Win: ', newWin)
            API.changeStatus(userId, newWin.win) 
              .then (res => {
                console.log(res)
              })
              .catch(err => console.log(err))
            API.addWin(userId, newWin)
              .then (res => {
                console.log(userId)
                console.log(newWin)
                console.log(res)
              })
              .catch(err => console.log(err))
            
          
          } else {console.log('no win')}
          gameNum++
        }
      }

      

      }

    render() {
      let uuidv4 = require('uuid/v4')
      return (
        <div className='winningPicks'>
          <h2>Winning Picks</h2>
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