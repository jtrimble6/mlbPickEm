import React, { Component } from 'react';
import moment from 'moment';
//import { Link } from 'react-router-dom';
import '../../css/profileBar.css'
import API from '../../utils/API';
import { Button, Jumbotron, Container, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import $ from 'jquery'
//import { atl, bkn, bos, cha, chi, cle, dal, den, det, gsw, hou, ind, lac, lal, mem, mia, mil, min, nop, nyk, okc, orl, phi, phx, por, sac, sas, tor, uta, was } from '../../css/nbaLogos'

class NbaPickEmBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            currentUser: {},
            userData: {},
            challengeData: {},
            userId: '',
            userWins: [],
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
        // this.findWins = this.findWins.bind(this);
        this.changeLogo = this.changeLogo.bind(this);
        this.postTeams = this.postTeams.bind(this);
        this.findTeamGames = this.findTeamGames.bind(this);
        this.findNextGames = this.findNextGames.bind(this);
        // this.setNextGames = this.setNextGames.bind(this);
        this.postTeamGames = this.postTeamGames.bind(this);
        this.sortUserPicks = this.sortUserPicks.bind(this);
        this.findRecentPicks = this.findRecentPicks.bind(this);
        this.findNextDays = this.findNextDays.bind(this);
        this.getChallengeData = this.getChallengeData.bind(this);
        this.findChallengeUsers = this.findChallengeUsers.bind(this);
        this.getUserData = this.getUserData.bind(this);
      }

    componentDidMount() {
      this.getChallengeData()
      this.findNextDays()
      this.findChallengeUsers()
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

    findChallengeUsers = () => {
        let challengeId = localStorage.getItem('userChallengeId')
        // console.log('CHALLENGE ID: ', challengeId)
        API.findUsersByChallengeId(challengeId)
            .then(res => {
              // console.log('found challenge users: ', res.data)     
              this.setState({
                challengeUsers: res.data
              })     
            })
            .catch(err => {
              console.log(err)
            })
      }

    findTeamGames = (team, i) => {
      this.toggleActive()
      this.toggle()
      let teamAbbr = ''
      if (team.target.type) {
        let thisTeam = team.target
        let thisTeamAlt = thisTeam.attributes['data'].value.toUpperCase()
        teamAbbr = thisTeamAlt
      } else {
        let thisTeam = team.target.alt
        let teamAlt = thisTeam.trim()
        let thisTeamAlt = teamAlt.toUpperCase()
        teamAbbr = thisTeamAlt
      }

      // console.log('Find the next games for this team: ', teamAbbr)
      let self = this
      API.getNbaTeam(teamAbbr)
        .then(res => {
          // console.log(res.data)
          self.setState({
            activeTeam: res.data[0],
            homeGames: res.data[0].homeGames,
            awayGames: res.data[0].awayGames
          })
          let homeGames = this.state.homeGames
          let awayGames = this.state.awayGames
          // console.log('HOME GAMES: ', this.state.homeGames)
          // console.log('AWAY GAMES: ', this.state.awayGames)
          self.findNextGames(homeGames, awayGames)
        })
        .catch(err => console.log(err))

      // API.getNbaGamesByTeam(teamAbbr)
      //   .then(res => {
      //       console.log(res)
      //   })
      //   .catch(err => (console.log(err)))
      }

    findNextGames = (homeGames, awayGames) => {
      //console.log('FIND NEXT GAMES FROM THESE: ', homeGames, awayGames)
      let allGames = []
      let matchingGames = []
      
      for (var n=0; n<homeGames.length; n++) {
        allGames.push(homeGames[n], awayGames[n])
      }
      let sortedGames = allGames.sort((a, b) => new Date(...a.gameDate.split('/').reverse()) - new Date(...b.gameDate.split('/').reverse()));
      //console.log('SORTED GAMES: ', sortedGames)
      this.setState({
        allGames: sortedGames
      })
      // let allGamesState = this.state.allGames
      //console.log('ALL GAMES FOUND: ', allGamesState)
      
      // console.log('NEXT 7 DAYS: ', this.state.nextDays)
      let nextGames = []
      for (var u=0; u<7; u++) {  
        this.setState({
          currentGameDate: this.state.nextDays[u]
        })
        let newGame = ''
        let noGame = {
          game: { gameDate: this.state.nextDays[u] },
          gameDetails: '--',
          status: 'noGame'
        }
        let gameMatch = (thisGame) => {
          return thisGame.gameDate === this.state.currentGameDate 
        }

        let thisGameMatch = this.state.allGames.filter(gameMatch)
        if (thisGameMatch[0]) {
          matchingGames.push(thisGameMatch[0])
            if (thisGameMatch[0].gameDate === this.state.nextDays[u] && moment(this.state.nextDays[u]).isBefore(moment().format('YYYY-MM-DD'))) {
            // newGame.status = 'past'
            newGame = {
              game: thisGameMatch[0],
              gameDetails: (thisGameMatch[0].homeAlias === this.state.activeTeam.teamAlias) ? 'vs ' + thisGameMatch[0].awayAlias : '@ ' + thisGameMatch[0].homeAlias,
              status: 'past'
            } 
          } else if (thisGameMatch[0].gameDate === this.state.nextDays[u] && moment(this.state.nextDays[u]).isSame(moment().format('YYYY-MM-DD'))) {
            // newGame.status = 'today'
            newGame = {
              game: thisGameMatch[0],
              gameDetails: (thisGameMatch[0].homeAlias === this.state.activeTeam.teamAlias) ? 'vs ' + thisGameMatch[0].awayAlias : '@ ' + thisGameMatch[0].homeAlias , 
              status: 'today'
            }
          } else if (thisGameMatch[0].gameDate === this.state.nextDays[u] && moment(this.state.nextDays[u]).isAfter(moment().format('YYYY-MM-DD'))) {
            // newGame.status = 'future'
            newGame = {
              game: thisGameMatch[0],
              gameDetails: (thisGameMatch[0].homeAlias === this.state.activeTeam.teamAlias) ? 'vs ' + thisGameMatch[0].awayAlias : '@ ' + thisGameMatch[0].homeAlias,
              status: 'future'
            }
          }
          
        } else {
          // console.log('NO MATCHES')
        }
        
        if (newGame !== '') {
          nextGames.push(newGame)
        } else {
          nextGames.push(noGame)
        } 
        
      }

      this.setState({
        nextGames: nextGames
        })

      }
    
    sortUserPicks = () => {
      let userPicks = this.state.userPicks
      // console.log('USER PICKS: ', this.state.userPicks)

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
        }, () => {
          this.findRecentPicks()
        })
    
      }

    findRecentPicks = () => {
        let challengeId = this.state.challengeData._id
        let sortedPicks = this.state.sortedPicks
        let recentDates = this.state.pastFutureDates
        let recentPicks = []
        // console.log('SORTED PICKS ARRAY: ', sortedPicks)
        // console.log('PAST/FUTURE DATES: ', recentDates)
        // let recentPickMatch = (thePicks) => {
        //   // console.log('pick date: ', thePicks.gameDate)
        //   // console.log('recent date: ', this.state.recentDate.date)
        //   return thePicks.gameDate === this.state.recentDate.date
        // }
  
        recentDates.forEach(date => {
          let recentPickMatch = (thePicks) => {
            // console.log('pick date: ', thePicks.gameDate)
            // console.log('recent date: ', date.date)
            return thePicks.gameDate === date.date && thePicks.challengeId === challengeId
          }
  
          let dateMatch = sortedPicks.filter(recentPickMatch)
            if (dateMatch[0]) {
              // console.log('MATCHING GAMES: ', dateMatch)
              recentPicks.push(dateMatch[0])
            } else {
              // console.log('NO DATE MATCH: ', dateMatch)
              recentPicks.push(
                {
                  team: 'NO PICK',
                  gameDate: date.date,
                  gameID: '',
                  // style: (moment().format('YYYY-MM-DD').isAfter(moment(recentDates[t].date)) ? 'loss' : (moment().format('YYYY-MM-DD').isBefore(moment(recentDates[t].date)) ? 'futurePick' : 'todaysPick')),
                  style: ( moment().format('YYYY-MM-DD') === (date.date) ? 'todaysPick' : moment().format('YYYY-MM-DD') > (date.date) ? 'loss' : 'futurePick' )
                }
              )
            }
          
        })
  
          // console.log('RECENT PICKS ARRAY: ', recentPicks)
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
          date: moment().subtract(7, 'days').format('YYYY-MM-DD')
        },
        {
          name: 'past',
          date: moment().subtract(6, 'days').format('YYYY-MM-DD')
        },
        {
          name: 'past',
          date: moment().subtract(5, 'days').format('YYYY-MM-DD')
        },
        {
          name: 'past',
          date: moment().subtract(4, 'days').format('YYYY-MM-DD')
        },
        {
          name: 'past',
          date: moment().subtract(3, 'days').format('YYYY-MM-DD')
        },
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
        },
        {
          name: 'future',
          date: moment().add(4, 'days').format('YYYY-MM-DD')
        },
        {
          name: 'future',
          date: moment().add(5, 'days').format('YYYY-MM-DD')
        },
        {
          name: 'future',
          date: moment().add(6, 'days').format('YYYY-MM-DD')
        },
        {
          name: 'future',
          date: moment().add(7, 'days').format('YYYY-MM-DD')
        },

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
      // let self = this
      let challengeId = localStorage.getItem('userChallengeId')
      this.setState({
        challengeId: challengeId
      })
      API.getChallenge(challengeId)
        .then(res => {
          // console.log('challenge data: ', res)
          this.setState({
            challengeData: res.data[0]
          })
          this.getUserData()
          // console.log('challenge teams: ', this.state.teams)
          // self.postTeams()
        })
        .catch(err => console.log(err))
        }
  
    getUserData = () => {
      let localUser = localStorage.getItem('user')
      let challengeId = localStorage.getItem('userChallengeId')
      API.getUser(localUser)
          .then(res => {
            // console.log('THE USER: ', res.data)
            let thisUser = res.data
            let filterChallengePicks = (picks) => {
              return picks.challengeId === challengeId
            }
            let filteredPicks = thisUser[0].picks.filter(filterChallengePicks)
            let filterWins = (picks) => {
              return picks.result === 'win' && picks.challengeId === challengeId
            }
            let filteredWins = thisUser[0].picks.filter(filterWins)
            // console.log('FILTERED WINS: ', filteredWins)
            // console.log('FILTERED PICKS: ', filteredPicks)
            this.setState({
              userData: thisUser[0],
              currentUser: thisUser[0],
              userId: thisUser[0].username,
              userWins: filteredWins,
              winsCount: filteredWins.length,
              userPicks: filteredPicks,
            }, () => {
              this.changeLogo()
              this.sortUserPicks()
            })
          })
          .catch(err => {console.log(err)})

      $(document).ready(function(){
        $('.recentPicks').animate({scrollTop: '300%'}, 1000);
        return false;
      });

    }  
    
    changeLogo = () => {
        let wins = this.state.userWins
        let allPicks = this.state.userPicks
        let challengeId = localStorage.getItem('userChallengeId')
        // console.log('USERS PICKS: ', allPicks)
        // console.log('USER WINS: ', wins)
        //let matchedTeams = []
        let theseMatchingWins = []
        let teams = JSON.parse(JSON.stringify(this.state.challengeData.teams))
        // console.log('TEAMS: ', teams)

        let todaysPickFunc = (picks) => {
          return picks.gameDate === moment().format('YYYY-MM-DD') && picks.challengeId === challengeId
        }
        let todaysPickObj = allPicks.filter(todaysPickFunc)
        let todaysPick = ''
        if (todaysPickObj[0]) {
          todaysPick = todaysPickObj[0].team
          //console.log('TODAYS PICK: ', todaysPick)
        }

        // FIND TODAYS PICK
        let matchingTeams = (teams) => {
          return teams.name.trim() === todaysPick.trim()
        }

        for (var j=0; j<teams.length; j++) {
          this.setState({
            thisTeam: teams[j].name.trim()
          })
          let thisTeam = teams[j].name.trim()
          
          let teamMatched = teams.filter(matchingTeams)
          if (teamMatched[0]) {
            if (teamMatched[0].name.trim() === teams[j].name.trim()) {
              // console.log('WE HAVE A PICK FOR TODAY: ', teamMatched[0].name)
              teams[j].status = 'warning'
            } 
          }

          // FIND MATCHING WINS
          let matchingWins = (wins) => {
            // console.log('THIS TEAM: ', thisTeam)
            return wins.team.trim() === thisTeam
          }
          theseMatchingWins = wins.filter(matchingWins)
          if (theseMatchingWins[0]) {
            // console.log('THESE MATCHING WINS: ' , theseMatchingWins[0])
            teams[j].status = 'success'
          }

          // console.log('NEW TEAMS: ', teams)
          
          this.setState({
              teams: teams,
              todaysPick: teamMatched
          })

          // console.log('NEW TEAMS ARRAY: ', this.state.challengeData.teams)

        }
        
      }

    postTeams = () => {
      let teams = this.state.challengeData.teams
      // console.log('POSTING JUST THESE TEAMS: ', teams)
      // debugger;
      for (var x=0; x<teams.length; x++) {
        let newTeam = {
          teamName: teams[x].name,
          teamAlias: teams[x].abbr.toUpperCase(),
          homeGames: [],
          awayGames: []
        }
        API.postNbaTeams(newTeam)
          .then(res => {
            console.log(res.data)
          })
          .catch(err => console.log(err))
        }
      }
    
    postTeamGames = () => {
      let allGames = []
      API.getNbaGames()
        .then(res => {
          allGames.push(res.data)
          let theGames = allGames[0]
          for (var t=0; t<this.state.challengeData.teams.length; t++) {
            let thisTeam = this.state.challengeData.teams[t].abbr.toUpperCase()
            // console.log('ALL GAMES: ', theGames)
            // console.log('THIS TEAM: ', thisTeam)
            for (var p=0; p<theGames.length; p++) {
              let homeA = theGames[p].homeAlias
              // let awayA = theGames[p].awayAlias
              if (homeA === thisTeam) {
                // console.log('THE GAME: ', theGames[p])
                // console.log('THIS TEAM IS THE HOME TEAM', thisTeam)
                API.addNbaGamesByTeam(thisTeam, theGames[p])
                  .then(res => {
                    console.log(res)
                  })
                  .catch(err => console.log(err))
              }
              // if (awayA === thisTeam) {
              //   // console.log('THE GAME: ', theGames[p])
              //   // console.log('THIS TEAM IS THE AWAY TEAM', thisTeam)
              //   API.addNbaGamesByTeam(thisTeam, theGames[p])
              //     .then(res => {
              //       console.log(res)
              //     })
              //     .catch(err => console.log(err))
              // }
            }
          }
          
        })
        .catch(err => console.log(err))

      

      }

    render() {              
        let uuidv4 = require('uuid/v4')
        //let teams = this.state.challengeData.teams   
        let modalStyle = {
          backgroundColor: 'gold',
          color: 'darkblue'
          }      
        
        return (

          <div className="row profileBar">
            <div className="col-8 jumbotronCol">
              <Jumbotron>
                <Container fluid>
                  <div className="display-4">
                    <h2 className='jumbotronHeader'>{this.props.username.toUpperCase()}</h2> <hr />
                    <h4 className='winsTitle'>Today's Pick</h4> {this.props.todaysPick} <br />
                    <div className="row">
                      <div className="col-md-3">
                        <h4 className='winsHeader'>Wins</h4> {this.props.winsCount}
                      </div>
                      <div className="col-md-3">
                        <h4 className='winsHeader'>Record</h4> {this.props.winsCount} - {this.state.oldPicks.length - this.props.winsCount}
                      </div>  
                      { /* <div className="col-md-3">
                        <h4 className='winsHeader'>Place</h4> {this.props.winsCount}
                      </div> */ }
                    </div>
                  </div>
                </Container>
              </Jumbotron>
            </div>
            <div className="col-4 recentPicksCol">
              <div className='row recentPicksRow'>
                <div className="col-11 recentPicks picks">
                  <table className='table table-hover'>
                    <thead>
                      <tr>
                        <th className='recentPicksDateHeader'>Date</th>
                        <th className='recentPicksPickHeader'>Pick</th>
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
              <div className="row teamLogos">
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
                        src={team.logo.default}
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
              </div>
            </div>
        )
    }
}

export default NbaPickEmBar