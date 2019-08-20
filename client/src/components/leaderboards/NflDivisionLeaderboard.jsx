import React, { Component } from 'react'
import LoadingOverlay from 'react-loading-overlay';
import { Jumbotron, Container, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import API from '../../utils/API'
import '../../css/leaderboard.css'
import moment from 'moment-timezone'
import $ from 'jquery'

class NflDivisionLeaderboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
          challengeId: '',
          challengeData: {},
          currentUser: {},
          nflTeams: [
            { teamName: 'Arizona Cardinals', teamAlias: 'ari', logo: 'ari2', status: 'secondary', valueWeek: 0, value: 0, tier: 0, homeGames: [], awayGames: [], division: 'NFC West' },
            { teamName: 'Atlanta Falcons', teamAlias: 'atl', logo: 'atl3', status: 'secondary', valueWeek: 0, value: 0, tier: 0, homeGames: [], awayGames: [], division: 'NFC South' },
            { teamName: 'Baltimore Ravens', teamAlias: 'bal', logo: 'bal2', status: 'secondary', valueWeek: 0, value: 0, tier: 0, homeGames: [], awayGames: [], division: 'AFC North' },
            { teamName: 'Buffalo Bills', teamAlias: 'buf', logo: 'buf', status: 'secondary', valueWeek: 0, value: 0, tier: 0, homeGames: [], awayGames: [], division: 'AFC East' },
            { teamName: 'Carolina Panthers', teamAlias: 'car', logo: 'car', status: 'secondary', valueWeek: 0, value: 0, tier: 0, homeGames: [], awayGames: [], division: 'NFC South' },
            { teamName: 'Chicago Bears', teamAlias: 'chi', logo: 'chi2', status: 'secondary', valueWeek: 0, value: 0, tier: 0, homeGames: [], awayGames: [], division: 'NFC North' },
            { teamName: 'Cincinnati Bengals', teamAlias: 'cin', logo: 'cin', status: 'secondary', valueWeek: 0, value: 0, tier: 0, homeGames: [], awayGames: [], division: 'AFC North' },
            { teamName: 'Cleveland Browns', teamAlias: 'cle', logo: 'cle3', status: 'secondary', valueWeek: 0, value: 0, tier: 0, homeGames: [], awayGames: [], division: 'AFC North' },
            { teamName: 'Dallas Cowboys', teamAlias: 'dal', logo: 'dal2', status: 'secondary', valueWeek: 0, value: 0, tier: 0, homeGames: [], awayGames: [], division: 'NFC East' },
            { teamName: 'Denver Broncos', teamAlias: 'den', logo: 'den', status: 'secondary', valueWeek: 0, value: 0, tier: 0, homeGames: [], awayGames: [], division: 'AFC West' },
            { teamName: 'Detroit Lions', teamAlias: 'det', logo: 'det3', status: 'secondary', valueWeek: 0, value: 0, tier: 0, homeGames: [], awayGames: [], division: 'NFC North' },
            { teamName: 'Green Bay Packers', teamAlias: 'gb', logo: 'gb', status: 'secondary', valueWeek: 0, value: 0, tier: 0, homeGames: [], awayGames: [], division: 'NFC North' },
            { teamName: 'Houston Texans', teamAlias: 'hou', logo: 'hou2', status: 'secondary', valueWeek: 0, value: 0, tier: 0, homeGames: [], awayGames: [], division: 'AFC South' },
            { teamName: 'Indianapolis Colts', teamAlias: 'ind', logo: 'ind2', status: 'secondary', valueWeek: 0, value: 0, tier: 0, homeGames: [], awayGames: [], division: 'AFC South' },
            { teamName: 'Jacksonville Jaguars', teamAlias: 'jac', logo: 'jac', status: 'secondary', valueWeek: 0, value: 0, tier: 0, homeGames: [], awayGames: [], division: 'AFC South' },
            { teamName: 'Kansas City Chiefs', teamAlias: 'kc', logo: 'kc', status: 'secondary', valueWeek: 0, value: 0, tier: 0, homeGames: [], awayGames: [], division: 'AFC West' },
            { teamName: 'Los Angeles Chargers', teamAlias: 'lac', logo: 'lac2', status: 'secondary', valueWeek: 0, value: 0, tier: 0, homeGames: [], awayGames: [], division: 'AFC West' },
            { teamName: 'Los Angeles Rams', teamAlias: 'la', logo: 'la', status: 'secondary', valueWeek: 0, value: 0, tier: 0, homeGames: [], awayGames: [], division: 'NFC West' },
            { teamName: 'Miami Dolphins', teamAlias: 'mia', logo: 'mia2', status: 'secondary', valueWeek: 0, value: 0, tier: 0, homeGames: [], awayGames: [], division: 'AFC East' },
            { teamName: 'Minnesota Vikings', teamAlias: 'min', logo: 'min2', status: 'secondary', valueWeek: 0, value: 0, tier: 0, homeGames: [], awayGames: [], division: 'NFC North' },
            { teamName: 'New England Patriots', teamAlias: 'ne', logo: 'ne', status: 'secondary', valueWeek: 0, value: 0, tier: 0, homeGames: [], awayGames: [], division: 'AFC East' },
            { teamName: 'New Orleans Saints', teamAlias: 'no', logo: 'no', status: 'secondary', valueWeek: 0, value: 0, tier: 0, homeGames: [], awayGames: [], division: 'NFC South' },
            { teamName: 'New York Giants', teamAlias: 'nyg', logo: 'nyg', status: 'secondary', valueWeek: 0, value: 0, tier: 0, homeGames: [], awayGames: [], division: 'NFC East' },
            { teamName: 'New York Jets', teamAlias: 'nyj', logo: 'nyj', status: 'secondary', valueWeek: 0, value: 0, tier: 0, homeGames: [], awayGames: [], division: 'AFC East' },
            { teamName: 'Oakland Raiders', teamAlias: 'oak', logo: 'oak', status: 'secondary', valueWeek: 0, value: 0, tier: 0, homeGames: [], awayGames: [], division: 'AFC West' },
            { teamName: 'Philadelphia Eagles', teamAlias: 'phi', logo: 'phi', status: 'secondary', valueWeek: 0, value: 0, tier: 0, homeGames: [], awayGames: [], division: 'NFC East' },
            { teamName: 'Pittsburgh Steelers', teamAlias: 'pit', logo: 'pit', status: 'secondary', valueWeek: 0, value: 0, tier: 0, homeGames: [], awayGames: [], division: 'AFC North' },
            { teamName: 'Seattle Seahawks', teamAlias: 'sea', logo: 'sea', status: 'secondary', valueWeek: 0, value: 0, tier: 0, homeGames: [], awayGames: [], division: 'NFC West' },
            { teamName: 'San Francisco 49ers', teamAlias: 'sf', logo: 'sf', status: 'secondary', valueWeek: 0, value: 0, tier: 0, homeGames: [], awayGames: [], division: 'NFC West' },
            { teamName: 'Tampa Bay Buccaneers', teamAlias: 'tb', logo: 'tb', status: 'secondary', valueWeek: 0, value: 0, tier: 0, homeGames: [], awayGames: [], division: 'NFC South' },
            { teamName: 'Tennessee Titans', teamAlias: 'ten', logo: 'ten', status: 'secondary', valueWeek: 0, value: 0, tier: 0, homeGames: [], awayGames: [], division: 'AFC South' },
            { teamName: 'Washington Redskins', teamAlias: 'was', logo: 'was2', status: 'secondary', valueWeek: 0, value: 0, tier: 0, homeGames: [], awayGames: [], division: 'NFC East' }
          ],
          isActive: false,
          hover: false,
          allUsers: [],
          leaders: [],
          modal: false,
          activeUser: {},
          activeUserUsername: '',
          activeUserLine: '',
          activeUserWins: [],
          activeUserPicks: [],
          activeUserPrevPicks: [],
          activeUserWeekPick: '',
          activeUserPickValue: '',
          prevPicks: [],
          thisRecentPick: '',
          userWin: '',
          todaysPick: 'No Pick',
          firstGameTime: '',
          thisDate: '',
          thisTeam: '',
          userPlace: {},
          challengeStartDate: ''
        }
        this.toggle = this.toggle.bind(this);
        this.toggleClose = this.toggleClose.bind(this);
        this.handlePreloader = this.handlePreloader.bind(this);
        this.getUser = this.getUser.bind(this);
        this.getFirstGame = this.getFirstGame.bind(this);
        this.createTimer = this.createTimer.bind(this);
        this.findRecentPicks = this.findRecentPicks.bind(this);
        this.changeLogo = this.changeLogo.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.createLeaderboard = this.createLeaderboard.bind(this);
        this.getChallengeData = this.getChallengeData.bind(this);
        this.getUserData = this.getUserData.bind(this);

    }
    componentDidMount() {
      this.getChallengeData()
      this.getFirstGame()
        
      }

    handlePreloader() {
        this.setState({
          isActive: !this.state.isActive
        });
      }

    toggle() {
        this.setState({
          modal: !this.state.modal
        });
      }

    toggleClose() {
        this.setState({
          modal: !this.state.modal,
          activeUserWeekPick: '',
          activeUserPickValue: ''
        });
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
          // console.log('CHALLENGE START DATE: ', res.data[0])
          self.setState({
            challengeData: res.data[0],
            challengeStartDate: res.data[0].startDate,
            allUsers: res.data[0].users
            // nflTeams: res.data[0].nflTeams
          })
          self.getUserData()
  
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

      this.createLeaderboard()
      // console.log('CURRENT USER: ', this.state.currentUser)
      // console.log('CHAL USERS DATA: ', this.state.challengeData.users)
      }

    getUser = () => {
      // console.log('ACTIVE USER: ', this.state.activeUser)
      this.findRecentPicks()
      this.changeLogo()
      this.toggle()
      
      }

    createLeaderboard = () => {
        let users = this.state.allUsers
        let testFilter = (allChallengers) => {
          return allChallengers.username !== 'test'
        }
        let newUsers = users.filter(testFilter)
        
        // console.log('NEW USERS FOR LEADERBOARD: ', users)
        // if(thisUser === 'test') {
        //   return
        // }
        // console.log('Create leaderboard with this data: ', users
        let placedUsers = newUsers.map(function(user, i) {
          let points = 0
          let pickCount = 0
          for (let h=0; h<user.picks.length; h++) {
            // console.log('USER PICKS: ', user.picks)
            pickCount++
            let thisPickValue = user.picks[h].teamValue
            if (pickCount === user.picks.length) {
              // console.log('PICK GAME TIME: ', user.picks[h].gameTime)
              let gameTime = user.picks[h].gameTime
              let currentTime = moment().format()
              // console.log('game time: ', gameTime)
              // console.log('current time: ', currentTime)
              if (moment(gameTime).isAfter(moment(currentTime))) {
                // console.log('THE GAME HAS NOT STARTED')
                thisPickValue = 0
              } 
            } 
            points = points + thisPickValue
          }
          return { index: i, value: user.wins.length, line: points, username: user.username }
        })
        // console.log('PLACED USERS: ', placedUsers)
        placedUsers.sort(function(a, b) {
            if (a.value > b.value) {
                return -1;
            } else if (a.value < b.value) {
                return 1;
            } else if (a.value === b.value) {
              // console.log('WE HAVE A TIE')
              if (a.line > b.line) {
                // console.log('THIS IS THE HIGHER SEED: ', b)
                return -1
              }
              if (a.line < b.line) {
                // console.log('THIS IS THE HIGHER SEED: ', b)
                return 1
              }
            } return 0;
        })
        // let leaders = placedUsers.map(function(user) {
        //     newUsers[user.index].points = placedUsers[user.index].line
        //     return newUsers[user.index]
        // })
        // console.log('LEADERS: ', leaders)
        // console.log('PLACED USERS: ', placedUsers)
        this.setState({ leaders: placedUsers })

        // console.log('NEW LEADERBOARD: ', placedUsers)
        
      }

    findRecentPicks = () => {
      let userPicks = this.state.activeUserPicks
      // console.log('USER PICKS: ', userPicks)
      // console.log('PREV PICKS: ', this.state.activeUserPrevPicks)
      // console.log('USER WINS: ', this.state.activeUserWins)
      let sortedPicks = userPicks.sort(function(a, b) {
        if (a.gameWeek < b.gameWeek) {
          return -1;
        }
        if (a.gameWeek > b.gameWeek) {
          return 1;
        }
        return 0;
      })
      // console.log('SORTED PICKS: ', sortedPicks)
      // console.log('THIS WEEK: ', this.props.thisWeek)
      let todaysPickFunc = (userPicks) => {
        return userPicks.gameWeek === this.props.thisWeek
      }

      let prevPicksFunc = (userPrevPicks) => {
        return userPrevPicks.gameWeek < this.props.thisWeek
      }
      let todaysUserPick = 'NO PICK'
      let userPick = sortedPicks.filter(todaysPickFunc)
      if (userPick[0]) {
        todaysUserPick = userPick[0].team
      } 

      let prevPicks = sortedPicks.filter(prevPicksFunc)
      // console.log('SORTED ARRAY: ', sortedPicks)
      // console.log('ONLY PICKS BEFORE TODAY: ', prevPicks)

      this.setState({
          todaysPick: todaysUserPick,
          prevPicks: prevPicks,
          activeUserPrevPicks: prevPicks,
        })
      
      }

    changeLogo = () => {
        let wins = this.state.activeUserWins
        let nflTeams = [
          { teamName: 'Arizona Cardinals', teamAlias: 'ari', logo: 'ari2', status: 'secondary', valueWeek: 0, value: 0, tier: 0, homeGames: [], awayGames: [], division: 'NFC West' },
            { teamName: 'Atlanta Falcons', teamAlias: 'atl', logo: 'atl3', status: 'secondary', valueWeek: 0, value: 0, tier: 0, homeGames: [], awayGames: [], division: 'NFC South' },
            { teamName: 'Baltimore Ravens', teamAlias: 'bal', logo: 'bal2', status: 'secondary', valueWeek: 0, value: 0, tier: 0, homeGames: [], awayGames: [], division: 'AFC North' },
            { teamName: 'Buffalo Bills', teamAlias: 'buf', logo: 'buf', status: 'secondary', valueWeek: 0, value: 0, tier: 0, homeGames: [], awayGames: [], division: 'AFC East' },
            { teamName: 'Carolina Panthers', teamAlias: 'car', logo: 'car', status: 'secondary', valueWeek: 0, value: 0, tier: 0, homeGames: [], awayGames: [], division: 'NFC South' },
            { teamName: 'Chicago Bears', teamAlias: 'chi', logo: 'chi2', status: 'secondary', valueWeek: 0, value: 0, tier: 0, homeGames: [], awayGames: [], division: 'NFC North' },
            { teamName: 'Cincinnati Bengals', teamAlias: 'cin', logo: 'cin', status: 'secondary', valueWeek: 0, value: 0, tier: 0, homeGames: [], awayGames: [], division: 'AFC North' },
            { teamName: 'Cleveland Browns', teamAlias: 'cle', logo: 'cle3', status: 'secondary', valueWeek: 0, value: 0, tier: 0, homeGames: [], awayGames: [], division: 'AFC North' },
            { teamName: 'Dallas Cowboys', teamAlias: 'dal', logo: 'dal2', status: 'secondary', valueWeek: 0, value: 0, tier: 0, homeGames: [], awayGames: [], division: 'NFC East' },
            { teamName: 'Denver Broncos', teamAlias: 'den', logo: 'den', status: 'secondary', valueWeek: 0, value: 0, tier: 0, homeGames: [], awayGames: [], division: 'AFC West' },
            { teamName: 'Detroit Lions', teamAlias: 'det', logo: 'det3', status: 'secondary', valueWeek: 0, value: 0, tier: 0, homeGames: [], awayGames: [], division: 'NFC North' },
            { teamName: 'Green Bay Packers', teamAlias: 'gb', logo: 'gb', status: 'secondary', valueWeek: 0, value: 0, tier: 0, homeGames: [], awayGames: [], division: 'NFC North' },
            { teamName: 'Houston Texans', teamAlias: 'hou', logo: 'hou2', status: 'secondary', valueWeek: 0, value: 0, tier: 0, homeGames: [], awayGames: [], division: 'AFC South' },
            { teamName: 'Indianapolis Colts', teamAlias: 'ind', logo: 'ind2', status: 'secondary', valueWeek: 0, value: 0, tier: 0, homeGames: [], awayGames: [], division: 'AFC South' },
            { teamName: 'Jacksonville Jaguars', teamAlias: 'jac', logo: 'jac', status: 'secondary', valueWeek: 0, value: 0, tier: 0, homeGames: [], awayGames: [], division: 'AFC South' },
            { teamName: 'Kansas City Chiefs', teamAlias: 'kc', logo: 'kc', status: 'secondary', valueWeek: 0, value: 0, tier: 0, homeGames: [], awayGames: [], division: 'AFC West' },
            { teamName: 'Los Angeles Chargers', teamAlias: 'lac', logo: 'lac2', status: 'secondary', valueWeek: 0, value: 0, tier: 0, homeGames: [], awayGames: [], division: 'AFC West' },
            { teamName: 'Los Angeles Rams', teamAlias: 'la', logo: 'la', status: 'secondary', valueWeek: 0, value: 0, tier: 0, homeGames: [], awayGames: [], division: 'NFC West' },
            { teamName: 'Miami Dolphins', teamAlias: 'mia', logo: 'mia2', status: 'secondary', valueWeek: 0, value: 0, tier: 0, homeGames: [], awayGames: [], division: 'AFC East' },
            { teamName: 'Minnesota Vikings', teamAlias: 'min', logo: 'min2', status: 'secondary', valueWeek: 0, value: 0, tier: 0, homeGames: [], awayGames: [], division: 'NFC North' },
            { teamName: 'New England Patriots', teamAlias: 'ne', logo: 'ne', status: 'secondary', valueWeek: 0, value: 0, tier: 0, homeGames: [], awayGames: [], division: 'AFC East' },
            { teamName: 'New Orleans Saints', teamAlias: 'no', logo: 'no', status: 'secondary', valueWeek: 0, value: 0, tier: 0, homeGames: [], awayGames: [], division: 'NFC South' },
            { teamName: 'New York Giants', teamAlias: 'nyg', logo: 'nyg', status: 'secondary', valueWeek: 0, value: 0, tier: 0, homeGames: [], awayGames: [], division: 'NFC East' },
            { teamName: 'New York Jets', teamAlias: 'nyj', logo: 'nyj', status: 'secondary', valueWeek: 0, value: 0, tier: 0, homeGames: [], awayGames: [], division: 'AFC East' },
            { teamName: 'Oakland Raiders', teamAlias: 'oak', logo: 'oak', status: 'secondary', valueWeek: 0, value: 0, tier: 0, homeGames: [], awayGames: [], division: 'AFC West' },
            { teamName: 'Philadelphia Eagles', teamAlias: 'phi', logo: 'phi', status: 'secondary', valueWeek: 0, value: 0, tier: 0, homeGames: [], awayGames: [], division: 'NFC East' },
            { teamName: 'Pittsburgh Steelers', teamAlias: 'pit', logo: 'pit', status: 'secondary', valueWeek: 0, value: 0, tier: 0, homeGames: [], awayGames: [], division: 'AFC North' },
            { teamName: 'Seattle Seahawks', teamAlias: 'sea', logo: 'sea', status: 'secondary', valueWeek: 0, value: 0, tier: 0, homeGames: [], awayGames: [], division: 'NFC West' },
            { teamName: 'San Francisco 49ers', teamAlias: 'sf', logo: 'sf', status: 'secondary', valueWeek: 0, value: 0, tier: 0, homeGames: [], awayGames: [], division: 'NFC West' },
            { teamName: 'Tampa Bay Buccaneers', teamAlias: 'tb', logo: 'tb', status: 'secondary', valueWeek: 0, value: 0, tier: 0, homeGames: [], awayGames: [], division: 'NFC South' },
            { teamName: 'Tennessee Titans', teamAlias: 'ten', logo: 'ten', status: 'secondary', valueWeek: 0, value: 0, tier: 0, homeGames: [], awayGames: [], division: 'AFC South' },
            { teamName: 'Washington Redskins', teamAlias: 'was', logo: 'was2', status: 'secondary', valueWeek: 0, value: 0, tier: 0, homeGames: [], awayGames: [], division: 'NFC East' }
        ]
        let allPicks = this.state.activeUserPicks
        let thisTeam = ''
        //let matchedTeams = []
        let theseMatchingWins = []
        let allTeams = JSON.parse(JSON.stringify(nflTeams))

        let todaysPickFunc = (picks) => {
          return picks.gameDate === moment().format('YYYY-MM-DD')
        }
        let todaysPickObj = allPicks.filter(todaysPickFunc)
        let todaysPick = ''
        if (todaysPickObj[0]) {
          todaysPick = todaysPickObj[0].team
          //console.log('TODAYS PICK: ', todaysPick)
        }

        // FIND TODAYS PICK
        let matchingTeams = (theTeams) => {
          return theTeams.teamName.trim() === todaysPick.trim()
        }

        // FIND MATCHING WINS
        let matchingWins = (winningTeams) => {
          return winningTeams.win.trim() === thisTeam.trim()
        }

        for (var j=0; j<allTeams.length; j++) {
          // console.log('CURRENT WINS: ', wins)
          let thisTeamName = allTeams[j].teamName
          // console.log('this team: ', thisTeam)
          
          thisTeam = thisTeamName

          let teamMatched = allTeams.filter(matchingTeams)
          if (teamMatched[0] && (this.state.timeDiff <= 0)) {
            if (teamMatched[0].teamName.trim() === allTeams[j].teamName.trim()) {
              // console.log('WE HAVE A PICK FOR TODAY: ', teamMatched[0].teamName)
              allTeams[j].status = 'warning'
            } 
          }

          theseMatchingWins = wins.filter(matchingWins)
          // console.log('THIS TEAM: ', thisTeam)
          if (theseMatchingWins[0]) {
            // console.log('THESE MATCHING WINS: ' , theseMatchingWins[0])
            allTeams[j].status = 'success'
          } 
          
          this.setState({
              nflTeams: allTeams,
              todaysPick: teamMatched
          })

          this.handlePreloader()
          // console.log('NEW TEAMS ARRAY: ', this.state.challengeData.teams)

        }
        
      }

    handleClick = e => {
      // let self = this
      let _this = this
      let user = e.target
      let player = user.textContent
      let allUsers = this.state.challengeData.users
      // console.log('ALL USERs: ', allUsers)
      if (isNaN(player)) {
        let thisPlayer = []
        this.handlePreloader()
        // console.log('THIS IS NOT A NUMBER') 
        // console.log('Player page: ', player)
        // console.log('ALL PLAYERS: ', allUsers)
        let thisPlayerFunc = (players) => {
          return players.username === player
        }
        let thisPlayerObj = allUsers.filter(thisPlayerFunc)
        
        // console.log('THIS PLAYER: ', thisPlayerObj[0])
        thisPlayer.push(thisPlayerObj[0])

        // let player = thisPlayer[0]

        let points = 0
        let pickCount = 0
        for (let p=0; p<thisPlayer[0].picks.length; p++) {
          pickCount++
          let thisPickValue = thisPlayer[0].picks[p].teamValue
          if (pickCount === thisPlayer[0].picks.length) {
            // console.log('PICK GAME TIME: ', user.picks[h].gameTime)
            let gameTime = thisPlayer[0].picks[p].gameTime
            let currentTime = moment().format()
            // console.log('game time: ', gameTime)
            // console.log('current time: ', currentTime)
            if (moment(gameTime).isAfter(moment(currentTime))) {
              // console.log('THE GAME HAS NOT STARTED')
              thisPickValue = 0
            } else {
              // console.log('THE GAME HAS STARTED')
              if (thisPlayer[0].picks[p].gameWeek === _this.props.thisWeek) {
                // console.log('HAVE THIS WEEKS PICK: ', thisPlayer[0].picks[h])
                _this.setState({
                  activeUserWeekPick: thisPlayer[0].picks[p].team,
                  activeUserPickValue: thisPlayer[0].picks[p].teamValue
                })
              }
            }
          } 
          points = points + thisPickValue
        }
      
        this.setState({
          activeUser: thisPlayer[0],
          activeUserUsername: thisPlayer[0].username,
          activeUserWins: thisPlayer[0].wins,
          activeUserLine: points,
          activeUserPicks: thisPlayer[0].picks
        }, () => {
          this.getUser()
        })
        
        } else {
          return
        }
      }

    getFirstGame = () => {
      let now = moment().format()
      let date = moment(now).format('YYYY-MM-DD')

      // GET GAME SCHEDULE FOR TODAY AND FIND FIRST GAME
      API.getNbaGamesByDate(date)
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
          this.setState({
            firstGameTime: firstGameTimeAdj
          })
          this.createTimer(timeDiff)
        })
        .catch(err => console.log(err))
      
      }

    createTimer = (timeDiff) => {
      // console.log('Time until first game: ', timeDiff)
      let seconds = moment.duration(timeDiff).asSeconds() * 1000
      //console.log('In seconds milliseconds: ', seconds)
      this.setState({ timeDiff: seconds })
      }

    render() {
        let uuidv4 = require('uuid/v4')
        // let startDate = this.state.challengeStartDate
        let record = (this.state.activeUserPrevPicks.length - this.state.activeUserWins.length)
        let leaderStyle = {
            overflow: 'scroll'
        }
        let modalStyle = {
          backgroundColor: 'gold',
          color: 'darkblue'
        }       
        let hoverStyle
        if (this.state.hover) {
          hoverStyle = {
            backgroundColor: 'gold !important',
            color: 'darkblue !important'
            }
          }
        let userPicks = this.state.activeUserPrevPicks
        let username = this.state.activeUserUsername

        return(
          <div className='leaderboard nflLeaderboard'>
            <LoadingOverlay
              active={this.state.isActive}
              spinner
              styles={{
                spinner: (base) => ({
                  ...base,
                  width: '100px',
                  '& svg circle': {
                    stroke: 'gold'
                  }
                })
              }}
              text='Loading user...'
              >
            </LoadingOverlay>
              <h2>NFL Division Leaderboard</h2>
                {/* {

                  moment(challengeStartDate).isBefore(moment(today)) ? 

                  <small></small>  

                  :

                  <small>*ALL POINTS WILL BE RESET ON {challengeStartDate}*</small>

                } */}
              <hr />
              <table className='leaderboardData table table-hover'>
                <thead>
                  <tr className='leaderboardHeader'>                
                    <th className='leaderboardHeader'>Place</th>
                    <th className='leaderboardHeader'>User</th>
                    <th className='leaderboardHeader'>Wins</th>
                    <th className='leaderboardHeader'>Locked Line</th>
                    {/* <th>Teams</th> */}
                  </tr>
                </thead>
                <tbody>
                
                {
                  this.state.leaders.map((leader, i) => (
                    
                    <tr key={uuidv4()} className='allRows'>
                      <td className='leaderRow' style={leaderStyle}>{i+1}</td>
                      <td className='leaderRow username' data-rh='Click to view user profile.' style={leaderStyle} onClick={this.handleClick}>{leader.username}</td>
                      <td className='leaderRow' style={leaderStyle}>{leader.value}</td>
                      <td className='leaderRow' style={leaderStyle}>{leader.line}</td>
                    
                      <Modal 
                        isOpen={this.state.modal} 
                        autoFocus={true}
                        centered={true}
                        size='lg'
                        className='playerModal'
                      >
                          <ModalHeader id='modalTitle'>
                            USER PROFILE ({username})
                          </ModalHeader>
                          <ModalBody id='modalBody' className='nextGames' style={modalStyle}>
                            <div className="row playerRow">
                              <Jumbotron className='playerJumbo'>
                                <Container fluid>
                                  <div className="display-4">
                                    <h2>{username}</h2> <hr />
                                    <h4 className="winsHeader winsHeaderModal">This Week's Pick</h4>
                                      <div className="userTimer">

                                        {
                                          (this.state.activeUserWeekPick === '') ? <p>User Selected Game Hasn't Begun</p> :

                                          <div>
                                            {this.state.activeUserWeekPick} ({this.state.activeUserPickValue})
                                          {/* <Countdown 
                                            date={Date.now() + this.state.timeDiff}
                                            zeroPadTime={2} 
                                            daysInHours={true} 
                                            renderer={this.timerRender}
                                            className='userTimer'
                                          >
                                            <EndTimer />
                                          </Countdown>  */}
                                          </div>
                                        }

                                      </div>
                                    <div className="row recordRow">
                                      <div className="col-md-3">
                                        <h4 className='winsHeader winsHeaderModal'>Users Locked Line</h4> {this.state.activeUserLine}
                                      </div>
                                      <div className="col-md-3">
                                        <h4 className='winsHeader winsHeaderModal'>Division's Won</h4> {this.state.activeUserWins.length} <small>/</small> 8
                                      </div> 
                                      <div className="col-md-3">
                                        <h4 className='winsHeader winsHeaderModal'>Record</h4> {this.state.activeUserWins.length} - {record}
                                      </div>  
                                    </div>  
                                  </div>
                                </Container>
                              </Jumbotron>
                              <span className='row recentPicks profilePicks'>
                                <div className="col-10">
                                  <table className='table table-hover'>
                                    <thead>
                                      <tr>
                                        <th>Week</th>
                                        <th>Pick</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                          
                                      {
                                        // userPicks[0] ? 
                                        
                                        userPicks.map((newRecentPick, i) => (
                                          <tr key={uuidv4()} style={hoverStyle} className={newRecentPick.result}>
                                            <td>{newRecentPick.gameWeek}</td>
                                            <td>{newRecentPick.team} { newRecentPick.teamValue ? '(' + newRecentPick.teamValue + ')' : '' }</td>
                                          </tr> 
                                          )
                                        )                                            

                                        // : <tr className='loss'>
                                        //     <td>--</td>
                                        //     <td>No Previous Picks</td>
                                        //   </tr>
                                        
                                      }
                                      
                                    </tbody>
                                  </table>
                                </div>
                                <div className="col-2 title">
                                  <h3>{username}'s Picks</h3>
                                </div>
                              </span>
                            </div>

                            <span className="col-md"> 
                             
                            </span>
                          </ModalBody>
                          <ModalFooter>
                            <Button color="secondary" onClick={this.toggleClose}>Close</Button>
                          </ModalFooter>
                
                        </Modal>

                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
        )
    }
}

export default NflDivisionLeaderboard