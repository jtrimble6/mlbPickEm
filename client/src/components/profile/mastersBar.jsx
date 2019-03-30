import React, { Component } from 'react';
import moment from 'moment';
//import { Link } from 'react-router-dom';
import '../../css/profileBar.css'
import API from '../../utils/API';
// import { Button, Jumbotron, Container, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { Jumbotron, Container } from 'reactstrap'
import $ from 'jquery'
//import { atl, bkn, bos, cha, chi, cle, dal, den, det, gsw, hou, ind, lac, lal, mem, mia, mil, min, nop, nyk, okc, orl, phi, phx, por, sac, sas, tor, uta, was } from '../../css/nbaLogos'

class MastersBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            currentUser: {},
            challengeData: {},
            userId: '',
            userPar: [],
            parCount: '',
            thisTeam: '',
            userPicks: [],
            todaysPick: this.props.todaysPick,
            pastPicks: [],
            activeTeam: {},
            nextDays: [],
            pastFutureDates: [],
            recentDate: '',
            nextGames: [],
            matchingGames: [],
            currentGameDate: '',
            recentPicks: [],
            sortedPicks: [],
            oldPicks: [],
            allGames: [],
            homeGames: [],
            awayGames: [],
            teams: []
        }

        this.toggle = this.toggle.bind(this);
        this.toggleActive = this.toggleActive.bind(this);
        // this.findScore = this.findScore.bind(this);
        // this.changeLogo = this.changeLogo.bind(this);
        // this.postTeams = this.postTeams.bind(this);
        // this.findTeamGames = this.findTeamGames.bind(this);
        // this.findNextGames = this.findNextGames.bind(this);
        // this.setNextGames = this.setNextGames.bind(this);
        // this.postTeamGames = this.postTeamGames.bind(this);
        this.sortUserPicks = this.sortUserPicks.bind(this);
        this.findRecentPicks = this.findRecentPicks.bind(this);
        this.findNextDays = this.findNextDays.bind(this);
        this.getChallengeData = this.getChallengeData.bind(this);
        this.getUserData = this.getUserData.bind(this);
      }

    componentDidMount() {
    //   this.getChallengeData()
    //   this.findNextDays()
      // this.postTeams()
      // this.postTeamGames()
      }

    toggle() {
        this.setState({
          modal: !this.state.modal
        });
      }

    toggleActive() {
      let _this = this
      $('.button').click(function(){
          $(this).addClass('active');
          $(this).parent().children('.teamButton').not(this).removeClass('active');
          let thisTeam = $(this).text()
          _this.setState({ activeTeam: thisTeam })
        }); 
      }
    
    sortUserPicks = () => {
      let userPicks = this.state.userPicks
      console.log('USER PICKS: ', this.state.userPicks)

      let oldPicksFunc = (picks) => {
        return picks.gameDate < moment().format('YYYY-MM-DD')
      }
      let oldPicks = userPicks.filter(oldPicksFunc)
      let sortedPicks = userPicks.sort(function(a, b) {
        if (moment(a.gameDate).isBefore(moment(b.gameDate))) {
            return -1;
        }
        if (moment(a.gameDate).isAfter(moment(b.gameDate))) {
            return 1;
        }
        return 0;
      })

      this.setState({
        sortedPicks: sortedPicks,
        oldPicks: oldPicks
      })
      // console.log('THE NEXT PICKS: ', this.state.sortedPicks)
      //console.log('THE OLD PICKS: ', this.state.oldPicks)
      this.findRecentPicks()
    
      }

    findRecentPicks = () => {
      let sortedPicks = this.state.sortedPicks
      let recentDates = this.state.pastFutureDates
      let recentPicks = []
      // console.log('SORTED PICKS ARRAY: ', sortedPicks)
      // console.log('PAST/FUTURE DATES: ', recentDates)
      let recentPickMatch = (thePicks) => {
        return moment(thePicks.gameDate).isSame(this.state.recentDate.date) 
      }
      for (var t=0; t<recentDates.length; t++) {
          this.setState({
            recentDate: recentDates[t]
          })
          let dateMatch = sortedPicks.filter(recentPickMatch)
          if (dateMatch[0]) {
            // console.log('MATCHING GAMES: ', dateMatch)
            recentPicks.push(dateMatch[0])
          } else {
            recentPicks.push(
              {
                team: 'NO PICK',
                gameDate: recentDates[t].date,
                gameID: '',
                // style: (moment().format('YYYY-MM-DD').isAfter(moment(recentDates[t].date)) ? 'loss' : (moment().format('YYYY-MM-DD').isBefore(moment(recentDates[t].date)) ? 'futurePick' : 'todaysPick')),
                style: ( moment().format('YYYY-MM-DD') === (recentDates[t].date) ? 'todaysPick' : moment().format('YYYY-MM-DD') > (recentDates[t].date) ? 'loss' : 'futurePick' )
              }
            )
          }
        }

        console.log('RECENT PICKS ARRAY: ', recentPicks)
        this.setState({
          recentPicks: recentPicks
        })
      }

    findNextDays = () => {
      let today = moment().subtract(2, 'days').format('YYYY-MM-DD')
      let nextDays = []
      let pastFutureDates = [
        {
          name: 'past',
          date: moment().subtract(2, 'days').format('YYYY-MM-DD')
        },
        {
          name: 'past',
          date: moment().subtract(1, 'day').format('YYYY-MM-DD')
        },
        {
          name: 'today',
          date: moment().format('YYYY-MM-DD')
        },
        {
          name: 'future',
          date: moment().add(1, 'day').format('YYYY-MM-DD')
        },
        {
          name: 'future',
          date: moment().add(2, 'days').format('YYYY-MM-DD')
        },
        {
          name: 'future',
          date: moment().add(3, 'days').format('YYYY-MM-DD')
        }

      ]
      // console.log('GAMES FOR THIS WEEK: ', today)
      
      for (var c=0; c<14; c++) {
        let thisDay = moment(today).add(c, 'days').format('YYYY-MM-DD')
        // console.log('THIS DAY: ', thisDay)
        nextDays.push(thisDay)
      }

      this.setState({
        nextDays: nextDays,
        pastFutureDates: pastFutureDates
      })

      }
 
    getChallengeData = () => {
      // console.log('CHALLENGE ID: ', localStorage.getItem('userChallengeId'))
      let self = this
      // let challengeId = '5c9ba1f709237528c630baa8'
      let challengeId = '5c9d00af9c45e400175c56a3'
      // let challengeId = localStorage.getItem('userChallengeId')
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
      this.sortUserPicks()

      $(document).ready(function(){
        $('.recentPicks').animate({scrollTop: '300%'}, 1000);
        return false;
      });

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
                    <h4 className='winsTitle'>Today's Pick</h4> {this.props.todaysPick} <br />
                    <div className="row">
                      <div className="col-md-3">
                        <h4 className='winsHeader'>Score</h4> {this.props.parCount}
                      </div>
                      <div className="col-md-3">
                        <h4 className='winsHeader'>Score</h4> {this.state.oldPicks.length}
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
                <div className="col-10 recentPicks picks">
                  <table className='table table-hover'>
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Pick</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        this.state.recentPicks.map((recentPick, i) => (
                          <tr key={uuidv4()} className= {(recentPick.gameDate === moment().format('YYYY-MM-DD')) ? 'todaysPick' : (recentPick.result) ? recentPick.result : recentPick.style }>
                          {/* <tr key={uuidv4()} className={recentPick.result}> */}
                            <td>{moment(recentPick.gameDate).format('MM-DD')}</td>
                            <td>{recentPick.team}</td>
                          </tr> 
                            )
                          )     
                      }
                        
                    </tbody>
                  </table>
                </div>
                <div className="col-1 title">
                  <h3>My Recent Picks</h3>
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