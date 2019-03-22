import React, { Component } from 'react';
import moment from 'moment';
//import { Link } from 'react-router-dom';
import '../../css/profileBar.css'
import API from '../../utils/API';
import { Button, Jumbotron, Container, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import $ from 'jquery'
import { ari, atl2, bal, bos2, chc, cws, cle2, cin, col, det2, mia2, hou2, kc, laa, lad, nym, nyy, mil2, min2, oak, pit, sd, sf, phi2, sea, stl, tb, tex, tor2, wsh } from '../../css/mlbLogos'

class MlbBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            currentUser: {},
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
          //   teams: [
          //   { name: 'Atlanta Hawks', abbr: 'atl', logo: atl, status: 'secondary' },
          //   { name: 'Brooklyn Nets', abbr: 'bkn', logo: bkn, status: 'secondary' },
          //   { name: 'Boston Celtics', abbr: 'bos', logo: bos, status: 'secondary' },
          //   { name: 'Charlotte Hornets', abbr: 'cha', logo: cha, status: 'secondary' },
          //   { name: 'Chicago Bulls', abbr: 'chi', logo: chi, status: 'secondary' },
          //   { name: 'Cleveland Cavaliers', abbr: 'cle', logo: cle, status: 'secondary' },
          //   { name: 'Dallas Mavericks', abbr: 'dal', logo: dal, status: 'secondary' },
          //   { name: 'Denver Nuggets', abbr: 'den', logo: den, status: 'secondary' },
          //   { name: 'Detroit Pistons', abbr: 'det', logo: det, status: 'secondary' },
          //   { name: 'Golden State Warriors', abbr: 'gsw', logo: gsw, status: 'secondary' },
          //   { name: 'Houston Rockets', abbr: 'hou', logo: hou, status: 'secondary' },
          //   { name: 'Indiana Pacers', abbr: 'ind', logo: ind, status: 'secondary' },
          //   { name: 'Los Angeles Clippers', abbr: 'lac', logo: lac, status: 'secondary' },
          //   { name: 'Los Angeles Lakers', abbr: 'lal', logo: lal, status: 'secondary' },
          //   { name: 'Memphis Grizzlies', abbr: 'mem', logo: mem, status: 'secondary' },
          //   { name: 'Miami Heat', abbr: 'mia', logo: mia, status: 'secondary' },
          //   { name: 'Milwalkee Bucks', abbr: 'mil', logo: mil, status: 'secondary' },
          //   { name: 'Minnesota Timberwolves', abbr: 'min', logo: min, status: 'secondary' },
          //   { name: 'New Orleans Pelicans', abbr: 'nop', logo: nop, status: 'secondary' },
          //   { name: 'New York Knicks', abbr: 'nyk', logo: nyk, status: 'secondary' },
          //   { name: 'Oklahoma City Thunder', abbr: 'okc', logo: okc, status: 'secondary' },
          //   { name: 'Orlando Magic', abbr: 'orl', logo: orl, status: 'secondary' },
          //   { name: 'Philadelphia 76ers', abbr: 'phi', logo: phi, status: 'secondary' },
          //   { name: 'Pheonix Suns', abbr: 'phx', logo: phx, status: 'secondary' },
          //   { name: 'Portland Trail Blazers', abbr: 'por', logo: por, status: 'secondary' },
          //   { name: 'Sacramento Kings', abbr: 'sac', logo: sac, status: 'secondary' },
          //   { name: 'San Antonio Spurs', abbr: 'sas', logo: sas, status: 'secondary' },
          //   { name: 'Toronto Raptors', abbr: 'tor', logo: tor, status: 'secondary' },
          //   { name: 'Utah Jazz', abbr: 'uta', logo: uta, status: 'secondary' },
          //   { name: 'Washington Wizards', abbr: 'was', logo: was, status: 'secondary' }
          // ]
        }

        this.toggle = this.toggle.bind(this);
        this.toggleActive = this.toggleActive.bind(this);
        // this.findWins = this.findWins.bind(this);
        this.changeLogo = this.changeLogo.bind(this);
        this.loadLogo = this.loadLogo.bind(this);
        this.postTeams = this.postTeams.bind(this);
        this.findTeamGames = this.findTeamGames.bind(this);
        this.findNextGames = this.findNextGames.bind(this);
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
      API.getMlbTeam(teamAbbr)
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

      // API.getMlbGamesByTeam(teamAbbr)
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
      // console.log('THE NEXT GAMES: ', this.state.nextGames)
      // console.log('THESE GAMES MATCH: ', matchingGames)
      // this.setNextGames(nextGames)
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
      let self = this
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
          // self.postTeamGames()
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
        userWins: thisUser[0].wins,
        winsCount: thisUser[0].wins.length,
        userPicks: thisUser[0].picks,
      })
      this.changeLogo()
      this.sortUserPicks()

      $(document).ready(function(){
        $('.recentPicks').animate({scrollTop: '300%'}, 1000);
        return false;
      });

      console.log('CURRENT USER: ', this.state.currentUser)
      console.log('CHAL USERS DATA: ', this.state.challengeData)
        }  

    // findWins = () => {
    //   let localUser = localStorage.getItem('user')
    //   let self = this
    //   API.getUser(localUser)
    //     .then(res => {
    //       // console.log('BIG result: ', res.data)
    //       self.setState({ 
    //         userWins: res.data[0].wins,
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
    
    changeLogo = () => {
        let wins = this.state.userWins
        let allPicks = this.state.userPicks
        //let matchedTeams = []
        let theseMatchingWins = []
        let teams = JSON.parse(JSON.stringify(this.state.challengeData.teams))

        let todaysPickFunc = (picks) => {
          return picks.gameDate === moment().format('YYYY-MM-DD')
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
          //console.log('CURRENT WINS: ', wins)
          //console.log('CURRENT TEAMS: ', teams)
          // console.log('CURRENT TEAM: ', teams[j].name)
          this.setState({
            thisTeam: teams[j].name.trim()
          })
          
          let teamMatched = teams.filter(matchingTeams)
          if (teamMatched[0]) {
            if (teamMatched[0].name.trim() === teams[j].name.trim()) {
              // console.log('WE HAVE A PICK FOR TODAY: ', teamMatched[0].name)
              teams[j].status = 'warning'
            } 
          }

          // FIND MATCHING WINS
          let matchingWins = (wins) => {
            return wins.win.trim() === this.state.thisTeam
          }
          theseMatchingWins = wins.filter(matchingWins)
          if (theseMatchingWins[0]) {
            // console.log('THESE MATCHING WINS: ' , theseMatchingWins[0])
            teams[j].status = 'success'
          }
          
          this.setState({
              teams: teams,
              todaysPick: teamMatched
          })

          // console.log('NEW TEAMS ARRAY: ', this.state.challengeData.teams)

        }
        
      }

    loadLogo = (team) => {
      switch (true) {
        case (team === 'atl'):
          return atl2;
          
        case (team === 'bal'):
          return bal;
          
        case (team === 'bos'):
          return bos2;
          
        case (team === 'chc'):
          return chc;
          
        case (team === 'cws'):
          return cws;
            
        case (team === 'cle'):
          return cle2;
            
        case (team === 'cin'):
          return cin;
            
        case (team === 'col'):
          return col;
            
        case (team === 'det'):
          return det2;
            
        case (team === 'mia'):
          return mia2;
            
        case (team === 'hou'):
          return hou2;
            
        case (team === 'kc'):
          return kc;
            
        case (team === 'laa'):
          return laa;
            
        case (team === 'lad'):
          return lad;
            
        case (team === 'nym'):
          return nym;
            
        case (team === 'nyy'):
          return nyy;
        
        case (team === 'mil'):
          return mil2;
            
        case (team === 'min'):
          return min2;
            
        case (team === 'oak'):
          return oak;
            
        case (team === 'pit'):
          return pit;
            
        case (team === 'sd'):
          return sd;
            
        case (team === 'sf'):
          return sf;
            
        case (team === 'phi'):
          return phi2;
            
        case (team === 'sea'):
          return sea;
            
        case (team === 'stl'):
          return stl;
            
        case (team === 'tb'):
          return tb;
            
        case (team === 'tex'):
          return tex;
            
        case (team === 'tor'):
          return tor2;
            
        case (team === 'ari'):
          return ari;
            
        case (team === 'wsh'):
          return wsh;
            
        default:
          return ari;
        }  

      }

    postTeams = () => {
      let teams = this.state.challengeData.teams
      console.log('POSTING JUST THESE TEAMS: ', teams)
      for (var x=0; x<teams.length; x++) {
        let teamNameCombo = teams[x].name
        let newTeam = {
          teamName: teamNameCombo,
          teamAlias: teams[x].abbr.toUpperCase(),
          homeGames: [],
          awayGames: []
        }
        // debugger
        API.postMlbTeams(newTeam)
          .then(res => {
            console.log(res.data)
          })
          .catch(err => console.log(err))
        }
      }
    
    postTeamGames = () => {
      let allGames = []
      API.getMlbGames()
        .then(res => {
          allGames.push(res.data)
          let theGames = allGames[0]
          for (var t=0; t<this.state.challengeData.teams.length; t++) {
            let thisTeam = this.state.challengeData.teams[t].abbr.toUpperCase()
            // console.log('ALL GAMES: ', theGames)
            // console.log('THIS TEAM: ', thisTeam)
            for (var p=0; p<theGames.length; p++) {
              let homeA = theGames[p].homeAlias
              let awayA = theGames[p].awayAlias
              // if (homeA === thisTeam) {
              //   // console.log('THE GAME: ', theGames[p])
              //   // console.log('THIS TEAM IS THE HOME TEAM', thisTeam)
              //   API.addMlbGamesByTeam(thisTeam, theGames[p])
              //     .then(res => {
              //       console.log(res)
              //     })
              //     .catch(err => console.log(err))
              // }
              if (awayA === thisTeam) {
                // console.log('THE GAME: ', theGames[p])
                // console.log('THIS TEAM IS THE AWAY TEAM', thisTeam)
                API.addMlbGamesByTeam(thisTeam, theGames[p])
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
      let picks = (this.state.recentPicks) ? true : false
      //let teams = this.state.challengeData.teams   
      let modalStyle = {
        backgroundColor: 'gold',
        color: 'darkblue'
        }      
        
        return (

          <div className="row profileBar">
            <div className="col-8">
              <Jumbotron className='jumbotronMain'>
                <Container fluid>
                  <div className="display-4">
                    <h2>{this.props.username.toUpperCase()}</h2> <hr />
                    <h4 className='winsTitle'>Today's Pick</h4> {this.props.todaysPick} <br />
                    <div className="row recordRow">
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
            <div className="col-4">
              <div className='row recentPicksRow'>
                <div className="col-10 recentPicks picks mainPicks">
                 
                  {
                    (picks) ? (<table className='table table-hover'><tbody><tr><td>There are no recent picks!</td></tr></tbody></table>) :

                      (
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
                      )

                  }

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
                        src={this.loadLogo(team.abbr)}
                        alt={team.abbr}
                        fluid='true'
                        />
                        {/* <br />
                        {team.name.toUpperCase()} */}
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

export default MlbBar