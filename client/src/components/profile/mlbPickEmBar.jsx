import React, { Component } from 'react';
import moment from 'moment';
//import { Link } from 'react-router-dom';
import '../../css/profileBar.css'
import API from '../../utils/API';
import { Button, Jumbotron, Container, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import $ from 'jquery'
import { ari, atl2, bal, bos2, chc, cws, cle2, cin, col, det2, mia2, hou2, kc, laa, lad, nym, nyy, mil2, min2, oak, pit, sd, sf, phi2, sea, stl, tb, tex, tor2, wsh } from '../../css/mlbLogos'

class MlbPickEmBar extends Component {
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
            teams: [],
            mlbTeams: [
              { name: 'Arizona Diamondbacks', abbr: 'ari', logo: 'ari', status: 'secondary', division: 'NL West' },
              { name: 'Atlanta Braves', abbr: 'atl', logo: 'atl2', status: 'secondary', division: 'NL East' },
              { name: 'Baltimore Orioles', abbr: 'bal', logo: 'bal', status: 'secondary', division: 'AL East' },
              { name: 'Boston Red Sox', abbr: 'bos', logo: 'bos2', status: 'secondary', division: 'AL East' },
              { name: 'Chicago White Sox', abbr: 'cws', logo: 'cws', status: 'secondary', division: 'AL Central' },
              { name: 'Chicago Cubs', abbr: 'chc', logo: 'chc', status: 'secondary', division: 'NL Central' },
              { name: 'Cincinnati Reds', abbr: 'cin', logo: 'cin', status: 'secondary', division: 'NL Central' },
              { name: 'Cleveland Indians', abbr: 'cle', logo: 'cle2', status: 'secondary', division: 'AL Central' },
              { name: 'Colorado Rockies', abbr: 'col', logo: 'col', status: 'secondary', division: 'NL West' },
              { name: 'Detroit Tigers', abbr: 'det', logo: 'det2', status: 'secondary', division: 'AL Central' },
              { name: 'Houston Astros', abbr: 'hou', logo: 'hou2', status: 'secondary', division: 'AL West' },
              { name: 'Kansas City Royals', abbr: 'kc', logo: 'kc', status: 'secondary', division: 'AL Central' },
              { name: 'Los Angeles Angels', abbr: 'laa', logo: 'laa', status: 'secondary', division: 'AL West' },
              { name: 'Los Angeles Dodgers', abbr: 'lad', logo: 'lad', status: 'secondary', division: 'NL West' },
              { name: 'Miami Marlins', abbr: 'mia', logo: 'mia2', status: 'secondary', division: 'NL East' },
              { name: 'Milwaukee Brewers', abbr: 'mil', logo: 'mil2', status: 'secondary', division: 'NL Central' },
              { name: 'Minnesota Twins', abbr: 'min', logo: 'min2', status: 'secondary', division: 'AL Central' },
              { name: 'New York Yankees', abbr: 'nyy', logo: 'nyy', status: 'secondary', division: 'AL East' },
              { name: 'New York Mets', abbr: 'nym', logo: 'nym', status: 'secondary', division: 'NL East' },
              { name: 'Oakland Athletics', abbr: 'oak', logo: 'oak', status: 'secondary', division: 'AL West' },
              { name: 'Philadelphia Phillies', abbr: 'phi', logo: 'phi2', status: 'secondary', division: 'NL East' },
              { name: 'Pittsburgh Pirates', abbr: 'pit', logo: 'pit', status: 'secondary', division: 'NL Central' },
              { name: 'San Diego Padres', abbr: 'sd', logo: 'sd', status: 'secondary', division: 'NL West' },
              { name: 'San Francisco Giants', abbr: 'sf', logo: 'sf', status: 'secondary', division: 'NL West' },
              { name: 'Seattle Mariners', abbr: 'sea', logo: 'sea', status: 'secondary', division: 'AL West' },
              { name: 'St. Louis Cardinals', abbr: 'stl', logo: 'stl', status: 'secondary', division: 'NL Central' },
              { name: 'Tampa Bay Rays', abbr: 'tb', logo: 'tb', status: 'secondary', division: 'AL East' },
              { name: 'Texas Rangers', abbr: 'tex', logo: 'tex', status: 'secondary', division: 'AL West' },
              { name: 'Toronto Blue Jays', abbr: 'tor', logo: 'tor2', status: 'secondary', division: 'AL East' },
              { name: 'Washington Nationals', abbr: 'wsh', logo: 'wsh', status: 'secondary', division: 'NL East' }
            ],
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
      // console.log('USER PICKS: ', this.state.userPicks)

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
          date: this.props.todaysDate
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
          // console.log('CHALLENGE DATA: ', res.data[0])
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
        let challengeId = localStorage.getItem('userChallengeId')
        // console.log('THESE ARE WINS: ', this.state.userWins)
        // console.log('THIS IS THE TEAM: ', this.state.thisTeam)
        let allPicks = this.state.userPicks
        //let matchedTeams = []
        let theseMatchingWins = []
        let teams = JSON.parse(JSON.stringify(this.state.mlbTeams))

        let todaysPickFunc = (picks) => {
          return picks.gameDate === this.props.todaysDate && picks.challengeId === challengeId
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
          // console.log('THIS TEAM: ', thisTeam)
          let teamMatched = teams.filter(matchingTeams)
          if (teamMatched[0]) {
            if (teamMatched[0].name.trim() === teams[j].name.trim()) {
              // console.log('WE HAVE A PICK FOR TODAY: ', teamMatched[0].name)
              teams[j].status = 'warning'
            } 
          }

          // FIND MATCHING WINS
          let matchingWins = (wins) => {
            return wins.team.trim() === thisTeam
          }
          theseMatchingWins = wins.filter(matchingWins)
          if (theseMatchingWins[0]) {
            // console.log('THESE MATCHING WINS: ' , theseMatchingWins[0])
            teams[j].status = 'success'
          }
          
          this.setState({
            teams: teams,
            todaysPick: teamMatched
          }, () => {
            // console.log('NEW TEAMS ARRAY: ', this.state.teams)
          })

          // console.log('TEAMS: ', teams)

        }
        
      }

    loadLogo = (team) => {
      switch (true) {
        case (team === 'atl'):
          return atl2.default;
          
        case (team === 'bal'):
          return bal.default;
          
        case (team === 'bos'):
          return bos2.default;
          
        case (team === 'chc'):
          return chc.default;
          
        case (team === 'cws'):
          return cws.default;
            
        case (team === 'cle'):
          return cle2.default;
            
        case (team === 'cin'):
          return cin.default;
            
        case (team === 'col'):
          return col.default;
            
        case (team === 'det'):
          return det2.default;
            
        case (team === 'mia'):
          return mia2.default;
            
        case (team === 'hou'):
          return hou2.default;
            
        case (team === 'kc'):
          return kc.default;
            
        case (team === 'laa'):
          return laa.default;
            
        case (team === 'lad'):
          return lad.default;
            
        case (team === 'nym'):
          return nym.default;
            
        case (team === 'nyy'):
          return nyy.default;
        
        case (team === 'mil'):
          return mil2.default;
            
        case (team === 'min'):
          return min2.default;
            
        case (team === 'oak'):
          return oak.default;
            
        case (team === 'pit'):
          return pit.default;
            
        case (team === 'sd'):
          return sd.default;
            
        case (team === 'sf'):
          return sf.default;
            
        case (team === 'phi'):
          return phi2.default;
            
        case (team === 'sea'):
          return sea.default;
            
        case (team === 'stl'):
          return stl.default;
            
        case (team === 'tb'):
          return tb.default;
            
        case (team === 'tex'):
          return tex.default;
            
        case (team === 'tor'):
          return tor2.default;
            
        case (team === 'ari'):
          return ari.default;
            
        case (team === 'wsh'):
          return wsh.default;
            
        default:
          return ari.default;
        }  

      }

    postTeams = () => {
      let teams = this.state.mlbTeams
      console.log('POSTING JUST THESE TEAMS: ', teams)
      // debugger;
      for (var x=0; x<teams.length; x++) {
        let teamNameCombo = teams[x].name
        let newTeam = {
          teamName: teamNameCombo,
          teamAlias: teams[x].abbr.toUpperCase(),
          homeGames: [],
          awayGames: [],
          division: teams[x].division
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
              // let homeA = theGames[p].homeAlias
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
            <div className="col-8 jumbotronCol">
              <Jumbotron>
                <Container fluid>
                  <div className="display-4">
                    <h2 className='jumbotronHeader'>{this.props.username.toUpperCase()}</h2> <hr />
                    <h4 className='winsTitle'>Today's Pick</h4> {this.props.todaysPick} <br />
                    <div className="row recordRow">
                      <div className="col-md-3">
                        <h4 className='winsHeader'>Wins</h4> {this.props.winsCount}
                      </div>
                      <div className="col-md-3">
                        <h4 className='winsHeader'>Record</h4> {this.props.winsCount} - {this.props.lossesCount}
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
                <div className="col-10 recentPicks picks mainPicks">
                 
                  {
                    (!picks) ? (<table className='table table-hover'><tbody><tr><td>There are no recent picks!</td></tr></tbody></table>) :

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
              </div>
            </div>
        )
    }
}

export default MlbPickEmBar