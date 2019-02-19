import React, { Component } from 'react'
import API from '../utils/API'
import Navbar from '../components/nav/Navbar'
import Leaderboard from '../components/leaderboard/Leaderboard'
import moment from 'moment';
import '../css/leaderboardPage.css'

class LeaderboardPage extends Component {

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
            <div id='leaderboardPage'>
              <Navbar />
              
              <Leaderboard 

              />
               
                
            </div>
        )
    }

}

export default LeaderboardPage