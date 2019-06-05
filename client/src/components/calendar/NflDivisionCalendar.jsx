import React, { Component } from 'react'
import '../../css/calendar/calendar.css'
import '../../css/calendar/fullcalendar.css'
import '../../css/calendar/fullcalendar.print.css'
import '../../css/calendar/fullcalendar.min.css'
import LoadingOverlay from 'react-loading-overlay';
import PickError from "../alerts/PickError";
import FullCalendar from 'fullcalendar-reactwrapper';
import Countdown from 'react-countdown-now';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faIgloo, faCaretRight, faBasketballBall } from '@fortawesome/free-solid-svg-icons'
import API from '../../utils/API'
import $ from 'jquery'
import moment from 'moment-timezone';
import { ari, atl2, bal, bos2, chc, cws, cle2, cin, col, det2, mia2, hou2, kc, laa, lad, nym, nyy, mil2, min2, oak, pit, sd, sf, phi2, sea, stl, tb, tex, tor2, wsh } from '../../css/mlbLogos'

class NflDivisionCalendar extends Component {
    constructor(props) {
        super(props);
        this.state = { 
          pickError: false,
          isActive: false,
          modal: false, 
          modalYesterday: false,
          modalAllGames: false,
          modalPastResults: false,
          nestedModal: false, 
          nestedModalExpPick: false, 
          nestedModalNoPick: false, 
          closeAll: false, 
          closeAllExpPick: false, 
          closeAllNoPick: false, 
          challengeId: '',
          challengeData: {},
          challengeStartDate: '',
          allGames: [],
          allRecentGames: [],
          allPastGames: [],
          sortedGames: [],
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
          teams: '', 
          status: '', 
          id: '', 
          activePick: '', 
          activeDate: '', 
          today: '',
          newToday: '',
          oldToday: '',
          yesterday: '', 
          firstGameTime: '',
          timeDiff: '', 
          timerEnded: false,
          homeTeam: '', 
          awayTeam: '', 
          homeAlias: '', 
          awayAlias: ''
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
        this.toggleYesterday = this.toggleYesterday.bind(this);
        this.toggleAllGames = this.toggleAllGames.bind(this);
        this.togglePastResults = this.togglePastResults.bind(this)
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
        this.getYesterdaysResults = this.getYesterdaysResults.bind(this)
        this.getAllGames = this.getAllGames.bind(this)
        this.addWeek = this.addWeek.bind(this)
        this.addWeekResult = this.addWeekResult.bind(this)
        this.subWeek = this.subWeek.bind(this)
        this.subWeekResult = this.subWeekResult.bind(this)
        this.findPastResults = this.findPastResults.bind(this)
        this.sortAllGames = this.sortAllGames.bind(this)
        
      }

    componentDidMount() {
      // this.getChallengeData()
      // this.getTodaysFirstGame()
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

    toggleYesterday() {
      this.getTodaysFirstGame()
      this.getYesterdaysResults()
      this.setState({
        modalYesterday: !this.state.modalYesterday,
      });
    }

    toggleAllGames() {
      this.getTodaysFirstGame()
      this.getAllGames()
      this.setState({
        modalAllGames: !this.state.modalAllGames,
      });
    }

    togglePastResults() {
      this.getTodaysFirstGame()
      this.findPastResults()
      this.setState({
        modalPastResults: !this.state.modalPastResults
      })
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
      let gameTime = moment(event.start._d).add(5, 'hours').format("MMM Do, h:mmA")
      let gameStatus = event.status.toUpperCase()
      let gameId = event._id
      this.setState({ 
        status: gameStatus, 
        time: gameTime, 
        activeDate: event.date, 
        gameId: gameId 
      });
      // console.log('Status: ', this.state.status)
      // console.log('Start Time: ', this.state.time)
      // console.log('Game ID: ', this.state.gameId)
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
            challengeStartDate: res.data[0].startDate
          })
          self.getUserData()
          self.getSchedule()
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
        myWins: thisUser[0].wins,
        winsCount: thisUser[0].wins.length,
        myPicks: thisUser[0].picks,
      })

      // console.log('CURRENT USER: ', this.state.currentUser)
      // console.log('CHAL USERS DATA: ', this.state.challengeData.users)
      }

    handleSubmit(event) {
        event.preventDefault();
        console.log('HANDLE SUBMIT')
        
        let self = this
        let myId = this.props.username
        let challengeId = this.state.challengeId
        let myPicks = this.state.myPicks
        let myWins = this.state.myWins
        let teamPick = this.state.activePick
        let pickDate = this.state.activeDate
        // let prevDates = this.state.myDatesPicked
        let gameId = this.state.gameId
        // let toggle = true
        let thisPick = { team: teamPick.trim(), gameDate: pickDate, gameId: gameId, result: 'pending' }
        let firstGameTime = this.state.firstGameTime
        // TODAY'S TIMER STATUS
        // console.log('FIRST GAME TIME: ', firstGameTime)
        if (firstGameTime !== '') {
          let realTime = moment().tz('America/New_York').format('HH:mm:ss a')
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
            if (pickDate === moment().format('YYYY-MM-DD')) {
              // console.log('THIS IS A LATE PICK FOR TODAY')
              this.toggleLatePick()
              return;
            }
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
                // toggle = false
                self.toggleInvalidPick()
                console.log('YOU HAVE ALREADY WON WITH THIS TEAM', teamPick)
                return;
                } 
              }
            if (thisPick.gameDate === myPicks[j].gameDate) {
              let newPick = thisPick
              // console.log('TEAM PICKED ALREADY: ', this.state.myPicks[j])
              // console.log('Prev Dates Picked: ', prevDates)
              // console.log('These dates match', pickDate, prevDates[j])
              debugger;
              this.overridePick(pickDate, newPick) 
              return;
              }   
            }
          }
        
        // console.log('THIS PICK DATA: ', thisPick)
        // SAVE PICK TO DATABASE
        debugger;
        API.saveMlbPick(challengeId, myId, thisPick)
          .then(res => { 
            console.log(res)
            this.toggle()
            document.location.reload()
           })
          .catch(err => { 
            console.log(err) 
            this.setState({
              pickError: true
            })
          })  

        // // CLOSE MODAL IF VALID PICK
        // if (toggle) {
          
        // }

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
      console.log(date)
      API.deleteMlbPick(this.state.challengeId, this.props.username, date)
        .then(res => {
        console.log(res)
        API.saveMlbPick(this.state.challengeId, this.props.username, newPick)
          .then(res => { 
            console.log(res)
            document.location.reload()
            this.toggle()
          })
          .catch(err => { 
            console.log(err) 
            this.setState({
              pickError: true
            })
          })  
        })
        .catch(err => {
          console.log(err)
          this.setState({
            pickError: true
          })
        })
      }

    getYesterdaysResults = () => {
      console.log('YESTERDAYS GAME RESULTS: ', this.state.yesterdaysGames)
      }

    addWeek = () => {
      let startDay = this.state.newToday
      let newDay = moment(startDay).add(7, 'days').format('YYYY-MM-DD')
      this.setState({
        newToday: newDay
        }, () => {
          this.getAllGames()
        })
      }
    
    subWeek = () => {
      let startDay = this.state.newToday
      let newDay = moment(startDay).subtract(7, 'days').format('YYYY-MM-DD')
      this.setState({
        newToday: newDay
        }, () => {
          this.getAllGames()
        })
      }

    addWeekResult = () => {
      let startDay = this.state.oldToday
      let newDay = moment(startDay).add(7, 'days').format('YYYY-MM-DD')
      this.setState({
        oldToday: newDay
        }, () => {
          this.findPastResults()
        })
      }
    
    subWeekResult = () => {
      let startDay = this.state.oldToday
      let newDay = moment(startDay).subtract(7, 'days').format('YYYY-MM-DD')
      this.setState({
        oldToday: newDay
        }, () => {
          this.findPastResults()
        })
      }

    findPastResults = () => {
      let today = this.state.oldToday
      let week = moment(today).subtract(7, 'days').format('YYYY-MM-DD')

      let allGames = this.state.allGames
      let pastGamesFunc = (games) => {
        return moment(games.start._i).isSameOrBefore(today) && moment(games.start._i).isSameOrAfter(week)
      }
      let allPastGames = allGames.filter(pastGamesFunc).reverse()
      console.log('ONLY PAST GAMES: ', allPastGames)

      this.setState({
        allPastGames: allPastGames
      })

      // API.getMlbGames()
      //   .then(res => {
      //     console.log('all games: ', res.data)
      //     let allGames = res.data
      //     let pastGamesFunc = (games) => {
      //       return moment(games.gameTime).isSameOrBefore(today) && moment(games.gameTime).isSameOrAfter(week)
      //     }
      //     let allPastGames = allGames.filter(pastGamesFunc).reverse()
      //     console.log('ONLY PAST GAMES: ', allPastGames)
    
      //     this.setState({
      //       allPastGames: allPastGames
      //     }, () => {
      //       this.sortPastGames()
      //     })
          
      //   })
      //   .catch(err => {
      //     console.log(err)
      //   })
      
      // console.log('ALL PAST GAMES: ', allGames)

      

      }

    getAllGames = () => {
      let today = this.state.newToday
      let week = moment(today).add(7, 'days').format('YYYY-MM-DD')
      let allGames = this.state.allGames
      // console.log('ALL GAMES: ', allGames)

      let findRecentGames = (games) => {
        return moment(games.start._i).isSameOrAfter(today) && moment(games.start._i).isSameOrBefore(week)
      }

      let allRecentGames = allGames.filter(findRecentGames)
      // console.log('ONLY RECENT GAMES: ', allRecentGames)

      this.setState({
        allRecentGames: allRecentGames
      })
      

      }

    sortAllGames = () => {
      let allGames = this.state.allGames
      // console.log('USER PICKS: ', this.state.allGames)

      // let oldGamesFunc = (picks) => {
      //   return picks.date.isSameOrAfter(moment().format('YYYY-MM-DD')) 
      // }
      // let oldGames = allGames.filter(oldGamesFunc)
      let sortedGames = allGames.sort(function(a, b) {
        if (moment(a.start).isBefore(moment(b.start))) {
            return -1;
        }
        if (moment(a.start).isAfter(moment(b.start))) {
            return 1;
        }
        return 0;
      })

      this.setState({
        sortedGames: sortedGames
      })
      console.log('THE SORTED GAMES: ', sortedGames)
      //console.log('THE OLD PICKS: ', this.state.oldGames)
      
    
      }

    sortPastGames = () => {
      let allGames = this.state.allPastGames
      // console.log('USER PICKS: ', this.state.allGames)

      // let oldGamesFunc = (picks) => {
      //   return picks.date.isSameOrAfter(moment().format('YYYY-MM-DD')) 
      // }
      // let oldGames = allGames.filter(oldGamesFunc)
      let sortedGames = allGames.sort(function(a, b) {
        if (moment(a.start).isBefore(moment(b.start))) {
            return -1;
        }
        if (moment(a.start).isAfter(moment(b.start))) {
            return 1;
        }
        return 0;
      })

      this.setState({
        allPastGames: sortedGames
      })
      // console.log('THE SORTED GAMES: ', sortedGames)
      //console.log('THE OLD PICKS: ', this.state.oldGames)
      
    
      }

    getSchedule = () => {
      let date = moment().subtract(3, 'days').format('YYYY-MM-DD')
      let self = this
      self.setState({ yesterday: date })
      this.getGames()

      // PULL GAMES FROM YESTERDAY
      API.getMlbGamesByDate(date)
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

            // GET RESULTS FROM YESTERDA IF THEY HAVEN'T BEEN PULLED(UNDEFINED)
            // console.log('THESE GAMES: ', this.state.yesterdaysGames)
            // if(this.state.yesterdaysGames[0].gameWinner === undefined) {
                self.getResults()
              // } else {
              //   //FIND ALL USERS PICKS
              //   // console.log('finding user picks')
              //   self.findUserPicks()
              // }

        })
          .catch(err => console.log(err))
      }

    getTodaysFirstGame = () => {
      let date = moment().format('YYYY-MM-DD')
      this.setState({
        today: date,
        newToday: date,
        oldToday: date
      })
      let self = this

      // GET GAME SCHEDULE FOR TODAY AND FIND FIRST GAME
      API.getMlbGamesByDate(date)
        .then (res => {
          let games = res.data
          let sortedGames = games.sort((a,b) => new moment(a.gameTime) - new moment (b.gameTime))

          // CHECK TO SEE IF THERE ARE NO GAMES TODAY
          if (!sortedGames[0]) {
            // console.log('THERE MUST BE NO GAMES TODAY')
            $('.timer').html('<div>THERE ARE NO GAMES TODAY</div>')
            return;
          }

          let firstGame = sortedGames[0]
          let firstGameTime = firstGame.gameTime
          let firstGameTimeAdj = moment(firstGameTime).add(5, 'hours').tz('America/New_York').format('HH:mm:ss a')
          let realTime = moment().tz('America/New_York').format('HH:mm:ss a')
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
        let homeTeam = data[i].home.market + ' ' + data[i].home.name
        let awayTeam = data[i].away.market + ' ' + data[i].away.name
        
        let gameData = {
          gameDate: gameDate,
          gameTime: gameDateAdj,
          gameStatus: data[i].status,
          gameId: data[i].id,
          homeTeam: homeTeam,
          awayTeam: awayTeam,
          homeAlias: data[i].home.alias,
          awayAlias: data[i].away.alias,
          gameResult: 'none'
        }
    
        //POST ENTIRE SCHEDULE
        API.postMlbGames(gameData)
          .then(res=> console.log(res))
          .catch(err => console.log(err))
        }
      }

    getGames = () => {
      // let self = this

      // PULL FULL SCHEDULE FROM DATABASE
      API.getMlbGames()
        .then(res => {
          let games = []
          res.data.forEach((game) => {
            let splitDate = game.gameDate.split('T')
            let gameDate = splitDate[0]
            let homeAlias = game.homeAlias.toLowerCase()
            let awayAlias = game.awayAlias.toLowerCase()
            let startTime = moment(game.gameTime).add(6, 'hours')
            let gameInfo = {
                id: game.gameId,
                date: gameDate,
                start: startTime,
                status: game.gameStatus,
                result: game.gameResult,
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
            this.sortAllGames()
        })
          .catch(err => console.log(err))

      }
    
    getResults = () => {
      // console.log('GETTING RESULTS')
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
        console.log('ALL THE GAMES: ', yesterdaysGames)
        // console.log('NUMBER OF GAMES: ', yesterdaysGames.length)
        // console.log('LAST GAME RESULT: ', yesterdaysGames[lastGame].gameWinner)

        let gameResults = []

        const nflKey = 'bdqyj8auvbh3gmwmuqasrxen'

        yesterdaysGameIds.forEach(function(gameId, k) {
          setTimeout ( 
            function() {
              $.ajax({
                url: "https://cors-everywhere.herokuapp.com/http://api.sportradar.us/nfl/official/trial/v5/en/games/" + gameId + "/boxscore.json?api_key=" + nflKey,
                type: 'GET',
                success: function(data) {
                  console.log('Game results: ', data.game)
                  gameResults.push(data.game)
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
      let winningTeams = []
      let today = moment().format('YYYY-MM-DD')

      gameResults.forEach((gameResult) => {
        let gameId = gameResult.id
        let gameDate = this.state.yesterday
        if (gameResult.rescheduled) {
          let gamePostponed = gameResult.rescheduled[0]
          if (gamePostponed.isSameOrAfter(today)) {

          }
        }
        
        let homeTeam = {
            team: gameResult.home.market + ' ' + gameResult.home.name ,
            points: gameResult.home.points
          }
        let awayTeam = {
            team: gameResult.away.market + ' ' + gameResult.away.name,
            points: gameResult.away.points
          }

        if (homeTeam.points > awayTeam.points) {
            winningTeams.push({gameId: gameId, gameDate: gameDate, winningTeam: homeTeam.team, homePoints: homeTeam.points, awayPoints: awayTeam.points})
          } else {
            winningTeams.push({gameId: gameId, gameDate: gameDate, winningTeam: awayTeam.team, homePoints: homeTeam.points, awayPoints: awayTeam.points})
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
        API.updateMlbGame(gameDate, gameId, gameResult)
          .then(res => {
            console.log(res)
            if (g === dataLen) {
              // console.log('ALL DONE', g)
              // console.log('GAME NUM: ', gameNum)
              // console.log('DATA LEN: ', dataLen)
              self.findUserPicks()
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

      // console.log('MAJOR DATA: ', data)
      // for (let y=0; y<data.length; y++) {
      //   let gameDate = data[y].gameDate
      //   let gameId = data[y].gameId
      //   let gameResult = { gameResult: data[y].winningTeam }
      //   API.updateMlbGame(gameDate, gameId, gameResult)
      //     .then(res => console.log(res))
      //     .catch(err => console.log(err))
      //   } 
      }

    findUserPicks = () => {
      let self = this
      let localUser = localStorage.getItem('user')
      let chalUsers = this.state.challengeData.users
      let date = moment().subtract(1, 'days').format('YYYY-MM-DD')

      API.getMlbGamesByDate(date)
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

                if (games.length === res.data.length) {
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
                  
                  let users = []
                  chalUsers.forEach((chalUser) => {
                    users.push(chalUser)
                    let thisUserObj = {
                      userId: chalUser.username,
                      userPicks: chalUser.picks,
                      userWins: chalUser.wins
                      }
                    // IF USER HAS MADE PICKS FIND THEIR WINS
                    if (chalUser.picks[0]) {
                      self.findUserWins(thisUserObj)
                      }
    
                  })
  
                  if (users.length === chalUsers.length) {
                    setTimeout(function() {
                      self.handlePreloader()
                      document.location.reload()
                    }, 2000)
                  }
  
                }
              })

            // GET RESULTS FROM YESTERDA IF THEY HAVEN'T BEEN PULLED(UNDEFINED)
            // console.log('THESE GAMES: ', this.state.yesterdaysGames)
            // if(this.state.yesterdaysGames[0].gameWinner === undefined) {
                self.getResults()
              // } else {
              //   //FIND ALL USERS PICKS
              //   // console.log('finding user picks')
              //   self.findUserPicks()
              // }

        })
          .catch(err => console.log(err))

      
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

          let findWinFunc = (games) => {
            return games.gameWinner === thisPickTeam.trim()
          }

          let foundWinner = schedule.filter(findWinFunc)

          // console.log('FOUND WINNER? ', foundWinner)

          if (foundWinner[0]) {
            let result = 'win'
            // console.log('THIS IS A WINNER: ', thisPick)
            newWin = { win: thisPickTeam }

            // CHANGE PICK RESULT IF WIN
            let newPick = {
              team: foundWinner[0].gameWinner,
              gameDate: foundWinner[0].date,
              gameId: foundWinner[0].id,
              result: result
            }
            // console.log('NEW PICK: ', newPick)
            API.addMlbWin(this.state.challengeId, userId, newWin)
              .then (res => {
                console.log(res)
                this.overridePickResult(userId, yesterday, newPick) 
                // debugger;
              })
              .catch(err => console.log(err))

            } else {
              let result = 'loss'
              // let newLoss = { loss: thisPickTeam }
              let newPick = {
                team: thisPick[0].team,
                gameDate: thisPick[0].gameDate,
                gameId: thisPick[0].gameId,
                result: result
              }
              // console.log('THIS IS A LOSS: ', thisPick)
              // console.log('RESULT: ', newPick)
              this.overridePickResult(userId, yesterday, newPick) 

            }
          } else { return }
        } else { return }


      }

    overridePickResult(userId, date, newPick) {
      // console.log(date)
      // API.updateMlbPick(this.state.challengeId, userId, date, newPickResult)
      //   .then(res => {
      //     console.log(res)
      //   })
      //   .catch(err => {console.log(err)})
      API.deleteMlbPick(this.state.challengeId, userId, date)
        .then(res => {
            console.log(res)
            API.saveMlbPick(this.state.challengeId, userId, newPick)
              .then(res => { 
                console.log(res)
                })
              .catch(err => { console.log(err) } )  
          })
        .catch(err => {console.log(err)})
      // API.saveMlbPick(this.state.challengeId, userId, newPick)
      //   .then(res => { 
      //     console.log(res)
      //     })
      //   .catch(err => { console.log(err) } )  
        
      }

    createTimer = (timeDiff) => {
        // console.log('First game time: ', this.state.firstGameTime)
        let seconds = moment.duration(timeDiff).asSeconds() * 1000
        //console.log('In seconds milliseconds: ', seconds)
        this.setState({ timeDiff: seconds })
        // console.log('TIME TIL GAME STARTS: ', this.state.timeDiff / 1000)
      }

    loadLogo = (team) => {
      switch (true) {
        case (team === 'atl'):
          return atl2;
          
        case (team === 'bal'):
          return bal;
          
        case (team === 'bos'):
          return bos2;
          
        case (team === 'chc'):
          return chc;
          
        case (team === 'cws'):
          return cws;
           
        case (team === 'cle'):
          return cle2;
           
        case (team === 'cin'):
          return cin;
           
        case (team === 'col'):
          return col;
           
        case (team === 'det'):
          return det2;
           
        case (team === 'mia'):
          return mia2;
           
        case (team === 'hou'):
          return hou2;
           
        case (team === 'kc'):
          return kc;
           
        case (team === 'laa'):
          return laa;
           
        case (team === 'lad'):
          return lad;
           
        case (team === 'nym'):
          return nym;
           
        case (team === 'nyy'):
          return nyy;
        
        case (team === 'mil'):
          return mil2;
           
        case (team === 'min'):
          return min2;
           
        case (team === 'oak'):
          return oak;
           
        case (team === 'pit'):
          return pit;
           
        case (team === 'sd'):
          return sd;
           
        case (team === 'sf'):
          return sf;
           
        case (team === 'phi'):
          return phi2;
           
        case (team === 'sea'):
          return sea;
           
        case (team === 'stl'):
          return stl;
           
        case (team === 'tb'):
          return tb;
           
        case (team === 'tex'):
          return tex;
           
        case (team === 'tor'):
          return tor2;
           
        case (team === 'ari'):
          return ari;
           
        case (team === 'wsh'):
          return wsh;
           
        default:
          return ari;
        }  

      }

    render() {
      library.add(faIgloo, faCaretRight, faBasketballBall)
      let uuidv4 = require('uuid/v4')
      let timerEnded = false;
      let today = moment().format('MM-DD-YYYY')
      let yesterday = moment().subtract(1, 'day').format('MM-DD-YYYY')
      let newToday = moment(this.state.newToday).format('MM-DD')
      let oldToday = moment(this.state.oldToday).subtract(1, 'day').format('MM-DD')
      let newWeek = moment(newToday).add(6, 'days').format('MM-DD')
      let oldWeek = moment(oldToday).subtract(6, 'days').format('MM-DD')
      let challengeStartDate = moment(this.state.challengeStartDate).format('MM-DD-YYYY')
      let modalStyle = {
        backgroundColor: 'gold',
        color: 'darkblue'
        }    
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

              {/* FULL MLB SCHEDULE MODAL */}
              <Modal 
                isOpen={this.state.modalPastResults} 
                autoFocus={true}
                centered={true}
                size='lg'
                className='pastResultsModal'
              >
                
                <ModalHeader id='modalTitle'>
                  Past Results <strong>( {oldWeek} - {oldToday} )</strong>
                  <i className="fas fa-arrow-left leftArrow" onClick={this.subWeekResult}></i>
                  <i className="fas fa-arrow-right rightArrow" onClick={this.addWeekResult}></i>
                  <i className="fas fa-times closeButton" onClick={this.togglePastResults}></i>
                </ModalHeader>
                  <ModalBody id='modalBody' className='games' style={modalStyle}>
                      <div className="thisTeam">
                        <table className='table table-hover'>
                          <thead>
                            <tr>
                              <th>Date</th>
                              <th>Matchup</th>
                              <th>Game Result</th>
                            </tr>
                          </thead>
                          <tbody>
                          {
                            this.state.allPastGames.map((game) => (
                              <tr key={uuidv4()} className='gameInfo' >
                                <td>{moment(game.date).format('M/D')}</td>
                                <td>{game.awayTeam} @ {game.homeTeam}</td>
                                <td>{game.result.gameResult ? game.result.gameResult : game.result}</td>
                              </tr>
                            ))
                          }    
                          </tbody>
                        </table>
                      </div> <hr />
                      
                  </ModalBody>
                  <ModalFooter>
                    <Button color="secondary" onClick={this.togglePastResults}>Close</Button>
                  </ModalFooter>
                </Modal>


              {/* FULL MLB SCHEDULE MODAL */}
              <Modal 
                isOpen={this.state.modalAllGames} 
                autoFocus={true}
                centered={true}
                size='lg'
                className='allGamesModal'
              >
                
                <ModalHeader id='modalTitle'>
                  Schedule List <strong>( {newToday} - {newWeek} )</strong>
                  <i className="fas fa-arrow-left leftArrow" onClick={this.subWeek}></i>
                  <i className="fas fa-arrow-right rightArrow" onClick={this.addWeek}></i>
                  <i className="fas fa-times closeButton" onClick={this.toggleAllGames}></i>
                </ModalHeader>
                  <ModalBody id='modalBody' className='games' style={modalStyle}>
                      <div className="thisTeam">
                        <table className='table table-hover'>
                          <thead>
                            <tr>
                              <th>Date</th>
                              <th>Matchup</th>
                              <th>Game Time</th>
                            </tr>
                          </thead>
                          <tbody>
                          {
                            this.state.allRecentGames.map((game) => (
                              <tr key={uuidv4()} className='gameInfo' >
                                <td>{moment(game.date).format('M/D')}</td>
                                <td>{game.awayTeam} @ {game.homeTeam}</td>
                                <td>{moment(game.start).format('h:mm a')}</td>
                              </tr>
                            ))
                          }    
                          </tbody>
                        </table>
                      </div> <hr />
                      
                  </ModalBody>
                  <ModalFooter>
                    <Button color="secondary" onClick={this.toggleAllGames}>Close</Button>
                  </ModalFooter>
                </Modal>


              {/* YESTERDAYS GAMES MODAL */}
              <Modal 
                isOpen={this.state.modalYesterday} 
                autoFocus={true}
                centered={true}
                size='lg'
                className='resultsModal'
              >
                
                <ModalHeader id='modalTitle'>
                  Yesterday's Games ({yesterday})
                </ModalHeader>
                  <ModalBody id='modalBody' className='games' style={modalStyle}>
                      <div className="thisTeam">
                        <table className='table  table-hover'>
                          <thead>
                            <tr>
                              <th>Matchup</th>
                              <th>Result</th>
                            </tr>
                          </thead>
                          <tbody>
                          {
                            this.state.yesterdaysGames.map((game) => (
                              <tr key={uuidv4()} className='gameResult' >
                                <td>{game.awayTeam} @ {game.homeTeam}</td>
                                <td>{game.gameWinner}</td>
                              </tr>
                            ))
                          }    
                          </tbody>
                        </table>
                      </div> <hr />
                      
                  </ModalBody>
                  <ModalFooter>
                    <Button color="secondary" onClick={this.toggleYesterday}>Close</Button>
                  </ModalFooter>
                </Modal>




              
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
                      <PickError
                        pickError={this.state.pickError}
                      />
                      <input type="submit" value="Submit" color="primary" className="btn btn-primary" onClick={this.handleSubmit} />
                      <Button color="danger" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </form>
                </Modal>

              <div className="row countdown">
                <div className="col-2"></div>
                <div className="col-8 timer">
                  TIME TO PICK <FontAwesomeIcon icon="basketball-ball" /> <Countdown date={Date.now() + this.state.timeDiff} zeroPadTime={2} daysInHours={true} renderer={this.timerRender}>
                      <EndTimer />
                    </Countdown> <br />
                    {

                      moment(challengeStartDate).isBefore(moment(today)) ? 

                      <small></small>  

                      :

                      <small>*THIS CHALLENGE BEGINS ON {challengeStartDate}*</small>

                    }
                    <small id="est" className="form-text text-muted">All times shown in EST</small>
                </div>
                <div className="col-4-sm resultsButton">
                  <Button color='danger' onClick={this.togglePastResults}>Past Game Results</Button>
                </div>
                <div className="col-4-sm resultsButton">
                  <Button color='warning' onClick={this.toggleAllGames}>View Schedule List</Button>
                </div>
                <div className="col-4-sm resultsButton">
                  <Button color='success' onClick={this.toggleYesterday}>Yesterday's Game Results</Button>
                </div>
              
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

export default NflDivisionCalendar
