import React, { Component } from 'react'
import '../../css/calendar/calendar.css'
import '../../css/nflChallenge.css'
import LoadingOverlay from 'react-loading-overlay';
import PickError from "../alerts/PickError";
// import FullCalendar from 'fullcalendar-reactwrapper';
// import Countdown from 'react-countdown-now';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { library } from '@fortawesome/fontawesome-svg-core'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faIgloo, faCaretRight, faBasketballBall } from '@fortawesome/free-solid-svg-icons'
import API from '../../utils/API'
import $ from 'jquery'
import moment from 'moment-timezone'
// import ReactHintFactory from 'react-hint'
import { nfl, ari2, atl3, bal2, buf, car, chi2, cin2, cle3, dal2, den, det3, gb, hou2, ind2, jac, kc, lac2, la, mia2, min2, ne, no, nyg, nyj, oak, phi, pit, sea, sf, tb, ten, was2 } from '../../css/nflLogos'

class NflDivisionCalendar extends Component {
    constructor(props) {
        super(props);
        this.state = { 
          thisWeek: this.props.thisWeek,
          prevWeek: this.props.prevWeek,
          chalValue: this.props.chalValue,
          myValue: this.props.myValue,
          thisWeeksValue: 0,
          pickWeek: '',
          pickError: false,
          isActive: false,
          modal: false, 
          modalYesterday: false,
          modalAllGames: false,
          modalPastResults: false,
          nestedModal: false, 
          nestedModalDivisionWon: false,
          nestedModalExpPick: false, 
          nestedModalOverdraft: false,
          nestedModalNoPick: false, 
          nestedModalLockedPick: false,
          closeAll: false, 
          closeAllDivisionWon: false,
          closeAllExpPick: false, 
          closeAllOverdraft: false,
          closeAllNoPick: false, 
          closeAllLockedPick: false,
          challengeId: '',
          challengeData: {},
          challengeStartDate: '',
          allGames: [],
          allRecentGames: [],
          allPastGames: [],
          sortedGames: [],
          lastWeeksGames: [], 
          thisWeeksGames: [],
          myPicks: [], 
          myWins: [],
          userId: '',
          userPicks: [],
          userWins: [],
          fullSchedule: [],
          allGameIds: [],
          lastWeeksGameIds: [],
          gameResults: [], 
          winningTeams: [],
          gameDate: '',
          gameTime: '',
          title: '', 
          teams: '', 
          status: '', 
          id: '', 
          activePick: '', 
          activePickDiv: '',
          activeValue: '',
          activeDate: '',
          today: '',
          newToday: '',
          oldToday: '',
          firstGameTime: '',
          timeDiff: '', 
          timerEnded: false,
          homeTeam: '', 
          homeValue: '',
          awayTeam: '', 
          awayValue: '',
          homeAlias: '', 
          awayAlias: '',
          lastTeams: [],
          teamName: '',
          teamValue: 0,
          nflTeams: [
            { teamName: 'Arizona Cardinals', teamAlias: 'ari', logo: 'ari2', status: 'secondary', id: 1, valueWeek: 0, value: 0, tier: 0, homeGames: [], awayGames: [], division: 'NFC West' },
            { teamName: 'Atlanta Falcons', teamAlias: 'atl', logo: 'atl3', status: 'secondary', id: 2, valueWeek: 0, value: 0, tier: 0, homeGames: [], awayGames: [], division: 'NFC South' },
            { teamName: 'Baltimore Ravens', teamAlias: 'bal', logo: 'bal2', status: 'secondary', id: 3, valueWeek: 0, value: 0, tier: 0, homeGames: [], awayGames: [], division: 'AFC North' },
            { teamName: 'Buffalo Bills', teamAlias: 'buf', logo: 'buf', status: 'secondary', id: 4, valueWeek: 0, value: 0, tier: 0, homeGames: [], awayGames: [], division: 'AFC East' },
            { teamName: 'Carolina Panthers', teamAlias: 'car', logo: 'car', status: 'secondary', id: 5, valueWeek: 0, value: 0, tier: 0, homeGames: [], awayGames: [], division: 'NFC South' },
            { teamName: 'Chicago Bears', teamAlias: 'chi', logo: 'chi2', status: 'secondary', id: 6, valueWeek: 0, value: 0, tier: 0, homeGames: [], awayGames: [], division: 'NFC North' },
            { teamName: 'Cincinnati Bengals', teamAlias: 'cin', logo: 'cin', status: 'secondary', id: 7, valueWeek: 0, value: 0, tier: 0, homeGames: [], awayGames: [], division: 'AFC North' },
            { teamName: 'Cleveland Browns', teamAlias: 'cle', logo: 'cle3', status: 'secondary', id: 8, valueWeek: 0, value: 0, tier: 0, homeGames: [], awayGames: [], division: 'AFC North' },
            { teamName: 'Dallas Cowboys', teamAlias: 'dal', logo: 'dal2', status: 'secondary', id: 9, valueWeek: 0, value: 0, tier: 0, homeGames: [], awayGames: [], division: 'NFC East' },
            { teamName: 'Denver Broncos', teamAlias: 'den', logo: 'den', status: 'secondary', id: 10, valueWeek: 0, value: 0, tier: 0, homeGames: [], awayGames: [], division: 'AFC West' },
            { teamName: 'Detroit Lions', teamAlias: 'det', logo: 'det3', status: 'secondary', id: 11, valueWeek: 0, value: 0, tier: 0, homeGames: [], awayGames: [], division: 'NFC North' },
            { teamName: 'Green Bay Packers', teamAlias: 'gb', logo: 'gb', status: 'secondary', id: 12, valueWeek: 0, value: 0, tier: 0, homeGames: [], awayGames: [], division: 'NFC North' },
            { teamName: 'Houston Texans', teamAlias: 'hou', logo: 'hou2', status: 'secondary', id: 13, valueWeek: 0, value: 0, tier: 0, homeGames: [], awayGames: [], division: 'AFC South' },
            { teamName: 'Indianapolis Colts', teamAlias: 'ind', logo: 'ind2', status: 'secondary', id: 14, valueWeek: 0, value: 0, tier: 0, homeGames: [], awayGames: [], division: 'AFC South' },
            { teamName: 'Jacksonville Jaguars', teamAlias: 'jac', logo: 'jac', status: 'secondary', id: 15, valueWeek: 0, value: 0, tier: 0, homeGames: [], awayGames: [], division: 'AFC South' },
            { teamName: 'Kansas City Chiefs', teamAlias: 'kc', logo: 'kc', status: 'secondary', id: 16, valueWeek: 0, value: 0, tier: 0, homeGames: [], awayGames: [], division: 'AFC West' },
            { teamName: 'Los Angeles Chargers', teamAlias: 'lac', logo: 'lac2', status: 'secondary', id: 17, valueWeek: 0, value: 0, tier: 0, homeGames: [], awayGames: [], division: 'AFC West' },
            { teamName: 'Los Angeles Rams', teamAlias: 'la', logo: 'la', status: 'secondary', id: 18, valueWeek: 0, value: 0, tier: 0, homeGames: [], awayGames: [], division: 'NFC West' },
            { teamName: 'Miami Dolphins', teamAlias: 'mia', logo: 'mia2', status: 'secondary', id: 19, valueWeek: 0, value: 0, tier: 0, homeGames: [], awayGames: [], division: 'AFC East' },
            { teamName: 'Minnesota Vikings', teamAlias: 'min', logo: 'min2', status: 'secondary', id: 20, valueWeek: 0, value: 0, tier: 0, homeGames: [], awayGames: [], division: 'NFC North' },
            { teamName: 'New England Patriots', teamAlias: 'ne', logo: 'ne', status: 'secondary', id: 21, valueWeek: 0, value: 0, tier: 0, homeGames: [], awayGames: [], division: 'AFC East' },
            { teamName: 'New Orleans Saints', teamAlias: 'no', logo: 'no', status: 'secondary', id: 22, valueWeek: 0, value: 0, tier: 0, homeGames: [], awayGames: [], division: 'NFC South' },
            { teamName: 'New York Giants', teamAlias: 'nyg', logo: 'nyg', status: 'secondary', id: 23, valueWeek: 0, value: 0, tier: 0, homeGames: [], awayGames: [], division: 'NFC East' },
            { teamName: 'New York Jets', teamAlias: 'nyj', logo: 'nyj', status: 'secondary', id: 24, valueWeek: 0, value: 0, tier: 0, homeGames: [], awayGames: [], division: 'AFC East' },
            { teamName: 'Oakland Raiders', teamAlias: 'oak', logo: 'oak', status: 'secondary', id: 25, valueWeek: 0, value: 0, tier: 0, homeGames: [], awayGames: [], division: 'AFC West' },
            { teamName: 'Philadelphia Eagles', teamAlias: 'phi', logo: 'phi', status: 'secondary', id: 26, valueWeek: 0, value: 0, tier: 0, homeGames: [], awayGames: [], division: 'NFC East' },
            { teamName: 'Pittsburgh Steelers', teamAlias: 'pit', logo: 'pit', status: 'secondary', id: 27, valueWeek: 0, value: 0, tier: 0, homeGames: [], awayGames: [], division: 'AFC North' },
            { teamName: 'San Francisco 49ers', teamAlias: 'sf', logo: 'sf', status: 'secondary', id: 29, valueWeek: 0, value: 0, tier: 0, homeGames: [], awayGames: [], division: 'NFC West' },
            { teamName: 'Seattle Seahawks', teamAlias: 'sea', logo: 'sea', status: 'secondary', id: 28, valueWeek: 0, value: 0, tier: 0, homeGames: [], awayGames: [], division: 'NFC West' },
            { teamName: 'Tampa Bay Buccaneers', teamAlias: 'tb', logo: 'tb', status: 'secondary', id: 30, valueWeek: 0, value: 0, tier: 0, homeGames: [], awayGames: [], division: 'NFC South' },
            { teamName: 'Tennessee Titans', teamAlias: 'ten', logo: 'ten', status: 'secondary', id: 31, valueWeek: 0, value: 0, tier: 0, homeGames: [], awayGames: [], division: 'AFC South' },
            { teamName: 'Washington Redskins', teamAlias: 'was', logo: 'was2', status: 'secondary', id: 32, valueWeek: 0, value: 0, tier: 0, homeGames: [], awayGames: [], division: 'NFC East' }
          ]
        };
        this.handlePreloader = this.handlePreloader.bind(this);
        this.handleChangeTitle = this.handleChangeTitle.bind(this);
        this.handleChangeTeams = this.handleChangeTeams.bind(this);
        this.handleChangeStatus = this.handleChangeStatus.bind(this);
        this.toggle = this.toggle.bind(this);
        this.toggleActive = this.toggleActive.bind(this);
        this.toggleInvalidPick = this.toggleInvalidPick.bind(this);
        this.toggleDivisionWon = this.toggleDivisionWon.bind(this);
        this.toggleNoPick = this.toggleNoPick.bind(this);
        this.toggleLockedPick = this.toggleLockedPick.bind(this);
        this.toggleAllNoPick = this.toggleAllNoPick.bind(this);
        this.toggleAllLockedPick = this.toggleAllLockedPick.bind(this);
        this.toggleExpiredPick = this.toggleExpiredPick.bind(this);
        this.toggleLatePick = this.toggleLatePick.bind(this);
        this.toggleOverdraft = this.toggleOverdraft.bind(this);
        this.toggleAll = this.toggleAll.bind(this);
        this.toggleAllDivisionWon = this.toggleAllDivisionWon.bind(this);
        this.toggleAllExpPick = this.toggleAllExpPick.bind(this);
        this.toggleAllOverdraft = this.toggleAllOverdraft.bind(this);
        this.toggleYesterday = this.toggleYesterday.bind(this);
        this.toggleAllGames = this.toggleAllGames.bind(this);
        this.togglePastResults = this.togglePastResults.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this);
        // this.checkPrevPicks = this.checkPrevPicks.bind(this);
        this.checkPrevWeeksPicked = this.checkPrevWeeksPicked.bind(this);
        this.overridePick = this.overridePick.bind(this);
        this.getSchedule = this.getSchedule.bind(this);
        this.createTimer = this.createTimer.bind(this);
        this.getWeeklyValues = this.getWeeklyValues.bind(this);
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
        // this.getAllGames = this.getAllGames.bind(this)
        // this.addWeek = this.addWeek.bind(this)
        this.addWeekResult = this.addWeekResult.bind(this)
        // this.subWeek = this.subWeek.bind(this)
        this.subWeekResult = this.subWeekResult.bind(this)
        this.findPastResults = this.findPastResults.bind(this)
        this.matchTeamValues = this.matchTeamValues.bind(this)
        
      }

    componentDidMount() {
      this.getChallengeData()
      // this.getWeeklyValues()
      // this.checkPrevWeeksPicked()
      }

    handlePreloader() {
        this.setState({
          isActive: !this.state.isActive
        });
      }

    toggle() {
        this.getSchedule()
        this.setState({
          modal: !this.state.modal,
        });
      }

    toggleYesterday() {
        this.getSchedule()
        this.getYesterdaysResults()
        this.setState({
          modalYesterday: !this.state.modalYesterday,
        });
      }

    toggleAllGames() {
        this.getSchedule()
        // this.getAllGames()
        this.setState({
          modalAllGames: !this.state.modalAllGames,
        });
      }

    togglePastResults() {
      this.getSchedule()
      this.findPastResults()
      this.setState({
        modalPastResults: !this.state.modalPastResults
      })
      }

    toggleActive() {
      let _this = this
      let homeTeam = this.state.homeTeam
      let awayTeam = this.state.awayTeam
      let homeValue = this.state.homeValue
      let awayValue = this.state.awayValue
      let nflTeams = this.state.nflTeams
      $('.modal-open #modalBody .thisGame .team').click(function(){
          $(this).addClass('active');
          $(this).parent().children('.team').not(this).removeClass('active');
          let myPick = $(this).text()
          // console.log('PICK NAME: ', myPick)
          let myPickParsed = myPick.split(" ")
          let myPickCombo = myPickParsed[0] + ' ' + myPickParsed[1]
          if (myPickParsed[3]) {
            myPickCombo = myPickCombo + ' ' + myPickParsed[2]
          }
          // console.log('MY PICK PARSED: ', myPickCombo)
          let findDiv = (teams) => {
            return teams.teamName === myPickCombo
          }
          let teamDiv = nflTeams.filter(findDiv)
          let thisTeamDiv = teamDiv[0].division
          console.log('ACTIVE TEAM DIVISION: ', thisTeamDiv)
          _this.setState({ 
            activePick: myPickCombo,
            activePickDiv: thisTeamDiv
           })
          // console.log('MY PICK: ', myPick)
          // console.log('HOME TEAM: ', homeTeam)
          // console.log('AWAY TEAM: ', awayTeam)
          if (myPickCombo.trim() === homeTeam.trim()) {
            _this.setState({
              activeValue: homeValue
            })
            // console.log('ACTIVE VALUE: ', homeValue)
          } else if (myPickCombo.trim() === awayTeam.trim()) {
            _this.setState({
              activeValue: awayValue
            })
            // console.log('ACTIVE VALUE: ', awayValue)
          }

          // console.log('ACTIVE PICK: ', myPick)
          
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

    toggleDivisionWon() {
        this.setState({
          nestedModalDivisionWon: !this.state.nestedModalDivisionWon,
          closeAllDivisionWon: false
        });
        let invPickAlert = <div className='row invalidPick'>Sorry, you have already won with a team in this division!</div>
        $('.modal-open .modal-header').prepend(invPickAlert)
      }

    toggleLockedPick() {
        this.setState({
          nestedModalLockedPick: !this.state.nestedModalLockedPick,
          closeAllLockedPick: false
        });
         let noPickAlert = <div className='row invalidPick'>Sorry, your pick has already locked!</div>
         $('.modal-open .modal-header').prepend(noPickAlert)
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

    toggleOverdraft() {
        this.setState({
          nestedModalOverdraft: !this.state.nestedModalOverdraft,
          closeAllOverdraft: false
        })
        let overdraftAlert = <div className='row invalidPick'>Sorry, this pick puts you over the eligible value line!</div>
        $('.modal-open .modal-header').prepend(overdraftAlert)
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

    toggleAllDivisionWon() {
        this.setState({
          nestedModalDivisionWon: !this.state.nestedModalDivisionWon,
          closeAllDivisionWon: true
        });
      }

    toggleAllExpPick() {
      this.setState({
        nestedModalExpPick: !this.state.nestedModalExpPick,
        closeAllExpPick: true
      });
      }

    toggleAllOverdraft() {
        this.setState({
          nestedModalOverdraft: !this.state.nestedModalOverdraft,
          closeAllOverdraft: true
        });
      }

    toggleAllNoPick() {
      this.setState({
        nestedModalNoPick: !this.state.nestedModalNoPick,
        closeAllNoPick: true
      });
      }

    toggleAllLockedPick() {
      this.setState({
        nestedModalLockedPick: !this.state.nestedModalLockedPick,
        closeAllLockedPick: true
      })
      }

    handleChangeTitle(event) {
        this.setState({title: event.target.value})
        // console.log('Title: ', this.state.title)
      }

    handleChangeTeams(event) {
        this.setState({
          homeTeam: event.target.dataset.hometeam, 
          awayTeam: event.target.dataset.awayteam,
          homeAlias: event.target.dataset.homealias,
          awayAlias: event.target.dataset.awayalias,
          homeValue: parseInt(event.target.dataset.homevalue),
          awayValue: parseInt(event.target.dataset.awayvalue)
        });
        this.handleChangeStatus(event)
        this.toggle()
        // console.log('Home team: ', this.state.homeTeam)
        // console.log('Away team: ', this.state.awayTeam)
      }

    handleChangeStatus(event) {
        // console.log('EVENT: ', event.target.dataset.hometeam)
        this.setState({ activeDate: '' })
        let realGameTime = moment(event.target.dataset.gametime).format()
        // let realGameTimeAlt = moment.tz(realGameTime, 'America/New_York').format()
        // console.log('REAL GAME TIME: ', realGameTime)
        let gameTime = moment(realGameTime).format("MMM Do, h:mmA")
        let gameStatus = event.target.dataset.gamestatus.toUpperCase()
        let gameId = event.target.dataset.gameid
        this.setState({ 
          status: gameStatus, 
          gameTime: realGameTime,
          time: gameTime, 
          activeDate: event.date, 
          gameId: gameId 
        });
        // console.log('Status: ', gameStatus)
        console.log('Start Time: ', realGameTime)
        // console.log('Game ID: ', gameId)
      }

    getChallengeData = () => {
      // console.log('CHALLENGE ID: ', localStorage.getItem('userChallengeId'))
      // console.log('new york time: ', moment().tz('America/New_York').format())
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
            challengeStartDate: res.data[0].startDate,
            chalValue: res.data[0].parLine
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

      let userPicks = thisUser[0].picks
        let userValue = 0
        let thisWeeksValue = 0
        for (let s=0; s<userPicks.length; s++) {
          // console.log('game: ', userPicks[s])
          // console.log('game week: ', userPicks[s].gameWeek)
          // console.log('this week: ', this.props.thisWeek)
          if (s === userPicks.length - 1 && userPicks[s].gameWeek === this.props.thisWeek) {
            // console.log('SETTING TEAM VALUE: ', userPicks[s].teamValue)
            thisWeeksValue = userPicks[s].teamValue
          } else {
            // console.log('NO VALUE SET')
          }
          let thisValue = userPicks[s].teamValue
          userValue = userValue + thisValue
        }

      this.setState({
        currentUser: thisUser[0],
        username: thisUser[0].username,
        firstName: thisUser[0].firstName,
        lastName: thisUser[0].lastName,
        myWins: thisUser[0].wins,
        winsCount: thisUser[0].wins.length,
        myPicks: thisUser[0].picks,
        myValue: userValue,
        thisWeeksValue: thisWeeksValue
      })

      // console.log('CURRENT USER: ', this.state.currentUser)
      // console.log('CHAL USERS DATA: ', this.state.challengeData.users)
      }

    handleSubmit(event) {
        event.preventDefault();
        // console.log('HANDLE SUBMIT')
        // console.log('TODAYS PICK START: ', this.props.todaysPickStart)
        let currentTime = moment().tz('America/New_York').format()
        let todaysPickStart = this.props.todaysPickStart
        // let todaysPickStartAlt = moment.tz(todaysPickStart, 'America/New_York').format()
        // console.log('CURRENT TIME: ', currentTime)
        // console.log('PICK START TIME: ', todaysPickStart)
        let gameStarted = moment(currentTime).isAfter(todaysPickStart)
        console.log('game started? ', gameStarted)
        if (gameStarted) {
          console.log('TOGGLE LOCKED PICK')
          this.toggleLockedPick()
          return;
        }
        // debugger;
        // return;
        let self = this
        let myId = this.props.username
        let challengeId = this.state.challengeId
        let myPicks = this.state.myPicks
        let myWins = this.state.myWins
        let teamPick = this.state.activePick
        let teamDiv = this.state.activePickDiv
        let teamValue = this.state.activeValue
        let myValue = this.state.myValue
        let thisWeeksValue = this.state.thisWeeksValue
        let chalValue = this.state.chalValue
        // let pickDate = this.state.thisWeek
        let pickWeek = this.props.thisWeek
        // let prevDates = this.state.myWeeksPicked
        let gameId = this.state.gameId
        let gameTime = this.state.gameTime
        // let toggle = true
        let thisPick = { 
            team: teamPick.trim(), 
            teamDiv: teamDiv,
            teamValue: teamValue,
            gameWeek: pickWeek, 
            gameDate: pickWeek.toString(),
            gameId: gameId, 
            result: 'pending',
            gameTime: gameTime
          }

        // console.log('MY CURRENT VALUE: ', myValue)
        // console.log('TEAM VALUE: ', teamValue)
        // console.log('CHAL VALUE: ', chalValue)
        // console.log('TEAM PICK: ', teamPick)
        // console.log('THIS WEEKS VALUE: ', thisWeeksValue)

        let newValue = myValue + teamValue - thisWeeksValue
        // console.log('MY NEW VALUE: ', newValue)
        
        if (newValue < chalValue) {
          console.log('OVERDRAFT PICK')
          this.toggleOverdraft()
          return
        } else {
          console.log('VALID PICK')
        }

        // debugger;
        // return;

        // console.log('my pick: ', thisPick)
        // console.log('my picks: ', myPicks)
        // debugger;

        // let firstGameTime = this.state.firstGameTime
        // TODAY'S TIMER STATUS
        // console.log('FIRST GAME TIME: ', firstGameTime)
        // if (firstGameTime !== '') {
        //   let realTime = moment().tz('America/New_York').format('HH:mm:ss a')
        //   let realTimeAdj = moment(realTime, 'HH:mm:ss a')
          
        //   let timeDiff = moment.duration(firstGameTime.diff(realTimeAdj))
        //   // console.log('REAL TIME EST: ', realTimeAdj)
        //   if (timeDiff._milliseconds > 0) {
        //     // console.log('TIMER STILL RUNNING')
        //   } else {
        //     // console.log('TIMER HAS ENDED NO MORE PICKS')
        //     this.setState({
        //       timerEnded: true
        //     })
        //     // DOUBLE CHECK TO SEE THAT TIMER HAS NOT ALREADY ENDED FOR TODAYS GAMES BEFORE SUBMITTING PICK FOR TODAY
        //     if (pickDate === moment().format('YYYY-MM-DD')) {
        //       // console.log('THIS IS A LATE PICK FOR TODAY')
        //       this.toggleLatePick()
        //       return;
        //     }
        //   }
        // }
        
        //FIND OUT IF USER HAS ALREADY WON WITH THIS PICK
        let pickAlreadyWon = (wins) => {
          return wins.win.trim() === teamPick.trim()
          }
        let thisPickWinner = myWins.filter(pickAlreadyWon)

        let divisionAlreadyWon = (wins) => {
          return wins.division.trim() === thisPick.teamDiv
        }
        let thisPickDivision = myWins.filter(divisionAlreadyWon)

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
            
            if (thisPickDivision.length) {
                let pickHasWon = thisPickDivision[0]
                console.log('PICK HAS WON: ', pickHasWon)
                if (pickHasWon !== undefined) {
                  // toggle = false
                  self.toggleDivisionWon()
                  console.log('YOU HAVE ALREADY WON WITH A TEAM IN THIS DIVISION', teamPick)
                  return;
                  } 
                }
            
            
            
            if (thisPick.gameWeek === myPicks[j].gameWeek) {
              let newPick = thisPick
              let pickWeek = thisPick.gameWeek
              // console.log('TEAM PICKED ALREADY: ', this.state.myPicks[j])
              // console.log('Prev Dates Picked: ', prevDates)
              // console.log('These dates match', pickDate, prevDates[j])
              console.log('OVERRIDE PICK: ', thisPick)
              // debugger;
              this.overridePick(pickWeek, newPick) 
              return;
              }   
            }
          }
        
        // console.log('THIS PICK DATA: ', thisPick)
        // SAVE PICK TO DATABASE
        console.log('THIS NEW PICK: ', thisPick)
        // debugger;
        
        API.saveNflPick(challengeId, myId, thisPick)
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

    checkPrevWeeksPicked() {
        let currentPicks = this.state.myPicks
        let currentWeeksPicked = []
        for (var i=0; i<currentPicks.length; i++) {
          let thisWeek = currentPicks[i].gameWeek
          //console.log('Date already picked: ', thisWeek)
          currentWeeksPicked.push(thisWeek)
        }
        this.setState({myWeeksPicked: currentWeeksPicked})
        // console.log('Official dates picked: ', this.state.myWeeksPicked)
      }
    
    overridePick(week, newPick) {
      console.log('THIS CHALLENGE: ', this.state.challengeId)
      console.log('THIS USER: ', this.props.username)
      console.log('OVERRIDE THIS WEEK: ', week)
      console.log('OVERRIDE WITH NEW PICK: ', newPick)
      // debugger;
      API.deleteNflPick(this.state.challengeId, this.props.username, week)
        .then(res => {
        console.log('DELETING PICK: ', res.data)
        // debugger;
        API.saveNflPick(this.state.challengeId, this.props.username, newPick)
          .then(res => { 
            console.log('SAVING NEW PICK: ', res.data)
            // debugger
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
      console.log('YESTERDAYS GAME RESULTS: ', this.state.lastWeeksGames)
      }

    // addWeek = () => {
    //   let startDay = this.state.newToday
    //   let newDay = moment(startDay).add(7, 'days').format('YYYY-MM-DD')
    //   this.setState({
    //     newToday: newDay
    //     }, () => {
    //       this.getAllGames()
    //     })
    //   }
    
    // subWeek = () => {
    //   let startDay = this.state.newToday
    //   let newDay = moment(startDay).subtract(7, 'days').format('YYYY-MM-DD')
    //   this.setState({
    //     newToday: newDay
    //     }, () => {
    //       this.getAllGames()
    //     })
    //   }

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

      // API.getNflGames()
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

    // getAllGames = () => {
    //   let today = this.state.newToday
    //   let week = moment(today).add(7, 'days').format('YYYY-MM-DD')
    //   let allGames = this.state.allGames
    //   // console.log('ALL GAMES: ', allGames)

    //   let findRecentGames = (games) => {
    //     return moment(games.start._i).isSameOrAfter(today) && moment(games.start._i).isSameOrBefore(week)
    //   }

    //   let allRecentGames = allGames.filter(findRecentGames)
    //   // console.log('ONLY RECENT GAMES: ', allRecentGames)

    //   this.setState({
    //     allRecentGames: allRecentGames
    //   })
      

    //   }

    matchTeamValues = () => {
        let thisWeeksGames = this.state.thisWeeksGames
        let thisWeeksValues = this.state.lastTeams
        // console.log('THIS WEEKS GAMES: ', thisWeeksGames)
        
        // let changeTeamValues = (thisWeeksGames) => {
        //   console.log('THIS TEAM: ', this.state.teamName)
        //   console.log('TEAM VALUE: ', this.state.teamValue)
        //   console.log('HOME TEAM: ', thisWeeksGames.homeAlias)
        //   console.log('AWAY TEAM: ', thisWeeksGames.awayAlias)
          
        // }
        
        for (let d=0; d<thisWeeksValues.length; d++) {
          // console.log('THIS WEEKS VALUE: ', thisWeeksValues[d])
          for (let e=0; e<thisWeeksGames.length; e++) {
            // console.log('THIS WEEKS GAME: ', thisWeeksGames[e])
            if (thisWeeksGames[e].homeAlias === thisWeeksValues[d].teamAlias) {
              thisWeeksGames[e].homeValue = thisWeeksValues[d].value
            } else if (thisWeeksGames[e].awayAlias === thisWeeksValues[d].teamAlias) {
              thisWeeksGames[e].awayValue = thisWeeksValues[d].value
            }
          }
        }

        // console.log('ADJUSTED GAMES: ', thisWeeksGames)
        this.setState({
          thisWeeksGames: thisWeeksGames
        })
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
      let week = this.props.thisWeek - 1
      let self = this
      // self.setState({ yesterday: week })
      this.getGames()

      // PULL GAMES FROM LAST WEEK
      API.getNflGamesByDate(week)
        .then(res => {
            let games = []
            let lastWeeksGameIds = []
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
                lastWeeksGameIds.push(gameInfo.id)
                self.setState({ 
                  lastWeeksGames: games, 
                  lastWeeksGameIds: lastWeeksGameIds 
                })
                // self.setState({ lastWeeksGameIds: lastWeeksGameIds })
                // console.log('LAST WEEKS GAMES: ', games)
              })

            // GET RESULTS FROM YESTERDAY IF THEY HAVEN'T BEEN PULLED(UNDEFINED)
            // console.log('THESE GAMES: ', this.state.lastWeeksGames)
            if(games[games.length - 1].gameWinner === "none") {
                self.getResults()
              } else {
                //FIND ALL USERS PICKS
                // console.log('finding user picks')
                // self.findUserPicks()
              }

        })
          .catch(err => console.log(err))
      }

    getWeeklyValues = () => {
      API.getNflTeams()
        .then(res => {
            let teams = res.data
            let lastTeams = teams.slice(0, 32)
            // console.log('MOST RECENT TEAMS: ', lastTeams)
            this.setState({
                lastTeams: lastTeams
            }, () =>{
              this.matchTeamValues()
            })
        })
        .catch(err => {
          console.log(err)
        })
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
        API.postNflGames(gameData)
          .then(res=> console.log(res))
          .catch(err => console.log(err))
        }
      }

    getGames = () => {
      // let self = this

      // PULL FULL SCHEDULE FROM DATABASE
      API.getNflGamesByDate(this.props.thisWeek)
        .then(res => {
          let games = []
          // console.log('THIS WEEKS GAMES: ', res.data)
          res.data.forEach((game) => {
            let splitDate = game.gameDate.split('T')
            let gameDate = splitDate[0]
            let homeAlias = game.homeAlias.toLowerCase()
            let awayAlias = game.awayAlias.toLowerCase()
            let startTime = moment(game.gameTime).add(6, 'hours').format()
            let gameStart = moment(startTime).format('ddd, h:mm a')
            let gameStartEST = moment.tz(startTime, 'America/New_York').format()
            // let gameStartEST2 = moment.tz(gameStart, 'ddd, h:mm a', 'America/New_York').format()
            // console.log('GAME START: ', startTime)
            // console.log('GAME START EST: ', gameStartEST2)
            let gameInfo = {
                id: game.gameId,
                date: gameDate,
                start: gameStartEST,
                startEST: gameStartEST,
                gameStart: gameStart,
                status: game.gameStatus,
                result: game.gameResult,
                homeTeam: game.homeTeam,
                awayTeam: game.awayTeam,
                homeAlias: homeAlias,
                awayAlias: awayAlias,
                homeValue: 0,
                awayValue: 0,
                title: game.homeAlias + ' vs ' + game.awayAlias,
                color: 'yellow',
                textColor: 'white',
                borderColor: 'blue'
              }
              games.push(gameInfo)
            })
            let sortedGames = games.sort((a,b) => new moment(a.start) - new moment (b.start))
            // console.log('THIS WEEKS GAMES: ', sortedGames)
            this.setState({ thisWeeksGames: sortedGames })
        })
          .catch(err => console.log(err))

        this.getWeeklyValues()

      }
    
    getResults = () => {
      console.log('GETTING RESULTS')
      // debugger;
      let self = this
      let lastWeeksGames = this.state.lastWeeksGames
      let lastWeeksGameIds = this.state.lastWeeksGameIds
      // let lastGame = lastWeeksGames.length - 1
      let yesterdaysGameResultFunc = (games) => {
        return games.gameWinner === "none"
      }
      let yesterdaysGameResultUndefined = lastWeeksGames.filter(yesterdaysGameResultFunc)
  
      if (yesterdaysGameResultUndefined[0]) {
        this.handlePreloader()
        // console.log('NO FOUND RESULTS FOR YESTERDAY')
        console.log('ALL THE GAMES: ', lastWeeksGames)
        console.log('ALL THE GAME IDS: ', lastWeeksGameIds)
        // console.log('NUMBER OF GAMES: ', lastWeeksGames.length)
        // console.log('LAST GAME RESULT: ', lastWeeksGames[lastGame].gameWinner)

        let gameResults = []

        const nflKey = 'bdqyj8auvbh3gmwmuqasrxen'

        lastWeeksGameIds.forEach(function(gameId, k) {
          setTimeout ( 
            function() {
              $.ajax({
                url: "https://cors-everywhere.herokuapp.com/http://api.sportradar.us/nfl/official/trial/v5/en/games/" + gameId + "/boxscore.json?api_key=" + nflKey,
                type: 'GET',
                success: function(data) {
                  // console.log('WEEKLY SUMMARY: ', data)
                  let game = {
                    id: gameId,
                    gameResults: data.summary
                  }
                  gameResults.push(game)
                  // console.log('Game results: ', game)
                  self.setState({ gameResults: gameResults })
                  if (gameResults.length === lastWeeksGameIds.length) {
                    self.findGameWinners()
                  }
                },
                error: function() {
                  window.location.reload()
                }
              })
            }, 1500*k)
          })
        } else {
          // console.log('FOUND RESULTS FOR YESTERDAY')
          // console.log('LAST GAME RESULT: ', lastWeeksGames[lastGame].gameWinner)
          return
        }
      }

    findGameWinners = () => {
      // FIND GAME RESULTS FROM YESTERDAY
      let gameResults = this.state.gameResults
      let winningTeams = []
      // let today = moment().format('YYYY-MM-DD')

      console.log('GAME RESULTS: ', gameResults)
      // debugger;

      gameResults.forEach((gameResult) => {
        let gameId = gameResult.id
        let gameWeek = gameResult.gameResults.week.sequence
        // if (gameResult.rescheduled) {
        //   let gamePostponed = gameResult.rescheduled[0]
        //   if (gamePostponed.isSameOrAfter(today)) {

        //   }
        // }
        
        let homeTeam = {
            team: gameResult.gameResults.home.market + ' ' + gameResult.gameResults.home.name ,
            points: gameResult.gameResults.home.points
          }
        let awayTeam = {
            team: gameResult.gameResults.away.market + ' ' + gameResult.gameResults.away.name,
            points: gameResult.gameResults.away.points
          }

        if (homeTeam.points > awayTeam.points) {
            winningTeams.push({ gameId: gameId, gameDate: gameWeek, winningTeam: homeTeam.team, homePoints: homeTeam.points, awayPoints: awayTeam.points })
          } else {
            winningTeams.push({ gameId: gameId, gameDate: gameWeek, winningTeam: awayTeam.team, homePoints: homeTeam.points, awayPoints: awayTeam.points })
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
      console.log('WINNERS: ', data)
      // debugger;
      let dataLen = data.length - 1
      data.forEach((game, g) => {
        // gameNum++
        let gameDate = game.gameDate
        let gameId = game.gameId
        let gameResult = { gameResult: game.winningTeam }
        console.log('ADDING RESULT: ', gameDate, gameId, gameResult)
        // debugger;
        API.updateNflGame(gameDate, gameId, gameResult)
          .then(res => {
            console.log(res)
            // debugger;
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
      //   API.updateNflGame(gameDate, gameId, gameResult)
      //     .then(res => console.log(res))
      //     .catch(err => console.log(err))
      //   } 
      }

    findUserPicks = () => {
      let self = this
      let localUser = localStorage.getItem('user')
      let chalUsers = this.state.challengeData.users
      let date = this.props.prevWeek

      API.getNflGamesByDate(date)
        .then(res => {
            let games = []
            let lastWeeksGameIds = []
            res.data.forEach((game) => {
              let splitDate = game.gameDate.split('T')
              let gameDate = splitDate[0]
              let homeAlias = game.homeAlias.toLowerCase()
              let awayAlias = game.awayAlias.toLowerCase()
              let startTime = moment(game.gameTime).add(6, 'hours').format()
              let gameStart = moment(startTime).format('ddd, h:mm a')
              let gameInfo = {
                  id: game.gameId,
                  date: gameDate,
                  start: startTime,
                  gameStart: gameStart,
                  status: game.gameStatus,
                  result: game.gameResult,
                  homeTeam: game.homeTeam,
                  awayTeam: game.awayTeam,
                  homeAlias: homeAlias,
                  awayAlias: awayAlias,
                  gameWinner: game.gameResult,
                  homeValue: 0,
                  awayValue: 0,
                  title: game.homeAlias + ' vs ' + game.awayAlias,
                  color: 'yellow',
                  textColor: 'white',
                  borderColor: 'blue'
                }
                games.push(gameInfo)
                lastWeeksGameIds.push(gameInfo.id)
                self.setState({ lastWeeksGames: games })
                self.setState({ lastWeeksGameIds: lastWeeksGameIds })

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
            // console.log('THESE GAMES: ', this.state.lastWeeksGames)
            // if(this.state.lastWeeksGames[0].gameWinner === undefined) {
                // self.getResults()
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
      let thisWeek = this.props.prevWeek
      let userPicks = userData.userPicks
      let schedule = this.state.lastWeeksGames
      let userWins = userData.userWins
    
      // FIND THIS USER'S PICK FOR TODAY
      let thisPickDate = (picks) => {
        return picks.gameWeek === thisWeek
      }
      let thisPick = userPicks.filter(thisPickDate)
      let thisPickTeam = ''
      let thisPickDiv = ''

      // IF THERE IS A PICK FOR YESTERDAY MAKE THAT 'THISPICKTEAM'
      if (thisPick[0]) {
        thisPickTeam = thisPick[0].team
        thisPickDiv = thisPick[0].teamDiv
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
            teamValue: thisPick[0].teamValue,
            gameDate: thisPick[0].gameDate,
            gameWeek: thisPick[0].gameWeek,
            gameId: thisPick[0].gameId,
            result: result
          }
            // console.log('THIS IS A LOSS: ', thisPick)
            // console.log('RESULT: ', newPick)
            this.overridePickResult(userId, thisWeek, newPick) 
            return;
          }

          // CHECK TO SEE IF YESTERDAYS PICK IS A WINNER
          let newWin = null

          let findWinFunc = (games) => {
            console.log('THIS WINNING TEAM: ', games.gameWinner.gameResult)
            return games.gameWinner.gameResult === thisPickTeam.trim()
          }

          let foundWinner = schedule.filter(findWinFunc)

          // console.log('FOUND WINNER? ', foundWinner)
          // console.log('THIS PICK TEAM: ', thisPickTeam)
          // console.log('SCHEDULE: ', schedule)
          // console.log('USER DATA: ', userData)
          // debugger;
          // return;

          if (foundWinner[0]) {
            let result = 'win'
            // console.log('THIS IS A WINNER: ', thisPick)
            newWin = { 
              win: thisPickTeam, 
              division: thisPickDiv 
            }
            console.log('NEW WIN: ', newWin)
            // debugger;

            // CHANGE PICK RESULT IF WIN
            let newPick = {
              team: thisPick[0].team,
              teamValue: thisPick[0].teamValue,
              gameDate: thisPick[0].gameDate,
              gameWeek: thisPick[0].gameWeek,
              gameId: thisPick[0].gameId,
              result: result
              
            }
            // console.log('NEW PICK: ', newPick)
            API.addNflWin(this.state.challengeId, userId, newWin)
              .then (res => {
                console.log(res)
                this.overridePickResult(userId, thisWeek, newPick) 
                // debugger;
              })
              .catch(err => console.log(err))

            } else {
              let result = 'loss'
              // let newLoss = { loss: thisPickTeam }
              let newPick = {
                team: thisPick[0].team,
                teamValue: thisPick[0].teamValue,
                gameDate: thisPick[0].gameDate,
                gameWeek: thisPick[0].gameWeek,
                gameId: thisPick[0].gameId,
                result: result
              }
              // console.log('THIS IS A LOSS: ', thisPick)
              // console.log('RESULT: ', newPick)
              this.overridePickResult(userId, thisWeek, newPick) 

            }
          } else { return }
        } else { 
          let thisPick = { 
            team: 'No Pick', 
            teamDiv: 'none',
            teamValue: 1,
            gameWeek: thisWeek, 
            gameDate: thisWeek.toString(),
            gameId: 'none', 
            result: 'loss',
            gameTime: Date.now()
          }

          API.saveNflPick(this.state.challengeId, userId, thisPick)
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
        }


      }

    overridePickResult(userId, date, newPick) {
      // console.log(date)
      // API.updateNflPick(this.state.challengeId, userId, date, newPickResult)
      //   .then(res => {
      //     console.log(res)
      //   })
      //   .catch(err => {console.log(err)})
      API.deleteNflPick(this.state.challengeId, userId, date)
        .then(res => {
            console.log(res)
            API.saveNflPick(this.state.challengeId, userId, newPick)
              .then(res => { 
                console.log(res)
                })
              .catch(err => { console.log(err) } )  
          })
        .catch(err => {console.log(err)})
      // API.saveNflPick(this.state.challengeId, userId, newPick)
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
        case (team === 'ari'):
          return ari2;
          
        case (team === 'atl'):
          return atl3;
          
        case (team === 'bal'):
          return bal2;
          
        case (team === 'buf'):
          return buf;
          
        case (team === 'car'):
          return car;
           
        case (team === 'chi'):
          return chi2;
           
        case (team === 'cin'):
          return cin2;
           
        case (team === 'cle'):
          return cle3;
           
        case (team === 'dal'):
          return dal2;
           
        case (team === 'den'):
          return den;
           
        case (team === 'det'):
          return det3;
           
        case (team === 'gb'):
          return gb;
           
        case (team === 'hou'):
          return hou2;
           
        case (team === 'ind'):
          return ind2;
           
        case (team === 'jac'):
          return jac;
           
        case (team === 'kc'):
          return kc;
        
        case (team === 'lac'):
          return lac2;
           
        case (team === 'la'):
          return la;
           
        case (team === 'mia'):
          return mia2;
           
        case (team === 'min'):
          return min2;
           
        case (team === 'ne'):
          return ne;
           
        case (team === 'no'):
          return no;
           
        case (team === 'nyg'):
          return nyg;
           
        case (team === 'nyj'):
          return nyj;
           
        case (team === 'oak'):
          return oak;
           
        case (team === 'phi'):
          return phi;
           
        case (team === 'pit'):
          return pit;
           
        case (team === 'sea'):
          return sea;
           
        case (team === 'sf'):
          return sf;
           
        case (team === 'tb'):
          return tb;

        case (team === 'ten'):
          return ten;

        case (team === 'was'):
          return was2;
           
        default:
          return nfl;
        }  

      }

    render() {
      library.add(faIgloo, faCaretRight, faBasketballBall)
      let uuidv4 = require('uuid/v4')

      let currentTime = moment().tz('America/New_York').format()
      let todaysPickStart = this.props.todaysPickStart
      let gameStarted = moment(currentTime).isAfter(todaysPickStart)

      // const ReactHint = ReactHintFactory(React)
      // let timerEnded = false;
      // let today = moment().format('MM-DD-YYYY')
      // let yesterday = moment().subtract(1, 'day').format('MM-DD-YYYY')
      // let newToday = moment(this.state.newToday).format('MM-DD')
      // let oldToday = moment(this.state.oldToday).subtract(1, 'day').format('MM-DD')
      // let newWeek = moment(newToday).add(6, 'days').format('MM-DD')
      // let oldWeek = moment(oldToday).subtract(6, 'days').format('MM-DD')
      // let challengeStartDate = moment(this.state.challengeStartDate).format('MM-DD-YYYY')

      let modalStyle = {
          backgroundColor: 'gold',
          color: 'darkblue'
        }    

      // let EndTimer = () => {
      //     timerEnded = true
      //     return (
      //       <span>Today's games have already begun.</span>
      //     )
      //   }
        
        return (
            <div className='nflWeeklyGames'>
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

              {/* PAST RESULTS MODAL */}
              <Modal 
                isOpen={this.state.modalPastResults} 
                autoFocus={true}
                centered={true}
                size='lg'
                className='pastResultsModal'
              >
                
                <ModalHeader id='modalTitle'>
                  {/* Past Results <strong>( {oldWeek} - {oldToday} )</strong> */}
                  {/* <i className="fas fa-arrow-left leftArrow" onClick={this.subWeekResult}></i>
                  <i className="fas fa-arrow-right rightArrow" onClick={this.addWeekResult}></i>
                  <i className="fas fa-times closeButton" onClick={this.togglePastResults}></i> */}
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


              {/* FULL NFL SCHEDULE MODAL */}
              <Modal 
                isOpen={this.state.modalAllGames} 
                autoFocus={true}
                centered={true}
                size='lg'
                className='allGamesModal'
              >
                
                <ModalHeader id='modalTitle'>
                  Schedule List 
                  {/* <i className="fas fa-arrow-left leftArrow" onClick={this.subWeek}></i>
                  <i className="fas fa-arrow-right rightArrow" onClick={this.addWeek}></i> */}
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
              {/* <Modal 
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
                            this.state.lastWeeksGames.map((game) => (
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
                </Modal> */}

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
                    <Modal className='invPick' isOpen={this.state.nestedModalLockedPick} toggle={this.toggleLockedPick} onClosed={this.state.closeAllLockedPick ? this.toggle : undefined}>
                      <ModalHeader>Locked Pick</ModalHeader>
                      <ModalBody>Your pick has already locked!</ModalBody>
                      <ModalFooter>
                        {/* <Button color="primary" onClick={this.toggleNoPick}>Close</Button>{' '} */}
                        <Button color="secondary" onClick={this.toggleAllLockedPick}>Close All</Button>
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
                    <Modal className='invPick' isOpen={this.state.nestedModalDivisionWon} toggle={this.toggleDivisionWon} onClosed={this.state.closeAllDivisionWon ? this.toggle : undefined}>
                      <ModalHeader>Invalid Pick</ModalHeader>
                      <ModalBody>You have already won with a team in the {this.state.activePickDiv}!</ModalBody>
                      <ModalFooter>
                        <Button color="primary" onClick={this.toggleDivisionWon}>Close</Button>{' '}
                        <Button color="secondary" onClick={this.toggleAllDivisionWon}>Close All</Button>
                      </ModalFooter>
                    </Modal>
                    <Modal className='invPick' isOpen={this.state.nestedModalExpPick} toggle={this.toggleExpiredPick} onClosed={this.state.closeAllExpPick ? this.toggle : undefined}>
                      <ModalHeader>Invalid Pick</ModalHeader>
                      <ModalBody>This is an old game!</ModalBody>
                      <ModalFooter>
                        <Button color="secondary" onClick={this.toggleAllExpPick}>Close All</Button>
                      </ModalFooter>
                    </Modal>
                    <Modal className='invPick' isOpen={this.state.nestedModalOverdraft} toggle={this.toggleOverdraft} onClosed={this.state.closeAllOverdraft ? this.toggle : undefined}>
                      <ModalHeader>Invalid Pick</ModalHeader>
                      <ModalBody>This pick puts you over the eligible value line!</ModalBody>
                      <ModalFooter>
                        <Button color="secondary" onClick={this.toggleOverdraft}>Close</Button>
                        <Button color="secondary" onClick={this.toggleAllOverdraft}>Close All</Button>
                      </ModalFooter>
                    </Modal>
                        <div className="thisGame row">
                            <span className='col-md-5 team awayTeam' name={this.state.awayTeam} value={this.state.awayValue} onClick={this.toggleActive}>
                              {this.state.awayTeam} <span className='awayValue'>({this.state.awayValue})</span> <br />
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
                            <span className='col-md-5 team homeTeam' name={this.state.homeTeam} value={this.state.homeValue} onClick={this.toggleActive}>
                              {this.state.homeTeam} <span className='homeValue'>({this.state.homeValue})</span> <br />
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

                {/* <div className="col-8 timer">
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
                </div> */}

                {/* <div className="col-4-sm resultsButton">
                  <Button color='danger' onClick={this.togglePastResults}>Past Game Results</Button>
                </div>
                <div className="col-4-sm resultsButton">
                  <Button color='warning' onClick={this.toggleAllGames}>View Schedule List</Button>
                </div>
                <div className="col-4-sm resultsButton">
                  <Button color='success' onClick={this.toggleYesterday}>Yesterday's Game Results</Button>
                </div> */}
              
              </div>

              <div className="col-12 nflColumn">
                <div className="row nflTitle">
                  <h3>Week {this.props.thisWeek} Games</h3>
                  <small className='disclaimer'>(All times shown EST)</small>
                </div>
                {

                  this.state.thisWeeksGames.map((game) => (
                    <Button 
                      data-gameid={game.id}
                      data-hometeam={game.homeTeam} 
                      data-awayteam={game.awayTeam}
                      data-homealias={game.homeAlias}
                      data-awayalias={game.awayAlias}
                      data-homevalue={game.homeValue}
                      data-awayvalue={game.awayValue}
                      data-gametime={game.start}
                      data-gamestatus={game.status}
                      key={uuidv4()} 
                      color='warning' 
                      className='row nflGameRow' 
                      disabled={(moment(game.start).isBefore(moment().tz('America/New_York').format())) || (moment(game.start).isBefore(moment().tz('America/New_York').format())) || gameStarted}
                      data-rh={gameStarted ? 'Your pick has locked.' : (moment(game.start).isBefore(moment().tz('America/New_York').format())) || (moment(game.startEST).isBefore(moment().tz('America/New_York').format())) ? 'This game has started.' : 'Click to select a team.'}
                      onClick={(game) => {
                        this.handleChangeTeams(game)
                      }}
                      
                    >
                      {/* <ReactHint 
                        autoPosition={false} 
                        events={true} 
                        className='reactHint'
                      /> */}
                      {game.awayAlias.toUpperCase()}({game.awayValue}) @ {game.homeAlias.toUpperCase()}({game.homeValue}) <i className="fas fa-football-ball"></i> {game.gameStart}
                    </Button>
                  ))

                }

              </div>
            </div>
        )
    }
}

export default NflDivisionCalendar

