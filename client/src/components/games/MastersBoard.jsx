import React, { Component } from 'react'
import '../../css/masters.css'
// import Countdown from 'react-countdown-now';
// import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { library } from '@fortawesome/fontawesome-svg-core'
import DuplicateGolfer from '../alerts/DuplicateGolfer'
import UnderLimitGolfers from '../alerts/underLimitGolfers'
// import Countdown from 'react-countdown-now';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faIgloo, faCaretRight, faBasketballBall } from '@fortawesome/free-solid-svg-icons'
import API from '../../utils/API'
// import $ from 'jquery'
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
          allUsers: [],
          allUserPicks: [],
          dayOfMasters: 1,
          thursday: '2019-04-11',
          friday: '2019-04-12',
          saturday: '2019-04-13',
          satSelections: false,
          sunday: '2019-04-14',
          thursTeeTime: '',
          friTeeTime: '',
          satTeeTime: '',
          sunTeeTime: '',
          allGolfers: [],
          myGolfers: [],
          myGolfersFri: [],
          myRemainingGolfer: [],
          myRemainingGolferSun: [],
          myGolfersSat: ['Brooks Koepka', 'Tommy Fleetwood', 'Kiradech Aphibarnrat', 'Phil Mickelson'],
          myGolfersSatOG: ['Brooks Koepka', 'Tommy Fleetwood', 'Kiradech Aphibarnrat', 'Phil Mickelson'],
          myGolfersSun: ['Jason Day', 'Matt Kuchar', 'Rory Mcllroy', 'Francesco Molinari'],
          myGolfersSunOG: ['Jason Day', 'Matt Kuchar', 'Rory Mcllroy', 'Francesco Molinari'],
          golfersPicked: false,
          golfersPickedThurs: false,
          golfersPickedFri: false,
          golfersPickedSat: false,
          golfersPickedSun: false,
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
        this.getTeeTime = this.getTeeTime.bind(this);
        this.createTimer = this.createTimer.bind(this);
        this.getResults = this.getResults.bind(this);
        this.findUserPicks = this.findUserPicks.bind(this);
        this.findUserWins = this.findUserWins.bind(this);
        this.overridePickResult = this.overridePickResult.bind(this);
        this.getChallengeData = this.getChallengeData.bind(this);
        this.getJustChallengeData = this.getJustChallengeData.bind(this);
        this.getUserData = this.getUserData.bind(this);
        this.getUserScore = this.getUserScore.bind(this);
        this.getSatGolfers = this.getSatGolfers.bind(this);
        this.getSunGolfers = this.getSunGolfers.bind(this);
        // this.getAllUsersPicks = this.getAllUsersPicks.bind(this);
      }

    componentDidMount() {
      this.getChallengeData()
      // this.getTeeTime()
      // this.checkPrevDatesPicked()
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
      document.location.reload()
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
      document.location.reload()
      }

    handleRepickFri = (event) => {
      event.preventDefault()
      let self = this
      let challengeId = this.props.challengeId
      let username = this.props.userId
      let gameDate = '2019-04-12'
      console.log('INFO: ', challengeId, username, gameDate)
      API.deleteMastersGolfers(challengeId, username, gameDate)
          .then(res => {
              console.log(res)
              self.setState({
                golfersPickedFri: false,
                golfer2a: '',
                golfer2b: '',
                myGolfersFri: []
              })
              document.location.reload()
          })
        .catch(err => {console.log(err)})
      }

    handleRepickSat = (event) => {
      event.preventDefault()
      let self = this
      let challengeId = this.props.challengeId
      let username = this.props.userId
      let gameDate = '2019-04-13'
      console.log('INFO: ', challengeId, username, gameDate)
      API.deleteMastersGolfers(challengeId, username, gameDate)
          .then(res => {
              console.log(res)
              self.setState({
                golfersPickedSat: false,
                golfer3a: '',
                golfer3b: ''
              })
              document.location.reload()
          })
        .catch(err => {console.log(err)})
      }

    handleRepickSun = (event) => {
      event.preventDefault()
      let self = this
      let challengeId = this.props.challengeId
      let username = this.props.userId
      let gameDate = '2019-04-14'
      console.log('INFO: ', challengeId, username, gameDate)
      API.deleteMastersGolfers(challengeId, username, gameDate)
          .then(res => {
              console.log(res)
              self.setState({
                golfersPickedSun: false,
                golfer4a: '',
                myGolfersFri: []
              })
              document.location.reload()
          })
        .catch(err => {console.log(err)})
      }

    getJustChallengeData = () => {
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
      // console.log('CHALLENGE ID: ', challengeId)
      API.getChallenge(challengeId)
        .then(res => {
          // console.log(res)
          self.setState({
            challengeData: res.data[0],
            allUsers: res.data[0].users
          })
          self.getUserData()
          // self.getResults()
        //   self.getSchedule()
        })
        .catch(err => console.log(err))
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
      // console.log('CHALLENGE ID: ', challengeId)
      API.getChallenge(challengeId)
        .then(res => {
          // console.log(res)
          self.setState({
            challengeData: res.data[0],
            allUsers: res.data[0].users
          })
          self.getUserData()
          self.getResults()
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
      // console.log('THIS CHALLENGE: ', chalUsers)
      let chalGolfers = this.state.challengeData.teams
      let myGolfers = []
      // let myGolfersFri = []
      // let myGolfersSat = []
      // console.log('CHAL GOLFERS: ', chalGolfers)

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
        // console.log('ALL GOLFERS: ', allGolfers)
        // console.log('THURSDAYS PICKS: ', thursdaysPicks)

        let myFriGolfersFunc = (golfers) => {
          return golfers !== this.state.thisPick
        }
        for (var p=0; p<thursdaysPicks.length; p++) {
          self.setState({ thisPick: thursdaysPicks[p] })
          allGolfers = allGolfers.filter(myFriGolfersFunc)
          // console.log('FRIDAYS PICKS: ', allGolfers)
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

        // console.log('ALL GOLFERS: ', allGolfers)
        // console.log('FRIDAYS PICKS: ', fridaysPicks)

        let mySatGolfersFunc = (golfers) => {
          return golfers !== this.state.thisPick
        }
        for (var v=0; v<fridaysPicks.length; v++) {
          self.setState({ thisPick: fridaysPicks[v] })
          allGolfers = allGolfers.filter(mySatGolfersFunc)
          // console.log('SATURDAY PICKS: ', allGolfers)
        }
        
        this.setState({
          golfersPickedFri: true,
          golfer2a: userPicks[2].golfer1,
          golfer2b: userPicks[2].golfer2,
          myRemainingGolfer: allGolfers
        }) 
      }

      if(userPicks[3]) {
        let self = this
        let allGolfers = this.state.myGolfersSat
        let remainingGolfer = this.state.myRemainingGolfer
        let satPicks = userPicks[3]

        let satsPicks = [
          satPicks.golfer1,
          satPicks.golfer2
        ]

        let myRemainingGolferFunc = (golfers) => {
          return golfers === remainingGolfer[0] 
        }
        let remainingGolferBool = satsPicks.filter(myRemainingGolferFunc)
        if (remainingGolferBool[0]) {
          remainingGolfer = ''
        }
        console.log('MY REMAINING GOLFER: ', remainingGolferBool)
        // console.log('ALL GOLFERS: ', allGolfers)
        // console.log('FRIDAYS PICKS: ', satsPicks)

        let mySunGolfersFunc = (golfers) => {
          return golfers !== this.state.thisPick
        }
        for (var w=0; w<satsPicks.length; w++) {
          self.setState({ thisPick: satsPicks[w] })
          allGolfers = allGolfers.filter(mySunGolfersFunc)
          // console.log('SATURDAY PICKS: ', allGolfers)
        }
        
        this.setState({
          golfersPickedSat: true,
          golfer3a: userPicks[3].golfer1,
          golfer3b: userPicks[3].golfer2,
          myRemainingGolferSun: remainingGolfer
        }) 
      }

      if(userPicks[4]) {
        this.setState({
          golfersPickedSun: true,
          golfer4a: userPicks[4].golfer1
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

      this.getSatGolfers()
      this.getSunGolfers()

      // console.log('GOLFERS PICKED? ', this.state.golfersPicked)
      // console.log('MY GOLFERS: ', this.state.myGolfers)
      // console.log('CHAL USERS DATA: ', this.state.challengeData.users)
      this.getUserScore(this.state.username, this.state.myPicks)
      }

    getUserScore = (user, picks) => {
      // console.log(user, 's PICKS', picks)
      let allUsers = this.state.allUsers
      console.log('ALL USERS PICKS: ', allUsers)

      let roundPicks = []
        for (var j=picks.length -1; j>0; j--) {
          console.log('ROUND ' + [j] + ' PICKS: ', picks[j])
          roundPicks.push(picks[j])
        } 
      // console.log('ROUND PICKS: ', roundPicks)



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
        // console.log(
        //   'USER: ', myId,
        //   'CHALLENGE: ', challengeId,
        //   'MY GOLFERS: ', myGolfers
        // )

        let checkGolfersFunc = (myGolfers) => {
          return (new Set(myGolfers)).size !== myGolfers.length; 
        }

        let duplicateEntry = checkGolfersFunc(myGolfers)
        // console.log('DUPLICATES? ', duplicateEntry)

        if (golfer1 === '' || golfer2 === '' || golfer3 === '' || golfer4 === '' || golfer5 === '' ) {
          self.setState({
            underLimitGolfers: true
          })
          return;
        }

        if (duplicateEntry) {
          self.setState({
            duplicateGolfer: true
          })
          return;
        }

        else {
          // console.log('BIG DATE: ', myGolfersObj.gameDate)
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
        document.location.reload()
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
        document.location.reload()
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
        // debugger;
        // document.location.reload()
      }

    handleSundayGolfersSelection(event) {
        event.preventDefault();
        let self = this
        let myId = localStorage.getItem('user')
        let challengeId = this.state.challengeId
        let golfer4a = this.state.golfer4a

        console.log('GOLFER 4: ', golfer4a)
        // debugger

        let myGolfersObj = {
          golfer1: golfer4a,  
          gameDate: '2019-04-14',
          result: 0
        }

        if (golfer4a === '') {
          // console.log('UNDER LIMIT SELECTION')
          // debugger;
          self.setState({
            underLimitGolfers4: true
          })
          return;
        }

        else {
          // console.log('SAVING GOLFER')
          // debugger;
          API.saveMastersGolfers(challengeId, myId, myGolfersObj)
          .then(res => { 
            console.log(res)
           })
          .catch(err => { console.log(err) } )  
          // self.overridePick(challengeId, myId, myGolfersObj.gameDate, myGolfersObj)
          // debugger;
        }
        document.location.reload()
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
        console.log(challengeId, username, gameDate)
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
          // debugger;
          document.location.reload()
          this.getChallengeData()
        
      }
 
    getResults = () => {
      let self = this
      // let yesterdaysGameIds = self.state.yesterdaysGameIds
      // let gameResults = []
      
      // // const nbaKey = '2kuh4yhq78h5rdmf9vrsprgg'
      // // const nbaKey2 = '4y7q3vsbv9rdj9kbevdfng4j'
      // const nbaKey3 = 'pucmd9ehjna2p25aa2qzkvn3'

      // // API CALL TO GET EACH NBA GAME RESULT (DELAY 1.5 SECONDS)
      // for (let m=0; m<yesterdaysGameIds.length; m++) {
      //   let k = m
      //   setTimeout ( 
      //     function() {
      //       $.ajax({
      //         url: 'https://cors-everywhere.herokuapp.com/http://api.sportradar.us/nba/trial/v5/en/games/' + yesterdaysGameIds[k] + '/boxscore.json?api_key=' + nbaKey3,
      //         type: 'GET',
      //         success: function(data) {
      //           // console.log('Game results: ', data)
      //           gameResults.push(data)
      //           self.setState({ gameResults: gameResults })
      //           self.findGameWinners()
      //         }
      //       })
      //     }, 1500*k)

      //     self.findUserPicks()
      
      //   }
          self.findUserPicks()
      }

    findUserPicks = () => {
      // let self = this
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

      // for(var u=0; u<chalUsers.length; u++) {
      //   let thisUser = chalUsers[u]
      //   let thisUserObj = {
      //     userId: thisUser.username,
      //     userGolfers: thisUser.picks,
      //     userScore: thisUser.points
      //     }
      //   // IF USER HAS MADE PICKS FIND THEIR WINS
      //   // if (thisUser.picks[0]) {
      //   //   self.findUserWins(thisUserObj)
      //   //   }
      //   }

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
      let today = moment().format('YYYY-MM-DD')
      let userGolfers = userData.userGolfers
      let userScore = userData.userScore
      console.log('USER INFO: ',
        userId,
        today,
        userGolfers,
        userScore
      )

      let allUsersPicks = []
      
      if (today === this.state.thursday) {
        for (var b=0; b<userGolfers.length; b++) {
          let allGolfers = userGolfers[0]
          let thursGolfers = userGolfers[1]
          allUsersPicks.push({
            allGolfers: allGolfers,
            thursGolfers: thursGolfers
          })
        }
      }

      console.log('ALL USERS PICKS: ', allUsersPicks)
      



      // FIND THIS USER'S PICK FOR TODAY
      // let thisPickDate = (picks) => {
      //   return picks.gameDate === yesterday
      // }
      // let thisPick = userGolfers.filter(thisPickDate)
      // let thisPickTeam = ''

      // // IF THERE IS A PICK FOR YESTERDAY MAKE THAT 'THISPICKTEAM'
      // if (thisPick[0]) {
      //   thisPickTeam = thisPick[0].team
      //   // console.log('THIS PICK RESULT: ', userId, thisPickTeam,thisPick[0].result)

      //   // ONLY CHECKING GAMES WITH 'PENDING' RESULT
      //   if (thisPick[0].result === 'pending') {
      //     // console.log('THESE GAMES ARE STILL PENDING')

      //   // CHECK IF THE USER HAS ALREADY WON WITH THIS TEAM
      //   let pickAlreadyWon = (wins) => {
      //     return wins.win === thisPickTeam
      //   }
      //   let thisPickWinner = userScore.filter(pickAlreadyWon)
      //   // ADD LOSS IF USER HAS ALREADY WON WITH THIS PICK
      //   if (thisPickWinner[0]) {
      //     // console.log(userId, 'HAS ALREADY WON WITH ', thisPickWinner[0].win)
      //     let result = 'loss'
      //     let newPick = {
      //       team: thisPick[0].team,
      //       gameDate: thisPick[0].gameDate,
      //       gameId: thisPick[0].gameId,
      //       result: result
      //     }
      //       // console.log('THIS IS A LOSS: ', thisPick)
      //       // console.log('RESULT: ', newPick)
      //       this.overridePickResult(userId, yesterday, newPick) 
      //       return;
      //     }

      //     // CHECK TO SEE IF YESTERDAYS PICK IS A WINNER
      //     let newWin = null
      //     for (let s=0; s<schedule.length; s++) {
      //       let winner = schedule[s].gameWinner
      //       let thisPick = thisPickTeam.trim()
      //       if (thisPick === winner) {
      //         let result = 'win'
      //         // console.log('THIS IS A WINNER: ', thisPick)
      //         newWin = { win: thisPickTeam }

      //         // CHANGE PICK RESULT IF WIN
      //         let newPick = {
      //           team: schedule[s].gameWinner,
      //           gameDate: schedule[s].gameDate,
      //           gameId: schedule[s].id,
      //           result: result
      //         }
      //         // console.log('NEW PICK: ', newPick)
      //         this.overridePickResult(userId, yesterday, newPick) 
              
      //         // ADD NEW WINS TO USER DB
      //         API.addNbaWin(this.state.challengeId, userId, newWin)
      //           .then (res => {
      //             console.log(res)
      //           })
      //           .catch(err => console.log(err))
            
      //         }
      //       }
    
      //       // CHANGE PICK RESULT IF LOSS
      //       if (newWin === null && thisPick[0]) {
      //         let result = 'loss'
      //         let newPick = {
      //           team: thisPick[0].team,
      //           gameDate: thisPick[0].gameDate,
      //           gameId: thisPick[0].gameId,
      //           result: result
      //         }
      //         // console.log('THIS IS A LOSS: ', thisPick)
      //         // console.log('RESULT: ', newPick)
      //         this.overridePickResult(userId, yesterday, newPick) 
      //         return;
      //       }
      //     } else { return }
      //   } else { return }

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

    getTeeTime = () => {
        let dateThu = moment().add(1, 'day').hours(9).minutes(0).seconds(0)
        
        console.log('TEE TIME TOMM: ', dateThu);
        // let teeTimeThu = moment(dateThu).format('HH:mm:ss a')
        // let teeTimeFri = moment(dateFri).format('HH:mm:ss a')
        // let teeTimeSat = moment(dateSat).format('HH:mm:ss a')
        // let teeTimeSun = moment(dateSun).format('HH:mm:ss a')
        // let thursTeeTime = teeOff.gameTime
        // let teeOffTimeAdj = moment(thursTeeTime).add(5, 'hours').tz('America/New_York').format('HH:mm:ss a')
        // let firstTeeTimeAdj = moment(teeTimeThu).format('HH:mm:ss a')
        // let realTime = moment().tz('America/New_York').format('HH:mm:ss a')
        let realTime = moment().format('HH:mm:ss a')
        // let realTeeTimeAdj = moment(firstTeeTimeAdj, 'HH:mm:ss a')
        // let realTimeAdj = moment(realTime, 'HH:mm:ss a')
          
        
        // let realTeeTimeThu = moment(realTeeTimeAdj, 'HH:mm:ss a')
        // let realTeeTimeFri = moment(teeTimeFri, 'HH:mm:ss a')
        // let realTeeTimeSat = moment(teeTimeSat, 'HH:mm:ss a')
        // let realTeeTimeSun = moment(teeTimeSun, 'HH:mm:ss a')
        // let realTimeAdj = moment(now, 'HH:mm:ss a')
        // console.log('TEE TIME: ', teeTimeThu)
        let timeDiff = moment.duration(dateThu.diff(realTime))
        console.log('TIME DIFFFFF: ', timeDiff)
        // let thursTimeDiff = moment.duration(realTeeTimeThu.diff(realTimeAdj))
        // let friTimeDiff = moment.duration(realTimeAdj.diff(realTeeTimeFri))
        // let satTimeDiff = moment.duration(realTimeAdj.diff(realTeeTimeSat))
        // let sunTimeDiff = moment.duration(realTimeAdj.diff(realTeeTimeSun))
        this.setState({
          // thursTeeTime: realTeeTimeThu,
          // friTeeTime: realTeeTimeFri,
          // satTeeTime: realTeeTimeSat,
          // sunTeeTime: realTeeTimeSun
        })

        this.createTimer(timeDiff)
          
      }
  
    createTimer = (timeDiff) => {
      console.log('Time until tee off: ', timeDiff)
      let seconds = moment.duration(timeDiff).asSeconds() * 1000
      //console.log('In seconds milliseconds: ', seconds)
      this.setState({ timeDiff: seconds })
      }
    
    getSatGolfers = () => {
      let myRemainingGolfer = this.state.myRemainingGolfer
      let golfersSat = this.state.myGolfersSat
      console.log('MY REMAINING GOLFER: ', myRemainingGolfer[0])
      if (myRemainingGolfer !== undefined) {
        golfersSat.push(myRemainingGolfer[0])
        console.log('GOLFERS SAT: ', golfersSat)
      }
      
      }

    getSunGolfers = () => {
      let myRemainingGolfer = this.state.myRemainingGolferSun
      let golfersSun = this.state.myGolfersSun
      console.log('MY REMAINING GOLFER: ', myRemainingGolfer[0])
      if (myRemainingGolfer !== undefined) {
        golfersSun.push(myRemainingGolfer[0])
        console.log('GOLFERS Sun: ', golfersSun)
      }
      
      }

    render() {
      library.add(faIgloo, faCaretRight, faBasketballBall)
      let uuidv4 = require('uuid')
      let golfersPicked = this.state.golfersPicked
      let golfersPickedThurs = this.state.golfersPickedThurs
      let golfersPickedFri = this.state.golfersPickedFri
      let currentTime = moment().tz('America/New_York').format()
      let friTimer = moment().tz('America/New_York').format('2019-04-12T09:00:00Z')
      let satTimer = moment().tz('America/New_York').format('2019-04-13T09:00:00Z')
      let sunTimer = moment().tz('America/New_York').format('2019-04-14T07:30:00Z')
      let enableSatPicks = (moment(currentTime).isAfter(friTimer))
      let enableSunPicks = (moment(currentTime).isAfter(satTimer))
      let enableResults = (moment(currentTime).isAfter(sunTimer))
      // console.log('FRI TIMER: ', friTimer)
      // console.log('CURRENT TIME: ', currentTime)
      // console.log('TIME TO PICK FOR SATURDAY? ', enableSatPicks)
      // let timerEnded = false;
      // let EndTimer = () => {
      //     // timerEnded = true
      //     return (
      //       <span>Today's games have already begun.</span>
      //     )
      //   }
        
        return (
            <div className='col-12 mastersDayBoard'>
            PICKS ARE DUE DAILY BY 9AM EST <br />
            <small className='important'>** SUNDAY PICKS ARE DUE BY 7:30AM EST **</small>
                  {/* <FontAwesomeIcon icon="basketball-ball" /> <Countdown date={Date.now() + this.state.timeDiff} zeroPadTime={2} daysInHours={true} renderer={this.timerRender}>
                    <EndTimer />
                  </Countdown> */}

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

                        {/* <button
                          type="cancel"
                          className='btn btn-warning cancel'
                          onClick={this.handleRepick}
                        >
                          Reselect Your Golfers
                        </button>
                        <small id="usernameError" className="form-text text-muted">DISABLED AFTER 9AM THURSDAY</small> */}


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
                        
                       { (enableSatPicks) ? 
                       
                        <div>
                          <h2 className='myGolfers'>Random Golfers Pool (SAT)</h2>
                            <div className="row golferButtons og">

                              {
                                
                                this.state.myGolfersSatOG.map((golfer) => (
                                  <div key={(uuidv4())} className="col-md-3">
                                    <button 
                                      key={(uuidv4())} 
                                      className='btn btn-success randomGolferButtons'
                                    >
                                      {golfer}
                                    </button>
                                  </div>
                                ))

                              }

                            </div>
                          <hr />
                        </div>

        
                        :

                        <div></div>

                       }

                       { (enableSunPicks) ? 
                       
                        <div>
                          <h2 className='myGolfers'>Random Golfers Pool (SUN)</h2>
                            <div className="row golferButtons og">

                              {
                                
                                this.state.myGolfersSunOG.map((golfer) => (
                                  <div key={(uuidv4())} className="col-md-3">
                                    <button 
                                      key={(uuidv4())} 
                                      className='btn btn-success randomGolferButtons'
                                    >
                                      {golfer}
                                    </button>
                                  </div>
                                ))

                              }

                            </div>
                          <hr />
                        </div>

        
                        :

                        <div></div>

                       }
                        
                        <form className="formGolfer" action="index.html">  
                        <div id='pickGolfer' className='golferWrap'>
                          <div className="form-group">
                          <h2 className='golfersHeader'>Select Your Golfers</h2>               
                            <div className="row golfPicks">   
                              <div className="col-md-6">
                              <h3>Thursday</h3>
                              <label htmlFor="golferName">Select Golfer #1</label>
                                <select 
                                  disabled
                                  // disabled={(!golfersPickedThurs) ? false : true}
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
                                  disabled
                                  // disabled={(!golfersPickedThurs) ? false : true}
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
                                    disabled
                                    type="submit"
                                    className="btn btn-success submit golferDaySubmit"
                                    onClick={this.handleThursdayGolfersSelection}
                                  >
                                    Submit My Golfers
                                  </button>

                                  : 
                                  
                                  <button 
                                    disabled
                                    type='secondary'
                                    className="btn btn-success submit golferDaySubmit"
                                  >
                                    Picks Locked
                                  </button>
                                  

                                }
                                

                              </div>
                            </div>
                            <div className="col-md-6">
                              <h3>Friday</h3>
                              <label htmlFor="golferName">Select Golfer #1</label>
                                <select 
                                  disabled={(golfersPickedThurs && !golfersPickedFri && !enableSatPicks) ? false : true}
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
                                  disabled={(golfersPickedThurs && !golfersPickedFri && !enableSatPicks) ? false : true}
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

                                  (!golfersPickedFri && !enableSatPicks) ? 

                                  <button
                                    type="submit"
                                    className="btn btn-success submit golferDaySubmit"
                                    onClick={this.handleFridayGolfersSelection}
                                  >
                                    Submit My Golfers
                                  </button>

                                  : !enableSatPicks ? 

                                  <button 
                                    type='warning'
                                    className="btn btn-success submit golferDaySubmit"
                                    onClick={this.handleRepickFri}
                                  >
                                    Reselect Golfers
                                  </button>

                                  :

                                  <button 
                                    disabled
                                    type='secondary'
                                    className="btn btn-success submit golferDaySubmit"
                                  >
                                    Picks Locked
                                  </button>


                                  }

                              </div>
                            </div>
                            <div className="col-md-6">
                              <h3>Saturday</h3>
                              <label htmlFor="golferName">Select Golfer #1</label>
                                <select 
                                  disabled={!enableSatPicks || this.state.golfersPickedSat ? true : false}
                                  // disabled
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
                                  disabled={!enableSatPicks || this.state.golfersPickedSat ? true : false}
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
                               {

                                (!this.state.golfersPickedSat && !enableSunPicks) ? 

                                <button
                                  type="submit"
                                  className="btn btn-success submit golferDaySubmit"
                                  onClick={this.handleSaturdayGolfersSelection}
                                >
                                  Submit My Golfers
                                </button>

                                : !enableSunPicks ? 

                                <button 
                                  type='warning'
                                  className="btn btn-success submit golferDaySubmit"
                                  onClick={this.handleRepickSat}
                                >
                                  Reselect Golfers
                                </button>

                                :

                                <button 
                                  disabled
                                  type='secondary'
                                  className="btn btn-success submit golferDaySubmit"
                                >
                                  Picks Locked
                                </button>


                                }

                              </div>
                              </div>

                              <div className="col-md-6">
                                <h3>Sunday</h3>
                                <label htmlFor="golferName">Select Golfer #1</label>
                                  <select 
                                    disabled={(this.state.golfersPickedSun || !enableSunPicks)}
                                    value={this.state.golfer4a}
                                    name={"golfer4a"}
                                    onChange={this.handleInputChange}
                                    type="text"
                                    className="form-control"
                                    id="golferName"
                                  >
                                  <option value=''>--</option>
                                  {
                                    this.state.myGolfersSun.map((golfer) => (
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
                                  {

                                    (!this.state.golfersPickedSun && enableSunPicks) ? 

                                    <button
                                      type="submit"
                                      className="btn btn-success submit golferDaySubmit"
                                      onClick={this.handleSundayGolfersSelection}
                                    >
                                      Submit My Golfers
                                    </button>

                                    : this.state.golfersPickedSun && enableSunPicks && !enableResults ? 

                                    <button 
                                      type='warning'
                                      className="btn btn-success submit golferDaySubmit"
                                      onClick={this.handleRepickSun}
                                    >
                                      Reselect Golfers
                                    </button>

                                    :

                                    <button 
                                      disabled
                                      type='secondary'
                                      className="btn btn-success submit golferDaySubmit"
                                    >
                                      Picks Locked
                                    </button>


                                    }

                                </div>
                              </div>
                            </div>
                            
                          </div>
                        </div>
                      </form>

                      </div>

                    }

                  </div>
                
                
                
                
              </div>
              
              
            </div>
        )
    }
}

export default MastersBoard

