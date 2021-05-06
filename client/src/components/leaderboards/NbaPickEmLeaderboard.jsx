import React, { Component } from 'react'
import LoadingOverlay from 'react-loading-overlay';
import { Jumbotron, Container, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import API from '../../utils/API'
import '../../css/leaderboard.css'
import moment from 'moment-timezone'
import Countdown from 'react-countdown';
import $ from 'jquery'
import { atl, bkn, bos, cha, chi, cle, dal, den, det, gsw, hou, ind, lac, lal, mem, mia, mil, min, nop, nyk, okc, orl, phi, phx, por, sac, sas, tor, uta, was } from '../../css/nbaLogos'

class NbaPickEmLeaderboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
          challengeId: '',
          challengeData: {},
          challengeUsers: [],
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
          activeUserWinsCount: 0,
          activeUserPicks: [],
          activeUserPrevPicks: [],
          prevPicks: [],
          thisRecentPick: '',
          userWin: '',
          firstGameTime: '',
          todaysPick: 'No Pick',
          thisDate: '',
          userPlace: {},
          timeDiff: '',
          teams: [
            { name: 'Atlanta Hawks', abbr: 'atl', logo: atl, status: 'secondary' },
            { name: 'Brooklyn Nets', abbr: 'bkn', logo: bkn, status: 'secondary' },
            { name: 'Boston Celtics', abbr: 'bos', logo: bos, status: 'secondary' },
            { name: 'Charlotte Hornets', abbr: 'cha', logo: cha, status: 'secondary' },
            { name: 'Chicago Bulls', abbr: 'chi', logo: chi, status: 'secondary' },
            { name: 'Cleveland Cavaliers', abbr: 'cle', logo: cle, status: 'secondary' },
            { name: 'Dallas Mavericks', abbr: 'dal', logo: dal, status: 'secondary' },
            { name: 'Denver Nuggets', abbr: 'den', logo: den, status: 'secondary' },
            { name: 'Detroit Pistons', abbr: 'det', logo: det, status: 'secondary' },
            { name: 'Golden State Warriors', abbr: 'gsw', logo: gsw, status: 'secondary' },
            { name: 'Houston Rockets', abbr: 'hou', logo: hou, status: 'secondary' },
            { name: 'Indiana Pacers', abbr: 'ind', logo: ind, status: 'secondary' },
            { name: 'Los Angeles Clippers', abbr: 'lac', logo: lac, status: 'secondary' },
            { name: 'Los Angeles Lakers', abbr: 'lal', logo: lal, status: 'secondary' },
            { name: 'Memphis Grizzlies', abbr: 'mem', logo: mem, status: 'secondary' },
            { name: 'Miami Heat', abbr: 'mia', logo: mia, status: 'secondary' },
            { name: 'Milwalkee Bucks', abbr: 'mil', logo: mil, status: 'secondary' },
            { name: 'Minnesota Timberwolves', abbr: 'min', logo: min, status: 'secondary' },
            { name: 'New Orleans Pelicans', abbr: 'nop', logo: nop, status: 'secondary' },
            { name: 'New York Knicks', abbr: 'nyk', logo: nyk, status: 'secondary' },
            { name: 'Oklahoma City Thunder', abbr: 'okc', logo: okc, status: 'secondary' },
            { name: 'Orlando Magic', abbr: 'orl', logo: orl, status: 'secondary' },
            { name: 'Philadelphia 76ers', abbr: 'phi', logo: phi, status: 'secondary' },
            { name: 'Pheonix Suns', abbr: 'phx', logo: phx, status: 'secondary' },
            { name: 'Portland Trail Blazers', abbr: 'por', logo: por, status: 'secondary' },
            { name: 'Sacramento Kings', abbr: 'sac', logo: sac, status: 'secondary' },
            { name: 'San Antonio Spurs', abbr: 'sas', logo: sas, status: 'secondary' },
            { name: 'Toronto Raptors', abbr: 'tor', logo: tor, status: 'secondary' },
            { name: 'Utah Jazz', abbr: 'uta', logo: uta, status: 'secondary' },
            { name: 'Washington Wizards', abbr: 'was', logo: was, status: 'secondary' }
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
        this.findChallengeUsers = this.findChallengeUsers.bind(this);
    }
    componentDidMount() {
        this.getChallengeData()
        this.getFirstGame()
        this.findChallengeUsers()
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
        this.getFirstGame()
      }

    findChallengeUsers = () => {
      let challengeId = localStorage.getItem('userChallengeId')
      // console.log('CHALLENGE ID: ', challengeId)
      API.findUsersByChallengeId(challengeId)
          .then(res => {
            // console.log('found challenge users: ', res.data)     
            this.setState({
              allUsers: res.data
            }, () => {
              this.getUserData()
            })     
          })
          .catch(err => {
            console.log(err)
          })
      }

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
            challengeStartDate: res.data[0].startDate,
            // allUsers: res.data[0].users,
            // teams: res.data[0].teams
          })
          // self.getUserData()
  
        })
        .catch(err => console.log(err))
      }

    getUserData = () => {
        let localUser = localStorage.getItem('user')
        let challengeId = localStorage.getItem('userChallengeId')
        let chalUsers = this.state.allUsers
        console.log('ALL USERS: ', chalUsers)

        // FILTER OUT THIS USER AND SET STATE
        let chalFilter = (challengers) => {
          return challengers.username === localUser
        }
        let thisUser = chalUsers.filter(chalFilter)
        
        let filterWins = (picks) => {
          return picks.result === 'win' && picks.challengeId === challengeId
        }
        let filteredWins = thisUser[0]?.picks?.filter(filterWins)
        console.log('FILTERED WINS: ', filteredWins)
        console.log('REAL USER: ', thisUser[0].username)
        this.setState({
          currentUser: thisUser[0],
          username: thisUser[0].username,
          firstName: thisUser[0].firstName,
          lastName: thisUser[0].lastName,
          wins: filteredWins,
          winsCount: filteredWins.length,
          myPicks: thisUser[0].picks,
        }, () => {
          this.createLeaderboard()
        })
      }

    getUser = () => {
      // console.log('ACTIVE USER: ', this.state.activeUser)
      this.findRecentPicks()
      this.changeLogo()
      this.toggle()
      
      }

      createLeaderboard = () => {
        let users = this.state.allUsers
        let challengeId = localStorage.getItem('userChallengeId')
        let testFilter = (allChallengers) => {
          return allChallengers.username !== 'testtest'
        }
        let newUsers = users.filter(testFilter)
        console.log('newUsers: ', newUsers)
        let filterWins = (picks) => {
          return picks.result === 'win' && picks.challengeId === challengeId
        }

        let placedUsers = newUsers.map(function(el, i) {
            let filteredWins = el.picks.filter(filterWins)
            // console.log('FILTERED WINS: ', filteredWins)
            el.wins = filteredWins
            console.log('NEW NEW USERS: ', el)
            return { index: i, value: filteredWins.length, username: el.username }
        })
        // console.log('PLACED USERS: ', placedUsers)
        placedUsers.sort(function(a, b) {
            if (a.value > b.value) {
                return -1;
            }
            if (a.value < b.value) {
                return 1;
            }
            return 0;
        })
        let leaders = placedUsers.map(function(el) {
            return newUsers[el.index]
        })
        // console.log('LEADERS: ', leaders)
        this.setState({ leaders: leaders })

        // console.log('NEW LEADERBOARD: ', this.state.allUsers)
        
      }

      findRecentPicks = () => {
        let userPicks = this.state.activeUserPicks
        // console.log('USER PICKS: ', userPicks)
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
          // console.log('GOTTA PICK', userPick)
          todaysUserPick = userPick[0].team
        } 
        // else (console.log('nada here brudda'))
  
        let prevPicks = sortedPicks.filter(prevPicksFunc)
        // console.log('SORTED ARRAY: ', sortedPicks)
        // console.log('ONLY PICKS BEFORE TODAY: ', prevPicks)
        // console.log('TODAYS USER PICK: ', todaysUserPick)
        this.setState({
            todaysPick: todaysUserPick,
            prevPicks: prevPicks,
            activeUserPrevPicks: prevPicks,
          })
        
        }


        changeLogo = () => {
          let wins = this.state.activeUserWins
          let teams = [
            { name: 'Atlanta Hawks', abbr: 'atl', logo: 'atl', status: 'secondary' },
            { name: 'Brooklyn Nets', abbr: 'bkn', logo: 'bkn', status: 'secondary' },
            { name: 'Boston Celtics', abbr: 'bos', logo: 'bos', status: 'secondary' },
            { name: 'Charlotte Hornets', abbr: 'cha', logo: 'cha', status: 'secondary' },
            { name: 'Chicago Bulls', abbr: 'chi', logo: 'chi', status: 'secondary' },
            { name: 'Cleveland Cavaliers', abbr: 'cle', logo: 'cle', status: 'secondary' },
            { name: 'Dallas Mavericks', abbr: 'dal', logo: 'dal', status: 'secondary' },
            { name: 'Denver Nuggets', abbr: 'den', logo: 'den', status: 'secondary' },
            { name: 'Detroit Pistons', abbr: 'det', logo: 'det', status: 'secondary' },
            { name: 'Golden State Warriors', abbr: 'gsw', logo: 'gsw', status: 'secondary' },
            { name: 'Houston Rockets', abbr: 'hou', logo: 'hou', status: 'secondary' },
            { name: 'Indiana Pacers', abbr: 'ind', logo: 'ind', status: 'secondary' },
            { name: 'Los Angeles Clippers', abbr: 'lac', logo: 'lac', status: 'secondary' },
            { name: 'Los Angeles Lakers', abbr: 'lal', logo: 'lal', status: 'secondary' },
            { name: 'Memphis Grizzlies', abbr: 'mem', logo: 'mem', status: 'secondary' },
            { name: 'Miami Heat', abbr: 'mia', logo: 'mia', status: 'secondary' },
            { name: 'Milwalkee Bucks', abbr: 'mil', logo: 'mil', status: 'secondary' },
            { name: 'Minnesota Timberwolves', abbr: 'min', logo: 'min', status: 'secondary' },
            { name: 'New Orleans Pelicans', abbr: 'nop', logo: 'nop', status: 'secondary' },
            { name: 'New York Knicks', abbr: 'nyk', logo: 'nyk', status: 'secondary' },
            { name: 'Oklahoma City Thunder', abbr: 'okc', logo: 'okc', status: 'secondary' },
            { name: 'Orlando Magic', abbr: 'orl', logo: 'orl', status: 'secondary' },
            { name: 'Philadelphia 76ers', abbr: 'phi', logo: 'phi', status: 'secondary' },
            { name: 'Pheonix Suns', abbr: 'phx', logo: 'phx', status: 'secondary' },
            { name: 'Portland Trail Blazers', abbr: 'por', logo: 'por', status: 'secondary' },
            { name: 'Sacramento Kings', abbr: 'sac', logo: 'sac', status: 'secondary' },
            { name: 'San Antonio Spurs', abbr: 'sas', logo: 'sas', status: 'secondary' },
            { name: 'Toronto Raptors', abbr: 'tor', logo: 'tor', status: 'secondary' },
            { name: 'Utah Jazz', abbr: 'uta', logo: 'uta', status: 'secondary' },
            { name: 'Washington Wizards', abbr: 'was', logo: 'was', status: 'secondary' }
          ]
          let allPicks = this.state.activeUserPicks
          let thisTeam = ''
          //let matchedTeams = []
          let theseMatchingWins = []
          let allTeams = JSON.parse(JSON.stringify(teams))
  
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
            return theTeams.name.trim() === todaysPick.trim()
          }
  
          // FIND MATCHING WINS
          let matchingWins = (winningTeams) => {
            // console.log('winning teams: ', winningTeams)
            return winningTeams.team.trim() === thisTeam.trim()
          }
  
          for (var j=0; j<allTeams.length; j++) {
            // console.log('CURRENT WINS: ', wins)
            let thisTeamName = allTeams[j].name
            // console.log('this team: ', thisTeam)
            
            thisTeam = thisTeamName
  
            let teamMatched = allTeams.filter(matchingTeams)
            if (teamMatched[0] && (this.state.timeDiff <= 0)) {
              if (teamMatched[0].name.trim() === allTeams[j].name.trim()) {
                // console.log('WE HAVE A PICK FOR TODAY: ', teamMatched[0].name)
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
                teams: allTeams,
                todaysPick: teamMatched
            })
  
            this.handlePreloader()
            // console.log('NEW TEAMS ARRAY: ', this.state.challengeData.teams)
  
          }
          
        }
  
        loadLogo = (teamLogo) => {
            switch (true) {  
            case (teamLogo === 'atl'):
                return atl.default;
                  
            case (teamLogo === 'bkn'):
              return bkn.default;
              
            case (teamLogo === 'bos'):
              return bos.default;
              
            case (teamLogo === 'cha'):
              return cha.default;
              
            case (teamLogo === 'chi'):
              return chi.default;
              
            case (teamLogo === 'cle'):
              return cle.default;
                
            case (teamLogo === 'dal'):
              return dal.default;
                
            case (teamLogo === 'den'):
              return den.default;
                
            case (teamLogo === 'det'):
              return det.default;
                
            case (teamLogo === 'gsw'):
              return gsw.default;
                
            case (teamLogo === 'hou'):
              return hou.default;
                
            case (teamLogo === 'ind'):
              return ind.default;
                
            case (teamLogo === 'lac'):
              return lac.default;
                
            case (teamLogo === 'lal'):
              return lal.default;
                
            case (teamLogo === 'mem'):
              return mem.default;
                
            case (teamLogo === 'mia'):
              return mia.default;
                
            case (teamLogo === 'mil'):
              return mil.default;
            
            case (teamLogo === 'min'):
              return min.default;
                
            case (teamLogo === 'nop'):
              return nop.default;
                
            case (teamLogo === 'nyk'):
              return nyk.default;
                
            case (teamLogo === 'okc'):
              return okc.default;
                
            case (teamLogo === 'orl'):
              return orl.default;
                
            case (teamLogo === 'phi'):
              return phi.default;
                
            case (teamLogo === 'phx'):
              return phx.default;
                
            case (teamLogo === 'por'):
              return por.default;
                
            case (teamLogo === 'sac'):
              return sac.default;
                
            case (teamLogo === 'sas'):
              return sas.default;
                
            case (teamLogo === 'tor'):
              return tor.default;
                
            case (teamLogo === 'uta'):
              return uta.default;
            
            case (teamLogo === 'was'):
              return was.default;
                
            default:
              return atl;
            }  
          
    
          }

    handleClick = e => {
      // let self = this
      let user = e.target
      let player = user.textContent
      let allUsers = this.state.allUsers
      let challengeId = localStorage.getItem('userChallengeId')
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
        let filterChallengePicks = (picks) => {
          return picks.challengeId === challengeId
        }
        let filteredPicks = thisPlayerObj[0].picks.filter(filterChallengePicks)
        let filterWins = (picks) => {
          return picks.result === 'win' && picks.challengeId === challengeId
        }
        let filteredWins = thisPlayerObj[0].picks.filter(filterWins)
        // console.log('FILTERED WINS: ', filteredWins)
        this.setState({
          activeUser: thisPlayerObj[0],
          activeUserUsername: thisPlayerObj[0].username,
          activeUserWins: filteredWins,
          activeUserPicks: filteredPicks,
        }, () => {
          this.getUser()
          this.handlePreloader()
        })
        
        } else {
          return
        }
      }

    getFirstGame = () => {
      // let now = moment().format()
      // let date = moment(now).format('YYYY-MM-DD')
      let date = moment().format('YYYY-MM-DD')
      let self = this

      // GET GAME SCHEDULE FOR TODAY AND FIND FIRST GAME
      API.getNbaGamesByDate(date)
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

    createTimer = (timeDiff) => {
      // console.log('Time until first game: ', timeDiff)
      let seconds = moment.duration(timeDiff).asSeconds() * 1000
      //console.log('In seconds milliseconds: ', seconds)
      this.setState({ timeDiff: seconds })
      }

    render() {
      let uuidv4 = require('uuid/v4')
      let record = (this.state.activeUserPrevPicks?.length - this.state.activeUserWins?.length)
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
      // let timerDiff = this.state.timeDiff
      let todaysPick = (this.state.todaysPick !== 'No Pick' ? this.state.todaysPick : 'No Pick' )
      // console.log('THIS USERS PICK TODAY: ', this.state.todaysPick) 
      // let timerEnded = false;
      // let EndTimer = () => {
      //   // timerEnded = true
      //   // console.log('TODAYS PICK: ', todaysPick)
      //   return (
      //     <span>{todaysPick}</span>
      //   )
      //   }

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
              <h2 className='leaderboardHeader'>Leaderboard</h2>
              <hr />
              <table className='leaderboardData table table-hover'>
                <thead>
                  <tr className='leaderboardHeader'>
                    <th className='leaderboardHeader'>Place</th>
                    <th className='leaderboardHeader'>User</th>
                    <th className='leaderboardHeader'>Wins</th>
                    {/* <th className='leaderboardHeader'>Streak</th> */}
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
                          <ModalHeader id='modalTitle' className='leaderboardModalTitle'>
                            {/* USER PROFILE ({username}) */}
                            USER PROFILE
                          </ModalHeader>
                          <ModalBody id='modalBody' className='nextGames' style={modalStyle}>
                            <div className="row playerRow">
                              <div className='col-6'>
                              <Jumbotron className='playerJumbo leaderboardModalPlayerJumbo'>
                                <Container fluid>
                                  <div className="display-4">
                                    <h2>{username}</h2> <hr />
                                    <h4 className="winsHeader leaderboardModalTodaysPickHeader">Today's Pick</h4>
                                      <div className="userTimer leaderboardModalUserTimer">

                                        {
                                          (this.state.timeDiff.length) ? <p>No Games Today</p> :

                                          <Countdown 
                                            date={Date.now() + this.state.timeDiff}
                                            zeroPadTime={2} 
                                            daysInHours={true} 
                                            renderer={this.timerRender}
                                            className='userTimer'
                                          >
                                            <span> 
                                              {todaysPick}
                                              {/* <EndTimer /> */}
                                            </span>
                                            
                                          </Countdown> 
                                        }

                                      </div>
                                    <div className="row recordRow">
                                      <div className="col-md-3">
                                        <h4 className='winsHeader'>Wins</h4> {this.state.activeUserWins?.length}
                                      </div>
                                      <div className="col-md-3">
                                      <h4 className='winsHeader'>Record</h4> {this.state.activeUserWins?.length} - {record}
                                      </div>  
                                      {/* <div className="col-md-3">
                                        <h4 className='wins'>Streak</h4> {this.state.activeUserWinsCount}
                                      </div>   */}
                                    </div>  
                                  </div>
                                </Container>
                              </Jumbotron>
                              </div>
                              <div className='col-6'>
                                <div className='row leaderboardModalRecentPicks recentPicks profilePicks'>
                                  <div className="col-12">
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
                                </div>
                              </div>
                              <span className="col-md"> 
                                <div className="row teamLogos">
                                  
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
                                  
                                </div>
                              </span>
                            </div>
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

export default NbaPickEmLeaderboard