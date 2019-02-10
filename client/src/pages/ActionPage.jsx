import React, { Component } from 'react'
import API from '../utils/API'
import Navbar from '../components/nav/Navbar'
import ProfileBar from '../components/profile/profileBar'
import Calendar from '../components/calendar/Calendar'
import Leaderboard from '../components/leaderboard/Leaderboard'
import Games from '../components/games/Games'
import moment from 'moment';
import '../css/actionPage.css'

class ActionPage extends Component {

    state = {
        redirect: false,
        username: '',
        profPic: '',
        firstName: '',
        lastName: '',
        wins: [],
        winsCount: 0,
        myPicks: [],
        todaysPick: 'No Pick'
    }

    componentDidMount() {
        this.getUserData();
    }

    getUserData = () => {
        let localUser = localStorage.getItem('user')
        console.log(localUser)
        API.getUser(localUser)
          .then(response => {
            let winsCount = response.data[0].wins.length
              this.setState({
                  id: response.data[0]._id,
                  username: response.data[0].username,
                  firstName: response.data[0].firstName,
                  lastName: response.data[0].lastName,
                  profPic: response.data[0].img,
                  wins: response.data[0].wins,
                  winsCount: winsCount,
                  myPicks: response.data[0].picks
              })
              this.getTodaysPick()
            //   console.log('ID: ', this.state.id)
            //   console.log('Username: ', this.state.username)
            //   console.log('First name: ', this.state.firstName)
            //   console.log('Last name: ', this.state.lastName)
            //   console.log('Wins Count: ', this.state.winsCount)
            //   console.log('My picks: ', this.state.myPicks)
          })
          .catch(err => console.log(err))
    }

    getTodaysPick = () => {
        let today = moment().format('YYYY-MM-DD')
        let myPicks = this.state.myPicks
        for (var j=0; j<myPicks.length; j++) {
            let pickDate = myPicks[j].gameDate
            if (pickDate === today) {
                this.setState({todaysPick: myPicks[j].team})
            }
        }

    }

    render() {

        return (
            <div id='actionPage'>
              <Navbar />
              <ProfileBar
                username={this.state.username}
                winsCount={this.state.winsCount}
                todaysPick={this.state.todaysPick}

              />
              <div className='row'>
                <div className='calBoard col-md-9'>
                  <Calendar 
                    username={this.state.username}
                  />
                </div>
                <div className='col-md-2'>
                <div className="leaders row">
                  <Leaderboard   
                  />
                </div>
                <div className="winningTeams row">
                  <Games 
                    username={this.state.username}
                  />
                </div>
                
                  
                </div>
              </div>
            </div>
        )
    }

}

export default ActionPage