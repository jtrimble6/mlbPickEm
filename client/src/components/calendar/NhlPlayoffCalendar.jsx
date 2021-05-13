import React, { Component } from 'react'
import '../../css/calendar/calendar.css'
import '../../css/calendar/fullcalendar.css'
import '../../css/calendar/fullcalendar.print.css'
import '../../css/calendar/fullcalendar.min.css'
import LoadingOverlay from 'react-loading-overlay';
import PickError from "../../components/alerts/PickError";
import FullCalendar from 'fullcalendar-reactwrapper';
import Countdown from 'react-countdown';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { library } from '@fortawesome/fontawesome-svg-core'
// import { fas } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faIgloo, faCaretRight, faBasketballBall, faHockeyPuck } from '@fortawesome/free-solid-svg-icons'
import API from '../../utils/API'
import $ from 'jquery'
import moment from 'moment-timezone';
import { chi2, tb, wsh, bos2, car, nyi, cbj, van, vgk, col, dal2, stl, ari, cgy, mtl, phi2, nhl } from '../../css/nhlLogos'
// import NhlPlayoffGamesPage from '../../pages/admin/NhlPlayoffGamesPage'
// import { atl, cbj, wsh, cha, chi, cle, mtl, dal2, det, gsw, stl, bos2, col, vgk, mem, car, chi2, min, nop, nyk, ari, van, nyi, phx, phi2, sac, sas, tbl, cgy, was } from '../../css/nhlLogos'

class NhlPlayoffCalendar extends Component {
    constructor(props) {
        super(props);
        this.state = { 
          pickError: false,
          isActive: false,
          modal: false, 
          nestedModal: false, 
          nestedModalExpPick: false, 
          nestedModalNoPick: false, 
          closeAll: false, 
          closeAllExpPick: false, 
          closeAllNoPick: false, 
          challengeId: '',
          challengeData: {},
          challengeUsers: [],
          allGames: [],
          playoffGames: [],
          yesterdaysGames: [], 
          myPicks: [], 
          myLosses: [],
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
          teams: [], 
          status: '', 
          id: '', 
          activePick: '', 
          activeDate: '', 
          lastDate: '',
          yesterday: '', 
          firstGameTime: '',
          timeDiff: '', 
          timerEnded: false,
          homeTeam: '', 
          awayTeam: '', 
          homeAlias: '', 
          awayAlias: '',
          homeSeed: '',
          awaySeed: ''
        };
        this.handlePreloader = this.handlePreloader.bind(this);
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
        this.getTeamsData = this.getTeamsData.bind(this);
        this.findChallengeUsers = this.findChallengeUsers.bind(this);
      }

    componentDidMount() {
      this.getChallengeData()
      this.getTodaysFirstGame()
      this.getTeamsData()
      this.findChallengeUsers()
      // this.checkPrevDatesPicked()
      }

    handlePreloader() {
        this.setState({
          isActive: !this.state.isActive
        });
      }

    toggle() {
        this.getTodaysFirstGame()
        this.setState({
          modal: !this.state.modal,
        });
      }

