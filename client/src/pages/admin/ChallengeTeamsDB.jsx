import React, { Component } from 'react'
// import { Redirect } from 'react-router-dom'
// import ReactTable from "react-table";
// import matchSorter from 'match-sorter'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import moment from 'moment'
import API from '../../utils/API'
import AdminBar from '../../components/nav/AdminBar'
import '../../css/adminPage.css'
import { atl, bkn, bos, cha, chi, cle, dal, den, det, gsw, hou, ind, lac, lal, mem, mia, mil, min, nop, nyk, okc, orl, phi, phx, por, sac, sas, tor, uta, was } from '../../css/nbaLogos'

class ChallengeTeamsDB extends Component {
    constructor(props) {
        super(props) 
        this.state = {
          addTeamsModal: false, 
          addTeamGamesModal: false,
          dropdownOpen: false,
          username: localStorage.getItem('user'),
          allChallenges: [],
          teamsData: [],
          teamsSelection: '',
          thisChallenge: {},
          currentChalUsers: [],
          currentChalName: 'N/A',
          currentUserName: 'N/A',
          currentUserData: {},
          currentUserPicks: [],
          currentUserWins: [],
          currentUserLosses: [],
          currentChallengeTeams: [],
          challengeTeamsSelection: '',
          challengeGamesSelection: '',
          nbaTeams: [
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
          ],
          mlbTeams: [
            { name: 'Arizona Diamondbacks', abbr: 'ari', logo: 'ari', status: 'secondary', division: 'NL West' },
            { name: 'Atlanta Braves', abbr: 'atl', logo: 'atl2', status: 'secondary', division: 'NL East' },
            { name: 'Baltimore Orioles', abbr: 'bal', logo: 'bal', status: 'secondary', division: 'AL East' },
            { name: 'Boston Red Sox', abbr: 'bos', logo: 'bos2', status: 'secondary', division: 'AL East' },
            { name: 'Chicago White Sox', abbr: 'cws', logo: 'cws', status: 'secondary', division: 'AL Central' },
            { name: 'Chicago Cubs', abbr: 'chc', logo: 'chc', status: 'secondary', division: 'NL Central' },
            { name: 'Cincinnati Reds', abbr: 'cin', logo: 'cin', status: 'secondary', division: 'NL Central' },
            { name: 'Cleveland Indians', abbr: 'cle', logo: 'cle2', status: 'secondary', division: 'AL Central' },
            { name: 'Colorado Rockies', abbr: 'col', logo: 'col', status: 'secondary', division: 'NL West' },
            { name: 'Detroit Tigers', abbr: 'det', logo: 'det2', status: 'secondary', division: 'AL Central' },
            { name: 'Houston Astros', abbr: 'hou', logo: 'hou2', status: 'secondary', division: 'AL West' },
            { name: 'Kansas City Royals', abbr: 'kc', logo: 'kc', status: 'secondary', division: 'AL Central' },
            { name: 'Los Angeles Angels', abbr: 'laa', logo: 'laa', status: 'secondary', division: 'AL West' },
            { name: 'Los Angeles Dodgers', abbr: 'lad', logo: 'lad', status: 'secondary', division: 'NL West' },
            { name: 'Miami Marlins', abbr: 'mia', logo: 'mia2', status: 'secondary', division: 'NL East' },
            { name: 'Milwaukee Brewers', abbr: 'mil', logo: 'mil2', status: 'secondary', division: 'NL Central' },
            { name: 'Minnesota Twins', abbr: 'min', logo: 'min2', status: 'secondary', division: 'AL Central' },
            { name: 'New York Yankees', abbr: 'nyy', logo: 'nyy', status: 'secondary', division: 'AL East' },
            { name: 'New York Mets', abbr: 'nym', logo: 'nym', status: 'secondary', division: 'NL East' },
            { name: 'Oakland Athletics', abbr: 'oak', logo: 'oak', status: 'secondary', division: 'AL West' },
            { name: 'Philadelphia Phillies', abbr: 'phi', logo: 'phi2', status: 'secondary', division: 'NL East' },
            { name: 'Pittsburgh Pirates', abbr: 'pit', logo: 'pit', status: 'secondary', division: 'NL Central' },
            { name: 'San Diego Padres', abbr: 'sd', logo: 'sd', status: 'secondary', division: 'NL West' },
            { name: 'San Francisco Giants', abbr: 'sf', logo: 'sf', status: 'secondary', division: 'NL West' },
            { name: 'Seattle Mariners', abbr: 'sea', logo: 'sea', status: 'secondary', division: 'AL West' },
            { name: 'St. Louis Cardinals', abbr: 'stl', logo: 'stl', status: 'secondary', division: 'NL Central' },
            { name: 'Tampa Bay Rays', abbr: 'tb', logo: 'tb', status: 'secondary', division: 'AL East' },
            { name: 'Texas Rangers', abbr: 'tex', logo: 'tex', status: 'secondary', division: 'AL West' },
            { name: 'Toronto Blue Jays', abbr: 'tor', logo: 'tor2', status: 'secondary', division: 'AL East' },
            { name: 'Washington Nationals', abbr: 'wsh', logo: 'wsh', status: 'secondary', division: 'NL East' }
          ],

          }
          this.toggle = this.toggle.bind(this)
          this.toggleAddTeamsModal = this.toggleAddTeamsModal.bind(this)
          this.toggleAddGamesModal = this.toggleAddGamesModal.bind(this)
          this.getChallenges = this.getChallenges.bind(this)
          this.handleInputChange = this.handleInputChange.bind(this)
          this.findTeams = this.findTeams.bind(this)
          this.postNbaTeams = this.postNbaTeams.bind(this);
          this.postNbaTeamGames = this.postNbaTeamGames.bind(this);
          this.postMlbTeamGames = this.postMlbTeamGames.bind(this);
          this.removeNbaTeamGames = this.removeNbaTeamGames.bind(this);
          this.postMlbTeams = this.postMlbTeams.bind(this);
          // this.postMlbTeamGames = this.postMlbTeamGames.bind(this);
          // this.removeMlbTeamGames = this.removeMlbTeamGames.bind(this);
          this.findUserData = this.findUserData.bind(this)
          this.handleAddTeamsSubmit = this.handleAddTeamsSubmit.bind(this)
          this.handleAddTeamGamesSubmit = this.handleAddTeamGamesSubmit.bind(this)
        }
    
