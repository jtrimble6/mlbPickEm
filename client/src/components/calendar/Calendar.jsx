import React, { Component } from 'react'
import '../../css/calendar/calendar.css'
import '../../css/calendar/fullcalendar.css'
import '../../css/calendar/fullcalendar.print.css'
import '../../css/calendar/fullcalendar.min.css'
import FullCalendar from 'fullcalendar-reactwrapper';
import Countdown from 'react-countdown';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faIgloo, faCaretRight, faBasketballBall } from '@fortawesome/free-solid-svg-icons'
import API from '../../utils/API'
import $ from 'jquery'
import moment from 'moment-timezone';
// import { atl, bkn, bos, cha, chi, cle, dal, den, det, gsw, hou, ind, lac, lal, mem, mia, mil, min, nop, nyk, okc, orl, phi, phx, por, sac, sas, tor, uta, was } from '../../css/nbaLogos'

class Calendar extends Component {
    constructor(props) {
        super(props);
        this.state = { 
          modal: false, 
          nestedModal: false, 
          nestedModalExpPick: false, 
          nestedModalNoPick: false, 
          closeAll: false, 
          closeAllExpPick: false, 
          closeAllNoPick: false, 
          challengeId: '',
          challengeData: {},
          allGames: [],
          yesterdaysGames: [], 
          myPicks: [], 
          myWins: [],
          userId: '',
          userPicks: [],
          userWins: [],
          fullSchedule: [],
          allGameIds: [],
          yesterdaysGameIds: [],
          gameResults: [], 
          winningTeams: [],
          gameDate: '',
          title: '', 
          status: '', 
          id: '', 
          activePick: '', 
          activeDate: '', 
          yesterday: '', 
          firstGameTime: '',
          timeDiff: '', 
          timerEnded: false,
          homeTeam: '', 
          awayTeam: '', 
          homeAlias: '', 
          awayAlias: '',
          teams: []
        };
        this.handleChangeTitle = this.handleChangeTitle.bind(this);
        this.handleChangeTeams = this.handleChangeTeams.bind(this);
        this.handleChangeStatus = this.handleChangeStatus.bind(this);
        this.toggle = this.toggle.bind(this);
        this.toggleActive = this.toggleActive.bind(this);
        this.toggleInvalidPick = this.toggleInvalidPick.bind(this);
        this.toggleNoPick = this.toggleNoPick.bind(this);
        this.toggleAllNoPick = this.toggleAllNoPick.bind(this);
        this.toggleExpiredPick = this.toggleExpiredPick.bind(this);
        this.toggleLatePick = this.toggleLatePick.bind(this);
        this.toggleAll = this.toggleAll.bind(this);
        this.toggleAllExpPick = this.toggleAllExpPick.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        // this.checkPrevPicks = this.checkPrevPicks.bind(this);
        this.checkPrevDatesPicked = this.checkPrevDatesPicked.bind(this);
        this.overridePick = this.overridePick.bind(this);
        this.getSchedule = this.getSchedule.bind(this);
        this.createTimer = this.createTimer.bind(this);
        this.timerRender = this.timerRender.bind(this);
        this.getTodaysFirstGame = this.getTodaysFirstGame.bind(this);
        this.postGames = this.postGames.bind(this);
        this.getGames = this.getGames.bind(this);
        this.getResults = this.getResults.bind(this);
        this.findGameWinners = this.findGameWinners.bind(this);
        this.findUserPicks = this.findUserPicks.bind(this);
        this.findUserWins = this.findUserWins.bind(this);
        this.overridePickResult = this.overridePickResult.bind(this);
        this.getChallengeData = this.getChallengeData.bind(this);
        this.getUserData = this.getUserData.bind(this);
      }

    componentDidMount() {
      this.getChallengeData()
      // this.getTodaysFirstGame()
      this.checkPrevDatesPicked()
      }

    toggle() {
        this.getTodaysFirstGame()
        this.setState({
          modal: !this.state.modal,
        });
      }

