import React, { Component } from 'react'
import API from '../../utils/API'
import HomeBar from '../../components/nav/HomeBar'
import MyChallenges from '../../components/home/myChallenges'
import UpcomingChallenges from '../../components/home/upcomingChallenges'
import MessageBoard from '../../components/home/messageBoard'
// import moment from 'moment';
import $ from 'jquery'
import '../../css/home.css'

class HomePage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      redirect: false,
      id: '',
      username: '',
      profPic: '',
      firstName: '',
      lastName: '',
      wins: [],
      winsCount: 0,
      myChallenges: [],
      allActiveChallenges: []
    }
    this.handlePreloader = this.handlePreloader.bind(this)
    this.getActiveChallenges = this.getActiveChallenges.bind(this)
    this.getUserData = this.getUserData.bind(this)
  }

    componentDidMount() {
      this.getActiveChallenges()
  
    }

    handlePreloader() {
      $(".se-pre-con").fadeOut("slow");
    }

    getActiveChallenges() {
      let self = this
      API.getChallenges()
        .then(res => {
          // console.log('ACTIVE CHALLENGES: ', res.data[0])
          self.setState({
            allActiveChallenges: res.data 
          })
          self.getUserData();
        })
        .catch(err => console.log(err))
    }


    getUserData = () => {
      window.addEventListener('load', this.handlePreloader());
        let localUser = localStorage.getItem('user')
        let allChallenges = this.state.allActiveChallenges
        // console.log('ALL CHALLENGES: ', allChallenges)
        // console.log('USER: ', localUser)
        let onlyMyChals = []
        let myChalFunc = (users) => {
          return users.username === localUser
        }

        for (var t=0; t<allChallenges.length; t++) {
          // let myChal = false
          let thisChalUsers = allChallenges[t].users
          let myChalMatch = thisChalUsers.filter(myChalFunc)
          if(myChalMatch[0]) {
            onlyMyChals.push(allChallenges[t])
            // myChal = true
          }

        }
        
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
                myChallenges: onlyMyChals,
                favoriteTeam: response.data[0].favoriteTeam
              })
            console.log('MY REAL DATA: ', response.data[0])

          })
          .catch(err => console.log(err))
    }

    render() {

        return (
            <div id='homePage'>
              <div className="se-pre-con"></div>
              <HomeBar 
                username={this.state.username}
              />
              <div className='row homePageBoard'>
                <div className="col-3 myChallenges">
                  <h1>
                      My Challenges
                  </h1>
                  <MyChallenges 
                    username={this.state.username}
                    myChallenges={this.state.myChallenges}
                  />
                </div>
                <div className="col-6 upcomingChallenges">
                  <h1>
                      Upcoming Challenges
                  </h1>
                  <UpcomingChallenges 
                    username={this.state.username}
                    challenges={this.state.allActiveChallenges}
                  />
                </div>
                <div className="col-3 messageBoardPage">
                  <h1>
                      Message Board
                  </h1>
                  <MessageBoard
                    username={this.state.username}
                  />
                </div>
              </div>
            </div>
        )
    }

}

export default HomePage