    componentDidMount() {
        this.getChallenges()
      }

    toggle() {
      this.setState(prevState => ({
        dropdownOpen: !prevState.dropdownOpen
      }));
      }

    toggleAddTeamsModal() {
        this.setState({
          addTeamsModal: !this.state.addTeamsModal,
        });
      }

    toggleAddGamesModal() {
        this.setState({
          addTeamGamesModal: !this.state.addTeamGamesModal,
        });
      }

    getChallenges = () => {
        let self = this
        // let findSport = (sport) => {
        //   return sport.sport === 'nba'
        // }
        API.getChallenges()
          .then(res => {
              let challenges = res.data
              console.log('CHALLENGES: ', challenges)
            //   let filteredChals = challenges.filter(findSport)
            //   console.log('ONLY NBA CHALLENGES: ', filteredChals)
              self.setState({
                  allChallenges: challenges
              })
          })
      }

    handleInputChange = event => {
      const { name, value } = event.target
      this.setState({
          [name]: value
      })
      console.log('TARGET: ', value)
      if (name === 'teamsSelection') {
        this.findTeams(value)
      }

    //   if (name === 'userData') {
    //     console.log('FINDING USER DATA')
    //     this.findUserData(value)
    //   }
      
      // if (name === 'challengeData') {
      //   this.createForm(value)
      // }
      
      }

    findTeams = (teamsSelection) => {
      this.setState({
        currentUserData: {},
        currentChalUsers: [],
        thisChallenge: {},
        userData: '',
        teamsData: []
      })
      console.log('TEAMS SELECTION: ', teamsSelection)
        // let allChallenges = this.state.allChallenges
        // let thisChalFunc = (chal) => {
        //   return chal.challengeName === challenge
        // }
        // let thisChal = allChallenges.filter(thisChalFunc)
        // console.log('CHAL INFO: ', thisChal)
        // this.setState({
        //   currentChalName: thisChal[0].challengeName,
        //   currentChalUsers: thisChal[0].users,
        //   currentChallengeTeams: thisChal[0].teams,
        //   thisChallenge: thisChal
        // })
        // console.log('CURRENT CHAL TEAMS: ', this.state.currentChallengeTeams)
      }

    postNbaTeams = () => {
        let teams = this.state.nbaTeams
        console.log('POSTING JUST THESE TEAMS: ', teams)
        // debugger;
        for (var x=0; x<teams.length; x++) {
          let teamNameCombo = teams[x].name
          let newTeam = {
            teamName: teamNameCombo,
            teamAlias: teams[x].abbr.toUpperCase(),
            homeGames: [],
            awayGames: []
          }
          // debugger
          API.postNbaTeams(newTeam)
            .then(res => {
              console.log(res.data)
              this.toggleAddTeamsModal()
            })
            .catch(err => console.log(err))
          }
        }

