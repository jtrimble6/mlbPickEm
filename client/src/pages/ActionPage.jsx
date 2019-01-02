import React, { Component } from 'react'
import API from '../utils/API'
import Navbar from '../components/nav/Navbar'
import ProfileBar from '../components/profile/profileBar'
import Calendar from '../components/calendar/Calendar'
import '../css/actionPage.css'

class ActionPage extends Component {

    state = {
        redirect: false,
        username: '',
        profPic: '',
        firstName: '',
        lastName: '',
        points: '',
        myPicks: [],
    }

    componentDidMount() {
        this.getUserData();
    }

    getUserData = () => {
        let localUser = localStorage.getItem('user')
        console.log(localUser)
        API.getUser(localUser)
          .then(response => {
              this.setState({
                  username: response.data[0].username,
                  firstName: response.data[0].firstName,
                  lastName: response.data[0].lastName,
                  profPic: response.data[0].img,
                  points: response.data[0].points,
                  myPicks: response.data[0].picks
              })
              console.log('Username: ', this.state.username)
              console.log('First name: ', this.state.firstName)
              console.log('Last name: ', this.state.lastName)
              console.log('Points: ', this.state.points)
              console.log('My picks: ', this.state.myPicks)
          })
          .catch(err => console.log(err))
    }

    render() {

        return (
            <div id='actionPage'>
              <Navbar />
              <ProfileBar
                username={this.state.username}
                points={this.state.points}

              />
              <div className='col-md-8'>
                <Calendar />
              </div>

              <div className='col-md-4'>
                
              </div>
              
            </div>
        )
    }

}

export default ActionPage