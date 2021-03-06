import React, { Component } from 'react'
import API from '../../utils/API'
import HomeBar from '../../components/nav/HomeBar'
import Footer from '../../components/nav/Footer'
import MyChallenges from '../../components/home/myChallenges'
import UpcomingChallenges from '../../components/home/upcomingChallenges'
import MessageBoard from '../../components/home/messageBoard'
// import ChallengeDelay from '../../components/alerts/ChallengeDelay'
import moment from 'moment';
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
      value: 0,
      myChallenges: [],
      allActiveChallenges: [],
      allRecentChallenges: [],
      challengeDelay: true

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
      let recentDate = moment().subtract(31, 'days').format('YYYY-MM-DDT00:00:00.000Z')
      console.log('RECENT DATE: ', recentDate)
      API.getChallenges()
        .then(res => {
          // console.log('ACTIVE CHALLENGES: ', res.data)
          let allChals = res.data
          let findActiveChals = (chals) => {
            return (chals.challengeStatus === 'active')
          }
          let findRecentChals = (chals) => {
            return (chals.challengeStatus === 'active' && chals.startDate >= recentDate)
          }
          let activeChallenges = allChals.filter(findActiveChals)
          let recentChallenges = allChals.filter(findRecentChals)
          console.log('RECENT CHALS: ', recentChallenges)
          self.setState({
            allActiveChallenges: activeChallenges,
            allRecentChallenges: recentChallenges
          })
          self.getUserData();
        })
        .catch(err => console.log(err))
    }


    getUserData = () => {
      window.addEventListener('load', this.handlePreloader());
        let localUser = localStorage.getItem('user')
        let allChallenges = this.state.allActiveChallenges
        console.log('ALL CHALLENGES: ', allChallenges)
        // console.log('USER: ', localUser)
        let onlyMyChals = []
        let myChalFunc = (users) => {
          return users.username === localUser
        }

        for (var t=0; t<allChallenges.length; t++) {
          // let myChal = false
          let thisChalUsers = allChallenges[t].users
          // console.log('THIS CHAL USERS: ', thisChalUsers)
          let myChalMatch = thisChalUsers.filter(myChalFunc)
          if(myChalMatch[0]) {
            onlyMyChals.push(allChallenges[t])
            // myChal = true
          }

        }
        // console.log('MY CHALLENGES: ', onlyMyChals)
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
                value: response.data[0].points,
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

            {/* BANNER */}
              {/* <div className="row chalDelay">
                <div className="col-12">
                  <ChallengeDelay 
                    challengeDelay={this.state.challengeDelay}
                  />
                </div>
              </div> */}


              <div className='homePageBoard'>
                <div className='row'>
                  <div className='col-3 homeBoardLeftColumn'>
                    <div className="row myChallengesCol">
                      <h1>
                          My Challenges
                      </h1>
                      <MyChallenges 
                        username={this.state.username}
                        myChallenges={this.state.myChallenges}
                      />
                    </div>
                    <div className="row messageBoardCol">
                      <h1>
                          Message Board
                      </h1>
                      <MessageBoard
                        username={this.state.username}
                      />
                    </div>
                  </div>
                
                  <div className='col-9 homeBoardRightColumn'>
                    <div className="row upcomingChallengesCol">
                      <h1>
                          Open Challenges
                      </h1>
                      <UpcomingChallenges 
                        username={this.state.username}
                        challenges={this.state.allRecentChallenges}
                      />
                    </div>
                  </div>
                </div>

              </div>
              <Footer />
            </div>
        )
    }

}

export default HomePage