    postMlbTeams = () => {
          let teams = this.state.mlbTeams
          console.log('POSTING JUST THESE TEAMS: ', teams)
          // debugger;
          for (var x=0; x<teams.length; x++) {
            let teamNameCombo = teams[x].name
            let newTeam = {
              teamName: teamNameCombo,
              teamAlias: teams[x].abbr.toUpperCase(),
              homeGames: [],
              awayGames: [],
              division: teams[x].division
            }
            // debugger
            API.postMlbTeams(newTeam)
              .then(res => {
                console.log(res.data)
                this.toggleAddTeamsModal()
              })
              .catch(err => console.log(err))
            }
          }

    removeNbaTeamGames = () => {
        console.log('THIS CHALLENGE: ', this.state.thisChallenge)
        let theTeams = this.state.nbaTeams
        for (var t=0; t<theTeams.length; t++) {
            let thisTeam = theTeams[t].abbr.toUpperCase()
            API.removeNbaGamesByTeam(thisTeam)
                .then(res => {
                    console.log('REMOVED GAMES BY TEAM: ', res)
                })
                .catch(err => console.log(err))   
        }
      }

    postMlbTeamGames = () => {
        let allGames = []
        API.getMlbGames()
          .then(res => {
            allGames.push(res.data)
            let theGames = allGames[0]
            let theTeams = this.state.mlbTeams
            for (var t=20; t<30; t++) {
              let thisTeam = theTeams[t].abbr.toUpperCase()
              // console.log('ALL GAMES: ', theGames)
              // console.log('THIS TEAM: ', thisTeam)
              for (var p=0; p<theGames.length; p++) {
                let homeA = theGames[p].homeAlias
                // let awayA = theGames[p].awayAlias
                if (homeA === thisTeam) {
                  // console.log('THE GAME: ', theGames[p])
                  // console.log('THIS TEAM IS THE HOME TEAM', thisTeam)
                  API.addMlbGamesByTeam(thisTeam, theGames[p])
                    .then(res => {
                      console.log(res)
                    })
                    .catch(err => console.log(err))
                }
                // if (awayA === thisTeam) {
                //   // console.log('THE GAME: ', theGames[p])
                //   // console.log('THIS TEAM IS THE AWAY TEAM', thisTeam)
                //   API.addMlbGamesByTeam(thisTeam, theGames[p])
                //     .then(res => {
                //       console.log(res)
                //     })
                //     .catch(err => console.log(err))
                // }
              }
            }
            
          })
          .catch(err => console.log(err))
  
        }

    postNbaTeamGames = () => {
        let allGames = []
        // console.log('THIS CHALLENGE: ', this.state.thisChallenge)
        API.getNbaGames()
          .then(res => {
            allGames.push(res.data)
            let theGames = allGames[0]
            let theTeams = this.state.nbaTeams
            // let theChallenge = this.state.thisChallenge[0]
            for (var t=0; t<theTeams.length; t++) {
              let thisTeam = theTeams[t].abbr.toUpperCase()
              // console.log('ALL GAMES: ', theGames)
              // console.log('THIS TEAM: ', thisTeam)
              for (var p=0; p<theGames.length; p++) {
                // let homeA = theGames[p].homeAlias
                let awayA = theGames[p].awayAlias
                // if (homeA === thisTeam) {
                //   // console.log('THE GAME: ', theGames[p])
                //   // console.log('THIS TEAM IS THE HOME TEAM', thisTeam)
                //   API.addNbaGamesByTeam(thisTeam, theGames[p])
                //     .then(res => {
                //       console.log(res)
                //     })
                //     .catch(err => console.log(err))
                // }
                if (awayA === thisTeam) {
                  // console.log('THE GAME: ', theGames[p])
                  // console.log('THIS TEAM IS THE AWAY TEAM', thisTeam)
                  API.addNbaGamesByTeam(thisTeam, theGames[p])
                    .then(res => {
                      console.log(res)
                    })
                    .catch(err => console.log(err))
                }
              }
              this.toggleAddGamesModal()
            }
            
          })
          .catch(err => console.log(err))
  
      }

