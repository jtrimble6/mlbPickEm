import React, { Component } from 'react'
import $ from 'jquery'
import API from '../../utils/API'
import '../../css/leaderboard.css'

class Leaderboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allUsers: [],
            leaders: [],
            userPlace: {},

        }
        this.getUsers = this.getUsers.bind(this);
        this.createLeaderboard = this.createLeaderboard.bind(this);
    }
    componentDidMount() {
        this.getUsers()
      }

    getUsers = () => {
        let self = this
        API.getUsers()
          .then(res => {
            //   console.log('THESE ARE ALL THE USERS: ', res.data)
              self.setState({ allUsers: res.data })
              self.createLeaderboard()
          })
      }

    createLeaderboard = () => {
        let users = this.state.allUsers
        // console.log('Create leaderboard with this data: ', users)
        let placedUsers = users.map(function(el, i) {
            return { index: i, value: el.wins }
        })
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

        this.setState({ leaders: leaders })

        // console.log('NEW LEADERBOARD: ', this.state.leaders)
        
    }

    render() {
        let uuidv4 = require('uuid/v4')
        let leaderStyle = {
            overflow: 'scroll'
        }
        return(
            <div className='leaderboard'>
                <h2>Leaderboard</h2>
                <table className='table table-striped table-hover'>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>User</th>
                        <th>Points</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                      this.state.leaders.map((leader, i) => (
                        <tr key={uuidv4()}>
                        <td className='leaderRow' style={leaderStyle}>{i+1}</td>
                        <td className='leaderRow' style={leaderStyle}>{leader.username}</td>
                        <td className='leaderRow' style={leaderStyle}>{leader.wins.length}</td>
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