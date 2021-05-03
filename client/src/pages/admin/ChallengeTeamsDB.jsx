import React, { Component } from 'react'
// import { Redirect } from 'react-router-dom'
// import ReactTable from "react-table";
// import matchSorter from 'match-sorter'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import moment from 'moment'
import API from '../../utils/API'
import AdminBar from '../../components/nav/AdminBar'
import '../../css/adminPage.css'

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
          challengeGamesSelection: ''

          }
          this.toggle = this.toggle.bind(this)
          this.toggleAddTeamsModal = this.toggleAddTeamsModal.bind(this)
          this.toggleAddGamesModal = this.toggleAddGamesModal.bind(this)
          this.getChallenges = this.getChallenges.bind(this)
          this.handleInputChange = this.handleInputChange.bind(this)
          this.findTeams = this.findTeams.bind(this)
          this.postNbaTeamGames = this.postNbaTeamGames.bind(this)
          this.findUserData = this.findUserData.bind(this)
          this.handleAddTeamsSubmit = this.handleAddTeamsSubmit.bind(this)
          this.handleAddTeamGamesSubmit = this.handleAddTeamGamesSubmit.bind(this)
          this.removeNbaTeamGames = this.removeNbaTeamGames.bind(this)
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

    removeNbaTeamGames = () => {
        console.log('THIS CHALLENGE: ', this.state.thisChallenge)
        let theChallenge = this.state.thisChallenge[0]
        for (var t=0; t<theChallenge.teams.length; t++) {
            let thisTeam = theChallenge.teams[t].abbr.toUpperCase()
            API.removeNbaGamesByTeam(thisTeam)
                .then(res => {
                    console.log('REMOVED GAMES BY TEAM: ', res)
                })
                .catch(err => console.log(err))   
        }
      }

    postNbaTeamGames = () => {
        let allGames = []
        console.log('THIS CHALLENGE: ', this.state.thisChallenge)
        API.getNbaGames()
          .then(res => {
            allGames.push(res.data)
            let theGames = allGames[0]
            let theChallenge = this.state.thisChallenge[0]
            for (var t=0; t<theChallenge.teams.length; t++) {
              let thisTeam = theChallenge.teams[t].abbr.toUpperCase()
              // console.log('ALL GAMES: ', theGames)
              // console.log('THIS TEAM: ', thisTeam)
              for (var p=0; p<theGames.length; p++) {
                let homeA = theGames[p].homeAlias
                // let awayA = theGames[p].awayAlias
                if (homeA === thisTeam) {
                  // console.log('THE GAME: ', theGames[p])
                  // console.log('THIS TEAM IS THE HOME TEAM', thisTeam)
                  API.addNbaGamesByTeam(thisTeam, theGames[p])
                    .then(res => {
                      console.log(res)
                    })
                    .catch(err => console.log(err))
                }
                // if (awayA === thisTeam) {
                //   // console.log('THE GAME: ', theGames[p])
                //   // console.log('THIS TEAM IS THE AWAY TEAM', thisTeam)
                //   API.addNbaGamesByTeam(thisTeam, theGames[p])
                //     .then(res => {
                //       console.log(res)
                //     })
                //     .catch(err => console.log(err))
                // }
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
        // let teamsSelection = this.state.challengeTeamsSelection
        // if (teamsSelection === 'nbaTeams') {
        //     this.postNbaTeamGames()
        // }
      }

    handleAddTeamGamesSubmit = (event) => {
        event.preventDefault()
        console.log('HANDLE ADD GAMES: ', this.state.challengeGamesSelection)
        let gamesSelection = this.state.challengeGamesSelection
        if (gamesSelection === 'nbaGames') {
            this.postNbaTeamGames()
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