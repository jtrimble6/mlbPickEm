import React, { Component } from 'react';
import moment from 'moment-timezone';
//import { Link } from 'react-router-dom';
import '../../css/profileBar.css'
import API from '../../utils/API';
import { Button, Jumbotron, Container, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import $ from 'jquery'
import ReactHintFactory from 'react-hint'
import { ari2 } from '../../css/nflLogos'

class NflDivisionBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
          thisWeek: this.props.thisWeek,
          prevWeek: this.props.prevWeek,
          chalValue: this.props.chalValue,
          myValue: this.props.myValue,
          nfcActive: true,
          afcActive: false,
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
          activeTeamName: '',
          nextDays: [],
          nflWeeks: [],
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
          nfcWest: [],
          nfcEast: [],
          nfcSouth: [],
          nfcNorth: [],
          afcWest: [],
          afcEast: [],
          afcSouth: [],
          afcNorth: []
          
        }

        this.toggle = this.toggle.bind(this);
        this.toggleActive = this.toggleActive.bind(this);
        // this.findWins = this.findWins.bind(this);
        this.changeLogo = this.changeLogo.bind(this);
        this.loadLogo = this.loadLogo.bind(this);
        this.postTeams = this.postTeams.bind(this);
        this.findTeamGames = this.findTeamGames.bind(this);
        // this.sortTeamGames = this.sortTeamGames.bind(this);
        // this.setNextGames = this.setNextGames.bind(this);
        this.postTeamGames = this.postTeamGames.bind(this);
        this.sortUserPicks = this.sortUserPicks.bind(this);
        this.findRecentPicks = this.findRecentPicks.bind(this);
        // this.findNextDays = this.findNextDays.bind(this);
        this.getChallengeData = this.getChallengeData.bind(this);
        this.getUserData = this.getUserData.bind(this);
        this.getTeams = this.getTeams.bind(this);
        this.toggleNfc =  this.toggleNfc.bind(this);
        this.toggleAfc = this.toggleAfc.bind(this);
        this.toggleWins = this.toggleWins.bind(this);
      }

    componentDidMount() {
      this.getChallengeData()
      this.findNextDays()
      this.getTeams()
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
      $('.nflTeamButton').click(function(){
          $(this).addClass('active');
          $(this).parent().children('.teamButton').not(_this).removeClass('active');
          // console.log('THIS: ', _this)
          let thisTeam = $(_this).text()
          _this.setState({ activeTeam: thisTeam })
        }); 
      }

    toggleNfc() {
        this.setState({
          nfcActive: true,
          afcActive: false
        })
        this.toggleWins()
      }

    toggleAfc() {
        this.setState({
          afcActive: true,
          nfcActive: false
        })
        this.toggleWins()
      }

    toggleWins() {
        let nfcWest = JSON.parse(JSON.stringify(this.state.nfcWest))
        let nfcEast = JSON.parse(JSON.stringify(this.state.nfcEast))
        let nfcNorth = JSON.parse(JSON.stringify(this.state.nfcNorth))
        let nfcSouth = JSON.parse(JSON.stringify(this.state.nfcSouth))
        let afcWest = JSON.parse(JSON.stringify(this.state.afcWest))
        let afcEast = JSON.parse(JSON.stringify(this.state.afcEast))
        let afcNorth = JSON.parse(JSON.stringify(this.state.afcNorth))
        let afcSouth = JSON.parse(JSON.stringify(this.state.afcSouth))

        // console.log('AFC SOUTH: ', afcSouth)

        let userPicks = this.state.userPicks
        // console.log('USER PICKS: ', userPicks)

        let findWins = (picks) => {
          return picks.result === 'win'
        }

        let userWins = userPicks.filter(findWins)
        // console.log('USER WINS: ', userWins)

        let theseMatchingWins = []

        let todaysPickFunc = (picks) => {
          return picks.gameWeek === this.props.thisWeek 
        }
        let todaysPickObj = userPicks.filter(todaysPickFunc)
        let todaysPick = ''
        if (todaysPickObj[0]) {
          todaysPick = todaysPickObj[0].team
          // console.log('TODAYS PICK: ', todaysPick)
        }

        // FIND TODAYS PICK
        let matchingTeams = (teams) => {
          return teams.teamName.trim() === todaysPick.trim()
        }

        // AFC SOUTH WINS
        for (var j=0; j<afcSouth.length; j++) {
          this.setState({
            thisTeam: afcSouth[j].teamName.trim()
          })
          let teamMatched = afcSouth.filter(matchingTeams)
          if (teamMatched[0]) {
            if (teamMatched[0].teamName.trim() === afcSouth[j].teamName.trim()) {
              afcSouth[j].status = 'warning'
            } 
          }
          // FIND MATCHING WINS
          let matchingWins = (wins) => {
            return wins.team.trim() === this.state.thisTeam
          }
          theseMatchingWins = userWins.filter(matchingWins)
          if (theseMatchingWins[0]) {
            afcSouth[j].status = 'success'
          }
          this.setState({
              afcSouth: afcSouth,
              todaysPick: teamMatched
          })
        }

        // AFC NORTH WINS
        for (var k=0; k<afcNorth.length; k++) {
          this.setState({
            thisTeam: afcNorth[k].teamName.trim()
          })
          let teamMatched = afcNorth.filter(matchingTeams)
          if (teamMatched[0]) {
            if (teamMatched[0].teamName.trim() === afcNorth[k].teamName.trim()) {
              afcNorth[k].status = 'warning'
            } 
          }
          // FIND MATCHING WINS
          let matchingWins = (wins) => {
            return wins.team.trim() === this.state.thisTeam
          }
          theseMatchingWins = userWins.filter(matchingWins)
          if (theseMatchingWins[0]) {
            afcNorth[k].status = 'success'
          }
          this.setState({
              afcNorth: afcNorth,
              todaysPick: teamMatched
          })
        }

        // AFC EAST WINS
        for (var l=0; l<afcEast.length; l++) {
          this.setState({
            thisTeam: afcEast[l].teamName.trim()
          })
          let teamMatched = afcEast.filter(matchingTeams)
          if (teamMatched[0]) {
            if (teamMatched[0].teamName.trim() === afcEast[l].teamName.trim()) {
              afcEast[l].status = 'warning'
            } 
          }
          // FIND MATCHING WINS
          let matchingWins = (wins) => {
            return wins.team.trim() === this.state.thisTeam
          }
          theseMatchingWins = userWins.filter(matchingWins)
          if (theseMatchingWins[0]) {
            afcEast[l].status = 'success'
          }
          this.setState({
              afcEast: afcEast,
              todaysPick: teamMatched
          })
        }

        // AFC WEST WINS
        for (var m=0; m<afcWest.length; m++) {
          this.setState({
            thisTeam: afcWest[m].teamName.trim()
          })
          let teamMatched = afcWest.filter(matchingTeams)
          if (teamMatched[0]) {
            if (teamMatched[0].teamName.trim() === afcWest[m].teamName.trim()) {
              afcWest[m].status = 'warning'
            } 
          }
          // FIND MATCHING WINS
          let matchingWins = (wins) => {
            return wins.team.trim() === this.state.thisTeam
          }
          theseMatchingWins = userWins.filter(matchingWins)
          if (theseMatchingWins[0]) {
            afcWest[m].status = 'success'
          }
          this.setState({
              afcWest: afcWest,
              todaysPick: teamMatched
          })
        }

        // NFC SOUTH WINS
        for (var n=0; n<nfcSouth.length; n++) {
          this.setState({
            thisTeam: nfcSouth[n].teamName.trim()
          })
          let teamMatched = nfcSouth.filter(matchingTeams)
          if (teamMatched[0]) {
            if (teamMatched[0].teamName.trim() === nfcSouth[n].teamName.trim()) {
              nfcSouth[n].status = 'warning'
            } 
          }
          // FIND MATCHING WINS
          let matchingWins = (wins) => {
            return wins.team.trim() === this.state.thisTeam
          }
          theseMatchingWins = userWins.filter(matchingWins)
          if (theseMatchingWins[0]) {
            nfcSouth[n].status = 'success'
          }
          this.setState({
              nfcSouth: nfcSouth,
              todaysPick: teamMatched
          })
        }

        // NFC NORTH WINS
        for (var o=0; o<nfcNorth.length; o++) {
          this.setState({
            thisTeam: nfcNorth[o].teamName.trim()
          })
          let teamMatched = nfcNorth.filter(matchingTeams)
          if (teamMatched[0]) {
            if (teamMatched[0].teamName.trim() === nfcNorth[o].teamName.trim()) {
              nfcNorth[o].status = 'warning'
            } 
          }
          // FIND MATCHING WINS
          let matchingWins = (wins) => {
            return wins.team.trim() === this.state.thisTeam
          }
          theseMatchingWins = userWins.filter(matchingWins)
          if (theseMatchingWins[0]) {
            nfcNorth[o].status = 'success'
          }
          this.setState({
              nfcNorth: nfcNorth,
              todaysPick: teamMatched
          })
        }

        // NFC EAST WINS
        for (var p=0; p<nfcEast.length; p++) {
          this.setState({
            thisTeam: nfcEast[p].teamName.trim()
          })
          let teamMatched = nfcEast.filter(matchingTeams)
          if (teamMatched[0]) {
            if (teamMatched[0].teamName.trim() === nfcEast[p].teamName.trim()) {
              nfcEast[p].status = 'warning'
            } 
          }
          // FIND MATCHING WINS
          let matchingWins = (wins) => {
            return wins.team.trim() === this.state.thisTeam
          }
          theseMatchingWins = userWins.filter(matchingWins)
          if (theseMatchingWins[0]) {
            nfcEast[p].status = 'success'
          }
          this.setState({
              nfcEast: nfcEast,
              todaysPick: teamMatched
          })
        }

        // NFC WEST WINS
        for (var q=0; q<nfcWest.length; q++) {
          this.setState({
            thisTeam: nfcWest[q].teamName.trim()
          })
          let teamMatched = nfcWest.filter(matchingTeams)
          if (teamMatched[0]) {
            if (teamMatched[0].teamName.trim() === nfcWest[q].teamName.trim()) {
              nfcWest[q].status = 'warning'
            } 
          }
          // FIND MATCHING WINS
          let matchingWins = (wins) => {
            return wins.team.trim() === this.state.thisTeam
          }
          theseMatchingWins = userWins.filter(matchingWins)
          if (theseMatchingWins[0]) {
            nfcWest[q].status = 'success'
          }
          this.setState({
              nfcWest: nfcWest,
              todaysPick: teamMatched
          })
        }

        

        

        // for (let r=0; r<userWins.length; r++) {
        //   let win = userWins[r].team.trim()
        //   let teamButton = document.querySelectorAll(`[data-teamname="${win}"]`)
        //   console.log('ADDING CLASS: ', win)
        //   console.log('WIN BUTTON: ', teamButton)
        //   if (teamButton[0]) {
        //     console.log('TEAM BUTTON: ', teamButton[0])
        //     $(teamButton[0]).addClass('teamWin')
        //     // teamButton[0].classList.add("teamWin")
        //   } else {
        //     console.log('NO MATCHING TEAMS')
        //   }
          
        //   // $(`*[data-teamname='${win}']`).addClass("teamWin")
        // }


      }

    findTeamGames = (event) => {
      this.toggleActive()
      this.toggle()
      let team = event.target
      // console.log('THIS TEAM: ', team.dataset)
      let teamAbbr = team.dataset.teamalias

      this.setState({
        activeTeamName: team.dataset.teamname,
      })

      API.getNflTeam(teamAbbr)
        .then(res => {
          // console.log('TEAM DATA: ', res.data[0])
          let origTeam = res.data[0]
          this.setState({
            homeGames: origTeam.homeGames,
            awayGames: origTeam.awayGames
          })
          this.sortTeamGames(origTeam.homeGames, origTeam.awayGames)
        })
        .catch(err => {console.log(err)})

      }

    sortTeamGames = (homeGames, awayGames) => {
      // console.log('FIND NEXT GAMES FROM THESE: ', homeGames, awayGames)
      let allGames = []
      // let matchingGames = []
      
      for (var n=0; n<homeGames.length; n++) {
        allGames.push(homeGames[n], awayGames[n])
      }
      let sortedGames = allGames.sort((a, b) => new Date(...a.gameDate.split('/').reverse()) - new Date(...b.gameDate.split('/').reverse()));
      //console.log('SORTED GAMES: ', sortedGames)
      this.setState({
        allGames: sortedGames,
        nextGames: sortedGames
      })
  
      // console.log('THE NEXT GAMES: ', this.state.nextGames)
      // console.log('THESE GAMES MATCH: ', matchingGames)
      // this.setNextGames(nextGames)
      }
    
    sortUserPicks = () => {
      let userPicks = this.state.userPicks
      // console.log('USER PICKS: ', this.state.userPicks)

      let oldPicksFunc = (picks) => {
        return picks.gameWeek < this.props.thisWeek
      }
      let oldPicks = userPicks.filter(oldPicksFunc)
      let sortedPicks = userPicks.sort(function(a, b) {
        if (a.gameWeek < b.gameWeek) {
          return -1;
        }
        if (a.gameWeek > b.gameWeek) {
          return 1;
        }
        return 0;
      })

      this.setState({
        sortedPicks: sortedPicks,
        oldPicks: oldPicks
      })
      // console.log('THE NEXT PICKS: ', this.state.sortedPicks)
      // console.log('THE OLD PICKS: ', this.state.oldPicks)
      this.findRecentPicks()
    
      }

    findRecentPicks = () => {
      let sortedPicks = this.state.sortedPicks
      let recentDates = this.state.nflWeeks
      let recentPicks = []
      // console.log('SORTED PICKS ARRAY: ', sortedPicks)
      // console.log('PAST/FUTURE DATES: ', recentDates)
      let recentPickMatch = (thePicks) => {
        return thePicks.gameWeek === this.state.recentDate 
      }
      for (var t=0; t<recentDates.length; t++) {
          this.setState({
            recentDate: recentDates[t].week
          })
          let dateMatch = sortedPicks.filter(recentPickMatch)
          if (dateMatch[0]) {
            // console.log('MATCHING GAMES: ', dateMatch)
            recentPicks.push(dateMatch[0])
          } else {
            recentPicks.push(
              {
                team: 'NO PICK',
                gameWeek: recentDates[t].week,
                gameID: '',
                // style: (moment().format('YYYY-MM-DD').isAfter(moment(recentDates[t].date)) ? 'loss' : (moment().format('YYYY-MM-DD').isBefore(moment(recentDates[t].date)) ? 'futurePick' : 'todaysPick')),
                style: ( moment().format('YYYY-MM-DD') === (recentDates[t].week) ? 'todaysPick' : moment().format('YYYY-MM-DD') > (recentDates[t].date) ? 'loss' : 'futurePick' )
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
      let nextDays = []
      let nflWeeks = [
        {
          date: '2019-06-04',
          week: 1
        },
        {
          date: '2019-06-11',
          week: 2
        },
        {
          date: '2019-06-18',
          week: 3
        },
        {
          date: '2019-06-25',
          week: 4
        },
        {
          date: '2019-07-02',
          week: 5
        },
        {
          date: '2019-07-09',
          week: 6
        },
        {
          date: '2019-07-16',
          week: 7
        },
        {
          date: '2019-07-23',
          week: 8
        },
        {
          date: '2019-07-30',
          week: 9
        },
        {
          date: '2019-08-06',
          week: 10
        },
        {
          date: '2019-08-13',
          week: 11
        },
        {
          date: '2019-08-20',
          week: 12
        },
        {
          date: '2019-08-27',
          week: 13
        },
        {
          date: '2019-09-03',
          week: 14
        },
        {
          date: '2019-09-10',
          week: 15
        },
        {
          date: '2019-09-17',
          week: 16
        },
        {
          date: '2019-09-24',
          week: 17
        }
        

      ]
      // console.log('GAMES FOR THIS WEEK: ', today)

      this.setState({
        nextDays: nextDays,
        nflWeeks: nflWeeks
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
      let _this = this

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
      // this.changeLogo()
      this.sortUserPicks()

      $(document).ready(function(){
        // console.log('THIS WEEK: ', _this.props.thisWeek)
        let week = _this.props.thisWeek
        let scrollNum = ''
        switch(week) {
          case 1:
              scrollNum = '5%';
              break;
          case 2:
              scrollNum = '10%';
              break;
          case 3:
              scrollNum = '20%';
              break;
          case 4:
              scrollNum = '50%';
              break;
          case 5:
              scrollNum = '100%';
              break;
          case 6:
              scrollNum = '150%';
              break;
          case 7:
              scrollNum = '200%';
              break;
          case 8:
              scrollNum = '250%';
              break;
          case 9:
              scrollNum = '300%';
              break;
          case 10:
              scrollNum = '350%';
              break;
          case 11:
              scrollNum = '400%';
              break;
          case 12:
              scrollNum = '450%';
              break;
          case 13:
              scrollNum = '500%';
              break;
          case 14:
              scrollNum = '550%';
              break;
          case 15:
              scrollNum = '600%';
              break;
          case 16:
              scrollNum = '650%';
              break;
          case 17:
              scrollNum = '700%';
              break;
          default: 
            scrollNum = '10%';
            break;
        }

        $('.recentPicks').animate({scrollTop: scrollNum}, 1000);
        return false;
      });

      // console.log('CURRENT USER: ', this.state.currentUser)
      // console.log('CHAL USERS DATA: ', this.state.challengeData)
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

        for (var r=0; r<teams.length; r++) {
          //console.log('CURRENT WINS: ', wins)
          //console.log('CURRENT TEAMS: ', teams)
          // console.log('CURRENT TEAM: ', teams[r].name)
          this.setState({
            thisTeam: teams[r].name.trim()
          })
          
          let teamMatched = teams.filter(matchingTeams)
          if (teamMatched[0]) {
            if (teamMatched[0].name.trim() === teams[r].name.trim()) {
              // console.log('WE HAVE A PICK FOR TODAY: ', teamMatched[0].name)
              teams[r].status = 'warning'
            } 
          }

          // FIND MATCHING WINS
          let matchingWins = (wins) => {
            return wins.win.trim() === this.state.thisTeam
          }
          theseMatchingWins = wins.filter(matchingWins)
          if (theseMatchingWins[0]) {
            // console.log('THESE MATCHING WINS: ' , theseMatchingWins[0])
            teams[r].status = 'success'
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
        case (team === 'ari2'):
          return ari2;
          
        // case (team === 'bal'):
        //   return bal;
          
        // case (team === 'bos'):
        //   return bos2;
          
        // case (team === 'chc'):
        //   return chc;
          
        // case (team === 'cws'):
        //   return cws;
            
        // case (team === 'cle'):
        //   return cle2;
            
        // case (team === 'cin'):
        //   return cin;
            
        // case (team === 'col'):
        //   return col;
            
        // case (team === 'det'):
        //   return det2;
            
        // case (team === 'mia'):
        //   return mia2;
            
        // case (team === 'hou'):
        //   return hou2;
            
        // case (team === 'kc'):
        //   return kc;
            
        // case (team === 'laa'):
        //   return laa;
            
        // case (team === 'lad'):
        //   return lad;
            
        // case (team === 'nym'):
        //   return nym;
            
        // case (team === 'nyy'):
        //   return nyy;
        
        // case (team === 'mil'):
        //   return mil2;
            
        // case (team === 'min'):
        //   return min2;
            
        // case (team === 'oak'):
        //   return oak;
            
        // case (team === 'pit'):
        //   return pit;
            
        // case (team === 'sd'):
        //   return sd;
            
        // case (team === 'sf'):
        //   return sf;
            
        // case (team === 'phi'):
        //   return phi2;
            
        // case (team === 'sea'):
        //   return sea;
            
        // case (team === 'stl'):
        //   return stl;
            
        // case (team === 'tb'):
        //   return tb;
            
        // case (team === 'tex'):
        //   return tex;
            
        // case (team === 'tor'):
        //   return tor2;
            
        // case (team === 'ari2'):
        //   return ari2;
            
        // case (team === 'wsh'):
        //   return wsh;
            
        default:
          return ari2;
        }  

      }

    postTeams = () => {
      let teams = this.state.challengeData.teams
      // console.log('POSTING JUST THESE TEAMS: ', teams)
      // debugger;
      for (var x=0; x<teams.length; x++) {
        let teamNameCombo = teams[x].name
        let newTeam = {
          teamName: teamNameCombo,
          teamAlias: teams[x].abbr.toUpperCase(),
          homeGames: [],
          awayGames: [],
          // division: teams[x].division
        }
        // debugger
        API.postNflTeams(newTeam)
          .then(res => {
            console.log(res.data)
          })
          .catch(err => console.log(err))
        }
      }
    
    postTeamGames = () => {
      let allGames = []
      API.getNflGames()
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
                API.addNflGamesByTeam(thisTeam, theGames[p])
                  .then(res => {
                    console.log(res)
                  })
                  .catch(err => console.log(err))
              }
              // if (awayA === thisTeam) {
              //   // console.log('THE GAME: ', theGames[p])
              //   // console.log('THIS TEAM IS THE AWAY TEAM', thisTeam)
              //   API.addNflGamesByTeam(thisTeam, theGames[p])
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

    getTeams = () => {
      // console.log('GETTING TEAMS')
      let findOrigTeamsFunc = (teams) => {
          return teams.valueWeek === 0
        }
      // let findCurrentTeamsFunc = (teams) => {
      //     return teams.valueWeek === this.state.thisWeek
      //   }

      // GET NFC TEAMS
      let findNfcNorthTeamsFunc = (teams) => {
        return teams.division === 'NFC North'
      }
      let findNfcSouthTeamsFunc = (teams) => {
        return teams.division === 'NFC South'
      }
      let findNfcEastTeamsFunc = (teams) => {
        return teams.division === 'NFC East'
      }
      let findNfcWestTeamsFunc = (teams) => {
        return teams.division === 'NFC West'
      }

      // GET AFC TEAMS
      let findAfcNorthTeamsFunc = (teams) => {
        return teams.division === 'AFC North'
      }
      let findAfcSouthTeamsFunc = (teams) => {
        return teams.division === 'AFC South'
      }
      let findAfcEastTeamsFunc = (teams) => {
        return teams.division === 'AFC East'
      }
      let findAfcWestTeamsFunc = (teams) => {
        return teams.division === 'AFC West'
      }

      API.getNflTeams()
        .then(res => {
          // console.log(res.data)
          let allTeams = res.data
          let origTeams = allTeams.filter(findOrigTeamsFunc)
          // let currentTeams = allTeams.filter(findCurrentTeamsFunc)
          let nfcNorth = origTeams.filter(findNfcNorthTeamsFunc)
          let nfcSouth = origTeams.filter(findNfcSouthTeamsFunc)
          let nfcEast = origTeams.filter(findNfcEastTeamsFunc)
          let nfcWest = origTeams.filter(findNfcWestTeamsFunc)
          let afcNorth = origTeams.filter(findAfcNorthTeamsFunc)
          let afcSouth = origTeams.filter(findAfcSouthTeamsFunc)
          let afcEast = origTeams.filter(findAfcEastTeamsFunc)
          let afcWest = origTeams.filter(findAfcWestTeamsFunc)
          this.setState({
            nfcNorth: nfcNorth,
            nfcSouth: nfcSouth,
            nfcEast: nfcEast,
            nfcWest: nfcWest,
            afcNorth: afcNorth,
            afcSouth: afcSouth,
            afcEast: afcEast,
            afcWest: afcWest
          })
          this.toggleWins()
          // console.log('ORIG TEAMS: ', origTeams)
          // console.log('CURRENT TEAMS: ', nfcNorth)
        })
        .catch(err => console.log(err))
      }

    render() {
      let uuidv4 = require('uuid/v4')
      let picks = (this.state.recentPicks) ? true : false
      // let activeTeam = this.state.activeTeam
      let currentTime = moment().tz('America/New_York').format()
      let todaysPickStart = this.props.todaysPickStart
      let gameStarted = moment(currentTime).isAfter(todaysPickStart)
      const ReactHint = ReactHintFactory(React)
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
                    <h4 className='winsTitle' data-rh={gameStarted ? 'Pick has locked.' : 'Pick has not locked.'}>Week {this.props.thisWeek} Pick</h4> {this.props.todaysPick} {this.props.todaysPickValue} { gameStarted ? <i data-rh='locked' className="fas fa-lock"></i> : <i data-rh='not locked' className="fas fa-unlock"></i> } <br />
                    <div className="row recordRow">
                      <div className="col-md-3">
                      <ReactHint 
                        autoPosition={true} 
                        events={true} 
                        className='reactHint'
                      />
                        <h4 className='winsHeader'>My Current Line</h4> {this.props.myValue}
                      </div>
                      <div className="col-md-3">
                        <h4 className='winsHeader'>Division's Won</h4> {this.props.winsCount} <small>out of</small> 8
                      </div>
                      <div className="col-md-3">
                        <h4 className='winsHeader'>Record</h4> {this.props.winsCount}-{this.state.oldPicks.length - this.props.winsCount}
                      </div>  
                    </div>
                  </div>
                </Container>
              </Jumbotron>
            </div>
            <div className="col-4">
              <div className='row recentPicksRow'>
                <div className="col-10 recentPicks picks mainPicks">
                 
                  {
                    (!picks) ? (<table className='table table-hover'><tbody><tr><td>There are no recent picks!</td></tr></tbody></table>) :

                      (
                      <table className='table table-hover'>
                      <thead>
                        <tr>
                          <th>Week</th>
                          <th>Pick</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          this.state.recentPicks.map((recentPick, i) => (
                            <tr key={uuidv4()} className={(recentPick.gameDate === moment().format('YYYY-MM-DD')) ? 'todaysPick' : (recentPick.result) ? recentPick.result : recentPick.style }>
                            {/* <tr key={uuidv4()} className={recentPick.result}> */}
                              <td>{recentPick.gameWeek}</td>
                              <td>{recentPick.team} { recentPick.teamValue ? '(' + recentPick.teamValue + ')' : '' } </td>
                            </tr> 
                              )
                            )     
                        }
                      </tbody>
                      </table>
                      )

                  }

                </div>
                {/* <div className="col-1 title">
                  <h3>My Picks</h3>
                </div> */}
              </div>
            </div>
              <div className="row nflTeamLogos teamLogos">
                <div className="col-10">
                  

                  {
                    this.state.nfcActive ?

                    <div className="row teamsRow">
                      <div className="col-3 teamsCol">
                        <h4 className='divisionTitle'>NFC North</h4>
                          {
                            this.state.nfcNorth.map(nfcNorthTeam => (
                              <Button 
                                key={uuidv4()}
                                onClick={this.findTeamGames}
                                color={nfcNorthTeam.status} 
                                className='nflTeamButton'
                                data-teamalias={nfcNorthTeam.teamAlias}
                                data-teamname={nfcNorthTeam.teamName}
                                data-homegames={nfcNorthTeam.homeGames}
                                data-awaygames={nfcNorthTeam.awayGames}
                                data-rh='Click to see schedule.'
                              >
                                {nfcNorthTeam.teamName}
                              </Button>
                            ))
                          }
                      </div>

                      <div className="col-3 teamsCol">
                        <h4 className='divisionTitle'>NFC South</h4>
                        {
                          this.state.nfcSouth.map(nfcSouthTeam => (
                            <Button 
                              key={uuidv4()}
                              onClick={this.findTeamGames}
                              color={nfcSouthTeam.status} 
                              className='nflTeamButton'
                              data-teamalias={nfcSouthTeam.teamAlias}
                              data-teamname={nfcSouthTeam.teamName}
                              data-homegames={nfcSouthTeam.homeGames}
                              data-awaygames={nfcSouthTeam.awayGames}
                              data-rh='Click to see schedule.'
                            >
                              {nfcSouthTeam.teamName}
                            </Button>
                          ))
                        }
                      </div>

                      <div className="col-3 teamsCol">
                        <h4 className='divisionTitle'>NFC West</h4>
                        {
                          this.state.nfcWest.map(nfcWestTeam => (
                            <Button 
                              key={uuidv4()}
                              onClick={this.findTeamGames}
                              color={nfcWestTeam.status} 
                              className='nflTeamButton'
                              data-teamalias={nfcWestTeam.teamAlias}
                              data-teamname={nfcWestTeam.teamName}
                              data-homegames={nfcWestTeam.homeGames}
                              data-awaygames={nfcWestTeam.awayGames}
                              data-rh='Click to see schedule.'
                            >
                              {nfcWestTeam.teamName}
                            </Button>
                          ))
                        }
                      </div>

                      <div className="col-3 teamsCol">
                        <h4 className='divisionTitle'>NFC East</h4>
                        {
                          this.state.nfcEast.map(nfcEastTeam => (
                            <Button 
                              key={uuidv4()}
                              onClick={this.findTeamGames}
                              color={nfcEastTeam.status} 
                              className='nflTeamButton'
                              data-teamalias={nfcEastTeam.teamAlias}
                              data-teamname={nfcEastTeam.teamName}
                              data-homegames={nfcEastTeam.homeGames}
                              data-awaygames={nfcEastTeam.awayGames}
                              data-rh='Click to see schedule.'
                            >
                              {nfcEastTeam.teamName}
                            </Button>
                          ))
                        }
                      </div>

                      <Modal 
                          isOpen={this.state.modal} 
                          autoFocus={true}
                          centered={true}
                          size='lg'
                          className='fullCalModal'
                        >
                          
                          <ModalHeader id='modalTitle'>
                            Schedule ({this.state.activeTeamName})
                          </ModalHeader>
                            <ModalBody id='modalBody' className='nextGames' style={modalStyle}>
                                <div className="thisTeam">
                                  <table className='table  table-hover'>
                                    <thead>
                                      <tr>
                                        <th>Week</th>
                                        <th>Matchup</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                    {
                                      this.state.nextGames.map((nextGame) => (
                                        <tr key={uuidv4()} className={(moment().format('YYYY-MM-DD') === nextGame.gameDate) ? 'today' : nextGame.status} >
                                          <td>{(nextGame.gameWeek)}</td>
                                          <td>{(nextGame.homeTeam === this.state.activeTeamName) ? 'vs ' + nextGame.awayAlias : '@ ' + nextGame.homeAlias}</td>
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
                  : 

                  <div className="row teamsRow">
                    <div className="col-3 teamsCol">
                      <h4 className='divisionTitle'>AFC North</h4>
                      {
                        this.state.afcNorth.map(afcNorthTeam => (
                          <Button 
                            key={uuidv4()}
                            onClick={this.findTeamGames}
                            color={afcNorthTeam.status} 
                            className='nflTeamButton'
                            data-teamalias={afcNorthTeam.teamAlias}
                            data-teamname={afcNorthTeam.teamName}
                            data-homegames={afcNorthTeam.homeGames}
                            data-awaygames={afcNorthTeam.awayGames}
                            data-rh='Click to see schedule.'
                          >
                            {afcNorthTeam.teamName}
                          </Button>
                        ))
                      }
                    </div>

                    <div className="col-3 teamsCol">
                      <h4 className='divisionTitle'>AFC South</h4>
                      {
                        this.state.afcSouth.map(afcSouthTeam => (
                          <Button 
                            key={uuidv4()}
                            onClick={this.findTeamGames}
                            color={afcSouthTeam.status} 
                            className='nflTeamButton'
                            data-teamalias={afcSouthTeam.teamAlias}
                            data-teamname={afcSouthTeam.teamName}
                            data-homegames={afcSouthTeam.homeGames}
                            data-awaygames={afcSouthTeam.awayGames}
                            data-rh='Click to see schedule.'
                          >
                            {afcSouthTeam.teamName}
                          </Button>
                        ))
                      }
                    </div>

                    <div className="col-3 teamsCol">
                      <h4 className='divisionTitle'>AFC West</h4>
                      {
                        this.state.afcWest.map(afcWestTeam => (
                          <Button 
                            key={uuidv4()}
                            onClick={this.findTeamGames}
                            color={afcWestTeam.status} 
                            className='nflTeamButton'
                            data-teamalias={afcWestTeam.teamAlias}
                            data-teamname={afcWestTeam.teamName}
                            data-homegames={afcWestTeam.homeGames}
                            data-awaygames={afcWestTeam.awayGames}
                            data-rh='Click to see schedule.'
                          >
                            {afcWestTeam.teamName}
                          </Button>
                        ))
                      }
                    </div>

                    <div className="col-3 teamsCol">
                      <h4 className='divisionTitle'>AFC East</h4>
                        {
                          this.state.afcEast.map(afcEastTeam => (
                            <Button 
                              key={uuidv4()}
                              onClick={this.findTeamGames}
                              color={afcEastTeam.status} 
                              className='nflTeamButton'
                              data-teamalias={afcEastTeam.teamAlias}
                              data-teamname={afcEastTeam.teamName}
                              data-homegames={afcEastTeam.homeGames}
                              data-awaygames={afcEastTeam.awayGames}
                              data-rh='Click to see schedule.'
                            >
                              {afcEastTeam.teamName}
                            </Button>
                          ))
                        }
                      </div>

                      <Modal 
                          isOpen={this.state.modal} 
                          autoFocus={true}
                          centered={true}
                          size='lg'
                          className='fullCalModal'
                        >
                          
                          <ModalHeader id='modalTitle'>
                            Schedule ({this.state.activeTeamName})
                          </ModalHeader>
                            <ModalBody id='modalBody' className='nextGames' style={modalStyle}>
                                <div className="thisTeam">
                                  <table className='table  table-hover'>
                                    <thead>
                                      <tr>
                                        <th>Week</th>
                                        <th>Matchup</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                    {
                                      this.state.nextGames.map((nextGame) => (
                                        <tr key={uuidv4()} className={nextGame.game ? (moment().format('YYYY-MM-DD') === nextGame.game.gameDate) ? 'today' : nextGame.status : ''} >
                                          <td>{(nextGame.gameWeek)}</td>
                                          <td>{(nextGame.homeTeam === this.state.activeTeamName) ? 'vs ' + nextGame.awayAlias : '@ ' + nextGame.homeAlias}</td>
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
                  
                  }
                  
                </div>
              </div>
              <div className="row toggleRow">
                {/* <small>(Toggle)</small> */}
                  <div className="col-md">
                    <Button className='nfcButton' onClick={this.toggleNfc}>
                      NFC TEAMS
                    </Button>
                    <Button className='afcButton' onClick={this.toggleAfc}>
                      AFC TEAMS
                    </Button>
                  </div>
                </div>

            </div>
        )
    }
}

export default NflDivisionBar