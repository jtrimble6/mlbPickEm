import React, { Component } from 'react'
// import { Redirect } from 'react-router-dom'
// import ReactTable from "react-table";
// import matchSorter from 'match-sorter'
// import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Button } from 'reactstrap';
import moment from 'moment'
import API from '../../utils/API'
import AdminBar from '../../components/nav/AdminBar'
import '../../css/adminPage.css'

class MlbPickEmDBPage extends Component {
    constructor(props) {
        super(props) 
        this.state = {
          dropdownOpen: false,
          username: localStorage.getItem('user'),
          allChallenges: [],
          thisChallenge: {},
          todaysPick: '',
          currentChalUsers: [],
          currentChalName: 'N/A',
          currentUserName: 'N/A',
          currentUserData: {},
          currentUserPicks: [],
          currentUserWins: [],
          currentUserLosses: [],
          nlWest: [],
          nlEast: [],
          nlCentral: [],
          alWest: [],
          alEast: [],
          alCentral: [],

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
          ]
          }

          this.getChallenges = this.getChallenges.bind(this)
          this.handleInputChange = this.handleInputChange.bind(this)
          this.findUsers = this.findUsers.bind(this)
          this.findUserData = this.findUserData.bind(this)
          this.changeLogo = this.changeLogo.bind(this);
        }
    
    componentDidMount() {
        this.getChallenges()
      }

    getChallenges = () => {
        let self = this
        let teams = this.state.mlbTeams
        let nlEastTeams = (teams) => {
          return teams.division === 'NL East'
        }
        let nlWestTeams = (teams) => {
          return teams.division === 'NL West'
        }
        let nlCentralTeams = (teams) => {
          return teams.division === 'NL Central'
        }
        let alEastTeams = (teams) => {
          return teams.division === 'AL East'
        }
        let alWestTeams = (teams) => {
          return teams.division === 'AL West'
        }
        let alCentralTeams = (teams) => {
          return teams.division === 'AL Central'
        }

        let nlEast = teams.filter(nlEastTeams)
        let nlWest = teams.filter(nlWestTeams)
        let nlCentral = teams.filter(nlCentralTeams)
        let alEast = teams.filter(alEastTeams)
        let alWest = teams.filter(alWestTeams)
        let alCentral = teams.filter(alCentralTeams)

        self.setState({
          nlEast: nlEast,
          nlWest: nlWest,
          nlCentral: nlCentral,
          alEast: alEast,
          alWest: alWest,
          alCentral: alCentral
        })

        let findSport = (sport) => {
          return sport.sport === 'mlb'
        }
        API.getChallenges()
          .then(res => {
              let challenges = res.data
              console.log('CHALLENGES: ', challenges)
              let filteredChals = challenges.filter(findSport)
              console.log('ONLY MLB CHALLENGES: ', filteredChals)
              self.setState({
                  allChallenges: filteredChals
              })
          })
      }

    changeLogo = () => {
      let mlbTeams = [
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
      ]
        let wins = this.state.currentUserWins
        let allPicks = this.state.currentUserPicks
        // console.log('user wins: ', wins)
        // console.log('user picks: ', allPicks)
        
        //let matchedTeams = []
        let theseMatchingWins = []
        let teams = JSON.parse(JSON.stringify(mlbTeams))

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
        let thisTeam = ''
        let matchingTeams = (teams) => {
          return teams.name.trim() === todaysPick.trim()
        }
        let matchingWins = (userWins) => {
          return userWins.team === thisTeam
        }
        for (let j=0; j<teams.length; j++) {
          //console.log('CURRENT WINS: ', wins)
          // console.log('CURRENT TEAMS: ', teams)
          // console.log('CURRENT TEAM: ', teams[j].name)
          
          thisTeam = teams[j].name
                  
          let teamMatched = teams.filter(matchingTeams)
          if (teamMatched[0]) {
            if (teamMatched[0].name.trim() === teams[j].name.trim()) {
              // console.log('WE HAVE A PICK FOR TODAY: ', teamMatched[0].name)
              teams[j].status = 'warning'
            } 
          }

          // FIND MATCHING WINS
          theseMatchingWins = wins.filter(matchingWins)
          if (theseMatchingWins[0]) {
            teams[j].status = 'success'
          } 

          this.setState({
            mlbTeams: teams,
            todaysPick: teamMatched
          })

        let nlEastTeams = (teams) => {
          return teams.division === 'NL East'
        }
        let nlWestTeams = (teams) => {
          return teams.division === 'NL West'
        }
        let nlCentralTeams = (teams) => {
          return teams.division === 'NL Central'
        }
        let alEastTeams = (teams) => {
          return teams.division === 'AL East'
        }
        let alWestTeams = (teams) => {
          return teams.division === 'AL West'
        }
        let alCentralTeams = (teams) => {
          return teams.division === 'AL Central'
        }

        let nlEast = teams.filter(nlEastTeams)
        let nlWest = teams.filter(nlWestTeams)
        let nlCentral = teams.filter(nlCentralTeams)
        let alEast = teams.filter(alEastTeams)
        let alWest = teams.filter(alWestTeams)
        let alCentral = teams.filter(alCentralTeams)

        this.setState({
          nlEast: nlEast,
          nlWest: nlWest,
          nlCentral: nlCentral,
          alEast: alEast,
          alWest: alWest,
          alCentral: alCentral
        })
          
          // console.log('NEW TEAMS ARRAY: ', this.state.nlWest)  
        }
        

        
      }

    handleInputChange = event => {
      const { name, value } = event.target
      this.setState({
          [name]: value
      })

      if (value === 'Select One') {
        return;
      }

      if (name === 'challengeData' && value) {
        this.findUsers(value)
      } else if (name === 'challengeData') {
        this.setState({
          currentUserData: {},
          currentChalUsers: [],
          thisChallenge: {},
          userData: ''
        })
      }

      if (name === 'userData' && value) {
        // console.log('FINDING USER DATA', value)
        this.findUserData(value)
      }
      
      // if (name === 'challengeData') {
      //   this.createForm(value)
      // }
      
      }

    findUsers = (challenge) => {
      this.setState({
        currentUserData: {},
        currentChalUsers: [],
        thisChallenge: {},
        userData: ''
      })
        let allChallenges = this.state.allChallenges
        let thisChalFunc = (chal) => {
          return chal.challengeName === challenge
        }
        let thisChal = allChallenges.filter(thisChalFunc)
        // console.log('CHAL INFO: ', thisChal)
        this.setState({
          currentChalName: thisChal[0].challengeName,
          currentChalUsers: thisChal[0].users,
          thisChallenge: thisChal
        })
        // console.log('CURRENT CHAL USERS: ', this.state.currentChalUsers)
      }

    findUserData = (user) => {
      console.log('finding user data ', user)
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
      }, () => {
        console.log('NEW USER DATA: ', this.state.currentUserData)
        this.changeLogo()
      })
      console.log('CURRENT USER DATA: ', this.state.currentUserData)

      
    }
      
    

    render() {
        const uuidv4 = require('uuid/v4')
        // const users = this.state.currentChalUsers

        return(
            <div id='challengePage'>
              <AdminBar />

              <h1>Challenge User Data</h1>

              <form className="formSignup" action="index.html">                    
                  <div id='editChalForm' className='signupWrap'>
                    {/* <h2 className="formSignup-heading">Viewing Challenge ({this.state.currentChalName})</h2> */}
                      <div className="form-group">
                        <label htmlFor="challengeEditName">Select Challenge</label>
                          <select 
                            value={this.state.challengeData}
                            name="challengeData"
                            onChange={this.handleInputChange}
                            type="text"
                            className="form-control"
                            id="challengeEditName"
                          >
                          <option value=''>Select One</option>
                          {
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
                          }
                        </select>
                    </div>

                    {
                      this.state.currentChalUsers[0] ?

                        <div className="form-group">
                          <label htmlFor="challengeEditName">Select User</label>
                            <select 
                              value={this.state.userData}
                              name="userData"
                              onChange={this.handleInputChange}
                              type="text"
                              className="form-control"
                              id="challengeEditName"
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
                    }
                  </div>
                </form>

                <hr />

                {

                  this.state.currentUserData[0] ? 

                  <div>
                    {/* <h2>
                      {this.state.currentUserData[0].username}
                    </h2> */}
                    <br />
                    <div className="row">

                      <div className="col-2">
                        <h3>NL West</h3>
                        <span>
                          {
                            this.state.nlWest.map((team) => (
                              <Button key={uuidv4()} color={team.status}>
                                {team.name}
                              </Button>
                            ))
                          }
                        </span>
                      </div>

                      <div className="col-2">
                        <h3>NL East</h3>
                        <span>
                          {
                            this.state.nlEast.map((team) => (
                              <Button key={uuidv4()} color={team.status}>
                                {team.name}
                              </Button>
                            ))
                          }
                        </span>
                      </div>

                      <div className="col-2">
                        <h3>NL Central</h3>
                        <span>
                          {
                            this.state.nlCentral.map((team) => (
                              <Button key={uuidv4()} color={team.status}>
                                {team.name}
                              </Button>
                            ))
                          }
                        </span>
                      </div>

                      <div className="col-2">
                        <h3>AL West</h3>
                        <span>
                          {
                            this.state.alWest.map((team) => (
                              <Button key={uuidv4()} color={team.status}>
                                {team.name}
                              </Button>
                            ))
                          }
                        </span>
                      </div>

                      <div className="col-2">
                        <h3>AL East</h3>
                        <span>
                          {
                            this.state.alEast.map((team) => (
                              <Button key={uuidv4()} color={team.status}>
                                {team.name}
                              </Button>
                            ))
                          }
                        </span>
                      </div>

                      <div className="col-2">
                        <h3>AL Central</h3>
                        <span>
                          {
                            this.state.alCentral.map((team) => (
                              <Button key={uuidv4()} color={team.status}>
                                {team.name}
                              </Button>
                            ))
                          }
                        </span>
                      </div>
                    </div>

                    <hr />

                    <div className="row">
                      <div className="col-4">
                        <h3>
                          All Picks
                        </h3>
                        {
                          this.state.currentUserPicks.length ? 

                          this.state.currentUserPicks.map((pick) => (
                            <span className='pickInfo' key={uuidv4()}>
                              <p>{pick.team} | {pick.gameDate} | {pick.result}</p>
                            </span>
                          ))

                          :

                          <span>
                            <p>No picks have been made by this user.</p>
                          </span>
                        }
                      </div>
                      <div className="col-4">
                        <h3>
                          Wins
                        </h3>
                        {
                          this.state.currentUserWins.length ? 

                          this.state.currentUserWins.map((pick) => (
                            <span className='pickInfo' key={uuidv4()}>
                              <p>{pick.team} | {pick.gameDate} | {pick.result}</p>
                            </span>
                          ))

                          :

                          <span>
                            <p>This user has no wins.</p>
                          </span>
                        }
                      </div>
                      <div className="col-4">
                        <h3>
                          Losses
                        </h3>
                        {
                          this.state.currentUserLosses.length ? 

                          this.state.currentUserLosses.map((pick) => (
                            <span className='pickInfo' key={uuidv4()}>
                              <p>{pick.team} | {pick.gameDate} | {pick.result}</p>
                            </span>
                          ))

                          :

                          <span>
                            <p>This user has no losses.</p>
                          </span>
                        }
                      </div>
                    </div>
                  </div>

                  :

                  <div>

                  </div>

                }

            </div>
        )
    }
}

export default MlbPickEmDBPage