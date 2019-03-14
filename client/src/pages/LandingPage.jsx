import React, { Component } from 'react'
import API from '../utils/API'
import LandingBar from '../components/nav/LandingBar'
import MyChallenges from '../components/landing/myChallenges'
import UpcomingChallenges from '../components/landing/upcomingChallenges'
import moment from 'moment';
import $ from 'jquery'
import '../css/landing.css'

class LandingPage extends Component {

    state = {
        redirect: false,
        id: '',
        username: '',
        profPic: '',
        firstName: '',
        lastName: '',
        wins: [],
        winsCount: 0,
        myChallenges: [],
        allChallenges: []
    }

    componentDidMount() {
      this.getUserData();
    }

    handlePreloader() {
      $(".se-pre-con").fadeOut("slow");
    }


    getUserData = () => {
      window.addEventListener('load', this.handlePreloader());
        let localUser = localStorage.getItem('user')
        console.log(localUser)
        let allChallenges = [
            {
                name: '2019 MLB PICK EM',
                startDate: '2019-03-28',
                info: 'MLB Season is here! Checkout out the 2019 MLB Challenge!',
                img: 'mlbpickemchallenge.jpeg',
                url: '/action'
            },
            {
                name: '2019 NBA PLAYOFF CHALLENGE',
                startDate: '2019-04-01',
                info: 'Checkout out the 2019 NBA Playoff Challenge!',
                img: 'nbaplayoffchallenge.jpg',
                url: '/action'
            },
            {
                name: '2019 MASTERS CHALLENGE',
                startDate: '2019-04-07',
                info: 'Looking for a fun way to cheer on your favorite golfers in Augusta? Check out the 2019 Masters Challenge!',
                img: 'masterschallenge.jpg',
                url: '/action'
            },
        ]
        let myChallenges = [
            {
                name: '2019 MLB PICK EM',
                startDate: '2019-03-28',
                url: '/action'
            },
            {
                name: '2019 NBA PLAYOFF CHALLENGE',
                startDate: '2019-04-01',
                url: '/action'
            },
            {
                name: '2019 MASTERS CHALLENGE',
                startDate: '2019-04-07',
                url: '/action'
            },
        ]
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
                myChallenges: myChallenges,
                allChallenges: allChallenges
              })

          })
          .catch(err => console.log(err))
    }

    render() {

        return (
            <div id='actionPage'>
              <div className="se-pre-con"></div>
              <LandingBar 
                username={this.state.username}
              />
              <div className='row landingBoard'>
                <div className="col-md-3 myChallenges">
                  <h1>
                      My Challenges
                  </h1>
                  <MyChallenges 
                    username={this.state.username}
                    challenges={this.state.myChallenges}
                  />
                </div>
                <div className="col-md-6 upcomingChallenges">
                  <h1>
                      Upcoming Challenges
                  </h1>
                  <UpcomingChallenges 
                    challenges={this.state.allChallenges}
                  />
                </div>
                <div className="col-md-3 messageBoard">
                  <h1>
                      Message Board
                  </h1>
                </div>
              </div>
            </div>
        )
    }

}

export default LandingPage