    toggleActive() {
      let _this = this
      $('.modal-open #modalBody .thisGame .team').click(function(){
          $(this).addClass('active');
          $(this).parent().children('.team').not(this).removeClass('active');
          let myPick = $(this).text()
          _this.setState({ activePick: myPick })
        }); 
      }

    toggleInvalidPick() {
      this.setState({
        nestedModal: !this.state.nestedModal,
        closeAll: false
      });
      let invPickAlert = <div className='row invalidPick'>Sorry, you have already won with this team!</div>
      $('.modal-open .modal-header').prepend(invPickAlert)
      }

    toggleNoPick() {
      this.setState({
        nestedModalNoPick: !this.state.nestedModalNoPick,
        closeAllNoPick: false
      });
       let noPickAlert = <div className='row invalidPick'>Sorry, you have to pick a team!</div>
       $('.modal-open .modal-header').prepend(noPickAlert)
      }

    toggleLatePick() {
      this.setState({
        nestedModalExpPick: !this.state.nestedModalExpPick,
        closeAllExpPick: false
      });
      let expPickAlert = <div className='row invalidPick'>Sorry, this is an old game, but nice try!</div>
      $('.modal-open .modal-header').prepend(expPickAlert)
      }
    
    toggleExpiredPick() {
      this.toggleActive()
      this.toggle()
      this.setState({
        nestedModalExpPick: !this.state.nestedModalExpPick,
        closeAllExpPick: false
      });
      let expPickAlert = <div className='row invalidPick'>Sorry, this is an old game!</div>
      $('.modal-open .modal-header').prepend(expPickAlert)
      }

    toggleAll() {
      this.setState({
        nestedModal: !this.state.nestedModal,
        closeAll: true
      });
      }

    toggleAllExpPick() {
      this.setState({
        nestedModalExpPick: !this.state.nestedModalExpPick,
        closeAllExpPick: true
      });
      }

    toggleAllNoPick() {
      this.setState({
        nestedModalNoPick: !this.state.nestedModalNoPick,
        closeAllNoPick: true
      });
      }

    handleChangeTitle(event) {
        this.setState({title: event.target.value})
        // console.log('Title: ', this.state.title)
      }

    handleChangeTeams(event) {
        this.setState({
          homeTeam: event.homeTeam, 
          awayTeam: event.awayTeam,
          homeAlias: event.homeAlias,
          awayAlias: event.awayAlias
        });
        // console.log('Home team: ', this.state.homeTeam)
        // console.log('Away team: ', this.state.awayTeam)
      }

    handleChangeStatus(event) {
      this.setState({ activeDate: '' })
      let gameTime = moment(event.start._d).add(6, 'hours').format("MMM Do, h:mmA")
      let gameStatus = event.status.toUpperCase()
      let gameId = event._id
      this.setState({ 
        status: gameStatus, 
        time: gameTime, 
        activeDate: event.date, 
        gameId: gameId 
      });
      }

    getChallengeData = () => {
      let self = this
      let challengeId = localStorage.getItem('userChallengeId')
      this.setState({
        challengeId: challengeId
      })
      API.getChallenge(challengeId)
        .then(res => {
          self.setState({
            challengeData: res.data[0],
            teams: res.data[0].teams
          })
          self.getUserData()
          self.getSchedule()
          self.getTodaysFirstGame()
        })
        .catch(err => console.log(err))
      }

