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
        return(
            <div className='leaderboard'>
                <h1>Leaderboard</h1>
                {
                    this.state.leaders.map((leader) => (
                        <p key={uuidv4()}>
                          {leader.username} | {leader.wins.length}
                        </p>
                    ))
                }
            </div>
        )
    }
}

export default Leaderboard