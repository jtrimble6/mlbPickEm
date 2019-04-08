import React, { Component } from 'react'
import '../../css/masters.css'
// import Countdown from 'react-countdown-now';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { library } from '@fortawesome/fontawesome-svg-core'
import DuplicateGolfer from '../alerts/DuplicateGolfer'
import UnderLimitGolfers from '../alerts/underLimitGolfers'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faIgloo, faCaretRight, faBasketballBall } from '@fortawesome/free-solid-svg-icons'
import API from '../../utils/API'
import $ from 'jquery'
import moment from 'moment-timezone'


class MastersBoard extends Component {
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
          thursday: '2019-04-11',
          friday: '2019-04-12',
          saturday: '2019-04-13',
          sunday: '2019-04-14',
          allGolfers: [],
          myGolfers: [],
          myGolfersFri: [],
          myGolfersSat: [],
          myGolfersSun: [],
          golfersPicked: false,
          golfersPickedThurs: false,
          golfersPickedFri: false,
          thisPick: '',
          golfer1: '',
          golfer2: '',
          golfer3: '',
          golfer4: '',
          golfer5: '',
          golfer1a: '',
          golfer1b: '',
          golfer2a: '',
          golfer2b: '',
          golfer3a: '',
          golfer3b: '',
          golfer4a: '',
          pickingDate: '',
          duplicateGolfer: false,
          duplicateGolfer1: false,
          duplicateGolfer2: false,
          duplicateGolfer3: false,
          duplicateGolfer4: false,
          underLimitGolfers: false,
          underLimitGolfers1: false,
          underLimitGolfers2: false,
          underLimitGolfers3: false,
          yesterdaysGames: [], 
          myPicks: [], 
          myWins: [],
          userId: '',
          userGolfers: [],
          userScore: [],
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
          yesterday: '', 
          firstGameTime: '',
          timeDiff: '', 
          timerEnded: false,
          myScore: 0
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
        this.handleAllGolfersSelection = this.handleAllGolfersSelection.bind(this);
        this.handleThursdayGolfersSelection = this.handleThursdayGolfersSelection.bind(this);
        this.handleFridayGolfersSelection = this.handleFridayGolfersSelection.bind(this);
        this.handleSaturdayGolfersSelection = this.handleSaturdayGolfersSelection.bind(this);
        this.handleSundayGolfersSelection = this.handleSundayGolfersSelection.bind(this);
        this.handleRepick = this.handleRepick.bind(this);
        this.handleRepickThurs = this.handleRepickThurs.bind(this);
        this.handleRepickFri = this.handleRepickFri.bind(this);
        this.handleRepickSat = this.handleRepickSat.bind(this);
        this.handleRepickSun = this.handleRepickSun.bind(this);
        this.handleFormSelection = this.handleFormSelection.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        // this.checkPrevPicks = this.checkPrevPicks.bind(this);
        this.checkPrevDatesPicked = this.checkPrevDatesPicked.bind(this);
        this.overridePick = this.overridePick.bind(this);
        this.createTimer = this.createTimer.bind(this);
        this.getResults = this.getResults.bind(this);
        this.findUserPicks = this.findUserPicks.bind(this);
        this.findUserWins = this.findUserWins.bind(this);
        this.overridePickResult = this.overridePickResult.bind(this);
        this.getChallengeData = this.getChallengeData.bind(this);
        this.getUserData = this.getUserData.bind(this);
        this.getUserScore = this.getUserScore.bind(this);
      }

    componentDidMount() {
      this.getChallengeData()
    //   this.getTodaysFirstGame()
    //   this.checkPrevDatesPicked()
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
      // console.log('Status: ', this.state.status)
      // console.log('Start Time: ', this.state.time)
      // console.log('Game ID: ', this.state.gameId)
      }

    handleInputChange = event => {
        const { name, value } = event.target
        console.log('NAME: ', name)
        console.log('VALUE: ', value)
        this.setState({
            [name]: value
        })
        
      }

    handleFormSelection = (event) => {
      console.log('TARGET: ', event.target)
      }

    handleRepick = (event) => {
      let challengeId = this.state.challengeId
      let username = this.state.userId
      let gameDate = '2019-04-10'
      API.deleteMastersGolfers(challengeId, username, gameDate)
          .then(res => {
              console.log(res)
          })
        .catch(err => {console.log(err)})
      gameDate = '2019-04-11'
      API.deleteMastersGolfers(challengeId, username, gameDate)
          .then(res => {
              console.log(res)
          })
        .catch(err => {console.log(err)})

      gameDate = '2019-04-12'
      API.deleteMastersGolfers(challengeId, username, gameDate)
          .then(res => {
              console.log(res)
          })
        .catch(err => {console.log(err)})
      let self = this
      event.preventDefault()
      self.setState({
        golfersPicked: false,
        golfer1: '',
        golfer2: '',
        golfer3: '',
        golfer4: '',
        golfer5: '',
        myGolfers: []
      })
      this.getChallengeData()
      }

    handleRepickThurs = (event) => {
      let challengeId = this.state.challengeId
      let username = this.state.userId
      let gameDate = '2019-04-11'
      API.deleteMastersGolfers(challengeId, username, gameDate)
          .then(res => {
              console.log(res)
          })
        .catch(err => {console.log(err)})

      gameDate = '2019-04-12'
      API.deleteMastersGolfers(challengeId, username, gameDate)
          .then(res => {
              console.log(res)
          })
        .catch(err => {console.log(err)})
      let self = this
      event.preventDefault()
      self.setState({
        golfersPickedThurs: false,
        golfer1a: '',
        golfer1b: '',
        golfer2a: '',
        golfer2b: '',
        myGolfersThurs: [],
        myGolfersFri: []
      })
      this.getChallengeData()
      }

    handleRepickFri = (event) => {
      let challengeId = this.state.challengeId
      let username = this.state.userId
      let gameDate = '2019-04-12'
      console.log('INFO: ', challengeId, username, gameDate)
      API.deleteMastersGolfers(challengeId, username, gameDate)
          .then(res => {
              console.log(res)
          })
        .catch(err => {console.log(err)})
      let self = this
      event.preventDefault()
      self.setState({
        golfersPickedFri: false,
        golfer2a: '',
        golfer2b: '',
        myGolfersFri: []
      })
      this.getChallengeData()
      }

    handleRepickSat = (event) => {
      let challengeId = this.state.challengeId
      let username = this.state.userId
      let gameDate = '2019-04-13'
      API.deleteMastersGolfers(challengeId, username, gameDate)
          .then(res => {
              console.log(res)
          })
        .catch(err => {console.log(err)})
      let self = this
      event.preventDefault()
      self.setState({
        golfersPickedSat: false,
        golfer3a: '',
        golfer3b: '',
        myGolfersSat: []
      })
      this.getChallengeData()
      }

    handleRepickSun = (event) => {
      let challengeId = this.state.challengeId
      let username = this.state.userId
      let gameDate = '2019-04-14'
      API.deleteMastersGolfers(challengeId, username, gameDate)
          .then(res => {
              console.log(res)
          })
        .catch(err => {console.log(err)})
      let self = this
      event.preventDefault()
      self.setState({
        golfersPickedSun: false,
        golfer4a: '',
        myGolfersSun: []
      })
      this.getChallengeData()
      }

    getChallengeData = () => {
      // console.log('CHALLENGE ID: ', localStorage.getItem('userChallengeId'))
      let self = this
      // PRODUCTION
      // let challengeId = '5caa6602ba5ec50017ed6184'

      // DEVELOPMENT
      // let challengeId = '5ca42756e334ea0fb2e7fffd'

      let challengeId = localStorage.getItem('userChallengeId')
      this.setState({
        challengeId: challengeId
      })
      console.log('CHALLENGE ID: ', challengeId)
      API.getChallenge(challengeId)
        .then(res => {
          // console.log(res)
          self.setState({
            challengeData: res.data[0],
          })
          self.getUserData()
        //   self.getSchedule()
        })
        .catch(err => console.log(err))
      }

    getUserData = () => {
      let localUser = localStorage.getItem('user')
      
      this.setState({
        userId: localUser
      })
      let chalUsers = this.state.challengeData.users
      console.log('THIS CHALLENGE: ', chalUsers)
      let chalGolfers = this.state.challengeData.teams
      let myGolfers = []
      // let myGolfersFri = []
      // let myGolfersSat = []
      console.log('CHAL GOLFERS: ', chalGolfers)

      // FILTER OUT THIS USER AND SET STATE
      let chalFilter = (challengers) => {
        return challengers.username === localUser
      }
      let thisUser = chalUsers.filter(chalFilter)
      
      let userPicks = thisUser[0].picks
      // console.log('ALL USER PICKS: ', userPicks)

      if(userPicks[0]) {
        myGolfers.push(userPicks[0].golfer1, userPicks[0].golfer2, userPicks[0].golfer3, userPicks[0].golfer4, userPicks[0].golfer5, )
        this.setState({
          golfersPicked: true,
          golfer1: userPicks[0].golfer1,
          golfer2: userPicks[0].golfer2,
          golfer3: userPicks[0].golfer3,
          golfer4: userPicks[0].golfer4,
          golfer5: userPicks[0].golfer5,
          myGolfers: myGolfers
        })
      }

      if(userPicks[1]) {
        let self = this
        let allGolfers = this.state.myGolfers
        let thursPicks = userPicks[1]

        let thursdaysPicks = [
          thursPicks.golfer1,
          thursPicks.golfer2
        ]
        console.log('ALL GOLFERS: ', allGolfers)
        console.log('THURSDAYS PICKS: ', thursdaysPicks)

        let myFriGolfersFunc = (golfers) => {
          return golfers !== this.state.thisPick
        }
        for (var p=0; p<thursdaysPicks.length; p++) {
          self.setState({ thisPick: thursdaysPicks[p] })
          allGolfers = allGolfers.filter(myFriGolfersFunc)
          console.log('FRIDAYS PICKS: ', allGolfers)
        }
        
        this.setState({
          golfersPickedThurs: true,
          golfer1a: userPicks[1].golfer1,
          golfer1b: userPicks[1].golfer2,
          myGolfersFri: allGolfers
        })
      }

      if(userPicks[2]) {
        let self = this
        let allGolfers = this.state.myGolfersFri
        let friPicks = userPicks[2]

        let fridaysPicks = [
          friPicks.golfer1,
          friPicks.golfer2
        ]
        console.log('ALL GOLFERS: ', allGolfers)
        console.log('FRIDAYS PICKS: ', fridaysPicks)

        let mySatGolfersFunc = (golfers) => {
          return golfers !== this.state.thisPick
        }
        for (var v=0; v<fridaysPicks.length; v++) {
          self.setState({ thisPick: fridaysPicks[v] })
          allGolfers = allGolfers.filter(mySatGolfersFunc)
          console.log('SATURDAY PICKS: ', allGolfers)
        }
        
        this.setState({
          golfersPickedFri: true,
          golfer2a: userPicks[2].golfer1,
          golfer2b: userPicks[2].golfer2,
          myGolfersSat: allGolfers
        })
      }

      this.setState({
        allGolfers: chalGolfers,
        currentUser: thisUser[0],
        username: thisUser[0].username,
        firstName: thisUser[0].firstName,
        lastName: thisUser[0].lastName,
        score: thisUser[0].points,
        winsCount: thisUser[0].points,
        myPicks: thisUser[0].picks,
      })

      console.log('GOLFERS PICKED? ', this.state.golfersPicked)
      console.log('MY GOLFERS: ', this.state.myGolfers)
      // console.log('CHAL USERS DATA: ', this.state.challengeData.users)
      this.getUserScore(this.state.username, this.state.myPicks)
      }

    getUserScore = (user, picks) => {
      console.log(user, 's PICKS', picks)
      let roundPicks = []
        for (var j=picks.length -1; j>0; j--) {
          console.log('ROUND ' + [j] + ' PICKS: ', picks[j])
          roundPicks.push(picks[j])
        } 
      console.log('ROUND PICKS: ', roundPicks)



      }

    handleAllGolfersSelection(event) {
        event.preventDefault();
        let self = this
        let myId = localStorage.getItem('user')
        let challengeId = this.state.challengeId
        let golfer1 = this.state.golfer1
        let golfer2 = this.state.golfer2
        let golfer3 = this.state.golfer3
        let golfer4 = this.state.golfer4
        let golfer5 = this.state.golfer5
        let myGolfers = [
          golfer1,
          golfer2,
          golfer3,
          golfer4,
          golfer5
        ]
        let myGolfersObj = {
          golfer1: golfer1, 
          golfer2: golfer2, 
          golfer3: golfer3, 
          golfer4: golfer4, 
          golfer5: golfer5,
          gameDate: '2019-04-10'
        }
        console.log(
          'USER: ', myId,
          'CHALLENGE: ', challengeId,
          'MY GOLFERS: ', myGolfers
        )

        let checkGolfersFunc = (myGolfers) => {
          return (new Set(myGolfers)).size !== myGolfers.length; 
        }

        let duplicateEntry = checkGolfersFunc(myGolfers)
        console.log('DUPLICATES? ', duplicateEntry)

        if (duplicateEntry) {
          self.setState({
            duplicateGolfer: true
          })
          return;
        }

        if (golfer1 === '' || golfer2 === '' || golfer3 === '' || golfer4 === '' || golfer5 === '' ) {
          self.setState({
            underLimitGolfers: true
          })
          return;
        }

        else {
          console.log('BIG DATE: ', myGolfersObj.gameDate)
          self.overridePick(challengeId, myId, myGolfersObj.gameDate, myGolfersObj)
        }

      }

    handleThursdayGolfersSelection(event) {
        event.preventDefault();
        let self = this
        let myId = localStorage.getItem('user')
        let challengeId = this.state.challengeId
        let golfer1a = this.state.golfer1a
        let golfer1b = this.state.golfer1b

        let myGolfers = [
          golfer1a,
          golfer1b,
        ]
        let myGolfersObj = {
          golfer1: golfer1a, 
          golfer2: golfer1b, 
          gameDate: '2019-04-11',
          result: 0
        }
        
        let checkGolfersFunc = (myGolfers) => {
          return (new Set(myGolfers)).size !== myGolfers.length; 
        }

        let duplicateEntry = checkGolfersFunc(myGolfers)
        console.log('DUPLICATES? ', duplicateEntry)

        if (duplicateEntry) {
          self.setState({
            duplicateGolfer1: true
          })
          return;
        }

        if (golfer1a === '' || golfer1b === '' ) {
          self.setState({
            underLimitGolfers1: true
          })
          return;
        }

        else {
          self.overridePick(challengeId, myId, myGolfersObj.gameDate, myGolfersObj)
        }

      }

    handleFridayGolfersSelection(event) {
        event.preventDefault();
        let self = this
        let myId = localStorage.getItem('user')
        let challengeId = this.state.challengeId
        let golfer2a = this.state.golfer2a
        let golfer2b = this.state.golfer2b

        let myGolfers = [
          golfer2a,
          golfer2b,
        ]
        let myGolfersObj = {
          golfer1: golfer2a, 
          golfer2: golfer2b, 
          gameDate: '2019-04-12',
          result: 0
        }
        
        let checkGolfersFunc = (myGolfers) => {
          return (new Set(myGolfers)).size !== myGolfers.length; 
        }

        let duplicateEntry = checkGolfersFunc(myGolfers)
        console.log('DUPLICATES? ', duplicateEntry)

        if (duplicateEntry) {
          self.setState({
            duplicateGolfer2: true
          })
          return;
        }

        if (golfer2a === '' || golfer2b === '' ) {
          self.setState({
            underLimitGolfers2: true
          })
          return;
        }

        else {
          
          self.overridePick(challengeId, myId, myGolfersObj.gameDate, myGolfersObj)
        }

      }

    handleSaturdayGolfersSelection(event) {
        event.preventDefault();
        let self = this
        let myId = localStorage.getItem('user')
        let challengeId = this.state.challengeId
        let golfer3a = this.state.golfer3a
        let golfer3b = this.state.golfer3b

        let myGolfers = [
          golfer3a,
          golfer3b,
        ]
        let myGolfersObj = {
          golfer1: golfer3a, 
          golfer2: golfer3b, 
          gameDate: '2019-04-13',
          result: 0
        }
        
        let checkGolfersFunc = (myGolfers) => {
          return (new Set(myGolfers)).size !== myGolfers.length; 
        }

        let duplicateEntry = checkGolfersFunc(myGolfers)
        console.log('DUPLICATES? ', duplicateEntry)

        if (duplicateEntry) {
          self.setState({
            duplicateGolfer3: true
          })
          return;
        }

        if (golfer3a === '' || golfer3b === '' ) {
          self.setState({
            underLimitGolfers3: true
          })
          return;
        }

        else {
          self.overridePick(challengeId, myId, myGolfersObj.gameDate, myGolfersObj)
        }

      }

    handleSundayGolfersSelection(event) {
        event.preventDefault();
        let self = this
        let myId = localStorage.getItem('user')
        let challengeId = this.state.challengeId
        let golfer4a = this.state.golfer4a

        let myGolfersObj = {
          golfer1: golfer4a,  
          gameDate: '2019-04-14',
          result: 0
        }

        if (golfer4a === '') {
          self.setState({
            underLimitGolfers4: true
          })
          return;
        }

        else {
          self.overridePick(challengeId, myId, myGolfersObj.gameDate, myGolfersObj)
        }

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
    
    overridePick(challengeId, username, gameDate, newPick) {
        console.log(gameDate)
        API.deleteMastersGolfers(challengeId, username, gameDate)
          .then(res => {
              console.log(res)
          })
          .catch(err => {console.log(err)})
        API.saveMastersGolfers(challengeId, username, newPick)
          .then(res => { 
            console.log(res)
           })
          .catch(err => { console.log(err) } )  
        
          // document.location.reload()
          this.getChallengeData()
        
      }
 
    getResults = () => {
      let self = this
      let yesterdaysGameIds = self.state.yesterdaysGameIds
      let gameResults = []
      
      // const nbaKey = '2kuh4yhq78h5rdmf9vrsprgg'
      // const nbaKey2 = '4y7q3vsbv9rdj9kbevdfng4j'
      const nbaKey3 = 'pucmd9ehjna2p25aa2qzkvn3'

      // API CALL TO GET EACH NBA GAME RESULT (DELAY 1.5 SECONDS)
      for (let m=0; m<yesterdaysGameIds.length; m++) {
        let k = m
        setTimeout ( 
          function() {
            $.ajax({
              url: 'https://cors-everywhere.herokuapp.com/http://api.sportradar.us/nba/trial/v5/en/games/' + yesterdaysGameIds[k] + '/boxscore.json?api_key=' + nbaKey3,
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
        userScore: thisUser.points,
        userGolfers: thisUser.picks,
        userId: thisUser.username
      })

      for(var u=0; u<chalUsers.length; u++) {
        let thisUser = chalUsers[u]
        let thisUserObj = {
          userId: thisUser.username,
          userGolfers: thisUser.picks,
          userScore: thisUser.points
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
      //       userScore: res.data[0].score,
      //       userGolfers: res.data[0].picks,
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
      //         userGolfers: thisUser.picks,
      //         userScore: thisUser.score
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
      let userGolfers = userData.userGolfers
      let schedule = this.state.yesterdaysGames
      let userScore = userData.userScore
    
      // FIND THIS USER'S PICK FOR TODAY
      let thisPickDate = (picks) => {
        return picks.gameDate === yesterday
      }
      let thisPick = userGolfers.filter(thisPickDate)
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
        let thisPickWinner = userScore.filter(pickAlreadyWon)
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
                gameDate: schedule[s].gameDate,
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

    overridePickResult(userId, gameDate, newPick) {
      // console.log(gameDate)
      API.deleteNbaPick(this.state.challengeId, userId, gameDate)
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
        //console.log('Time until first game: ', timeDiff)
        let seconds = moment.duration(timeDiff).asSeconds() * 1000
        //console.log('In seconds milliseconds: ', seconds)
        this.setState({ timeDiff: seconds })
        // console.log('TIME TIL GAME STARTS: ', this.state.timeDiff / 1000)
      }

    

    render() {
      library.add(faIgloo, faCaretRight, faBasketballBall)
      let uuidv4 = require('uuid')
      let golfersPicked = this.state.golfersPicked
      let golfersPickedThurs = this.state.golfersPickedThurs
      let golfersPickedFri = this.state.golfersPickedFri
      // let timerEnded = false;
      // let EndTimer = () => {
      //     timerEnded = true
      //     return (
      //       <span>Today's games have already begun.</span>
      //     )
      //   }
        
        return (
            <div className='col-12 mastersDayBoard'>
               <Modal 
                 isOpen={this.state.modal} 
                 autoFocus={true}
                 centered={true}
                 size='lg'
                 className='fullCalModal'
               >
                <form onSubmit={this.handleAllGolfersSelection}>
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
                              {/* <img 
                                className='teamLogo' 
                                src={this.loadLogo(this.state.awayAlias)}
                                alt={this.state.awayAlias} 
                                fluid='true'
                              /> */}
                            </span>
                            <span className='atSymbol col-md-2'>
                              @
                            </span>
                            <span className='col-md-5 team homeTeam' value={this.state.homeTeam} onClick={this.toggleActive}>
                              {this.state.homeTeam} <br />
                              {/* <img 
                                className='teamLogo' 
                                src={this.loadLogo(this.state.homeAlias)}
                                alt={this.state.homeAlias} 
                                fluid='false'
                              /> */}
                            </span>
                        {/* <input type="text" value={this.state.teams} onChange={this.handleChangeTeams} className="form-control" /> */}
                        </div> <hr />
                        <div className="status row">
                          {this.state.time} 
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <input type="submit" value="Submit" color="primary" className="btn btn-primary" onClick={this.handleAllGolfersSelection} />
                        <Button color="danger" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </form>
                </Modal>

              <div className="row">
                  <div className="golfContainer">    
                    
                    {

                      (!golfersPicked) ? (
                    
                      <form className="formGolfer" action="index.html">  
                        <div id='pickGolfer' className='golferWrap'>
                          <div className="form-group">
                          <h2 className='golfersHeader'>Select Your Golfers</h2>               
                            <div className="row golfPicks">   
                              <div className="col-md-4">
                              <label htmlFor="golferName">Select Golfer #1</label>
                                <select 
                                  value={this.state.golfer1}
                                  name={"golfer1"}
                                  onChange={this.handleInputChange}
                                  type="text"
                                  className="form-control"
                                  id="golferName"
                                >
                                <option value=''>--</option>
                                {
                                  this.state.allGolfers.map((golfer) => (
                                      <option 
                                        key={(uuidv4())} 
                                        value={golfer.name}
                                        data-data={golfer}
                                        onClick={this.handleFormSelection}
                                      //   name={allGolfers}
                                      //   onClick={this.handleInputChange}
                                      //   className='challengeSelection'
                                        
                                      >
                                        {golfer.name}
                                      </option>
                                  ))
                                }
                              </select>
                              <small id="usernameError" className="form-text text-muted">{this.state.nameTaken}</small>
                            </div>
                            <div className="col-md-4">
                              <label htmlFor="golferName">Select Golfer #2</label>
                                <select 
                                  value={this.state.golfer2}
                                  name={"golfer2"}
                                  onChange={this.handleInputChange}
                                  type="text"
                                  className="form-control"
                                  id="golferName"
                                >
                                <option value=''>--</option>
                                {
                                  this.state.allGolfers.map((golfer) => (
                                      <option 
                                        key={(uuidv4())} 
                                        value={golfer.name}
                                        data-data={golfer}
                                        onClick={this.handleFormSelection}
                                      //   name={allGolfers}
                                      //   onClick={this.handleInputChange}
                                      //   className='challengeSelection'
                                        
                                      >
                                        {golfer.name}
                                      </option>
                                  ))
                                }
                              </select>
                              <small id="usernameError" className="form-text text-muted">{this.state.nameTaken}</small>
                            </div>
                            <div className="col-md-4">
                              <label htmlFor="golferName">Select Golfer #3</label>
                                <select 
                                  value={this.state.golfer3}
                                  name={"golfer3"}
                                  onChange={this.handleInputChange}
                                  type="text"
                                  className="form-control"
                                  id="golferName"
                                >
                                <option value=''>--</option>
                                {
                                  this.state.allGolfers.map((golfer) => (
                                      <option 
                                        key={(uuidv4())} 
                                        value={golfer.name}
                                        data-data={golfer}
                                        onClick={this.handleFormSelection}
                                      //   name={allGolfers}
                                      //   onClick={this.handleInputChange}
                                      //   className='challengeSelection'
                                        
                                      >
                                        {golfer.name}
                                      </option>
                                  ))
                                }
                              </select>
                              </div>
                              <small id="usernameError" className="form-text text-muted">{this.state.nameTaken}</small>
                            </div>
                            <div className="row">
                            <div className="col-md-2"></div>
                            <div className="col-md-4">
                              <label htmlFor="golferName">Select Golfer #4</label>
                                <select 
                                  value={this.state.golfer4}
                                  name={"golfer4"}
                                  onChange={this.handleInputChange}
                                  type="text"
                                  className="form-control"
                                  id="golferName"
                                >
                                <option value=''>--</option>
                                {
                                  this.state.allGolfers.map((golfer) => (
                                      <option 
                                        key={(uuidv4())} 
                                        value={golfer.name}
                                        data-data={golfer}
                                        onClick={this.handleFormSelection}
                                      //   name={allGolfers}
                                      //   onClick={this.handleInputChange}
                                      //   className='challengeSelection'
                                        
                                      >
                                        {golfer.name}
                                      </option>
                                  ))
                                }
                              </select>
                              <small id="usernameError" className="form-text text-muted">{this.state.nameTaken}</small>
                            </div>
                            <div className="col-md-4">
                                <label htmlFor="golferName">Select Golfer #5</label>
                                  <select 
                                    value={this.state.golfer5}
                                    name={"golfer5"}
                                    onChange={this.handleInputChange}
                                    type="text"
                                    className="form-control"
                                    id="golferName"
                                  >
                                  <option value=''>--</option>
                                  {
                                    this.state.allGolfers.map((golfer) => (
                                        <option 
                                          key={(uuidv4())} 
                                          value={golfer.name}
                                          data-data={golfer}
                                          onClick={this.handleFormSelection}
                                        //   name={allGolfers}
                                        //   onClick={this.handleInputChange}
                                        //   className='challengeSelection'
                                          
                                        >
                                          {golfer.name}
                                        </option>
                                    ))
                                  }
                                </select>
                                
                                <small id="usernameError" className="form-text text-muted">{this.state.nameTaken}</small>
                                </div>
                              </div>

                              <div className="row">
                              <DuplicateGolfer 
                                duplicateGolfer={this.state.duplicateGolfer}
                              />
                              <UnderLimitGolfers 
                                underLimitGolfers={this.state.underLimitGolfers}
                              />
                              <button
                                type="submit"
                                className="btn btn-primary submit btnMaster golfSubmit"
                                onClick={this.handleAllGolfersSelection}
                              >
                                Submit My Golfers
                              </button>

                              </div>

                            
                          </div>
                        </div>
                      </form>
                      )

                      :

                      <div>

                        <button
                          type="cancel"
                          className='btn btn-warning cancel'
                          onClick={this.handleRepick}
                        >
                          Reselect Your Golfers
                        </button>


                        <h2 className='myGolfers'>My Selected Golfers</h2>

                        <div className="row golferButtons">

                          {
                            this.state.myGolfers.map((golfer, i) => (
                              <div key={(uuidv4())} className="col-md">
                                <button 
                                  key={(uuidv4())} 
                                  className='btn btn-success myGolferButtons'
                                >
                                  {golfer}
                                </button>
                              </div>
                            ))
                          }
                          
                        </div> <hr />
                        
                        <form className="formGolfer" action="index.html">  
                        <div id='pickGolfer' className='golferWrap'>
                          <div className="form-group">
                          <h2 className='golfersHeader'>Select Your Golfers</h2>               
                            <div className="row golfPicks">   
                              <div className="col-md-6">
                              <h3>Thursday</h3>
                              <label htmlFor="golferName">Select Golfer #1</label>
                                <select 
                                  disabled={(!golfersPickedThurs) ? false : true}
                                  value={this.state.golfer1a}
                                  name={"golfer1a"}
                                  onChange={this.handleInputChange}
                                  type="text"
                                  className="form-control"
                                  id="golferName"
                                >
                                <option value=''>--</option>
                                {
                                  this.state.myGolfers.map((golfer) => (
                                      <option 
                                        key={(uuidv4())} 
                                        value={golfer}
                                        data-data={golfer}
                                        onClick={this.handleFormSelection}
                                      //   name={allGolfers}
                                      //   onClick={this.handleInputChange}
                                      //   className='challengeSelection'
                                        
                                      >
                                        {golfer}
                                      </option>
                                  ))
                                }
                              </select>
                              <label htmlFor="golferName">Select Golfer #2</label>
                                <select 
                                  disabled={(!golfersPickedThurs) ? false : true}
                                  value={this.state.golfer1b}
                                  name={"golfer1b"}
                                  onChange={this.handleInputChange}
                                  type="text"
                                  className="form-control"
                                  id="golferName"
                                >
                                <option value=''>--</option>
                                {
                                  this.state.myGolfers.map((golfer) => (
                                      <option 
                                        key={(uuidv4())} 
                                        value={golfer}
                                        data-data={golfer}
                                        onClick={this.handleFormSelection}
                                      //   name={allGolfers}
                                      //   onClick={this.handleInputChange}
                                      //   className='challengeSelection'
                                        
                                      >
                                        {golfer}
                                      </option>
                                  ))
                                }
                              </select>
                              <div className="row">
                                <DuplicateGolfer 
                                  duplicateGolfer={this.state.duplicateGolfer1}
                                />
                                <UnderLimitGolfers 
                                  underLimitGolfers={this.state.underLimitGolfers1}
                                />

                                {

                                  (!golfersPickedThurs) ? 

                                  <button
                                    type="submit"
                                    className="btn btn-success submit golferDaySubmit"
                                    onClick={this.handleThursdayGolfersSelection}
                                  >
                                    Submit My Golfers
                                  </button>

                                  : 
                                  
                                  <button 
                                    type='warning'
                                    className="btn btn-success submit golferDaySubmit"
                                    onClick={this.handleRepickThurs}
                                  >
                                    Reselect Golfers
                                  </button>
                                  

                                }
                                

                              </div>
                            </div>
                            <div className="col-md-6">
                              <h3>Friday</h3>
                              <label htmlFor="golferName">Select Golfer #1</label>
                                <select 
                                  disabled={(golfersPickedThurs && !golfersPickedFri) ? false : true}
                                  value={this.state.golfer2a}
                                  name={"golfer2a"}
                                  onChange={this.handleInputChange}
                                  type="text"
                                  className="form-control"
                                  id="golferName"
                                >
                                <option value=''>--</option>
                                {
                                  this.state.myGolfersFri.map((golfer) => (
                                      <option 
                                        key={(uuidv4())} 
                                        value={golfer}
                                        data-data={golfer}
                                        onClick={this.handleFormSelection}
                                      //   name={allGolfers}
                                      //   onClick={this.handleInputChange}
                                      //   className='challengeSelection'
                                        
                                      >
                                        {golfer}
                                      </option>
                                  ))
                                }
                              </select>
                              <label htmlFor="golferName">Select Golfer #2</label>
                                <select 
                                  disabled={(golfersPickedThurs && !golfersPickedFri) ? false : true}
                                  value={this.state.golfer2b}
                                  name={"golfer2b"}
                                  onChange={this.handleInputChange}
                                  type="text"
                                  className="form-control"
                                  id="golferName"
                                >
                                <option value=''>--</option>
                                {
                                  this.state.myGolfersFri.map((golfer) => (
                                      <option 
                                        key={(uuidv4())} 
                                        value={golfer}
                                        data-data={golfer}
                                        onClick={this.handleFormSelection}
                                      //   name={allGolfers}
                                      //   onClick={this.handleInputChange}
                                      //   className='challengeSelection'
                                        
                                      >
                                        {golfer}
                                      </option>
                                  ))
                                }
                              </select>
                              <div className="row">
                                <DuplicateGolfer 
                                  duplicateGolfer={this.state.duplicateGolfer2}
                                />
                                <UnderLimitGolfers 
                                  underLimitGolfers={this.state.underLimitGolfers2}
                                />
                                {

                                  (!golfersPickedFri) ? 

                                  <button
                                    type="submit"
                                    className="btn btn-success submit golferDaySubmit"
                                    onClick={this.handleFridayGolfersSelection}
                                  >
                                    Submit My Golfers
                                  </button>

                                  : 

                                  <button 
                                    type='warning'
                                    className="btn btn-success submit golferDaySubmit"
                                    onClick={this.handleRepickFri}
                                  >
                                    Reselect Golfers
                                  </button>


                                  }

                              </div>
                            </div>
                            <div className="col-md-6">
                              <h3>Saturday</h3>
                              <label htmlFor="golferName">Select Golfer #1</label>
                                <select 
                                  disabled={(moment().isSameOrAfter('2019-04-13') && (golfersPickedFri)) ? false : true}
                                  value={this.state.golfer3a}
                                  name={"golfer3a"}
                                  onChange={this.handleInputChange}
                                  type="text"
                                  className="form-control"
                                  id="golferName"
                                >
                                <option value=''>--</option>
                                {
                                  this.state.myGolfersSat.map((golfer) => (
                                      <option 
                                        key={(uuidv4())} 
                                        value={golfer}
                                        data-data={golfer}
                                        onClick={this.handleFormSelection}
                                      //   name={allGolfers}
                                      //   onClick={this.handleInputChange}
                                      //   className='challengeSelection'
                                        
                                      >
                                        {golfer}
                                      </option>
                                  ))
                                }
                              </select>
                              <label htmlFor="golferName">Select Golfer #2</label>
                                <select 
                                  disabled={(moment().isSameOrAfter('2019-04-13') && (golfersPickedFri)) ? false : true}
                                  value={this.state.golfer3b}
                                  name={"golfer3b"}
                                  onChange={this.handleInputChange}
                                  type="text"
                                  className="form-control"
                                  id="golferName"
                                >
                                <option value=''>--</option>
                                {
                                  this.state.myGolfersSat.map((golfer) => (
                                      <option 
                                        key={(uuidv4())} 
                                        value={golfer}
                                        data-data={golfer}
                                        onClick={this.handleFormSelection}
                                      //   name={allGolfers}
                                      //   onClick={this.handleInputChange}
                                      //   className='challengeSelection'
                                        
                                      >
                                        {golfer}
                                      </option>
                                  ))
                                }
                              </select>
                              <div className="row">
                                <DuplicateGolfer 
                                  duplicateGolfer={this.state.duplicateGolfer3}
                                />
                                <UnderLimitGolfers 
                                  underLimitGolfers={this.state.underLimitGolfers3}
                                />
                                <button
                                  disabled={(moment().isSameOrAfter('2019-04-13') && (golfersPickedFri)) ? false : true}
                                  type="submit"
                                  className="btn btn-success submit  golferDaySubmit"
                                  onClick={this.handleSaturdayGolfersSelection}
                                >
                                  Submit My Golfers
                                </button>

                              </div>
                              </div>

                              <div className="col-md-6">
                                <h3>Sunday</h3>
                                <label htmlFor="golferName">Select Golfer #1</label>
                                  <select 
                                    disabled={(moment().isSameOrAfter('2019-04-14')) ? false : true}
                                    value={this.state.golfer4a}
                                    name={"golfer4a"}
                                    onChange={this.handleInputChange}
                                    type="text"
                                    className="form-control"
                                    id="golferName"
                                  >
                                  <option value=''>--</option>
                                  {
                                    this.state.myGolfers.map((golfer) => (
                                        <option 
                                          key={(uuidv4())} 
                                          value={golfer}
                                          data-data={golfer}
                                          onClick={this.handleFormSelection}
                                        //   name={allGolfers}
                                        //   onClick={this.handleInputChange}
                                        //   className='challengeSelection'
                                          
                                        >
                                          {golfer}
                                        </option>
                                    ))
                                  }
                                </select>
                                  <div className="row">
                                    <UnderLimitGolfers 
                                      underLimitGolfers={this.state.underLimitGolfers4}
                                    />
                                  <button
                                    disabled={(moment().isSameOrAfter('2019-04-14')) ? false : true}
                                    type="submit"
                                    className="btn btn-success submit  golferDaySubmit"
                                    onClick={this.handleSundayGolfersSelection}
                                  >
                                    Submit My Golfers
                                  </button>

                                </div>
                              </div>
                            </div>
                            
                          </div>
                        </div>
                      </form>

                      </div>

                    }

                  </div>
                
                
                {/* TIME TO PICK <FontAwesomeIcon icon="basketball-ball" /> <Countdown date={Date.now() + this.state.timeDiff} zeroPadTime={2} daysInHours={true} renderer={this.timerRender}>
                    <EndTimer />
                  </Countdown> */}
                
              </div>
              
              
            </div>
        )
    }
}

export default MastersBoard

