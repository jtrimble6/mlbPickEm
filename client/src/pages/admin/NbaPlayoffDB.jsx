import React, { Component } from 'react'
// import { Redirect } from 'react-router-dom'
// import ReactTable from "react-table";
import matchSorter from 'match-sorter'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import moment from 'moment'
import API from '../../utils/API'
import AdminBar from '../../components/nav/AdminBar'
import '../../css/adminPage.css'

class NbaPlayoffDBPage extends Component {
    constructor(props) {
        super(props) 
        this.state = {
          dropdownOpen: false,
          username: localStorage.getItem('user'),
          allChallenges: [],
          thisChallenge: {},
          currentChalUsers: [],
          currentChalName: 'N/A',
          currentUserName: 'N/A',
          currentUserData: {},
          currentUserPicks: [],
          currentUserWins: [],
          currentUserLosses: []

          }
          this.toggle = this.toggle.bind(this)
          this.getChallenges = this.getChallenges.bind(this)
          this.handleInputChange = this.handleInputChange.bind(this)
          this.findUsers = this.findUsers.bind(this)
          this.findUserData = this.findUserData.bind(this)
        }
    
    componentDidMount() {
        this.getChallenges()
      }

    toggle() {
      this.setState(prevState => ({
        dropdownOpen: !prevState.dropdownOpen
      }));
      }

    getChallenges = () => {
        let self = this
        let findSport = (sport) => {
          return sport.sport === 'nba'
        }
        API.getChallenges()
          .then(res => {
              let challenges = res.data
              console.log('CHALLENGES: ', challenges)
              let filteredChals = challenges.filter(findSport)
              console.log('ONLY NBA PLAYOFF CHALLENGES: ', filteredChals)
              self.setState({
                  allChallenges: filteredChals
              })
          })
      }

    handleInputChange = event => {
      const { name, value } = event.target
      this.setState({
          [name]: value
      })
      console.log('TARGET: ', value)
      if (name === 'challengeData') {
        this.findUsers(value)
      }

      if (name === 'userData') {
        console.log('FINDING USER DATA')
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
        console.log('CHAL INFO: ', thisChal)
        this.setState({
          currentChalName: thisChal[0].challengeName,
          currentChalUsers: thisChal[0].users,
          thisChallenge: thisChal
        })
        console.log('CURRENT CHAL USERS: ', this.state.currentChalUsers)
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
      
    

    render() {
        const uuidv4 = require('uuid/v4')
        const users = this.state.currentChalUsers
        const columns = [{
          Header: 'Username',
          headerClassName: 'gamesHeaders',
          accessor: 'username',
          Cell: props => <span className='chalUsers'>{props.value}</span>,
          filterMethod: (filter, rows) =>
            matchSorter(rows, filter.value, { keys: ["username"] }),
            filterAll: true
          },
        {
          Header: 'Wins',
          headerClassName: 'gamesHeaders',
          accessor: 'wins',
          Cell: props => 
            <span>
              {props.value.map(win => (
              <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                <DropdownToggle caret>
                  Wins
                </DropdownToggle>
                <DropdownMenu>
                  {/* <DropdownItem header>Header</DropdownItem>
                  <DropdownItem>Some Action</DropdownItem>
                  <DropdownItem disabled>Action (disabled)</DropdownItem>
                  <DropdownItem divider /> */}
                  <DropdownItem key={uuidv4()}>{win.win}</DropdownItem><br />
                </DropdownMenu>
              </Dropdown>
              ))}
              
            </span>,
          filterMethod: (filter, rows) =>
            matchSorter(rows, filter.value, { keys: ["wins"] }),
            filterAll: true
        }
      
      ]

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
                      <div className="col-4">
                        <h3>
                          All Picks
                        </h3>
                        {
                          this.state.currentUserPicks !== undefined ? 

                          this.state.currentUserPicks.map((pick) => (
                            <span className='pickInfo' key={uuidv4()}>
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
                        <h3>
                          Wins
                        </h3>
                        {
                          this.state.currentUserWins !== undefined ? 

                          this.state.currentUserWins.map((pick) => (
                            <span className='pickInfo' key={uuidv4()}>
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
                        <h3>
                          Losses
                        </h3>
                        {
                          this.state.currentUserLosses !== undefined ? 

                          this.state.currentUserLosses.map((pick) => (
                            <span className='pickInfo' key={uuidv4()}>
                              <p>{pick.team} | {pick.gameDate} | {pick.result}</p>
                            </span>
                          ))

                          :

                          <span>
                            <p>No picks have made.</p>
                          </span>
                        }
                      </div>
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
        )
    }
}

export default NbaPlayoffDBPage