    getUserData = () => {
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
        wins: thisUser[0].wins,
        winsCount: thisUser[0].wins.length,
        myPicks: thisUser[0].picks,
      })

      // console.log('CURRENT USER: ', this.state.currentUser)
      // console.log('CHAL USERS DATA: ', this.state.challengeData.users)
      }

    handleSubmit(event) {
        event?.preventDefault();
        let self = this
        let myId = this.props.username
        let challengeId = this.state.challengeId
        let myPicks = this.state.myPicks
        let myWins = this.state.myWins
        let teamPick = this.state.activePick
        let pickDate = this.state.activeDate
        // let prevDates = this.state.myDatesPicked
        let gameId = this.state.gameId
        let toggle = true
        let thisPick = { team: teamPick.trim(), gameDate: pickDate, gameId: gameId, result: 'pending' }

        // TODAY'S TIMER STATUS
        let realTime = moment().tz('America/New_York').format()
        let realTimeAdj = moment(realTime, 'HH:mm:ss a')
        console.log('REAL TIME ADJ: ', realTimeAdj)
        // console.log('FIRST GAME TIME: ', this.state.firstGameTime)
        let firstGameTimeMoment = moment(this.state.firstGameTime, 'HH:mm:ss a')
        console.log('FIRST GAME TIME: ', firstGameTimeMoment)
        let timeDiff = realTimeAdj.diff(firstGameTimeMoment, 'milliseconds')
        console.log('REAL TIME DIFF: ', timeDiff)
        if (timeDiff > 0) {
          // console.log('TIMER STILL RUNNING')
        } else {
          // console.log('TIMER HAS ENDED NO MORE PICKS')
          this.setState({
            timerEnded: true
          })
          // DOUBLE CHECK TO SEE THAT TIMER HAS NOT ALREADY ENDED FOR TODAYS GAMES BEFORE SUBMITTING PICK FOR TODAY
          if (pickDate === moment().format('YYYY-MM-DD')) {
            // console.log('THIS IS A LATE PICK FOR TODAY')
            this.toggleLatePick()
            return;
          }
        }

        
        //FIND OUT IF USER HAS ALREADY WON WITH THIS PICK
        let pickAlreadyWon = (wins) => {
          return wins.win.trim() === teamPick.trim()
          }
        let thisPickWinner = myWins.filter(pickAlreadyWon)

        // CHECK TO SEE IF ALREADY A WINNING TEAM OR DATE PICKED
        if(teamPick === '') {
          self.toggleNoPick()
          return;
          }
        if (myPicks.length) {
          for (var j=0; j<myPicks.length; j++) {
            if (thisPickWinner.length) {
              let pickHasWon = thisPickWinner[0]
              // console.log('PICK HAS WON: ', pickHasWon)
              if (pickHasWon !== undefined) {
                toggle = false
                self.toggleInvalidPick()
                // console.log('YOU HAVE ALREADY WON WITH THIS TEAM', teamPick)
                return;
                } 
              }
            if (thisPick.gameDate === myPicks[j].gameDate) {
              let newPick = thisPick
              // console.log('TEAM PICKED ALREADY: ', this.state.myPicks[j])
              // console.log('Prev Dates Picked: ', prevDates)
              // console.log('These dates match', pickDate, prevDates[j])
              this.overridePick(pickDate, newPick) 
              return;
              }   
            }
          }
        
        // console.log('THIS PICK DATA: ', thisPick)
        // SAVE PICK TO DATABASE
        API.saveNbaPick(challengeId, myId, thisPick)
          .then(res => { 
            console.log(res)
           
           })
          .catch(err => { console.log(err) } )  

        // CLOSE MODAL IF VALID PICK
        if (toggle) {
          this.toggle()
          document.location.reload()
        }

      }

    // checkPrevPicks() {
    //   let localUser = localStorage.getItem('user')
    //     API.getUser(localUser)
    //       .then(res => {
    //         this.setState({myPicks: res.data[0].picks})
    //         this.setState({myWins: res.data[0].wins})
    //         // console.log('CURRENT DATA: ', res.data)
    //         console.log('Current picks: ', this.state.myPicks)
    //         // console.log('Current Wins: ', this.state.myWins)
    //         this.checkPrevDatesPicked()
    //       })
    //       .catch(err => {console.log(err)
    //     })
    //   }

    checkPrevDatesPicked() {
        let currentPicks = this.state.myPicks
        let currentDatesPicked = []
        for (var i=0; i<currentPicks.length; i++) {
          let thisDate = currentPicks[i].gameDate
          //console.log('Date already picked: ', thisDate)
          currentDatesPicked.push(thisDate)
        }
        this.setState({myDatesPicked: currentDatesPicked})
        // console.log('Official dates picked: ', this.state.myDatesPicked)
      }
    
    overridePick(date, newPick) {
        console.log(date)
        API.deleteNbaPick(this.state.challengeId, this.props.username, date)
          .then(res => {
              console.log(res)
          })
          .catch(err => {console.log(err)})
        API.saveNbaPick(this.state.challengeId, this.props.username, newPick)
          .then(res => { 
            console.log(res)
           })
          .catch(err => { console.log(err) } )  
        
          this.toggle()
          document.location.reload()
        
      }

    getSchedule = () => {
      let date = moment().subtract(1, 'day').format('YYYY-MM-DD')
      let self = this
      self.setState({ yesterday: date })
      this.getGames()

      // PULL GAMES FROM YESTERDAY
      API.getNbaGamesByDate(date)
        .then(res => {
            let games = []
            let yesterdaysGameIds = []
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
                yesterdaysGameIds.push(gameInfo.id)
                this.setState({ yesterdaysGames: games })
                this.setState({ yesterdaysGameIds: yesterdaysGameIds })
              })

            // GET RESULTS FROM YESTERDA IF THEY HAVEN'T BEEN PULLED(UNDEFINED)
            // console.log('THESE GAMES: ', this.state.yesterdaysGames)
            if(this.state.yesterdaysGames[0].gameWinner === undefined) {
                self.getResults()
              } else {
                //FIND ALL USERS PICKS
                self.findUserPicks()
              }

        })
          .catch(err => console.log(err))
      }

    getTodaysFirstGame = () => {
      let date = moment().format('YYYY-MM-DD')
      let self = this
      let todaysGames = []
      // GET GAME SCHEDULE FOR TODAY AND FIND FIRST GAME
      API.getNbaGamesByDate(date)
        .then (res => {
          let games = res.data
          let sortedGames = games.sort((a,b) => new moment(a.gameTime) - new moment (b.gameTime))
          console.log('GAMES TODAY: ', res.data)
          console.log('SORTED GAMES: ', sortedGames)
          // CHECK TO SEE IF THERE ARE NO GAMES TODAY
          todaysGames = games
          if (todaysGames.length === 0) {
            console.log('NO GAMES TODAY MAN')
            // console.log('THERE MUST BE NO GAMES TODAY')
            $('.timeToPick').html('<div>THERE ARE NO GAMES TODAY</div>')
            return;
          } else {
            let firstGame = sortedGames[0]
            let firstGameTime = firstGame.gameTime
            let firstGameTimeAdj = moment(firstGameTime).add(5, 'hours').tz('America/New_York').format('HH:mm:ss a')
            let realTime = moment().tz('America/New_York').format('HH:mm:ss a')
            let realGameTimeAdj = moment(firstGameTimeAdj, 'HH:mm:ss a')
            let realTimeAdj = moment(realTime, 'HH:mm:ss a')
            let timeDiff = moment.duration(realGameTimeAdj.diff(realTimeAdj))
            self.setState({
              firstGameTime: firstGameTimeAdj
            })
            self.createTimer(timeDiff)
          }
        })
        .catch(err => console.log(err))

        
      
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
        API.postNbaGames(gameData)
          .then(res=> console.log(res))
          .catch(err => console.log(err))
        }
      }

    getGames = () => {
      // let self = this

      // PULL FULL SCHEDULE FROM DATABASE
      API.getNbaGames()
        .then(res => {
          let games = []
          res.data.forEach((game) => {
            let splitDate = game.gameDate.split('T')
            let gameDate = splitDate[0]
            let homeAlias = game.homeAlias.toLowerCase()
            let awayAlias = game.awayAlias.toLowerCase()
            let gameInfo = {
                id: game.gameId,
                date: gameDate,
                start: game.gameTime,
                status: game.gameStatus,
                homeTeam: game.homeTeam,
                awayTeam: game.awayTeam,
                homeAlias: homeAlias,
                awayAlias: awayAlias,
                title: game.homeAlias + ' vs ' + game.awayAlias,
                color: 'yellow',
                textColor: 'white',
                borderColor: 'blue'

              }
              games.push(gameInfo)
            })
            this.setState({ allGames: games })
        })
          .catch(err => console.log(err))

      // PULL ENTIRE SCHEDULE FROM API

      // const mlbKey = 't3ed9fy74zen5fynprhhkmw2'
      // const nbaKey = '2kuh4yhq78h5rdmf9vrsprgg'
      // const nbaKey2 = '4y7q3vsbv9rdj9kbevdfng4j'
      // const nbaKey = '34jjnkcxwesx9n9khfd6m3x3'

      // API CALL TO PULL ENTIRE SEASON SCHEDULE
      // $.ajax({
      //   // url: "https://cors-everywhere.herokuapp.com/http://api.sportradar.us/mlb/trial/v6.5/en/games/" + this.state.yesterday + "/schedule.json?api_key=" + mlbKey,
      //   url: 'https://cors-everywhere.herokuapp.com/http://api.sportradar.us/nba/trial/v7/en/games/2018/REG/schedule.json?api_key=' + nbaKey,
      //   type: 'GET',
      //   success: function(data) {
      //     self.setState({ fullSchedule: data.games });
      //     // POST ENTIRE SCHEDULE
      //     self.postGames(data.games)
      //     }
      //   })
      }
    
    getResults = () => {
      let self = this
      let yesterdaysGameIds = self.state.yesterdaysGameIds
      let gameResults = []
      
      // const nbaKey = '2kuh4yhq78h5rdmf9vrsprgg'
      // const nbaKey2 = '4y7q3vsbv9rdj9kbevdfng4j'
      const nbaKey = '34jjnkcxwesx9n9khfd6m3x3'

      // API CALL TO GET EACH NBA GAME RESULT (DELAY 1.5 SECONDS)
      for (let m=0; m<yesterdaysGameIds.length; m++) {
        let k = m
        setTimeout ( 
          function() {
            $.ajax({
              url: 'https://cors-everywhere.herokuapp.com/http://api.sportradar.us/nba/trial/v7/en/games/' + yesterdaysGameIds[k] + '/boxscore.json?api_key=' + nbaKey,
              type: 'GET',
              success: function(data) {
                // console.log('Game results: ', data)
                gameResults.push(data)
                self.setState({ gameResults: gameResults })
                self.findGameWinners()
              }
            })
          }, 1500*k)

          self.findUserPicks()
      
        }
      }

    findGameWinners = () => {
      // FIND GAME RESULTS FROM YESTERDAY
      let gameResults = this.state.gameResults
      let winningTeams = []
      for (let x=0; x<gameResults.length; x++) {
        let gameId = gameResults[x].id
        let gameDate = this.state.yesterday
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
        API.updateNbaGame(gameDate, gameId, gameResult)
          .then(res => console.log(res))
          .catch(err => console.log(err))
        } 
      }

    findUserPicks = () => {
      let self = this
      let localUser = localStorage.getItem('user')
      let chalUsers = this.state.challengeData.users

      // FILTER OUT THIS USER AND SET STATE
      let chalFilter = (challengers) => {
        return challengers.username === localUser
      }
      let thisUser = chalUsers.filter(chalFilter)

      // console.log('THIS CURRENT USER INFO: ', thisUser)
      // console.log('ALL USERS DATA: ', chalUsers)

      this.setState({
        userWins: thisUser.wins,
        userPicks: thisUser.picks,
        userId: thisUser.username
      })

      for(var u=0; u<chalUsers.length; u++) {
        let thisUser = chalUsers[u]
        let thisUserObj = {
          userId: thisUser.username,
          userPicks: thisUser.picks,
          userWins: thisUser.wins
          }
        // IF USER HAS MADE PICKS FIND THEIR WINS
        if (thisUser.picks[0]) {
          self.findUserWins(thisUserObj)
          }
        }

      // FIND USER WINS
      // API.getUser(thisUser)
      //   .then(res => {
      //     self.setState({
      //       userWins: res.data[0].wins,
      //       userPicks: res.data[0].picks,
      //       userId: res.data[0].username
      //     })
      //   })

      // FIND ALL USERS PICKS 
      // API.getUsers()
      //   .then(res => {
      //     let allUsers = res.data
      //     for(var u=0; u<allUsers.length; u++) {
      //       let thisUser = allUsers[u]
      //       let thisUserObj = {
      //         userId: thisUser.username,
      //         userPicks: thisUser.picks,
      //         userWins: thisUser.wins
      //         }
      //       // IF USER HAS MADE PICKS FIND THEIR WINS
      //       if (thisUser.picks[0]) {
      //         self.findUserWins(thisUserObj)
      //       }
            
      //     }
      //   })
      }

    findUserWins = (userData) => {
      let userId = userData.userId
      let yesterday = this.state.yesterday
      let userPicks = userData.userPicks
      let schedule = this.state.yesterdaysGames
      let userWins = userData.userWins
    
      // FIND THIS USER'S PICK FOR TODAY
      let thisPickDate = (picks) => {
        return picks.gameDate === yesterday
      }
      let thisPick = userPicks.filter(thisPickDate)
      let thisPickTeam = ''

      // IF THERE IS A PICK FOR YESTERDAY MAKE THAT 'THISPICKTEAM'
      if (thisPick[0]) {
        thisPickTeam = thisPick[0].team
        // console.log('THIS PICK RESULT: ', userId, thisPickTeam,thisPick[0].result)

        // ONLY CHECKING GAMES WITH 'PENDING' RESULT
        if (thisPick[0].result === 'pending') {
          // console.log('THESE GAMES ARE STILL PENDING')

        // CHECK IF THE USER HAS ALREADY WON WITH THIS TEAM
        let pickAlreadyWon = (wins) => {
          return wins.win === thisPickTeam
        }
        let thisPickWinner = userWins.filter(pickAlreadyWon)
        // ADD LOSS IF USER HAS ALREADY WON WITH THIS PICK
        if (thisPickWinner[0]) {
          // console.log(userId, 'HAS ALREADY WON WITH ', thisPickWinner[0].win)
          let result = 'loss'
          let newPick = {
            team: thisPick[0].team,
            gameDate: thisPick[0].gameDate,
            gameId: thisPick[0].gameId,
            result: result
          }
            // console.log('THIS IS A LOSS: ', thisPick)
            // console.log('RESULT: ', newPick)
            this.overridePickResult(userId, yesterday, newPick) 
            return;
          }

          // CHECK TO SEE IF YESTERDAYS PICK IS A WINNER
          let newWin = null
          for (let s=0; s<schedule.length; s++) {
            let winner = schedule[s].gameWinner
            let thisPick = thisPickTeam.trim()
            if (thisPick === winner) {
              let result = 'win'
              // console.log('THIS IS A WINNER: ', thisPick)
              newWin = { win: thisPickTeam }

              // CHANGE PICK RESULT IF WIN
              let newPick = {
                team: schedule[s].gameWinner,
                gameDate: schedule[s].date,
                gameId: schedule[s].id,
                result: result
              }
              // console.log('NEW PICK: ', newPick)
              this.overridePickResult(userId, yesterday, newPick) 
              
              // ADD NEW WINS TO USER DB
              API.addNbaWin(this.state.challengeId, userId, newWin)
                .then (res => {
                  console.log(res)
                })
                .catch(err => console.log(err))
            
              }
            }
    
            // CHANGE PICK RESULT IF LOSS
            if (newWin === null && thisPick[0]) {
              let result = 'loss'
              let newPick = {
                team: thisPick[0].team,
                gameDate: thisPick[0].gameDate,
                gameId: thisPick[0].gameId,
                result: result
              }
              // console.log('THIS IS A LOSS: ', thisPick)
              // console.log('RESULT: ', newPick)
              this.overridePickResult(userId, yesterday, newPick) 
              return;
            }
          } else { return }
        } else { return }

      }

    overridePickResult(userId, date, newPick) {
      // console.log(date)
      API.deleteNbaPick(this.state.challengeId, userId, date)
        .then(res => {
            console.log(res)
        })
        .catch(err => {console.log(err)})
      API.saveNbaPick(this.state.challengeId, userId, newPick)
        .then(res => { 
          console.log(res)
          })
        .catch(err => { console.log(err) } )  
        
      }

    createTimer = (timeDiff) => {
        let self = this
        //console.log('Time until first game: ', timeDiff)
        let seconds = moment.duration(timeDiff).asSeconds() * 1000
        console.log('In seconds milliseconds: ', seconds)
        self.setState({ timeDiff: seconds })
        // console.log('TIME TIL GAME STARTS: ', this.state.timeDiff / 1000)
      }

    timerRender = ({ hours, minutes, seconds, completed }) => {
      if (completed) {
        // Render a completed state
        return <span>You are good to go!</span>;
      } else {
        // Render a countdown
        return <span>{hours}:{minutes}:{seconds}</span>;
      }
    };

    loadLogo = (team) => {
      // console.log('TEAMS: ', this.state.teams)
      // console.log('THIS TEAM: ', team)
      let logo = this.state.teams.filter(teamLogo => {
        return teamLogo.abbr === team
      })
      if (logo[0]) {
        // console.log('TEAM LOGO: ', logo[0].logo.default)
        return logo[0].logo.default
      }
      
      // return logo
      // switch (true) {
      //   case (team === 'atl'):
      //     return atl;
          
      //   case (team === 'bkn'):
      //     return bkn;
          
      //   case (team === 'bos'):
      //     return bos;
          
      //   case (team === 'cha'):
      //     return cha;
          
      //   case (team === 'chi'):
      //     return chi;
           
      //   case (team === 'cle'):
      //     return cle;
           
      //   case (team === 'dal'):
      //     return dal;
           
      //   case (team === 'den'):
      //     return den;
           
      //   case (team === 'det'):
      //     return det;
           
      //   case (team === 'gsw'):
      //     return gsw;
           
      //   case (team === 'hou'):
      //     return hou;
           
      //   case (team === 'ind'):
      //     return ind;
           
      //   case (team === 'lac'):
      //     return lac;
           
      //   case (team === 'lal'):
      //     return lal;
           
      //   case (team === 'mem'):
      //     return mem;
           
      //   case (team === 'mia'):
      //     return mia;
        
      //   case (team === 'mil'):
      //     return mil;
           
      //   case (team === 'min'):
      //     return min;
           
      //   case (team === 'nop'):
      //     return nop;
           
      //   case (team === 'nyk'):
      //     return nyk;
           
      //   case (team === 'okc'):
      //     return okc;
           
      //   case (team === 'orl'):
      //     return orl;
           
      //   case (team === 'phi'):
      //     return phi;
           
      //   case (team === 'phx'):
      //     return phx;
           
      //   case (team === 'por'):
      //     return por;
           
      //   case (team === 'sac'):
      //     return sac;
           
      //   case (team === 'sas'):
      //     return sas;
           
      //   case (team === 'tor'):
      //     return tor;
           
      //   case (team === 'uta'):
      //     return uta;
           
      //   case (team === 'was'):
      //     return was;
           
      //   default:
      //     return uta;
      //   }  

      }

    render() {
      library.add(faIgloo, faCaretRight, faBasketballBall)
      let timerEnded = false;
      let EndTimer = () => {
          timerEnded = true
          return (
            <span>Today's games have already begun.</span>
          )
        }
        
        return (
            <div className='calendar'>
               <Modal 
                 isOpen={this.state.modal} 
                 autoFocus={true}
                 centered={true}
                 size='lg'
                 className='fullCalModal'
               >
                <form onSubmit={this.handleSubmit}>
                  <ModalHeader id='modalTitle'>
                    Make Your Pick
                  </ModalHeader>
                    <ModalBody id='modalBody'>
                    <Modal className='invPick' isOpen={this.state.nestedModalNoPick} toggle={this.toggleNoPick} onClosed={this.state.closeAllNoPick ? this.toggle : undefined}>
                      <ModalHeader>No Pick</ModalHeader>
                      <ModalBody>You must pick a team!</ModalBody>
                      <ModalFooter>
                        <Button color="primary" onClick={this.toggleNoPick}>Close</Button>{' '}
                        <Button color="secondary" onClick={this.toggleAllNoPick}>Close All</Button>
                      </ModalFooter>
                    </Modal>
                    <Modal className='invPick' isOpen={this.state.nestedModal} toggle={this.toggleInvalidPick} onClosed={this.state.closeAll ? this.toggle : undefined}>
                      <ModalHeader>Invalid Pick</ModalHeader>
                      <ModalBody>You have already won with the {this.state.activePick}!</ModalBody>
                      <ModalFooter>
                        <Button color="primary" onClick={this.toggleInvalidPick}>Close</Button>{' '}
                        <Button color="secondary" onClick={this.toggleAll}>Close All</Button>
                      </ModalFooter>
                    </Modal>
                    <Modal className='invPick' isOpen={this.state.nestedModalExpPick} toggle={this.toggleExpiredPick} onClosed={this.state.closeAllExpPick ? this.toggle : undefined}>
                      <ModalHeader>Invalid Pick</ModalHeader>
                      <ModalBody>This is an old game!</ModalBody>
                      <ModalFooter>
                        <Button color="secondary" onClick={this.toggleAllExpPick}>Close All</Button>
                      </ModalFooter>
                    </Modal>
                        <div className="thisGame row">
                            <span className='col-md-5 team awayTeam' value={this.state.awayTeam} onClick={this.toggleActive}>
                              {this.state.awayTeam} <br />
                              <img 
                                className='teamLogo' 
                                src={this.loadLogo(this.state.awayAlias)}
                                alt={this.state.awayAlias} 
                                fluid='true'
                              />
                            </span>
                            <span className='atSymbol col-md-2'>
                              @
                            </span>
                            <span className='col-md-5 team homeTeam' value={this.state.homeTeam} onClick={this.toggleActive}>
                              {this.state.homeTeam} <br />
                              <img 
                                className='teamLogo' 
                                src={this.loadLogo(this.state.homeAlias)}
                                alt={this.state.homeAlias} 
                                fluid='false'
                              />
                            </span>
                        {/* <input type="text" value={this.state.teams} onChange={this.handleChangeTeams} className="form-control" /> */}
                        </div> <hr />
                        <div className="status row">
                          {this.state.time} 
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <input type="submit" value="Submit" color="primary" className="btn btn-primary" onClick={this.handleSubmit} />
                        <Button color="danger" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </form>
                </Modal>

              <div className="row countdown">
              <div className="col-3"></div>
              <div className="col-6 timeToPick">
                TIME TO PICK <FontAwesomeIcon icon="basketball-ball" /> <Countdown date={Date.now() + this.state.timeDiff} zeroPadTime={2} daysInHours={true}>
                    <EndTimer />
                  </Countdown>
              </div>
              <div className="col-3"></div>
                
                
              </div>
              
              <FullCalendar
                id = "calendar"
                header = {{
                    left: 'prev,next today myCustomButton',
                    center: 'title',
                    right: 'month,basicWeek,basicDay'
                }}
              
                defaultView= 'basicWeek'
                themeSystem= 'bootstrap4'
                navLinks= {true} // can click day/week names to navigate views
                editable= {false}
                eventLimit= {false} // allow "more" link when too many events
                displayEventTime= {true}
                timeFormat= 'h(:mm)A'
                showNonCurrentDates= {false}
                events= {this.state.allGames}
                eventClick= {(calEvent) => {
                  if(moment(calEvent.date).isBefore(moment().subtract(1, 'day'))) {
                      // console.log('YOU CANT PICK THAT DATE')
                      // $('#calendar').fullCalendar('unselect');
                      this.handleChangeTeams(calEvent)
                      this.handleChangeStatus(calEvent)
                      this.toggleExpiredPick()
                      return false;
                    } 
                    else if (timerEnded && (moment(calEvent.date).isBefore(moment()))) {
                      this.handleChangeTeams(calEvent)
                      this.handleChangeStatus(calEvent)
                      this.toggleExpiredPick()
                    }
                    else 
                    {
                      this.handleChangeTeams(calEvent)
                      this.handleChangeStatus(calEvent)
                      // console.log(calEvent)
                      this.toggle()
                    }
                  //this.handleChangeTitle(calEvent)
                    }
                  }
                
              />
            </div>
        )
    }
}

export default Calendar

