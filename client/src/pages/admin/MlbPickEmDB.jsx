import React, { Component } from 'react'
// import { Redirect } from 'react-router-dom'
import ReactTable from "react-table";
import matchSorter from 'match-sorter'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
// import moment from 'moment'
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
          currentChalName: 'N/A',
          currentChalUsers: []

          }
          this.toggle = this.toggle.bind(this)
          this.getChallenges = this.getChallenges.bind(this)
          this.handleInputChange = this.handleInputChange.bind(this)
          this.createTable = this.createTable.bind(this)
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
        API.getChallenges()
          .then(res => {
              console.log(res.data)
              self.setState({
                  allChallenges: res.data
              })
          })
      }

    handleInputChange = event => {
      const { name, value } = event.target
      this.setState({
          [name]: value
      })
      console.log('TARGET: ', value)
      this.createTable(value)
      
      // if (name === 'challengeData') {
      //   this.createForm(value)
      // }
      
      }

    createTable = (challenge) => {
      let allChallenges = this.state.allChallenges
      let thisChalFunc = (chal) => {
        return chal.challengeName === challenge
      }
      let thisChal = allChallenges.filter(thisChalFunc)
      console.log('CHAL INFO: ', thisChal)
      this.setState({
        currentChalName: thisChal[0].challengeName,
        currentChalUsers: thisChal[0].users
      })
      console.log('CURRENT CHAL USERS: ', this.state.currentChalUsers)
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
                  Dropdown
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem header>Header</DropdownItem>
                  <DropdownItem>Some Action</DropdownItem>
                  <DropdownItem disabled>Action (disabled)</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem key={uuidv4()}>{win.win}</DropdownItem>
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

              <h1>Active Challenges</h1>

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
                                //   name={challengeData}
                                //   onClick={this.handleInputChange}
                                //   className='challengeSelection'
                                  
                                >
                                  {challenge.challengeName}
                                </option>
                            ))
                          }
                        </select>
                    </div>
                  </div>
                </form>

              <ReactTable
                    filterable
                    defaultFilterMethod={(filter, row) =>
                      String(row[filter.id]) === filter.value}
                    data={users}
                    resolveData={data => data.map(row => row)}
                    columns={columns}
                    className='challengeTable'
                  />
            </div>
        )
    }
}

export default MlbPickEmDBPage