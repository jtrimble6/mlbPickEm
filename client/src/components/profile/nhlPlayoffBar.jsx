import React, { Component } from 'react';
import moment from 'moment';
//import { Link } from 'react-router-dom';
import '../../css/profileBar.css'
import API from '../../utils/API';
// import { Button, Jumbotron, Container, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { Jumbotron, Container } from 'reactstrap'
import $ from 'jquery'
//import { atl, bkn, bos, cha, chi, cle, dal, den, det, gsw, hou, ind, lac, lal, mem, mia, mil, min, nop, nyk, okc, orl, phi, phx, por, sac, sas, tor, uta, was } from '../../css/nhlLogos'

class NhlPlayoffBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            currentUser: {},
            challengeData: {},
            userId: '',
            userLosses: [],
            lossesCount: '',
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
        // this.changeLogo = this.changeLogo.bind(this);
        this.postTeams = this.postTeams.bind(this);
        // this.findTeamGames = this.findTeamGames.bind(this);
        // this.findNextGames = this.findNextGames.bind(this);
        // this.setNextGames = this.setNextGames.bind(this);
        this.postTeamGames = this.postTeamGames.bind(this);
        this.sortUserPicks = this.sortUserPicks.bind(this);
        this.findRecentPicks = this.findRecentPicks.bind(this);
        this.findNextDays = this.findNextDays.bind(this);
        this.getChallengeData = this.getChallengeData.bind(this);
        this.getUserData = this.getUserData.bind(this);
      }

    componentDidMount() {
      this.getChallengeData()
      this.findNextDays()
      
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
      API.getNhlPlayoffTeam(teamAbbr)
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

      // API.getNhlGamesByTeam(teamAbbr)
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
            if (thisGameMatch[0].gameDate === this.state.nextDays[u] && moment(this.state.nextDays[u]).isBefore(this.props.todaysDate)) {
            // newGame.status = 'past'
            newGame = {
              game: thisGameMatch[0],
              gameDetails: (thisGameMatch[0].homeAlias === this.state.activeTeam.teamAlias) ? 'vs ' + thisGameMatch[0].awayAlias : '@ ' + thisGameMatch[0].homeAlias,
              status: 'past'
            } 
          } else if (thisGameMatch[0].gameDate === this.state.nextDays[u] && moment(this.state.nextDays[u]).isSame(this.props.todaysDate)) {
            // newGame.status = 'today'
            newGame = {
              game: thisGameMatch[0],
              gameDetails: (thisGameMatch[0].homeAlias === this.state.activeTeam.teamAlias) ? 'vs ' + thisGameMatch[0].awayAlias : '@ ' + thisGameMatch[0].homeAlias , 
              status: 'today'
            }
          } else if (thisGameMatch[0].gameDate === this.state.nextDays[u] && moment(this.state.nextDays[u]).isAfter(this.props.todaysDate)) {
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
      // console.log('THE NEXT GAMES: ', this.state.nextGames)
      // console.log('THESE GAMES MATCH: ', matchingGames)
      // this.setNextGames(nextGames)
      }
    
    sortUserPicks = () => {
      let userPicks = this.state.userPicks
      console.log('USER PICKS: ', this.state.userPicks)

      let oldPicksFunc = (picks) => {
        return picks.gameDate < this.props.todaysDate
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
      // console.log('THE NEXT PICKS: ', this.state.sortedPicks)
      //console.log('THE OLD PICKS: ', this.state.oldPicks)
    
      }

      findRecentPicks = () => {
        let challengeId = this.state.challengeData._id
        let sortedPicks = this.state.sortedPicks
        let recentDates = this.state.pastFutureDates
        let recentPicks = []
        console.log('SORTED PICKS ARRAY: ', sortedPicks)
        console.log('PAST/FUTURE DATES: ', recentDates)
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
                  style: ( this.props.todaysDate === (date.date) ? 'todaysPick' : this.props.todaysDate > (date.date) ? 'loss' : 'futurePick' )
                }
              )
            }
          
        })
  
          // console.log('RECENT PICKS ARRAY: ', recentPicks)
          this.setState({
            recentPicks: recentPicks
          })
        }

    // findRecentPicks = () => {
    //   let sortedPicks = this.state.sortedPicks
    //   let recentDates = this.state.pastFutureDates
    //   let recentPicks = []
    //   // console.log('SORTED PICKS ARRAY: ', sortedPicks)
    //   // console.log('PAST/FUTURE DATES: ', recentDates)
    //   let recentPickMatch = (thePicks) => {
    //     return moment(thePicks.gameDate).isSame(this.state.recentDate.date) 
    //   }
    //   for (var t=0; t<recentDates.length; t++) {
    //       this.setState({
    //         recentDate: recentDates[t]
    //       })
    //       let dateMatch = sortedPicks.filter(recentPickMatch)
    //       if (dateMatch[0]) {
    //         // console.log('MATCHING GAMES: ', dateMatch)
    //         recentPicks.push(dateMatch[0])
    //       } else {
    //         recentPicks.push(
    //           {
    //             team: 'NO PICK',
    //             gameDate: recentDates[t].date,
    //             gameID: '',
    //             // style: (this.props.todaysDate.isAfter(moment(recentDates[t].date)) ? 'loss' : (this.props.todaysDate.isBefore(moment(recentDates[t].date)) ? 'futurePick' : 'todaysPick')),
    //             style: ( this.props.todaysDate === (recentDates[t].date) ? 'todaysPick' : this.props.todaysDate > (recentDates[t].date) ? 'loss' : 'futurePick' )
    //           }
    //         )
    //       }
    //     }

    //     console.log('RECENT PICKS ARRAY: ', recentPicks)
    //     this.setState({
    //       recentPicks: recentPicks
    //     })
    //   }

    findNextDays = () => {
      let today = moment(this.props.todaysDate).subtract(2, 'days').format('YYYY-MM-DD')
      let nextDays = []
      let pastFutureDates = [
        {
          name: 'past',
          date: moment(this.props.todaysDate).subtract(7, 'days').format('YYYY-MM-DD')
        },
        {
          name: 'past',
          date: moment(this.props.todaysDate).subtract(6, 'days').format('YYYY-MM-DD')
        },
        {
          name: 'past',
          date: moment(this.props.todaysDate).subtract(5, 'days').format('YYYY-MM-DD')
        },
        {
          name: 'past',
          date: moment(this.props.todaysDate).subtract(4, 'days').format('YYYY-MM-DD')
        },
        {
          name: 'past',
          date: moment(this.props.todaysDate).subtract(3, 'days').format('YYYY-MM-DD')
        },
        {
          name: 'past',
          date: moment(this.props.todaysDate).subtract(2, 'days').format('YYYY-MM-DD')
        },
        {
          name: 'past',
          date: moment(this.props.todaysDate).subtract(1, 'day').format('YYYY-MM-DD')
        },
        {
          name: 'today',
          date: this.props.todaysDate
        },
        {
          name: 'future',
          date: moment(this.props.todaysDate).add(1, 'day').format('YYYY-MM-DD')
        },
        {
          name: 'future',
          date: moment(this.props.todaysDate).add(2, 'days').format('YYYY-MM-DD')
        },
        {
          name: 'future',
          date: moment(this.props.todaysDate).add(3, 'days').format('YYYY-MM-DD')
        },
        {
          name: 'future',
          date: moment(this.props.todaysDate).add(4, 'days').format('YYYY-MM-DD')
        },
        {
          name: 'future',
          date: moment(this.props.todaysDate).add(5, 'days').format('YYYY-MM-DD')
        },
        {
          name: 'future',
          date: moment(this.props.todaysDate).add(6, 'days').format('YYYY-MM-DD')
        },
        {
          name: 'future',
          date: moment(this.props.todaysDate).add(7, 'days').format('YYYY-MM-DD')
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
      let self = this
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
          // self.postTeams()
        })
        .catch(err => console.log(err))
      }
  
      getUserData = () => {
        let localUser = localStorage.getItem('user')
        let challengeId = localStorage.getItem('userChallengeId')
        console.log('THIS CHALLENGE: ', challengeId)
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
              this.setState({
                userData: thisUser[0],
                currentUser: thisUser[0],
                userId: thisUser[0].username,
                userWins: filteredWins,
                winsCount: filteredWins.length,
                userPicks: filteredPicks,
              }, () => {
                // this.changeLogo()
                this.sortUserPicks()
              })
            })
            .catch(err => {console.log(err)})
  
        $(document).ready(function(){
          $('.recentPicks').animate({scrollTop: '300%'}, 1000);
          return false;
        });
  
      }  

    // findWins = () => {
    //   let localUser = localStorage.getItem('user')
    //   let self = this
    //   API.getUser(localUser)
    //     .then(res => {
    //       // console.log('BIG result: ', res.data)
    //       self.setState({ 
    //         userWins: res.data[0].losses,
    //         userId: res.data[0].username,
    //         userPicks: res.data[0].picks,
    //         teams: res.data[0].teams
    //        })
    //       self.changeLogo()
    //       self.sortUserPicks()
    //     })
    //     .catch(err => console.log(err))
      
    //     $(document).ready(function(){
    //       //let top = target.offset().top;
    //       $('.recentPicks').animate({scrollTop: '300%'}, 1000);
    //       // $('recentPicks').scrollTo('.todaysPick')
    //       return false;
    //       // $('.recentPicks').animate({scrollTop: '320%'}, 800); 
    //     });
     
    //   }
    
    // changeLogo = () => {
    //     let wins = this.state.userWins
    //     let allPicks = this.state.userPicks
    //     //let matchedTeams = []
    //     let theseMatchingWins = []
    //     let teams = JSON.parse(JSON.stringify(this.state.challengeData.teams))

    //     let todaysPickFunc = (picks) => {
    //       return picks.gameDate === this.props.todaysDate
    //     }
    //     let todaysPickObj = allPicks.filter(todaysPickFunc)
    //     let todaysPick = ''
    //     if (todaysPickObj[0]) {
    //       todaysPick = todaysPickObj[0].team
    //       //console.log('TODAYS PICK: ', todaysPick)
    //     }

    //     // FIND TODAYS PICK
    //     let matchingTeams = (teams) => {
    //       return teams.name.trim() === todaysPick.trim()
    //     }

    //     for (var j=0; j<teams.length; j++) {
    //       //console.log('CURRENT WINS: ', wins)
    //       //console.log('CURRENT TEAMS: ', teams)
    //       // console.log('CURRENT TEAM: ', teams[j].name)
    //       this.setState({
    //         thisTeam: teams[j].name.trim()
    //       })
          
    //       let teamMatched = teams.filter(matchingTeams)
    //       if (teamMatched[0]) {
    //         if (teamMatched[0].name.trim() === teams[j].name.trim()) {
    //           // console.log('WE HAVE A PICK FOR TODAY: ', teamMatched[0].name)
    //           teams[j].status = 'warning'
    //         } 
    //       }

    //       // FIND MATCHING WINS
    //       let matchingWins = (wins) => {
    //         return wins.win.trim() === this.state.thisTeam
    //       }
    //       theseMatchingWins = wins.filter(matchingWins)
    //       if (theseMatchingWins[0]) {
    //         // console.log('THESE MATCHING WINS: ' , theseMatchingWins[0])
    //         teams[j].status = 'success'
    //       }
          
    //       this.setState({
    //           teams: teams,
    //           todaysPick: teamMatched
    //       })

    //       // console.log('NEW TEAMS ARRAY: ', this.state.challengeData.teams)

    //     }
        
    //   }

    postTeams = () => {
      let teams = this.state.challengeData.teams
      // console.log('POSTING JUST THESE TEAMS: ', teams)
      for (var x=0; x<teams.length; x++) {
        let newTeam = {
          teamName: teams[x].name,
          teamAlias: teams[x].abbr.toUpperCase(),
          homeGames: [],
          awayGames: [],
          conf: teams[x].conf,
          seed: teams[x].seed
        }
        API.postNhlPlayoffTeams(newTeam)
          .then(res => {
            console.log(res.data)
          })
          .catch(err => console.log(err))
        }
      }
    
    postTeamGames = () => {
      let allGames = []
      API.getNhlPlayoffGames()
        .then(res => {
          allGames.push(res.data)
          let theGames = allGames[0]
          for (var t=0; t<this.state.challengeData.teams.length; t++) {
            let thisTeam = this.state.challengeData.teams[t].abbr.toUpperCase()
            // console.log('ALL GAMES: ', theGames)
            // console.log('THIS TEAM: ', thisTeam)
            for (var p=0; p<theGames.length; p++) {
              // let homeA = theGames[p].homeAlias
              let awayA = theGames[p].awayAlias
              // if (homeA === thisTeam) {
              //   // console.log('THE GAME: ', theGames[p])
              //   // console.log('THIS TEAM IS THE HOME TEAM', thisTeam)
              //   API.addNhlPlayoffGamesByTeam(thisTeam, theGames[p])
              //     .then(res => {
              //       console.log(res)
              //     })
              //     .catch(err => console.log(err))
              // }
              if (awayA === thisTeam) {
                // console.log('THE GAME: ', theGames[p])
                // console.log('THIS TEAM IS THE AWAY TEAM', thisTeam)
                API.addNhlPlayoffGamesByTeam(thisTeam, theGames[p])
                  .then(res => {
                    console.log(res)
                  })
                  .catch(err => console.log(err))
              }
            }
          }
          
        })
        .catch(err => console.log(err))

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
                        <h4 className='winsHeader'>Points</h4> {this.props.pointsCount}
                      </div>
                      <div className="col-md-3">
                        <h4 className='winsHeader'>Record</h4> {this.props.winsCount} - {this.props.lossesCount}
                      </div>  
                      { /* <div className="col-md-3">
                        <h4 className='winsHeader'>Place</h4> {this.props.lossesCount}
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
                          <tr key={uuidv4()} className= {(recentPick.gameDate === this.props.todaysDate) ? 'todaysPick' : (recentPick.result) ? recentPick.result : recentPick.style }>
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
                              <tr key={uuidv4()} className={(this.props.todaysDate === nextGame.game.gameDate) ? 'today' : nextGame.status} >
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

export default NhlPlayoffBar