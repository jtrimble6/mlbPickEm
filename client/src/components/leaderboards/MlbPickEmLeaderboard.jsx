import React, { Component } from 'react'
import LoadingOverlay from 'react-loading-overlay';
import { Jumbotron, Container, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import API from '../../utils/API'
import '../../css/leaderboard.css'
import moment from 'moment-timezone'
import Countdown from 'react-countdown-now';
import $ from 'jquery'
// import { atl, bkn, bos, cha, chi, cle, dal, den, det, gsw, hou, ind, lac, lal, mem, mia, mil, min, nop, nyk, okc, orl, phi, phx, por, sac, sas, tor, uta, was } from '../../css/nbaLogos'

//import { Button, Jumbotron, Container, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { ari, atl2, bal, bos2, chc, cws, cle2, cin, col, det2, mia2, hou2, kc, laa, lad, nym, nyy, mil2, min2, oak, pit, sd, sf, phi2, sea, stl, tb, tex, tor2, wsh } from '../../css/mlbLogos'

class Leaderboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
          challengeId: '',
          challengeData: {},
          currentUser: {},
          teams: [
            { name: 'Arizona Diamondbacks', abbr: 'ari', logo: 'ari', status: 'secondary' },
            { name: 'Atlanta Braves', abbr: 'atl', logo: 'atl2', status: 'secondary' },
            { name: 'Baltimore Orioles', abbr: 'bal', logo: 'bal', status: 'secondary' },
            { name: 'Boston Red Sox', abbr: 'bos', logo: 'bos2', status: 'secondary' },
            { name: 'Chicago White Sox', abbr: 'cws', logo: 'cws', status: 'secondary' },
            { name: 'Chicago Cubs', abbr: 'chc', logo: 'chc', status: 'secondary' },
            { name: 'Cincinnati Reds', abbr: 'cin', logo: 'cin', status: 'secondary' },
            { name: 'Cleveland Indians', abbr: 'cle', logo: 'cle2', status: 'secondary' },
            { name: 'Colorado Rockies', abbr: 'col', logo: 'col', status: 'secondary' },
            { name: 'Detroit Tigers', abbr: 'det', logo: 'det2', status: 'secondary' },
            { name: 'Houston Astros', abbr: 'hou', logo: 'hou2', status: 'secondary' },
            { name: 'Kansas City Royals', abbr: 'kc', logo: 'kc', status: 'secondary' },
            { name: 'Los Angeles Angels', abbr: 'laa', logo: 'laa', status: 'secondary' },
            { name: 'Los Angeles Dodgers', abbr: 'lad', logo: 'lad', status: 'secondary' },
            { name: 'Miami Marlins', abbr: 'mia', logo: 'mia2', status: 'secondary' },
            { name: 'Milwaukee Brewers', abbr: 'mil', logo: 'mil2', status: 'secondary' },
            { name: 'Minnesota Twins', abbr: 'min', logo: 'min2', status: 'secondary' },
            { name: 'New York Yankees', abbr: 'nyy', logo: 'nyy', status: 'secondary' },
            { name: 'New York Mets', abbr: 'nym', logo: 'nym', status: 'secondary' },
            { name: 'Oakland Athletics', abbr: 'oak', logo: 'oak', status: 'secondary' },
            { name: 'Philadelphia Phillies', abbr: 'phi', logo: 'phi2', status: 'secondary' },
            { name: 'Pittsburgh Pirates', abbr: 'pit', logo: 'pit', status: 'secondary' },
            { name: 'San Diego Padres', abbr: 'sd', logo: 'sd', status: 'secondary' },
            { name: 'San Francisco Giants', abbr: 'sf', logo: 'sf', status: 'secondary' },
            { name: 'Seattle Mariners', abbr: 'sea', logo: 'sea', status: 'secondary' },
            { name: 'St. Louis Cardinals', abbr: 'stl', logo: 'stl', status: 'secondary' },
            { name: 'Tampa Bay Rays', abbr: 'tb', logo: 'tb', status: 'secondary' },
            { name: 'Texas Rangers', abbr: 'tex', logo: 'tex', status: 'secondary' },
            { name: 'Toronto Blue Jays', abbr: 'tor', logo: 'tor2', status: 'secondary' },
            { name: 'Washington Nationals', abbr: 'wsh', logo: 'wsh', status: 'secondary' }
          ],
          isActive: false,
          hover: false,
          allUsers: [],
          leaders: [],
          modal: false,
          activeUser: {},
          activeUserUsername: '',
          activeUserWins: [],
          activeUserPicks: [],
          activeUserPrevPicks: [],
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
        // this.toggleHover = this.toggleHover.bind(this);
        this.handlePreloader = this.handlePreloader.bind(this);
        this.getUser = this.getUser.bind(this);
        this.getFirstGame = this.getFirstGame.bind(this);
        this.createTimer = this.createTimer.bind(this);
        this.findRecentPicks = this.findRecentPicks.bind(this);
        this.changeLogo = this.changeLogo.bind(this);
        this.loadLogo = this.loadLogo.bind(this);
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
      let challengeId = localStorage.getItem('userChallengeId')
      this.setState({
        challengeId: challengeId
      })
      API.getChallenge(challengeId)
        .then(res => {
          console.log('CHALLENGE START DATE: ', res.data[0])
          self.setState({
            challengeData: res.data[0],
            challengeStartDate: res.data[0].startDate,
            allUsers: res.data[0].users
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
        let users = this.state.challengeData.users
        // console.log('Create leaderboard with this data: ', users)
        let placedUsers = users.map(function(el, i) {
            return { index: i, value: el.wins.length }
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
            return users[el.index]
        })
        // console.log('LEADERS: ', leaders)
        this.setState({ leaders: leaders })

        // console.log('NEW LEADERBOARD: ', this.state.allUsers)
        
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
        let teams = [
          { name: 'Arizona Diamondbacks', abbr: 'ari', logo: 'ari', status: 'secondary' },
          { name: 'Atlanta Braves', abbr: 'atl', logo: 'atl2', status: 'secondary' },
          { name: 'Baltimore Orioles', abbr: 'bal', logo: 'bal', status: 'secondary' },
          { name: 'Boston Red Sox', abbr: 'bos', logo: 'bos2', status: 'secondary' },
          { name: 'Chicago White Sox', abbr: 'cws', logo: 'cws', status: 'secondary' },
          { name: 'Chicago Cubs', abbr: 'chc', logo: 'chc', status: 'secondary' },
          { name: 'Cincinnati Reds', abbr: 'cin', logo: 'cin', status: 'secondary' },
          { name: 'Cleveland Indians', abbr: 'cle', logo: 'cle2', status: 'secondary' },
          { name: 'Colorado Rockies', abbr: 'col', logo: 'col', status: 'secondary' },
          { name: 'Detroit Tigers', abbr: 'det', logo: 'det2', status: 'secondary' },
          { name: 'Houston Astros', abbr: 'hou', logo: 'hou2', status: 'secondary' },
          { name: 'Kansas City Royals', abbr: 'kc', logo: 'kc', status: 'secondary' },
          { name: 'Los Angeles Angels', abbr: 'laa', logo: 'laa', status: 'secondary' },
          { name: 'Los Angeles Dodgers', abbr: 'lad', logo: 'lad', status: 'secondary' },
          { name: 'Miami Marlins', abbr: 'mia', logo: 'mia2', status: 'secondary' },
          { name: 'Milwaukee Brewers', abbr: 'mil', logo: 'mil2', status: 'secondary' },
          { name: 'Minnesota Twins', abbr: 'min', logo: 'min2', status: 'secondary' },
          { name: 'New York Yankees', abbr: 'nyy', logo: 'nyy', status: 'secondary' },
          { name: 'New York Mets', abbr: 'nym', logo: 'nym', status: 'secondary' },
          { name: 'Oakland Athletics', abbr: 'oak', logo: 'oak', status: 'secondary' },
          { name: 'Philadelphia Phillies', abbr: 'phi', logo: 'phi2', status: 'secondary' },
          { name: 'Pittsburgh Pirates', abbr: 'pit', logo: 'pit', status: 'secondary' },
          { name: 'San Diego Padres', abbr: 'sd', logo: 'sd', status: 'secondary' },
          { name: 'San Francisco Giants', abbr: 'sf', logo: 'sf', status: 'secondary' },
          { name: 'Seattle Mariners', abbr: 'sea', logo: 'sea', status: 'secondary' },
          { name: 'St. Louis Cardinals', abbr: 'stl', logo: 'stl', status: 'secondary' },
          { name: 'Tampa Bay Rays', abbr: 'tb', logo: 'tb', status: 'secondary' },
          { name: 'Texas Rangers', abbr: 'tex', logo: 'tex', status: 'secondary' },
          { name: 'Toronto Blue Jays', abbr: 'tor', logo: 'tor2', status: 'secondary' },
          { name: 'Washington Nationals', abbr: 'wsh', logo: 'wsh', status: 'secondary' }
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
          return winningTeams.win.trim() === thisTeam.trim()
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
          activeUserWins: thisPlayer[0].wins,
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
        let timerDiff = this.state.timeDiff
        let todaysPick = (this.state.todaysPick[0] ? this.state.todaysPick[0].name : 'No Pick' )
        let challengeStartDate = moment(this.state.challengeStartDate).format('MM-DD-YYYY')
        let today = moment().format('MM-DD-YYYY')
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
                {

                  moment(challengeStartDate).isBefore(today) ? 

                  <small></small>  

                  :

                  <small>*ALL POINTS WILL BE RESET ON {challengeStartDate}*</small>

                }
              <hr />
              <table className='leaderboardData table table-hover'>
                <thead>
                  <tr className='leaderboardHeader'>                
                    <th className='leaderboardHeader'>Place</th>
                    <th className='leaderboardHeader'>User</th>
                    <th className='leaderboardHeader'>Points</th>
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

                                          <div>
                                          <Countdown 
                                            date={Date.now() + this.state.timeDiff}
                                            zeroPadTime={2} 
                                            daysInHours={true} 
                                            renderer={this.timerRender}
                                            className='userTimer'
                                          >
                                            <EndTimer />
                                          </Countdown> 
                                          </div>
                                        }

                                      </div>
                                    <div className="row recordRow">
                                      <div className="col-md-3">
                                        <h4 className='winsHeader'>Wins</h4> {this.state.activeUserWins.length}
                                      </div>
                                      <div className="col-md-3">
                                        <h4 className='winsHeader'>Record</h4> {this.state.activeUserWins.length} - {record}
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
                                        // userPicks[0] ? 
                                        
                                        userPicks.map((newRecentPick, i) => (
                                          <tr key={uuidv4()} style={hoverStyle} className={newRecentPick.result}>
                                            <td>{moment(newRecentPick.gameDate).format('MM-DD')}</td>
                                            <td>{newRecentPick.team}</td>
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

export default Leaderboard