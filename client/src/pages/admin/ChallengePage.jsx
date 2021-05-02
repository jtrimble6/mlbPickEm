import React, { Component } from 'react'
// import { Redirect } from 'react-router-dom'
import ReactTable from "react-table-6";  
import "react-table-6/react-table.css" 
import {matchSorter} from 'match-sorter'
// import moment from 'moment'
import API from '../../utils/API'
import AdminBar from '../../components/nav/AdminBar'
import '../../css/adminPage.css'

class ChallengePage extends Component {
    constructor(props) {
        super(props) 
        this.state = {
          username: localStorage.getItem('user'),
          allChallenges: [],
          currentChalName: 'N/A',
          currentChalUsers: []
          }
        
          this.getChallenges = this.getChallenges.bind(this)
          this.handleInputChange = this.handleInputChange.bind(this)
          this.createTable = this.createTable.bind(this)
        }
    
    componentDidMount() {
        this.getChallenges()
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
          Header: 'Score',
          headerClassName: 'gamesHeaders',
          accessor: 'wins',
          Cell: props => <span className='points'>{props.value}</span>,
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

export default ChallengePage