    findUserData = (user) => {
      console.log('finding user data')
      let allUsers = this.state.currentChalUsers
      let thisUserFunc = (users) => {
        return users.username === user
      }
      let thisUser = allUsers.filter(thisUserFunc)
      let userPicks = thisUser[0].picks
      console.log('user picks: ', userPicks)
      // debugger
      let sortedPicks
      let userWins
      let userLosses
      if (userPicks !== undefined) {
        sortedPicks = userPicks.sort(function(a, b) {
          if (moment(a.gameDate).isBefore(moment(b.gameDate))) {
              return -1;
          }
          if (moment(a.gameDate).isAfter(moment(b.gameDate))) {
              return 1;
          }
          return 0;
        })
      }

      let findUserWinsFunc = (picks) => {
        return picks.result === 'win'
      }
      let findUserLossesFunc = (picks) => {
        return picks.result === 'loss'
      }

      userWins = sortedPicks.filter(findUserWinsFunc)
      userLosses = sortedPicks.filter(findUserLossesFunc)

      console.log('USER INFO: ', thisUser)
      this.setState({
        currentUserData: thisUser,
        currentUserPicks: sortedPicks,
        currentUserWins: userWins,
        currentUserLosses: userLosses
      })
      console.log('CURRENT USER DATA: ', this.state.currentUserData)
      }

    handleAddTeamsSubmit = (event) => {
        event.preventDefault()
        console.log('HANDLE ADD TEAMS: ', this.state.challengeTeamsSelection)
        let teamsSelection = this.state.challengeTeamsSelection
        if (teamsSelection === 'nbaTeams') {
          this.postNbaTeams()
        }
        if (teamsSelection === 'mlbTeams') {
          this.postMlbTeams()
        }
      }

    handleAddTeamGamesSubmit = (event) => {
        event.preventDefault()
        console.log('HANDLE ADD GAMES: ', this.state.challengeGamesSelection)
        let gamesSelection = this.state.challengeGamesSelection
        if (gamesSelection === 'nbaGames') {
          this.postNbaTeamGames()
        }
        if (gamesSelection === 'mlbGames') {
          this.postMlbTeamGames()
        }
    }
      

