import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import moment from 'moment'
import { Card, CardText, CardBody, CardLink,
  CardTitle, CardSubtitle, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import API from '../../utils/API';


class UpcomingChallenges extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userData: {},
            currentChallengeId: '',
            currentChallengeMax: 0,
            currentChallengeUsers: 0,
            currentChallengeName: '',
            currentChallengeUrl: '',
            currentChallengeBuyIn: '',
            currentChallengeStartDate: '',
            currentChallengeOpenSignUp: '',
            redirect: false,
            modal: false, 
            adminModal: false,
            dupAddModal: false,
            fullChalModal: false,
            closeAllAdmin: false,
            closeAllDupUser: false,
            closeAllFullChal: false,
            url: ''
        }
        this.setRedirect = this.setRedirect.bind(this)
        this.renderRedirect = this.renderRedirect.bind(this)
        this.toggle = this.toggle.bind(this)
        this.toggleAdmin = this.toggleAdmin.bind(this)
        this.toggleDupAdd = this.toggleDupAdd.bind(this)
        this.toggleFullChal = this.toggleFullChal.bind(this)
        this.toggleAllFullChal = this.toggleAllFullChal.bind(this)
        this.toggleAllAdmin = this.toggleAllAdmin.bind(this)
        this.toggleAllDupUser = this.toggleAllDupUser.bind(this)
        this.toggleEvent = this.toggleEvent.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.getUser = this.getUser.bind(this)
        
    }

    componentWillReceiveProps() {
        this.getUser()
      }

    getUser = () => {
        let username = localStorage.getItem('user')
        let self = this
        // console.log('GET THIS USER: ', username)
        API.getUser(username)
          .then(res => {
              self.setState({
                  userData: res.data[0]
              })
            //   console.log('USER DATA: ', this.state.userData)
          })
          .catch(err => console.log(err))
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        })
      }

    toggleAdmin() {
        this.setState({
            adminModal: !this.state.adminModal,
            closeAllAdmin: false
        })
      }

    toggleDupAdd() {
        this.setState({
            dupAddModal: !this.state.dupAddModal,
            closeAllDupUser: false
        })
      }

    toggleFullChal() {
        this.setState({
            fullChalModal: !this.state.fullChalModal,
            closeAllFullChal: false
        })
    }

    toggleEvent(event) {
        // console.log('TARGETTT: ', event.target)
        if (moment(event.target.dataset.openSignUp).add(8,'hours').format() < moment().format()) {
          // console.log('THIS SIGN UP ISN\'T OPEN YET!')
          return
        }
        // console.log('USER DATA: ', this.state.userData)
        event.preventDefault()
        // if (event.target.dataset)
        if (this.state.userData.admin) {
            // console.log('NO NO NO YOU ARE AN ADMIN')
            this.toggleAdmin()
        }
        this.setState({
          modal: !this.state.modal,
          currentChallengeId: event.target.dataset.id,
          currentChallengeMax: event.target.dataset.max,
          currentChallengeUsers: event.target.dataset.users,
          currentChallengeName: event.target.dataset.name,
          currentChallengeUrl: event.target.dataset.url,
          currentChallengeBuyIn: event.target.dataset.buyin,
          currentChallengeStartDate: event.target.dataset.startDate,
          currentChallengeOpenSignUp: event.target.dataset.signup
        });
      }

    toggleAllAdmin() {
        this.setState({
            modal: !this.state.modal,
            adminModal: !this.state.adminModal
        })
      }

    toggleAllDupUser() {
        this.setState({
            modal: !this.state.modal,
            dupAddModal: !this.state.dupAddModal
        })
      }

    toggleAllFullChal() {
        this.setState({
            modal: !this.state.modal,
            fullChalModal: !this.state.fullChalModal
        })
      }
    
    handleSubmit = event => {
        event.preventDefault()
        let user = this.state.userData
        let username = user.username
        // console.log('CONFIRMING ENTRY')
        // console.log('TARGET CHALLENGE ID: ', this.state.currentChallengeId)
        let challengeData = {
            challengeId: this.state.currentChallengeId,
            challengeMax: this.state.currentChallengeMax,
            challengeUsers: this.state.currentChallengeUsers,
            challengeName: this.state.currentChallengeName,
            challengeUrl: this.state.currentChallengeUrl,
            challengeBuyIn: this.state.challengeBuyIn,
            challengeStartDate: this.state.currentChallengeStartDate,
            challengeOpenSignUp: this.state.currentChallengeOpenSignUp
        }
        console.log('CHALLENGE MAX: ', challengeData.challengeMax)
        console.log('CHALLENGE USERS: ', challengeData.challengeUsers)
        if (challengeData.challengeMax !== 0 && (challengeData.challengeMax - challengeData.challengeUsers <= 0)) {
            console.log('THIS CHALLENGE IS FULL')
            this.toggleFullChal()
            return
          } else {
              console.log('THE CHALLENGE IS NOT FULL')
          }
        // debugger;
        let userData = {
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
            challenges: user.challenges,
            picks: [],
            points: 0,
            wins: [],
            losses: [],
            teams: []
        }
        // console.log('USER DATA: ', userData)
        let myCurrentChallenges = userData.challenges
        let myChallengesFunc = (myChallenges) => {
            return myChallenges.challengeId === challengeData.challengeId
        }
        let challengeMatch = myCurrentChallenges.filter(myChallengesFunc)

        if (challengeMatch[0]) {
            this.toggleDupAdd()
            return;
        } else {
            API.getChallenge(challengeData.challengeId)
              .then(res=> {
                  // console.log('MOST RECENT DATA: ', res.data)
                  let users = res.data[0].users
                  let usersCount = users.length
                  if (usersCount === challengeData.challengeMax) {
                      this.toggleFullChal()
                      return;
                  } else {
                      // console.log('THE CHALLENGE REALLY ISNT FULL')
                  }
              })
              .catch(err => console.log(err))
            // console.log('YOU CAN JOIN THIS CHALLENGE')
        }

        // ADD USER TO CHALLENGE
        API.addUserToChallenge(this.state.currentChallengeId, userData)
          .then(res => { console.log('RESPONSE: ', res) })
          .catch(err => console.log(err))

        // console.log('THIS USER: ', user.username)
        // console.log('THIS CHALLENGE DATA: ', challengeData)
        // ADD CHALLENGE TO USER DB
        API.saveUserChallenge(username, challengeData)
          .then(res => console.log(res))
          .catch(err => console.log(err))

        // debugger;
        this.toggle()
        window.location.reload()
      }
    
    setRedirect = (challenge) => {
        // console.log('REDIRECT TO: ', challenge.target)
        let url = ''
        if (challenge.target.type) {
            let thisUrl = challenge.target
            let thisUrlAlt = thisUrl.attributes['data'].value
            url = thisUrlAlt
        } else {
            let thisUrl = challenge.target.alt
            let teamAlt = thisUrl.trim()
            let thisUrlAlt = teamAlt
            url = thisUrlAlt
        }
        // console.log('URL: ', url)
        this.setState({
            redirect: true,
            url: url
        })
      }

    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to={this.state.url} />
          }
      }
    render() {
        let uuidv4 = require('uuid/v4')
        let noMax = '--'
        return(
            <div className="upcomingChallenges">
            {this.renderRedirect()}
              {/* <div className="col-5 challengeCardMain"> */}

            {
              (!this.props.challenges[0]) ? <Button className='challengeButton' color='warning'>Open Challenges Will Appear Here!</Button> :

              this.props.challenges.map(challenge => (
                <div key={uuidv4()} className='challengeCard' data={challenge.url}>
                    <Card>
                      <CardBody>
                        <CardTitle>{challenge.challengeName}</CardTitle><hr />
                        <CardLink className='signUp' onClick={this.toggleEvent} data-buyin={challenge.buyIn} data-id={challenge._id} data-name={challenge.challengeName} data-url={challenge.url} data-startdate={challenge.startDate} data-signup={challenge.openSignUp} data-max={challenge.maxEntries} data-users={challenge.users.length}>
                          Sign Up Now
                        </CardLink><hr />
                        <CardSubtitle className='buyIn'>
                            Entry: <i className="fas fa-strikethrough"></i>{challenge.buyIn}
                        </CardSubtitle>
                        <CardSubtitle className='signUpDate'>
                            Sign Up Opens: ({moment(challenge.openSignUp).add(8,'hours').format('MM-DD')})
                        </CardSubtitle>
                        <CardSubtitle className='signUpDate'>
                            Challenge Begins: ({moment(challenge.startDate).format('MM-DD')})
                        </CardSubtitle>
                        <CardSubtitle className='maxEntries'>
                            Max Entries: {
                                (challenge.maxEntries > 0) ? challenge.maxEntries : noMax
                              }
                        </CardSubtitle>
                        <CardSubtitle className='remainingSpots'>
                            Remaining Spots: {
                                (challenge.maxEntries > 0) ? (challenge.maxEntries - challenge.users.length) : noMax
                              }
                        </CardSubtitle>
                        </CardBody>
                          <img width="100%" src={require('../../css/images/' + challenge.img.toLowerCase() + '')} alt={challenge.name} />
                        <CardBody>
                        <CardText className='challengeInfo'><em>{challenge.info}</em></CardText>
                        {/* <CardLink href="#">Bookmark Challenge</CardLink><br /> */}
                        <CardLink className='rulesLink' href={challenge.rulesUrl}>Checkout The Rules</CardLink><br />
                        
                      </CardBody>
                    </Card>
                    <Modal 
                        isOpen={this.state.modal} 
                        autoFocus={true}
                        centered={true}
                        size='lg'
                        className='challengeModal'
                    >
                        <form onSubmit={this.handleSubmit}>
                        <ModalHeader id='modalTitle'>
                            Confirm Entry
                        </ModalHeader>
                            <ModalBody id='modalBody'>
                            <Modal className='invPick' isOpen={this.state.dupAddModal} toggle={this.toggleAllDupUser} onClosed={this.state.closeAllDupUser ? this.toggle : undefined}>
                              <ModalHeader>Duplicate entry</ModalHeader>
                                <ModalBody>You are already in this Challenge!</ModalBody>
                                <ModalFooter>
                                  <Button color="secondary" onClick={this.toggleAllDupUser}>Close All</Button>
                                </ModalFooter>
                            </Modal>
                            <Modal className='invPick' isOpen={this.state.adminModal} toggle={this.toggleAdmin} onClosed={this.state.closeAllAdmin ? this.toggle : undefined}>
                              <ModalHeader>Forbidden entry</ModalHeader>
                                <ModalBody>You are an admin!</ModalBody>
                                <ModalFooter>
                                  <Button color="secondary" onClick={this.toggleAllAdmin}>Close All</Button>
                                </ModalFooter>
                            </Modal>
                            <Modal className='invPick' isOpen={this.state.fullChalModal} toggle={this.toggleAllFullChal} onClosed={this.state.closeAllFullChal ? this.toggle : undefined}>
                              <ModalHeader>Challenge is full</ModalHeader>
                                <ModalBody>Sorry, this challenge is already full!</ModalBody>
                                <ModalFooter>
                                  <Button color="secondary" onClick={this.toggleAllFullChal}>Close All</Button>
                                </ModalFooter>
                            </Modal>


                                <div className="thisChallenge row">
                                    Are you sure you want to join the
                                    <strong>{this.state.currentChallengeName}</strong> 
                                    for 
                                    <strong><i className="fas fa-strikethrough"></i>{this.state.currentChallengeBuyIn}</strong>
                                    ?
                                </div>
                                {/* <div className="challengeStatus row">
                                    Start Date: {moment(challenge.startDate).format('YYYY-MM-DD')}
                                </div> */}
                            </ModalBody>
                            <ModalFooter>
                                <input type="submit" value="Confirm Entry" color="primary" className="btn btn-primary" onClick={this.handleSubmit} />
                                <Button color="danger" onClick={this.toggle}>Cancel</Button>
                            </ModalFooter>
                        </form>
                        </Modal>
                      </div>
                    ))

                  }
              {/* </div> */}
            </div>
              
        )
    }
}

export default UpcomingChallenges
