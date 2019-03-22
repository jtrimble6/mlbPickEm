import React, { Component } from 'react'
// import { Redirect } from 'react-router-dom'
import ReactTable from "react-table";
import matchSorter from 'match-sorter'
// import moment from 'moment'
import API from '../../utils/API'
import AdminBar from '../../components/nav/AdminBar'
import '../../css/adminPage.css'

class UsersPage extends Component {
    constructor(props) {
        super(props) 
        this.state = {
          username: localStorage.getItem('user'),
          allUsers: [],
          realUsers: []
          }
        
          this.getUsers = this.getUsers.bind(this)
          this.filterUsers = this.filterUsers.bind(this)
        }
    
    componentDidMount() {
        this.getUsers()
      }
    
    getUsers = () => {
        let self = this
        API.getUsers()
          .then(res => {
              console.log(res.data)
              self.setState({
                  allUsers: res.data
              })
              self.filterUsers()
          })
    }

    filterUsers = () => {
      let users = this.state.allUsers
      let filterUsersFunc = (users) => {
        return users.admin === false
      }
      let onlyUsers = users.filter(filterUsersFunc)
      console.log('ONLY THE REAL USERS: ', onlyUsers)
      this.setState({
        realUsers: onlyUsers
      })
    }
      
    

    render() {
        // const uuidv4 = require('uuid/v4')
        const users = this.state.realUsers
        const columns = [{
          Header: 'Username',
          headerClassName: 'gamesHeaders',
          accessor: 'username',
          Cell: props => <span className='usernames'>{props.value}</span>,
          filterMethod: (filter, rows) =>
            matchSorter(rows, filter.value, { keys: ["username"] }),
            filterAll: true
          },
        {
          Header: 'Email',
          headerClassName: 'gamesHeaders',
          accessor: 'email',
          Cell: props => <span className='email'>{props.value}</span>,
          filterMethod: (filter, rows) =>
            matchSorter(rows, filter.value, { keys: ["email"] }),
            filterAll: true
        }
      
      ]

        return(
            <div id='editUsersPage'>
              <AdminBar />

              <h1>Active Users</h1>

              <ReactTable
                    filterable
                    defaultFilterMethod={(filter, row) =>
                      String(row[filter.id]) === filter.value}
                    data={users}
                    resolveData={data => data.map(row => row)}
                    columns={columns}
                    className='usersTable'
                  />
            </div>
        )
    }
}

export default UsersPage