    render() {
        const uuidv4 = require('uuid/v4')
        return(
            <div id='challengePage'>
              <AdminBar />

              <Modal 
                 isOpen={this.state.addTeamsModal} 
                 autoFocus={true}
                 centered={true}
                 size='lg'
                 className='fullCalModal'
               >
                <form onSubmit={this.handleAddTeamsSubmit}>
                  <ModalHeader id='modalTitle'>
                    Add Teams
                  </ModalHeader>
                    <ModalBody id='modalBody'>
                        <div className="form-group">
                            <label className="adminFormLabel" htmlFor="challengeTeamsSelection">Select Teams</label>
                            <select 
                                value={this.state.challengeTeamsSelection}
                                name="challengeTeamsSelection"
                                onChange={this.handleInputChange}
                                type="text"
                                className="form-control"
                                id="challengeTeamsSelection"
                            >
                                <option value=''>Select One</option>
                                <option value='nbaTeams'>NBA Teams</option>
                                <option value='mlbTeams'>MLB Teams</option>
                                <option value='nflTeams'>NFL Teams</option>
                            </select>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                      <input type="submit" value="Submit" color="primary" className="btn btn-primary" onClick={this.handleAddTeamsSubmit} />
                      <Button color="danger" onClick={this.toggleAddTeamsModal}>Cancel</Button>
                    </ModalFooter>
                </form>
              </Modal>

              <Modal 
                 isOpen={this.state.addTeamGamesModal} 
                 autoFocus={true}
                 centered={true}
                 size='lg'
                 className='fullCalModal'
               >
                <form onSubmit={this.handleAddTeamGamesSubmit}>
                  <ModalHeader id='modalTitle'>
                    Add Games
                  </ModalHeader>
                    <ModalBody id='modalBody'>
                        <div className="form-group">
                            <label className="adminFormLabel" htmlFor="challengeGamesSelection">Select Games</label>
                            <select 
                                value={this.state.challengeGamesSelection}
                                name="challengeGamesSelection"
                                onChange={this.handleInputChange}
                                type="text"
                                className="form-control"
                                id="challengeGamesSelection"
                            >
                                <option value=''>Select One</option>
                                <option value='nbaGames'>NBA Games</option>
                                <option value='mlbGames'>MLB Games</option>
                                <option value='nflGames'>NFL Games</option>
                            </select>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                      <input type="submit" value="Submit" color="primary" className="btn btn-primary" onClick={this.handleAddTeamGamesSubmit} />
                      <Button color="danger" onClick={this.toggleAddGamesModal}>Cancel</Button>
                    </ModalFooter>
                </form>
              </Modal>

              <h1 className='adminFormHeading'>Challenge Teams Data</h1>

              <div className='row adminChallengeButtonRow'>
                  <Button className='adminChallengeButton' onClick={this.toggleAddTeamsModal}>Add Teams</Button>
                  <Button className='adminChallengeButton' onClick={this.toggleAddGamesModal}>Add Games</Button>
                  <Button className='adminChallengeButton' onClick={this.removeNbaTeamGames}>Remove Games</Button>
              </div>

              <div className="formContainer formSignUpContainer">    
              <form className="formSignUp" action="index.html">                    
                  <div id='editChalForm' className='signUpWrap'>
                    {/* <h2 className="formSignup-heading">Viewing Challenge ({this.state.currentChalName})</h2> */}
                      <div className="form-group">
                        <label className="adminFormLabel" htmlFor="teamsSelection">Select Teams</label>
                          <select 
                            value={this.state.teamsSelection}
                            name="teamsSelection"
                            onChange={this.handleInputChange}
                            type="text"
                            className="form-control"
                            id="teamsSelection"
                          >
                          <option value=''>Select One</option>
                          <option value='nbaTeams'>NBA Teams</option>
                          <option value='mlbTeams'>MLB Teams</option>
                          <option value='nflTeams'>NFL Teams</option>
                          {/* {
                            this.state.allChallenges.map((challenge) => (
                                <option 
                                  key={(uuidv4())} 
                                  value={challenge.challengeName}
                                  data-data={challenge}
                                  data-users={challenge.users}
                                  onClick={this.handleInputChange}
                                  
                                >
                                  {challenge.challengeName}
                                </option>
                            ))
                          } */}
                        </select>
                    </div>

                    {/* {
                      this.state.currentChalUsers[0] ?

                        <div className="form-group">
                          <label className="adminFormLabel" htmlFor="teamsSelection">Select User</label>
                            <select 
                              value={this.state.userData}
                              name="userData"
                              onChange={this.handleInputChange}
                              type="text"
                              className="form-control"
                              id="teamsSelection"
                            >
                            <option value=''>Select One</option>
                            {
                              this.state.currentChalUsers.map((user) => (
                                  <option 
                                    key={(uuidv4())} 
                                    value={user.username}
                                    data-data={user}
                                    data-picks={user.picks}
                                    data-wins={user.wins}
                                    onClick={this.handleInputChange}
                                  //   name={challengeData}
                                  //   onClick={this.handleInputChange}
                                  //   className='challengeSelection'
                                    
                                  >
                                    {user.username}
                                  </option>
                              ))
                            }
                          </select>
                      </div>

                    : 

                      <div>

                      </div>
                    } */}
                  </div>
                </form>

                {/* <hr className='adminFormHr' /> */}
                
                {

                  this.state.currentChallengeTeams[0] ? 

                  <div className='userDataDiv'>
                    {/* <h2>
                      {this.state.currentUserData[0].username}
                    </h2> */}
                    <br />
                    <div className="row">
                      <div className="col-12">
                        <h3 className='userDataRowHeader'>
                          All Teams
                        </h3>
                        {
                          this.state.currentChallengeTeams !== undefined ? 

                          this.state.currentChallengeTeams.map((team) => (
                            <span className='userDataPickSpan' key={uuidv4()}>
                              <p>{team.name}</p>
                            </span>
                          ))

                          :

                          <span>
                            <p>No teams listed.</p>
                          </span>
                        }
                      </div>
                      {/* <div className="col-4">
                        <h3 className='userDataRowHeader'>
                          Wins
                        </h3>
                        {
                          this.state.currentUserWins !== undefined ? 

                          this.state.currentUserWins.map((pick) => (
                            <span className='userDataPickSpan' key={uuidv4()}>
                              <p>{pick.team} | {pick.gameDate} | {pick.result}</p>
                            </span>
                          ))

                          :

                          <span>
                            <p>No picks have made.</p>
                          </span>
                        }
                      </div>
                      <div className="col-4">
                        <h3 className='userDataRowHeader'>
                          Losses
                        </h3>
                        {
                          this.state.currentUserLosses !== undefined ? 

                          this.state.currentUserLosses.map((pick) => (
                            <span className='userDataPickSpan' key={uuidv4()}>
                              <p>{pick.team} | {pick.gameDate} | {pick.result}</p>
                            </span>
                          ))

                          :

                          <span>
                            <p>No picks have made.</p>
                          </span>
                        }
                      </div> */}
                    </div>
                  </div>

                  :

                  <div>

                  </div>

                }

              {/* <ReactTable
                    filterable
                    defaultFilterMethod={(filter, row) =>
                      String(row[filter.id]) === filter.value}
                    data={users}
                    resolveData={data => data.map(row => row)}
                    columns={columns}
                    className='challengeTable'
                  /> */}
                  </div>
            </div>
        )
    }
}

export default ChallengeTeamsDB