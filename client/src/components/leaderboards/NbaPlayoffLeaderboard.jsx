import React, { Component } from 'react'
import LoadingOverlay from 'react-loading-overlay';
import { Jumbotron, Container, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import API from '../../utils/API'
import '../../css/leaderboard.css'
import moment from 'moment-timezone'
import Countdown from 'react-countdown-now';
import $ from 'jquery'
import { mil, tor, phi, ind, bos, bkn, det, orl, gsw, den, hou, por, lac, okc, uta, sas } from '../../css/nbaLogos'

// import { Button, Jumbotron, Container, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
// import { ari, atl2, bal, bos2, chc, cws, cle2, cin, col, det2, mia2, hou2, kc, laa, lad, nym, nyy, mil2, min2, oak, pit, sd, sf, phi2, sea, stl, tb, tex, tor2, wsh } from '../../css/mlbLogos'

class NbaPlayoffLeaderboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
          challengeId: '',
          challengeData: {},
          currentUser: {},
          isActive: false,
          hover: false,
          allUsers: [],
          leaders: [],
          modal: false,
          activeUser: {},
          activeUserUsername: '',
          activeUserLosses: [],
          activeUserLossesCount: 0,
          activeUserPicks: [],
          activeUserPrevPicks: [],
          prevPicks: [],
          thisRecentPick: '',
          userWin: '',
          firstGameTime: '',
          todaysPick: 'No Pick',
          thisDate: '',
          userPlace: {},
          teams: [
            { name: 'Milwalkee Bucks', abbr: 'mil', logo: mil, status: 'secondary', conf: 'east', seed: '1' },
            { name: 'Toronto Raptors', abbr: 'tor', logo: tor, status: 'secondary', conf: 'east', seed: '2' },
            { name: 'Philadelphia 76ers', abbr: 'phi', logo: phi, status: 'secondary', conf: 'east', seed: '3' },
            { name: 'Boston Celtics', abbr: 'bos', logo: bos, status: 'secondary', conf: 'east', seed: '4' },
            { name: 'Indiana Pacers', abbr: 'ind', logo: ind, status: 'secondary', conf: 'east', seed: '5' },
            { name: 'Brooklyn Nets', abbr: 'bkn', logo: bkn, status: 'secondary', conf: 'east', seed: '6' },
            { name: 'Orlando Magic', abbr: 'orl', logo: orl, status: 'secondary', conf: 'east', seed: '7' },
            { name: 'Detroit Pistons', abbr: 'det', logo: det, status: 'secondary', conf: 'east', seed: '8' },
            { name: 'Golden State Warriors', abbr: 'gsw', logo: gsw, status: 'secondary', conf: 'west', seed: '1' },
            { name: 'Denver Nuggets', abbr: 'den', logo: den, status: 'secondary', conf: 'west', seed: '2' },
            { name: 'Portland Trail Blazers', abbr: 'por', logo: por, status: 'secondary', conf: 'west', seed: '3' },
            { name: 'Houston Rockets', abbr: 'hou', logo: hou, status: 'secondary', conf: 'west', seed: '4' },
            { name: 'Utah Jazz', abbr: 'uta', logo: uta, status: 'secondary', conf: 'west', seed: '5' },
            { name: 'Oklahoma City Thunder', abbr: 'okc', logo: okc, status: 'secondary', conf: 'west', seed: '6' },
            { name: 'San Antonio Spurs', abbr: 'sas', logo: sas, status: 'secondary', conf: 'west', seed: '7' },
            { name: 'Los Angeles Clippers', abbr: 'lac', logo: lac, status: 'secondary', conf: 'west', seed: '8' },
          ]
        }
        this.toggle = this.toggle.bind(this);
        // this.toggleHover = this.toggleHover.bind(this);
        this.handlePreloader = this.handlePreloader.bind(this);
        this.getUser = this.getUser.bind(this);
        this.getFirstGame = this.getFirstGame.bind(this);
        this.createTimer = this.createTimer.bind(this);
        this.findRecentPicks = this.findRecentPicks.bind(this);
        // this.changeLogo = this.changeLogo.bind(this);
        // this.loadLogo = this.loadLogo.bind(this);
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

    // toggleHover(e) {
    //   e.preventDefault()
    //   this.setState({hover: !this.state.hover})
    // }

    getChallengeData = () => {
      // console.log('CHALLENGE ID: ', localStorage.getItem('userChallengeId'))
      let self = this

      // TEMP CODE FOR ADMIN TESTING
      // let challengeId = '5c9ba1f709237528c630baa8'

      let challengeId = localStorage.getItem('userChallengeId')
      this.setState({
        challengeId: challengeId
      })
      API.getChallenge(challengeId)
        .then(res => {
          // console.log(res)
          self.setState({
            challengeData: res.data[0],
            allUsers: res.data[0].users,
            // teams: res.data[0].teams
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
        losses: thisUser[0].wins,
        lossesCount: thisUser[0].wins.length,
        myPicks: thisUser[0].picks,
      })

      this.createLeaderboard()
      // console.log('CURRENT USER: ', this.state.currentUser)
      // console.log('CHAL USERS DATA: ', this.state.challengeData.users)
      }

    getUser = () => {
      // console.log('ACTIVE USER: ', this.state.activeUser)
      this.findRecentPicks()
      // this.changeLogo()
      this.toggle()
      
      }

    createLeaderboard = () => {
        let users = this.state.challengeData.users
        // console.log('Create leaderboard with this data: ', users)
        let placedUsers = users.map(function(el, i) {
            return { index: i, value: el.wins.length }
        })
        // console.log('PLACED USERS: ', placedUsers)
        placedUsers.sort(function(a, b) {
            if (a.value < b.value) {
                return -1;
            }
            if (a.value > b.value) {
                return 1;
            }
            return 0;
        })
        let leaders = placedUsers.map(function(el) {
            return users[el.index]
        })
        // console.log('LEADERS: ', leaders)
        this.setState({ leaders: leaders })

        // console.log('NEW LEADERBOARD: ', this.state.allUsers)
        
      }

      findRecentPicks = () => {
        let userPicks = this.state.activeUserPicks
        console.log('USER USER USER PICKS: ', userPicks)
        let sortedPicks = userPicks.sort(function(a, b) {
            if (moment(a.gameDate).isBefore(moment(b.gameDate))) {
                return -1;
            }
            if (moment(a.gameDate).isAfter(moment(b.gameDate))) {
                return 1;
            }
            return 0;
          })
  
        let todaysPickFunc = (userPicks) => {
          return(moment(userPicks.gameDate).isSame(moment().format('YYYY-MM-DD')))
        }
  
        let prevPicksFunc = (userPrevPicks) => {
          return (moment(userPrevPicks.gameDate).isBefore(moment().format('YYYY-MM-DD')))
        }
        let todaysUserPick = 'NO PICK'
        let userPick = sortedPicks.filter(todaysPickFunc)
        
        if (userPick[0]) {
          console.log('GOTTA PICK', userPick)
          todaysUserPick = userPick[0].team
        } else (console.log('nada here brudda'))
  
        let prevPicks = sortedPicks.filter(prevPicksFunc)
        // console.log('SORTED ARRAY: ', sortedPicks)
        // console.log('ONLY PICKS BEFORE TODAY: ', prevPicks)
        console.log('TODAYS USER PICK: ', todaysUserPick)
        this.setState({
            todaysPick: todaysUserPick,
            prevPicks: prevPicks,
            activeUserPrevPicks: prevPicks,
          })
        
        }


        // changeLogo = () => {
        //   let wins = this.state.activeUserWins
        //   let teams = [
        //     { name: 'Milwalkee Bucks', abbr: 'mil', logo: mil, status: 'secondary', conf: 'east', seed: '1' },
        //     { name: 'Toronto Raptors', abbr: 'tor', logo: tor, status: 'secondary', conf: 'east', seed: '2' },
        //     { name: 'Philadelphia 76ers', abbr: 'phi', logo: phi, status: 'secondary', conf: 'east', seed: '3' },
        //     { name: 'Boston Celtics', abbr: 'bos', logo: bos, status: 'secondary', conf: 'east', seed: '4' },
        //     { name: 'Indiana Pacers', abbr: 'ind', logo: ind, status: 'secondary', conf: 'east', seed: '5' },
        //     { name: 'Brooklyn Nets', abbr: 'bkn', logo: bkn, status: 'secondary', conf: 'east', seed: '6' },
        //     { name: 'Orlando Magic', abbr: 'orl', logo: orl, status: 'secondary', conf: 'east', seed: '7' },
        //     { name: 'Detroit Pistons', abbr: 'det', logo: det, status: 'secondary', conf: 'east', seed: '8' },
        //     { name: 'Golden State Warriors', abbr: 'gsw', logo: gsw, status: 'secondary', conf: 'west', seed: '1' },
        //     { name: 'Denver Nuggets', abbr: 'den', logo: den, status: 'secondary', conf: 'west', seed: '2' },
        //     { name: 'Portland Trail Blazers', abbr: 'por', logo: por, status: 'secondary', conf: 'west', seed: '3' },
        //     { name: 'Houston Rockets', abbr: 'hou', logo: hou, status: 'secondary', conf: 'west', seed: '4' },
        //     { name: 'Utah Jazz', abbr: 'uta', logo: uta, status: 'secondary', conf: 'west', seed: '5' },
        //     { name: 'Oklahoma City Thunder', abbr: 'okc', logo: okc, status: 'secondary', conf: 'west', seed: '6' },
        //     { name: 'San Antonio Spurs', abbr: 'sas', logo: sas, status: 'secondary', conf: 'west', seed: '7' },
        //     { name: 'Los Angeles Clippers', abbr: 'lac', logo: lac, status: 'secondary', conf: 'west', seed: '8' },
        //   ]
        //   let allPicks = this.state.activeUserPicks
        //   let thisTeam = ''
        //   //let matchedTeams = []
        //   let theseMatchingWins = []
        //   let allTeams = JSON.parse(JSON.stringify(teams))
  
        //   let todaysPickFunc = (picks) => {
        //     return picks.gameDate === moment().format('YYYY-MM-DD')
        //   }
        //   let todaysPickObj = allPicks.filter(todaysPickFunc)
        //   let todaysPick = ''
        //   if (todaysPickObj[0]) {
        //     todaysPick = todaysPickObj[0].team
        //     //console.log('TODAYS PICK: ', todaysPick)
        //   }
  
        //   // FIND TODAYS PICK
        //   let matchingTeams = (theTeams) => {
        //     return theTeams.name.trim() === todaysPick.trim()
        //   }
  
        //   // FIND MATCHING WINS
        //   let matchingWins = (winningTeams) => {
        //     return winningTeams.win.trim() === thisTeam.trim()
        //   }
  
        //   for (var j=0; j<allTeams.length; j++) {
        //     console.log('CURRENT WINS: ', wins)
        //     let thisTeamName = allTeams[j].name
        //     console.log('this team: ', thisTeam)
            
        //     thisTeam = thisTeamName
  
        //     let teamMatched = allTeams.filter(matchingTeams)
        //     if (teamMatched[0] && (this.state.timeDiff <= 0)) {
        //       if (teamMatched[0].name.trim() === allTeams[j].name.trim()) {
        //         // console.log('WE HAVE A PICK FOR TODAY: ', teamMatched[0].name)
        //         allTeams[j].status = 'warning'
        //       } 
        //     }
  
        //     theseMatchingWins = wins.filter(matchingWins)
        //     console.log('THIS TEAM: ', thisTeam)
        //     if (theseMatchingWins[0]) {
        //       console.log('THESE MATCHING WINS: ' , theseMatchingWins[0])
        //       allTeams[j].status = 'success'
        //     } 
            
        //     this.setState({
        //         teams: allTeams,
        //         todaysPick: teamMatched
        //     })
  
        //     this.handlePreloader()
        //     // console.log('NEW TEAMS ARRAY: ', this.state.challengeData.teams)
  
        //   }
          
        // }

      // loadLogo = (team) => {
      //   switch (true) {
      //     case (team === 'bkn'):
      //       return bkn;
            
      //     case (team === 'bos'):
      //       return bos;
            
      //     case (team === 'den'):
      //       return den;
             
      //     case (team === 'det'):
      //       return det;
             
      //     case (team === 'gsw'):
      //       return gsw;
             
      //     case (team === 'hou'):
      //       return hou;
             
      //     case (team === 'ind'):
      //       return ind;
             
      //     case (team === 'lac'):
      //       return lac;
             
      //     case (team === 'orl'):
      //       return orl;
          
      //     case (team === 'mil'):
      //       return mil;
             
      //     case (team === 'okc'):
      //       return okc;
             
      //     case (team === 'phi'):
      //       return phi;
             
      //     case (team === 'por'):
      //       return por;
             
      //     case (team === 'sas'):
      //       return sas;
             
      //     case (team === 'tor'):
      //       return tor;
             
      //     case (team === 'uta'):
      //       return uta;
             
      //     default:
      //       return uta;
      //     }  
  
      //   }

    // changeLogo = () => {
    //   this.setState({
    //     teams: [
    //       { name: 'Milwalkee Bucks', abbr: 'mil', logo: mil, status: 'secondary', conf: 'east', seed: '1' },
    //       { name: 'Toronto Raptors', abbr: 'tor', logo: tor, status: 'secondary', conf: 'east', seed: '2' },
    //       { name: 'Philadelphia 76ers', abbr: 'phi', logo: phi, status: 'secondary', conf: 'east', seed: '3' },
    //       { name: 'Boston Celtics', abbr: 'bos', logo: bos, status: 'secondary', conf: 'east', seed: '4' },
    //       { name: 'Indiana Pacers', abbr: 'ind', logo: ind, status: 'secondary', conf: 'east', seed: '5' },
    //       { name: 'Brooklyn Nets', abbr: 'bkn', logo: bkn, status: 'secondary', conf: 'east', seed: '6' },
    //       { name: 'Orlando Magic', abbr: 'orl', logo: orl, status: 'secondary', conf: 'east', seed: '7' },
    //       { name: 'Detroit Pistons', abbr: 'det', logo: det, status: 'secondary', conf: 'east', seed: '8' },
    //       { name: 'Golden State Warriors', abbr: 'gsw', logo: gsw, status: 'secondary', conf: 'west', seed: '1' },
    //       { name: 'Denver Nuggets', abbr: 'den', logo: den, status: 'secondary', conf: 'west', seed: '2' },
    //       { name: 'Portland Trail Blazers', abbr: 'por', logo: por, status: 'secondary', conf: 'west', seed: '3' },
    //       { name: 'Houston Rockets', abbr: 'hou', logo: hou, status: 'secondary', conf: 'west', seed: '4' },
    //       { name: 'Utah Jazz', abbr: 'uta', logo: uta, status: 'secondary', conf: 'west', seed: '5' },
    //       { name: 'Oklahoma City Thunder', abbr: 'okc', logo: okc, status: 'secondary', conf: 'west', seed: '6' },
    //       { name: 'San Antonio Spurs', abbr: 'sas', logo: sas, status: 'secondary', conf: 'west', seed: '7' },
    //       { name: 'Los Angeles Clippers', abbr: 'lac', logo: lac, status: 'secondary', conf: 'west', seed: '8' },
    //     ]
    //   })
    //   let wins = this.state.activeUserWins
    //   let teams = JSON.parse(JSON.stringify(this.state.teams))
    //   // console.log('THIS USERS WINS: ', wins)
    //   // let thisWin = (theWins) => {
    //   //   return theWins.team === this.state.userWin
    //   // }
    //     for (var j=0; j<wins.length; j++) {
    //       this.setState({
    //         userWin: wins[j].win.trim()
    //       })

    //       //let newWin = teams.filter(thisWin)

    //       // if (newWin[0]) {
    //       //   let thisUserWin = newWin[0].team
    //       // }

    //       for (var y=0; y<teams.length; y++) {
    //         if (teams[y].name.trim() === wins[j].win.trim()) {
    //           teams[y].status = 'success'
    //         }
    //       }

    //       this.setState({
    //           teams: teams
    //       })
    //       // console.log('NEW TEAMS ARRAY: ', this.state.teams)
    //     }
    //     //debugger;
    //     this.handlePreloader()
    //   }

    handleClick = e => {
      // let self = this
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
        this.setState({
          activeUser: thisPlayer[0],
          activeUserUsername: thisPlayer[0].username,
          activeUserLosses: thisPlayer[0].wins,
          activeUserLossesCount: thisPlayer[0].wins.length,
          activeUserPicks: thisPlayer[0].picks
        }, () => {
          this.getUser()
          // this.findRecentPicks()
          this.handlePreloader()
        })
        
        
        // this.changeLogo()
        // self.toggle()
        // API.getUser(player)
        //   .then(res => {
        //     let thisUser = {
        //       username: res.data[0].username,
        //       wins: res.data[0].wins,
        //       lossesCount: res.data[0].wins.length,
        //       picks: res.data[0].picks
        //     }
        //     console.log('THIS USER: ', thisUser)
        //     this.setState({
        //       activeUser: thisUser
        //     })
        //     self.findRecentPicks()
        //     self.changeLogo()
        //   })
        //   .catch(err => console.log(err))
        } else {
          return
        }
      }

    getFirstGame = () => {
      let now = moment().format()
      let date = moment(now).format('YYYY-MM-DD')

      // GET GAME SCHEDULE FOR TODAY AND FIND FIRST GAME
      API.getNbaPlayoffGamesByDate(date)
        .then (res => {
          let games = res.data
          let sortedGames = games.sort((a,b) => new moment(a.gameTime) - new moment (b.gameTime))

          // CHECK TO SEE IF THERE ARE NO GAMES TODAY
          if (!sortedGames[0]) {
            console.log('THERE MUST BE NO GAMES TODAY')
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
      console.log('Time until first game: ', timeDiff)
      let seconds = moment.duration(timeDiff).asSeconds() * 1000
      //console.log('In seconds milliseconds: ', seconds)
      this.setState({ timeDiff: seconds })
      }

    render() {
      let uuidv4 = require('uuid/v4')
      let record = (this.state.activeUserPrevPicks.length + ' - ' + this.state.activeUserLossesCount)
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
      let timerDiff = this.state.timeDiff
      let todaysPick = (this.state.todaysPick !== 'No Pick' ? this.state.todaysPick : 'No Pick' )
      console.log('THIS USERS PICK TODAY: ', this.state.todaysPick)
      // let timerEnded = false;
      let EndTimer = () => {
        // timerEnded = true
        // console.log('TODAYS PICK: ', todaysPick)
        return (
          <span>{todaysPick}</span>
        )
        }

        return(
          <div className='leaderboard'>
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
              <h2>Leaderboard</h2>
              <hr />
              <table className='leaderboardData table table-hover'>
                <thead>
                  <tr className='leaderboardHeader'>
                    <th className='leaderboardHeader'>Place</th>
                    <th className='leaderboardHeader'>User</th>
                    <th className='leaderboardHeader'>Strikes</th>
                    {/* <th>Teams</th> */}
                  </tr>
                </thead>
                <tbody>
                
                {
                  this.state.leaders.map((leader, i) => (
                    
                    <tr key={uuidv4()} className='allRows'>
                      <td className='leaderRow' style={leaderStyle}>{i+1}</td>
                      <td className='leaderRow username' style={leaderStyle} onClick={this.handleClick}>{leader.username}</td>
                      <td className='leaderRow' style={leaderStyle}>{leader.wins.length}</td>
                    
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
                                    <h4 className="winsHeader">Today's Pick</h4>
                                      <div className="userTimer">

                                        {
                                          (!timerDiff) ? <p>No Games Today</p> :

                                          <Countdown 
                                            date={Date.now() + this.state.timeDiff}
                                            zeroPadTime={2} 
                                            daysInHours={true} 
                                            renderer={this.timerRender}
                                            className='userTimer'
                                          >
                                            <EndTimer />
                                          </Countdown> 
                                        }

                                      </div>
                                    <div className="row recordRow">
                                      <div className="col-md-3">
                                        <h4 className='winsHeader'>Strikes</h4> {this.state.activeUserLossesCount}
                                      </div>
                                      <div className="col-md-3">
                                        <h4 className='winsHeader'>Record</h4> {record}
                                      </div>  
                                      {/* <div className="col-md-3">
                                        <h4 className='wins'>Place</h4> {this.state.activeUserWins.length}
                                      </div>   */}
                                    </div>  
                                  </div>
                                </Container>
                              </Jumbotron>
                              <span className='row recentPicks profilePicks'>
                                <div className="col-10">
                                  <table className='table table-hover'>
                                    <thead>
                                      <tr>
                                        <th>Date</th>
                                        <th>Pick</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                          
                                      {
                                        userPicks[0] ? 
                                        
                                        userPicks.map((newRecentPick, i) => (
                                          <tr key={uuidv4()} style={hoverStyle} className={newRecentPick.result}>
                                            <td>{moment(newRecentPick.gameDate).format('MM-DD')}</td>
                                            <td>{newRecentPick.team}</td>
                                          </tr> 
                                          )
                                        )                                            

                                        : <tr className='loss'>
                                            <td>--</td>
                                            <td>No Previous Picks</td>
                                          </tr>
                                        
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
                              {/* <div className="row teamLogos">
                                
                                {
                                  this.state.teams.map((team, i) => (
                                  
                                    <Button 
                                      key={uuidv4()}
                                      onClick={this.findTeamGames}
                                      color={team.status} 
                                      className='teamButton'
                                      data={team.abbr}
                                    >
                                      <img
                                        className='profLogo'
                                        src={this.loadLogo(team.abbr)}
                                        alt={team.abbr}
                                        fluid='true'
                                      />
                                      <br />
                                      {team.abbr.toUpperCase()}
                                    </Button>
                            
                                  ))
                                }
                                
                              </div> */}
                            </span>
                          </ModalBody>
                          <ModalFooter>
                            <Button color="secondary" onClick={this.toggle}>Close</Button>
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

export default NbaPlayoffLeaderboard