    toggleActive(event) {
      event?.preventDefault()
      // console.log('event: ', event.target.getAttribute('data-team'))
      let myPick = event?.target?.getAttribute('data-team')
      // console.log('MY PICK: ', myPick)
      let _this = this
      $('.modal-open #modalBody .thisGame .team').click(function(){
          $(this).addClass('active');
          $(this).parent().children('.team').not(this).removeClass('active');
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
        let teams = this.state.teams
        let homeAlias = event.homeAlias.toLowerCase()
        let awayAlias = event.awayAlias.toLowerCase()
        // console.log('THE TEAMS: ', teams)
        let findHomeTeamSeed = (theTeams) => {
          return theTeams.teamAlias === homeAlias.toUpperCase()
        }
        let findAwayTeamSeed = (theTeams) => {
          return theTeams.teamAlias === awayAlias.toUpperCase()
        }
        let homeTeamFound = teams.filter(findHomeTeamSeed)
        let awayTeamFound = teams.filter(findAwayTeamSeed)
        let homeSeed = homeTeamFound[0].seed
        let awaySeed = awayTeamFound[0].seed
        this.setState({
          homeTeam: event.homeTeam, 
          awayTeam: event.awayTeam,
          homeAlias: event.homeAlias,
          awayAlias: event.awayAlias,
          homeSeed: homeSeed,
          awaySeed: awaySeed
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
        lastDate: event.date, 
        gameId: gameId 
      });
      // console.log('date: ', event.date)
      // console.log('Start Time: ', this.state.time)
      // console.log('Game ID: ', this.state.gameId)
      }

    findChallengeUsers = () => {
        let challengeId = localStorage.getItem('userChallengeId')
        // console.log('CHALLENGE ID: ', challengeId)
        API.findUsersByChallengeId(challengeId)
            .then(res => {
              // console.log('found challenge users: ', res.data)     
              this.setState({
                challengeUsers: res.data
              })     
            })
            .catch(err => {
              console.log(err)
            })
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
          })
          self.getUserData()
        })
        .catch(err => console.log(err))
      }

    getUserData = () => {
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
                myWins: filteredWins,
                winsCount: filteredWins.length,
                myPicks: thisUser[0].picks,
              })
            })
            .catch(err => {console.log(err)})
      }

    // getUserData = () => {
    //   let localUser = localStorage.getItem('user')
    //   let chalUsers = this.state.challengeData.users

    //   // FILTER OUT THIS USER AND SET STATE
    //   let chalFilter = (challengers) => {
    //     return challengers.username === localUser
    //   }
    //   let thisUser = chalUsers.filter(chalFilter)

    //   this.setState({
    //     currentUser: thisUser[0],
    //     username: thisUser[0].username,
    //     firstName: thisUser[0].firstName,
    //     lastName: thisUser[0].lastName,
    //     losses: thisUser[0].wins,
    //     lossesCount: thisUser[0].wins.length,
    //     myPicks: thisUser[0].picks,
    //   })

    //   // console.log('CURRENT USER: ', this.state.currentUser)
    //   // console.log('CHAL USERS DATA: ', this.state.challengeData.users)
    //   }

    getTeamsData = () => {
      API.getNhlPlayoffTeams()
        .then(res => {
          // console.log('GOT TEAMS: ', res.data)
          this.setState({
            teams: res.data
          }, () => {
            this.getSchedule()
          })
        })
        .catch(err => {
          console.log('err: ', err)
        })
    }

    handleSubmit(event) {
        event?.preventDefault();
        let self = this
        let myId = this.props.username
        let challengeId = this.state.challengeId
        let teams = this.state.teams
        let myPicks = this.state.myPicks
        // let myLosses = this.state.myLosses
        let teamPick = this.state.activePick
        // console.log('TEAMS: ', teams)
        // console.log('ACTIVE PICK: ', this.state.activePick)
        let findTeamSeed = (team) => {
          return team?.teamName?.trim() === teamPick.trim()
        }
        let teamFound = teams.filter(findTeamSeed)
        let teamSeed = parseInt(teamFound[0]?.seed)
        // console.log('TEAM SEEDING: ', teamSeed)
        // debugger;
        let pickDate = this.state.activeDate
        // let prevDates = this.state.myDatesPicked
        let gameId = this.state.gameId
        // let toggle = true
        let thisPick = { 
          team: teamPick.trim(), 
          teamSeed: teamSeed,
          gameDate: pickDate, 
          gameId: gameId, 
          result: 'pending',
          challengeId: challengeId,
        }
        let firstGameTime = this.state.firstGameTime
        // TODAY'S TIMER STATUS
        // console.log('FIRST GAME TIME: ', firstGameTime)
        if (firstGameTime !== '') {
          let realTime = moment(this.props.todaysDate).tz('America/New_York').format('HH:mm:ss a')
          let realTimeAdj = moment(realTime, 'HH:mm:ss a')
          
          let timeDiff = moment.duration(firstGameTime.diff(realTimeAdj))
          // console.log('REAL TIME EST: ', realTimeAdj)
          if (timeDiff._milliseconds > 0) {
            // console.log('TIMER STILL RUNNING')
          } else {
            // console.log('TIMER HAS ENDED NO MORE PICKS')
            this.setState({
              timerEnded: true
            })
            // DOUBLE CHECK TO SEE THAT TIMER HAS NOT ALREADY ENDED FOR TODAYS GAMES BEFORE SUBMITTING PICK FOR TODAY
            if (pickDate === this.props.todaysDate) {
              // console.log('THIS IS A LATE PICK FOR TODAY')
              this.toggleLatePick()
              return;
            }
          }
        }

        
        // CHECK TO SEE IF ALREADY A WINNING TEAM OR DATE PICKED
        if(teamPick === '') {
          self.toggleNoPick()
          return;
          }
        if (myPicks.length) {
          for (var j=0; j<myPicks.length; j++) {
            if (thisPick.gameDate === myPicks[j].gameDate && challengeId === myPicks[j].challengeId) {
              let newPick = thisPick
              this.overridePick(pickDate, newPick) 
              return;
              }   
            }
          }
        
        API.addUserPick(myId, thisPick)
          .then(res => { 
            // console.log(res)
            this.toggle()
            document.location.reload()
           })
          .catch(err => { 
            console.log(err) 
            this.setState({
              pickError: true
            })
          })

      }

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
        let localUser = localStorage.getItem('user')
        let challengeId = localStorage.getItem('userChallengeId')
        // let challengeId = this.state.challengeId
        // console.log('OVERRIDE THIS PICK: ', localUser, challengeId, date, newPick)
  
        API.overrideUserPick(localUser, challengeId, date, newPick)
            .then(res => {
              // console.log('override pick result: ', res)
              document.location.reload()
            })
            .catch(err => {
              console.log(err)
            })
        }

    getSchedule = () => {
      let date = moment(this.props.todaysDate).subtract(1, 'day').format('YYYY-MM-DD')
      let self = this
      
      self.setState({ yesterday: date })
      this.getGames()

      // PULL GAMES FROM YESTERDAY
      API.getNhlPlayoffGamesByDate(date)
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
                self.setState({ yesterdaysGames: games })
                self.setState({ yesterdaysGameIds: yesterdaysGameIds })
              })

            // GET RESULTS FROM YESTERDAY IF THEY HAVEN'T BEEN PULLED(UNDEFINED)
            // console.log('THESE GAMES: ', this.state.yesterdaysGames[0].gameWinner)
            // if(this.state.yesterdaysGames[0].gameWinner === undefined) {
              self.getResults()
            // } 
            // else {
              //FIND ALL USERS PICKS
              // console.log('finding user picks')
              // self.findUserPicks()
            // }

        })
          .catch(err => console.log(err))
      }

    getTodaysFirstGame = () => {
      let date = this.props.todaysDate
      let self = this

      // GET GAME SCHEDULE FOR TODAY AND FIND FIRST GAME
      API.getNhlPlayoffGamesByDate(date)
        .then (res => {
          let games = res.data
          let sortedGames = games.sort((a,b) => new moment(a.gameTime) - new moment (b.gameTime))

          // CHECK TO SEE IF THERE ARE NO GAMES TODAY
          if (!sortedGames[0]) {
            // console.log('THERE MUST BE NO GAMES TODAY')
            // $('.timer').html('<div>THERE ARE NO GAMES TODAY</div>')
            return;
          }

          let firstGame = sortedGames[0]
          let firstGameTime = firstGame.gameTime
          let firstGameTimeAdj = moment(firstGameTime).add(5, 'hours').tz('America/New_York').format('HH:mm:ss a')
          let realTime = moment(date).tz('America/New_York').format('HH:mm:ss a')
          let realGameTimeAdj = moment(firstGameTimeAdj, 'HH:mm:ss a')
          let realTimeAdj = moment(realTime, 'HH:mm:ss a')
          
          let timeDiff = moment.duration(realGameTimeAdj.diff(realTimeAdj))
          self.setState({
            firstGameTime: realGameTimeAdj
          })
          this.createTimer(timeDiff)
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
        API.postNhlPlayoffGames(gameData)
          .then(res=> console.log(res))
          .catch(err => console.log(err))
        }
      }

    getGames = () => {
      // let self = this

      // PULL FULL SCHEDULE FROM DATABASE
      API.getNhlPlayoffGames()
        .then(res => {
          // console.log('A GAME: ', res.data)
          let games = []
          let teams = this.state.teams
          res.data.forEach((game) => {
            // console.log('THIS GAME: ', game)
            // let splitDate = game.gameDate
            let gameDate = game.gameDate
            let homeAlias = game.homeAlias.toLowerCase()
            let awayAlias = game.awayAlias.toLowerCase()
            // console.log('HOME ALIAS: ', homeAlias)
            // console.log('THE TEAMS: ', teams)
            let findHomeTeamSeed = (theTeams) => {
              return theTeams.teamAlias === homeAlias.toUpperCase()
            }
            let findAwayTeamSeed = (theTeams) => {
              return theTeams.teamAlias === awayAlias.toUpperCase()
            }
            let homeTeamFound = teams.filter(findHomeTeamSeed)
            // console.log('HOME TEAM: ', homeTeamFound[0]?.seed)
            let awayTeamFound = teams.filter(findAwayTeamSeed)
            let homeSeed = homeTeamFound[0]?.seed
            let awaySeed = awayTeamFound[0]?.seed
            // console.log('HOME SEED: ', homeSeed)
            // console.log('AWAY SEED: ', awaySeed)
            let gameInfo = {
                id: game.gameId,
                date: gameDate,
                start: game.gameTime,
                status: game.gameStatus,
                homeTeam: game.homeTeam,
                awayTeam: game.awayTeam,
                homeAlias: homeAlias,
                awayAlias: awayAlias,
                title: '('+homeSeed+')' + game.homeAlias + ' vs ('+awaySeed+')' + game.awayAlias,
                color: 'yellow',
                textColor: 'white',
                borderColor: 'blue'
              }
              games.push(gameInfo)
            })
            this.setState({ allGames: games })
            // console.log('ALL PLAYOFF GAMES: ', games)
        })
          .catch(err => console.log(err))

      }
    
    getResults = () => {
      let self = this
      let yesterdaysGames = this.state.yesterdaysGames
      let yesterdaysGameIds = this.state.yesterdaysGameIds
      // let lastGame = yesterdaysGames.length - 1
      let yesterdaysGameResultFunc = (games) => {
        return games.gameWinner === undefined
      }
      let yesterdaysGameResultUndefined = yesterdaysGames.filter(yesterdaysGameResultFunc)

      if (yesterdaysGameResultUndefined[0]) {
        this.handlePreloader()
        // console.log('NO FOUND RESULTS FOR YESTERDAY')
        // console.log('ALL THE GAMES: ', yesterdaysGames)
        // console.log('NUMBER OF GAMES: ', yesterdaysGames.length)
        // console.log('LAST GAME RESULT: ', yesterdaysGames[lastGame].gameWinner)

        let gameResults = []

        const nhlPlayoffKey = 'y947xs7vmjgpugdgy59z5c2g'

        yesterdaysGameIds.forEach(function(gameId, k) {
          setTimeout ( 
            function() {
              $.ajax({
                url: 'https://cors-everywhere.herokuapp.com/http://api.sportradar.us/nhl/trial/v7/en/games/' + gameId + '/boxscore.json?api_key=' + nhlPlayoffKey,
                type: 'GET',
                success: function(data) {
                  // console.log('Game results: ', data)
                  gameResults.push(data)
                  self.setState({ gameResults: gameResults })
                  if (gameResults.length === yesterdaysGameIds.length) {
                    self.findGameWinners()
                  }
                }
              })
            }, 1500*k)
          })
        } else {
        // console.log('FOUND RESULTS FOR YESTERDAY')
        // console.log('LAST GAME RESULT: ', yesterdaysGames[lastGame].gameWinner)
        return
        }
      }

    findGameWinners = () => {
      // FIND GAME RESULTS FROM YESTERDAY
      let gameResults = this.state.gameResults
      // console.log('ALL THE RESULTS: ', gameResults)
      let winningTeams = []
      gameResults.forEach((gameResult) => {
        let gameId = gameResult.id
        let gameDate = this.state.yesterday
        let homeTeam = {
            team: gameResult.home.market + ' ' + gameResult.home.name ,
            points: gameResult.home.points
          }
        let awayTeam = {
            team: gameResult.away.market + ' ' + gameResult.away.name,
            points: gameResult.away.points
          }

        if (homeTeam.points > awayTeam.points) {
            winningTeams.push({gameId: gameId, gameDate: gameDate, winningTeam: homeTeam.team})
          } else {
            winningTeams.push({gameId: gameId, gameDate: gameDate, winningTeam: awayTeam.team})
          }
        
      })

      this.setState({ winningTeams: winningTeams })
      if (winningTeams.length === gameResults.length) {
        this.postGameWinners(this.state.winningTeams)
        }
      

      }

    postGameWinners = (data) => {
      let self = this
      // let gameNum = 0

      let dataLen = data.length - 1
      data.forEach((game, g) => {
        // gameNum++
        let gameDate = game.gameDate
        let gameId = game.gameId
        let gameResult = { gameResult: game.winningTeam }
        API.updateNhlPlayoffGame(gameDate, gameId, gameResult)
          .then(res => {
            console.log(res)
            if (g === dataLen) {
              self.findUserPicks()
              // console.log('ALL DONE', g)
              // console.log('GAME NUM: ', gameNum)
              // console.log('DATA LEN: ', dataLen)
              // console.log()
              // setTimeout(function() {
              //   self.handlePreloader()
              //   // document.location.reload()
              // }, 1500)
              
              } else {
                // console.log('NO DICE', g)
                // console.log('ALL DONE', g)
                // console.log('GAME NUM: ', gameNum)
                // console.log('DATA LEN: ', dataLen)
              }
          })
          .catch(err => console.log(err))
        })
      
      }

    findUserPicks = () => {
      let self = this
      let localUser = localStorage.getItem('user')
      // let challengeId = localStorage.getItem('userChallengeId')
      let chalUsers = this.state.challengeUsers
      let date = moment(this.props.todaysDate).subtract(1, 'day').format('YYYY-MM-DD')

      API.getNhlPlayoffGamesByDate(date)
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
              self.setState({ yesterdaysGames: games })
              self.setState({ yesterdaysGameIds: yesterdaysGameIds })

              // console.log('YESTERDAYS GAMES: ', games)

              if (games.length === res.data.length) {
                let challengeId = localStorage.getItem('userChallengeId')
                API.getUser(localUser)
                    .then(res => {
                      // console.log('THE USER: ', res.data)
                      let thisUser = res.data
                      let filterPicks = (picks) => {
                        return picks.challengeId === challengeId
                      }
                      let filteredPicks = thisUser[0].picks.filter(filterPicks)
                      let filterWins = (picks) => {
                        return picks.result === 'win' 
                      }
                      let filteredWins = filteredPicks?.filter(filterWins)
                      // console.log('FILTERED WINS: ', filteredWins)
                      this.setState({
                        userId: thisUser[0].username,
                        userWins: filteredWins,
                        userPicks: filteredPicks,
                      })
                    })
                    .catch(err => {console.log(err)})
                    
                
                let users = []
                // console.log('CHAL USERS: ', chalUsers)
                chalUsers.forEach((chalUser) => {
                  users.push(chalUser)
                  let thisUser = chalUser
                  let filterPicks = (picks) => {
                    return picks.challengeId === challengeId
                  }
                  let filteredPicks = chalUser.picks.filter(filterPicks)
                  let filterWins = (picks) => {
                    return picks.result === 'win'
                  }
                  let filteredWins = filteredPicks?.filter(filterWins)
                  // console.log('FILTERED WINS: ', filteredWins)
                  let thisUserObj = {
                      userId: thisUser.username,
                      userWins: filteredWins,
                      userPicks: filteredPicks,
                    }
                  // IF USER HAS MADE PICKS FIND THEIR WINS
                  // console.log('THIS CHALLENGE USER: ', thisUserObj)
                  if (filteredPicks[0]) {
                      self.findUserWins(thisUserObj)
                    }
                })

                if (users.length === chalUsers.length) {
                  setTimeout(function() {
                    // console.log('THEY EQUAL: ', users.length, chalUsers.length)
                    self.handlePreloader()
                    document.location.reload()
                  }, 2000)
                }

              }
            })
          })
          .catch(err => console.log(err))
      }

    findUserWins = (userData) => {
      let userId = userData.userId
      let yesterday = this.state.yesterday
      let userPicks = userData.userPicks
      let schedule = this.state.yesterdaysGames
      let challengeId = this.state.challengeId
      // let userWins = userData.userWins
      // console.log('DA SCHEDULE: ', schedule)
    
      // FIND THIS USER'S PICK FOR TODAY
      let thisPickDate = (picks) => {
        return picks.gameDate === this.props.yesterdaysDate
      }
      let thisPick = userPicks.filter(thisPickDate)
      let thisPickTeam = ''

      // IF THERE IS A PICK FOR YESTERDAY MAKE THAT 'THISPICKTEAM'
      if (thisPick[0]) {
        thisPickTeam = thisPick[0].team
        console.log('THIS PICK RESULT: ', userId, thisPickTeam, thisPick[0].result)

        // ONLY CHECKING GAMES WITH 'PENDING' RESULT
        if (thisPick[0].result === 'pending') {
        
          // CHECK TO SEE IF YESTERDAYS PICK IS A WINNER
          // let newWin = null

          let findWinFunc = (games) => {
            return games.gameWinner === thisPickTeam.trim()
          }

          let foundWinner = schedule.filter(findWinFunc)

          console.log('FOUND WINNER? ', foundWinner)

          if (foundWinner[0]) {
            let result = 'win'
            console.log('THIS IS A WINNER: ', thisPick)
            // newWin = { win: thisPickTeam }

            // CHANGE PICK RESULT IF WIN
            let newPick = {
              team: foundWinner[0].gameWinner,
              gameDate: foundWinner[0].date,
              gameId: foundWinner[0].id,
              challengeId: thisPick[0].challengeId,
              seed: thisPick[0].seed,
              result: result
            }

            this.overridePickResult(userId, newPick.gameId, newPick.result)

            } else {
              let result = 'loss'
              // let newLoss = { loss: thisPickTeam }
              let newPick = {
                team: thisPick[0].team,
                gameDate: thisPick[0].gameDate,
                gameId: thisPick[0].gameId,
                challengeId: thisPick[0].challengeId,
                seed: thisPick[0].seed,
                result: result
              }
            
              this.overridePickResult(userId, newPick.gameId, newPick.result)

            }
          } else { return }
        } else { return }

      }

      overridePickResult(userId, gameId, gameResult) {
        // console.log(date)
        API.updateUserPick(userId, gameId, gameResult)
          .then(res => {
              console.log('UPDATING USER PICK: ', res)
            })
          .catch(err => {console.log(err)}) 
          
        }
  

    createTimer = (timeDiff) => {
        //console.log('Time until first game: ', timeDiff)
        let seconds = moment.duration(timeDiff).asSeconds() * 1000
        //console.log('In seconds milliseconds: ', seconds)
        this.setState({ timeDiff: seconds })
        // console.log('TIME TIL GAME STARTS: ', this.state.timeDiff / 1000)
      }

    loadLogo = (team) => {
      // console.log('TEAMS: ', this.state.teams)
      // console.log('THIS TEAM: ', team)
      // let logo = this.state.teams.filter(teamLogo => {
      //   return teamLogo.teamAlias.toLowerCase() === team
      // })
      // if (logo[0]) {
      //   console.log('TEAM LOGO: ', logo[0])
      //   return logo[0]
      // }

      switch (true) {
        case (team === 'chi'):
          return chi2.default;
          
        case (team === 'tb'):
          return tb.default;
          
        case (team === 'wsh'):
          return wsh.default;
           
        case (team === 'bos'):
          return bos2.default;
           
        case (team === 'car'):
          return car.default;
           
        case (team === 'nyi'):
          return nyi.default;
           
        case (team === 'cbj'):
          return cbj.default;
           
        case (team === 'van'):
          return van.default;
           
        case (team === 'vgk'):
          return vgk.default;
        
        case (team === 'col'):
          return col.default;
           
        case (team === 'dal'):
          return dal2.default;
           
        case (team === 'stl'):
          return stl.default;
           
        case (team === 'ari'):
          return ari.default;
           
        case (team === 'cgy'):
          return cgy.default;
           
        case (team === 'mtl'):
          return mtl.default;
           
        case (team === 'phi'):
          return phi2.default;
           
        default:
          return nhl.default;
        }  

      }

    render() {
      library.add(faIgloo, faCaretRight, faBasketballBall, faHockeyPuck)
      let timerEnded = false;
      let lastDate = this.state.lastDate
      let EndTimer = () => {
          timerEnded = true
          return (
            <span>Today's games have already begun.</span>
          )
        }
        
        return (
            <div className='calendar'>
              <LoadingOverlay
                active={this.state.isActive}
                spinner
                styles={{
                  spinner: (base) => ({
                    ...base,
                    width: '150px',
                    '& svg circle': {
                      stroke: 'gold'
                    }
                  })
                }}
                text='PLEASE WAIT... Loading Results... (this may take up to 30-45 seconds)'
                >
              </LoadingOverlay>
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
                              {'('+this.state.awaySeed+')' + this.state.awayTeam} <br />
                              <img 
                                className='teamLogo' 
                                src={this.loadLogo(this.state.awayAlias)}
                                alt={this.state.awayAlias} 
                                data-team={this.state.awayTeam}
                                fluid='true'
                              />
                            </span>
                            <span className='atSymbol col-md-2'>
                              @
                            </span>
                            <span className='col-md-5 team homeTeam' value={this.state.homeTeam} onClick={this.toggleActive}>
                              {'('+this.state.homeSeed+')' + this.state.homeTeam} <br />
                              <img 
                                className='teamLogo' 
                                src={this.loadLogo(this.state.homeAlias)}
                                alt={this.state.homeAlias} 
                                data-team={this.state.homeTeam}
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
                      <PickError
                        pickError={this.state.pickError}
                      />
                      <input type="submit" value="Submit" color="primary" className="btn btn-primary" onClick={this.handleSubmit} />
                      <Button color="danger" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </form>
                </Modal>

              <div className="row countdown">
              <div className="col-3"></div>
              <div className="col-6 timeToPick">
                TIME TO PICK <FontAwesomeIcon icon="fas fa-hockey-puck" /> <Countdown date={Date.now() + this.state.timeDiff} zeroPadTime={2} daysInHours={true} renderer={this.timerRender}>
                    <EndTimer />
                  </Countdown>
                  <small id="est" className="form-text text-muted">All times shown in EST</small>
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
                defaultDate={(this.props.todaysDate) !== '' ? this.props.todaysDate : moment().format()}
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
                  if(moment(calEvent.date).isBefore(moment(this.props.todaysDate))) {
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

export default NhlPlayoffCalendar

