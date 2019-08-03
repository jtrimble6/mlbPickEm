import React, { Component } from 'react'
import moment from 'moment'
import API from '../../utils/API';
import { Redirect } from 'react-router-dom'
import { Button } from 'reactstrap'

class MyChallenges extends Component {
    constructor(props) {
      super(props)
        this.state ={
          id: '',
          challengeId: '',
          username: '',
          firstName: '',
          lastName: '',
          profPic: '',
          wins: {},
          winsCount: '',
          value: '',
          myChallenges: [],
          favoriteTeam: '',
          redirect: false,
          url: ''
        }
        this.setRedirect = this.setRedirect.bind(this)
        this.renderRedirect = this.renderRedirect.bind(this)
        this.getUser = this.getUser.bind(this)
        this.findChallenges = this.findChallenges.bind(this)
        
    }

    componentWillReceiveProps() {
      this.getUser()
    }

    // REDIRECT TO CHALLENGE 
    setRedirect = (myChallenge) => {
        // console.log('REDIRECT TO: ', myChallenge.target)
        let url = myChallenge.target.dataset.url
        let challengeId = myChallenge.target.dataset.id
        // console.log('MY URL: ', url)
        // console.log('MY CHALLENGE ID: ', challengeId)
        localStorage.setItem('userChallengeId', challengeId)
        this.setState({
          url: url,
          challengeId: challengeId,
          redirect: true
        })
        // console.log('LOCAL STORAGE AGAIN: ', localStorage)
      }

    renderRedirect = () => {
      let path = this.state.url
      let challengeId = this.state.challengeId
        if (this.state.redirect) {
          // console.log('URL: ', path)
            return <Redirect 
              to={{
                pathname: path,
                state: { id: challengeId }
              }}
            />
          }
      }

    getUser = () => {
      let localUser = localStorage.getItem('user')
      let self = this
        
        API.getUser(localUser)
          .then(response => {
            let winsCount = response.data[0].wins.length
              self.setState({
                id: response.data[0]._id,
                username: response.data[0].username,
                firstName: response.data[0].firstName,
                lastName: response.data[0].lastName,
                profPic: response.data[0].img,
                wins: response.data[0].wins,
                winsCount: winsCount,
                value: response.data[0].points,
                myChallenges: this.props.myChallenges,
                favoriteTeam: response.data[0].favoriteTeam
              })
            self.findChallenges()

          })
          .catch(err => console.log(err))
    }

    findChallenges = () => {
      // let challenges = this.state.myChallenges
      // console.log('MY CHALLENGES: ', challenges)
      
    }


    render() {
        let uuidv4 = require('uuid/v4')
        let challenges = this.props.myChallenges
        return(
            <div className="myChallenges">
            {this.renderRedirect()}
              {
                (!challenges[0]) ? <Button className='challengeButton' color='warning'>Added Challenges Will Appear Here!</Button> :

                  this.props.myChallenges.map(myChallenge => (
                      <Button
                        key={uuidv4()}
                        color='warning'
                        className='challengeButton'
                        data-name={myChallenge.challengeName}
                        data-id={myChallenge._id}
                        data-url={myChallenge.url}
                        data-startdate={moment(myChallenge.challengeStartDate).format('YYYY-MM-DD')}
                        data-enddate={moment(myChallenge.challengeEndDate).format('YYYY-MM-DD')}
                        onClick={this.setRedirect}
                      >
                      {myChallenge.challengeName}
                      </Button>
                  ))

              }

              {/* {
                this.props.myChallenges.map(myChallenge => (
                    <Button
                      key={uuidv4()}
                      color='warning'
                      className='challengeButton'
                      data-name={myChallenge.challengeName}
                      data-id={myChallenge._id}
                      data-url={myChallenge.url}
                      data-startdate={moment(myChallenge.challengeStartDate).format('YYYY-MM-DD')}
                      data-enddate={moment(myChallenge.challengeEndDate).format('YYYY-MM-DD')}
                      onClick={this.setRedirect}
                    >
                    {myChallenge.challengeName}
                    </Button>
                ))
              } */}
            </div>
              
        )
    }
}

export default MyChallenges