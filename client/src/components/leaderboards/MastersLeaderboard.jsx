import React, { Component } from 'react'
import LoadingOverlay from 'react-loading-overlay';
import moment from 'moment'
import { Jumbotron, Container, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import API from '../../utils/API'
import '../../css/leaderboard.css'
import Moment from 'moment-timezone'
import Countdown from 'react-countdown-now';
import $ from 'jquery'
// import { atl, bkn, bos, cha, chi, cle, dal, den, det, gsw, hou, ind, lac, lal, mem, mia, mil, min, nop, nyk, okc, orl, phi, phx, por, sac, sas, tor, uta, was } from '../../css/nbaLogos'

// import { Button, Jumbotron, Container, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
// import { ari, atl2, bal, bos2, chc, cws, cle2, cin, col, det2, mia2, hou2, kc, laa, lad, nym, nyy, mil2, min2, oak, pit, sd, sf, phi2, sea, stl, tb, tex, tor2, wsh } from '../../css/mlbLogos'

class MastersLeaderboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
          challengeId: '',
          challengeData: {},
          currentUser: {},
          teams: [],
          isActive: false,
          hover: false,
          allUsers: [],
          leaders: [],
          modal: false,
          activeUser: {},
          activeUserUsername: '',
          activeUserPar: [],
          activeUserPicks: [],
          activeUserPrevPicks: [],
          prevPicks: [],
          thisRecentPick: '',
          userWin: '',
          todaysPick: 'No Pick',
          thisDate: '',
          userPlace: {},
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
    //   this.getChallengeData()
    //   this.getFirstGame()
        
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

      // PRODUCTION
      let challengeId = '5caa6602ba5ec50017ed6184'

      //let challengeId = localStorage.getItem('userChallengeId')
      this.setState({
        challengeId: challengeId
      })
      API.getChallenge(challengeId)
        .then(res => {
          // console.log(res)
          self.setState({
            challengeData: res.data[0],
            allUsers: res.data[0].users,
            teams: res.data[0].teams
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
        losses: thisUser[0].par,
        lossesCount: thisUser[0].points,
        myPicks: thisUser[0].picks,
      })

      this.createLeaderboard()
      // console.log('CURRENT USER: ', this.state.currentUser)
      // console.log('CHAL USERS DATA: ', this.state.challengeData.users)
      }

    getUser = () => {
      console.log('ACTIVE USER: ', this.state.activeUser)
      this.findRecentPicks()
    //   this.changeLogo()
      this.toggle()
      
      }

    createLeaderboard = () => {
        let users = this.state.challengeData.users
        // console.log('Create leaderboard with this data: ', users)
        let placedUsers = users.map(function(el, i) {
            return { index: i, value: el.points }
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

        console.log('NEW LEADERBOARD: ', this.state.allUsers)
        
      }

    findRecentPicks = () => {
      let userPicks = this.state.activeUserPicks
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
        todaysUserPick = userPick[0].team
      } 

      let prevPicks = sortedPicks.filter(prevPicksFunc)
      console.log('SORTED ARRAY: ', sortedPicks)
      console.log('ONLY PICKS BEFORE TODAY: ', prevPicks)

      this.setState({
          todaysPick: todaysUserPick,
          prevPicks: prevPicks
        })
      
      }

    

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
        console.log('Player page: ', player)
        console.log('ALL PLAYERS: ', allUsers)
        let thisPlayerFunc = (players) => {
          return players.username === player
        }
        let thisPlayerObj = allUsers.filter(thisPlayerFunc)
        console.log('THIS PLAYER: ', thisPlayerObj[0])
        thisPlayer.push(thisPlayerObj[0])
        this.setState({
          activeUser: thisPlayer[0],
          activeUserUsername: thisPlayer[0].username,
          activeUserPar: thisPlayer[0].par,
          activeUserPicks: thisPlayer[0].picks
        }, () => {
          this.getUser()
          this.handlePreloader()
        })
        
        // this.findRecentPicks()
        // this.changeLogo()
        // self.toggle()
        // API.getUser(player)
        //   .then(res => {
        //     let thisUser = {
        //       username: res.data[0].username,
        //       par: res.data[0].par,
        //       lossesCount: res.data[0].par.length,
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
      let now = Moment().format()
      let date = Moment(now).format('YYYY-MM-DD')

      // GET GAME SCHEDULE FOR TODAY AND FIND FIRST GAME
      API.getMlbGamesByDate(date)
        .then (res => {
          let games = res.data
          let sortedGames = games.sort((a,b) => new Moment(a.gameTime) - new Moment (b.gameTime))

          // CHECK TO SEE IF THERE ARE NO GAMES TODAY
          if (!sortedGames[0]) {
            // console.log('THERE MUST BE NO GAMES TODAY')
            $('.timer').html('<div>THERE ARE NO GAMES TODAY</div>')
            return;
          }

          let firstGame = sortedGames[0]
          let firstGameTime = firstGame.gameTime
          let realGameTime = Moment(firstGameTime).add(6, 'hours').format('HH:mm:ss a')
          let realGameTimeAdj = Moment(realGameTime, 'HH:mm:ss a')
          let realTime = moment().tz('America/New_York').format('HH:mm:ss a')
          let realTimeAdj = Moment(realTime, 'HH:mm:ss a')
          let timeDiff = Moment.duration(realGameTimeAdj.diff(realTimeAdj))
          this.createTimer(timeDiff)
        })
        .catch(err => console.log(err))
      
      }

    createTimer = (timeDiff) => {
      console.log('Time until first game: ', timeDiff)
      let seconds = Moment.duration(timeDiff).asSeconds() * 1000
      //console.log('In seconds milliseconds: ', seconds)
      this.setState({ timeDiff: seconds })
      }

    render() {
        let uuidv4 = require('uuid/v4')
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
        // let par = this.state.activeUser.par
        // let lossesCount = this.state.activeUser.par.length
        // let picks = this.state.activeUser.picks
        //let pickCount = picks.length
        // let timerEnded = false;
        let EndTimer = () => {
          // timerEnded = true
          return (
            <span>{this.state.todaysPick}</span>
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
                    <th className='leaderboardHeader'>Score</th>
                    {/* <th>Teams</th> */}
                  </tr>
                </thead>
                <tbody>
                
                {
                  this.state.leaders.map((leader, i) => (
                    
                    <tr key={uuidv4()} className='allRows'>
                      <td className='leaderRow' style={leaderStyle}>{i+1}</td>
                      <td className='leaderRow username' style={leaderStyle} onClick={this.handleClick}>{leader.username}</td>
                      <td className='leaderRow' style={leaderStyle}>{leader.points}</td>
                    
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
                                    <h4>Today's Pick</h4>
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



                                        {/* <Countdown 
                                          date={Date.now() + this.state.timeDiff}
                                          zeroPadTime={2} 
                                          daysInHours={true} 
                                          renderer={this.timerRender}
                                          className='userTimer'
                                        >
                                          <EndTimer />
                                        </Countdown> */}
                                      </div>
                                    <div className="row recordRow">
                                      <div className="col-md-3">
                                        <h4 className='winsHeader'>Score</h4> {this.state.activeUserPar}
                                      </div>
                                      {/* <div className="col-md-3">
                                        <h4 className='winsHeader'>Behind</h4> {this.state.activeUserPar.length} - {this.state.activeUserPrevPicks.length}
                                      </div>   */}
                                      {/* <div className="col-md-3">
                                        <h4 className='score'>Place</h4> {this.state.activeUserPar.length}
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

export default MastersLeaderboard