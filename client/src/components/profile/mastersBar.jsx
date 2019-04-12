import React, { Component } from 'react';
// import moment from 'moment';
//import { Link } from 'react-router-dom';
import '../../css/profileBar.css'
import API from '../../utils/API';
// import { Button, Jumbotron, Container, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { Jumbotron, Container } from 'reactstrap'
// import $ from 'jquery'
//import { atl, bkn, bos, cha, chi, cle, dal, den, det, gsw, hou, ind, lac, lal, mem, mia, mil, min, nop, nyk, okc, orl, phi, phx, por, sac, sas, tor, uta, was } from '../../css/nbaLogos'

class MastersBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            currentUser: {},
            challengeData: {},
            userId: '',
            userPar: '',
            parCount: '',
            userPicks: [],
            userPickedDate: '',
            todaysPick: this.props.todaysPick,
            mastersDates: [],
        }
        
        this.findNextDays = this.findNextDays.bind(this);
        this.getChallengeData = this.getChallengeData.bind(this);
        this.getUserData = this.getUserData.bind(this);
      }

    componentDidMount() {
      this.getChallengeData()
      // this.findNextDays()
      // this.postTeams()
      // this.postTeamGames()
      }

    findNextDays = () => {
      let mastersDates = [
        {
          name: 'THU',
          date: '2019-04-11',
          golfer1: '',
          golfer2: '',
          score: ''
        },
        {
          name: 'FRI',
          date: '2019-04-12',
          golfer1:'',
          golfer2: '',
          score: ''
        },
        {
          name: 'SAT',
          date: '2019-04-13',
          golfer1: '',
          golfer2: '',
          score: ''
        },
        {
          name: 'SUN',
          date: '2019-04-14',
          golfer1: '',
          golfer2: '',
          score: ''
        }

      ]
      
      // this.setState({
      //   mastersDates: mastersDates
      // })
      
      let userPicks = this.state.userPicks
      console.log('USER PICKS: ', userPicks)
      for (var k=1; k<userPicks.length; k++) {
        if (userPicks[k]) {
          mastersDates[k-1].golfer1 = userPicks[k].golfer1
          mastersDates[k-1].golfer2 = userPicks[k].golfer2
          mastersDates[k-1].score = userPicks[k].result
        }
      }

      this.setState({
        mastersDates: mastersDates
      })

      console.log('MY RECENT PICKS AREA: ', mastersDates)

      }
 
    getChallengeData = () => {
      // console.log('CHALLENGE ID: ', localStorage.getItem('userChallengeId'))
      let self = this
      // DEVELOPMENT
      // let challengeId = '5ca42756e334ea0fb2e7fffd'
      // let challengeId = '5c9ba1f709237528c630baa8'
      // let challengeId = '5c9d00af9c45e400175c56a3'
      let challengeId = localStorage.getItem('userChallengeId')
      this.setState({
        challengeId: challengeId
      })
      API.getChallenge(challengeId)
        .then(res => {
          // console.log(res)
          self.setState({
            challengeData: res.data[0]
          })
          self.getUserData()
        })
        .catch(err => console.log(err))
      }
  
    getUserData = () => {
      let localUser = localStorage.getItem('user')
      let chalUsers = this.state.challengeData.users

      // FILTER OUT THIS USER AND SET STATE
      let chalFilter = (challengers) => {
        return challengers.username === localUser
      }
      let thisUser = chalUsers.filter(chalFilter)

      this.setState({
        currentUser: thisUser[0],
        userId: thisUser[0].username,
        userPar: thisUser[0].score,
        parCount: thisUser[0].score,
        userPicks: thisUser[0].picks,
      })
      // this.changeLogo()
      this.findNextDays()

      // $(document).ready(function(){
      //   $('.userPicks').animate({scrollTop: '300%'}, 1000);
      //   return false;
      // });

      // console.log('CURRENT USER: ', this.state.currentUser)
      // console.log('CHAL USERS DATA: ', this.state.challengeData.users)
        }  

    

    render() {              
        let uuidv4 = require('uuid/v4')
        //let teams = this.state.challengeData.teams   
        // let modalStyle = {
        //   backgroundColor: 'gold',
        //   color: 'darkblue'
        //   }      
        
        return (

          <div className="row profileBar">
            <div className="col-8">
              <Jumbotron>
                <Container fluid>
                  <div className="display-4">
                    <h2>{this.props.username.toUpperCase()}</h2> <hr />
                    <h4 className='winsTitle'>Today's Duo</h4> 
                      {
                        this.props.todaysPicks !== ' & ' ? this.props.todaysPicks : 'No Selection'
                      } <br />
                    <div className="row">
                      <div className="col-md-3">
                        <h4 className='winsHeader'>Your Score</h4> {this.props.par > 0 ? '+' + this.props.par : this.props.par}
                      </div>
                      <div className="col-md-3">
                        <h4 className='winsHeader'>Strokes Back</h4> {this.props.par - this.props.parLeader}
                      </div>  
                      { /* <div className="col-md-3">
                        <h4 className='winsHeader'>Place</h4> {this.props.parCount}
                      </div> */ }
                    </div>
                  </div>
                </Container>
              </Jumbotron>
            </div>
            <div className="col-4">
              <div className='row recentPicksRow'>
                <div className="col-10 recentPicks userPicks picks">
                  <table className='table table-hover'>
                    <thead>
                      <tr>
                        <th>Day</th>
                        <th>My Golfer(s)</th>
                        <th>Score</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        this.state.mastersDates.map((mastersDate, i) => (
                          <tr key={uuidv4()} className='golfPicks'>
                          {/* <tr key={uuidv4()} className={mastersDate.result}> */}
                            <td>{mastersDate.name}</td>
                            <td>
                              {
                                mastersDate.golfer2 !== '' || undefined ? mastersDate.golfer1 + ' & ' + mastersDate.golfer2 : mastersDate.golfer1 !== '' ? mastersDate.golfer1 : ''
                              }
                            </td>
                            <td>
                              {
                                mastersDate.score !== '' ? mastersDate.score : mastersDate.score > 0 ? '+' + mastersDate.score : mastersDate.score
                              }
                            </td>
                          </tr> 
                            )
                          )     
                      }
                        
                    </tbody>
                  </table>
                </div>
                <div className="col-1 title">
                  <h3>My Golfers</h3>
                </div>
              </div>
            </div>
              {/* <div className="row teamLogos">
                {
                  this.state.teams.map((team, i) => (
                    <Button 
                      key={uuidv4()}
                      onClick={this.findTeamGames}
                      color={team.status} 
                      className='teamButton'
                      data={team.abbr}
                    >
                        <img
                        className='profLogo'
                        src={team.logo}
                        alt={team.abbr}
                        fluid='true'
                        />
                        <br />
                        {team.abbr.toUpperCase()}
                    </Button>
                  ))
                }

              <Modal 
                isOpen={this.state.modal} 
                autoFocus={true}
                centered={true}
                size='lg'
                className='fullCalModal'
              >
                
                <ModalHeader id='modalTitle'>
                  Upcoming Games ({this.state.activeTeam.teamName})
                </ModalHeader>
                  <ModalBody id='modalBody' className='nextGames' style={modalStyle}>
                      <div className="thisTeam">
                        <table className='table  table-hover'>
                          <thead>
                            <tr>
                              <th>Date</th>
                              <th>Matchup</th>
                            </tr>
                          </thead>
                          <tbody>
                          {
                            this.state.nextGames.map((nextGame) => (
                              <tr key={uuidv4()} className={(moment().format('YYYY-MM-DD') === nextGame.game.gameDate) ? 'today' : nextGame.status} >
                                <td>{moment(nextGame.game.gameDate).format('MM-DD')}</td>
                                <td>{nextGame.gameDetails}</td>
                              </tr>
                            ))
                          }    
                          </tbody>
                        </table>
                      </div> <hr />
                      
                  </ModalBody>
                  <ModalFooter>
                    <Button color="secondary" onClick={this.toggle}>Close</Button>
                  </ModalFooter>
                </Modal>
              </div> */}
            </div>
        )
    }
}

export default MastersBar