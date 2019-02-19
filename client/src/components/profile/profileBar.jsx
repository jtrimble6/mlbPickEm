import React, { Component } from 'react';
import moment from 'moment';
//import { Link } from 'react-router-dom';
import '../../css/profileBar.css'
import API from '../../utils/API';
import { Button, Jumbotron, Container, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import $ from 'jquery'
import { atl, bkn, bos, cha, chi, cle, dal, den, det, gsw, hou, ind, lac, lal, mem, mia, mil, min, nop, nyk, okc, orl, phi, phx, por, sac, sas, tor, uta, was } from '../../css/nbaLogos'

class ProfileBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            userId: '',
            userWins: [],
            userPicks: [],
            activeTeam: {},
            nextDays: [],
            nextGames: [],
            recentPicks: [],
            allGames: [],
            homeGames: [],
            awayGames: [],
            teams: [
            { name: 'Atlanta Hawks', abbr: 'atl', logo: atl, status: 'secondary' },
            { name: 'Brooklyn Nets', abbr: 'bkn', logo: bkn, status: 'secondary' },
            { name: 'Boston Celtics', abbr: 'bos', logo: bos, status: 'secondary' },
            { name: 'Charlotte Hornets', abbr: 'cha', logo: cha, status: 'secondary' },
            { name: 'Chicago Bulls', abbr: 'chi', logo: chi, status: 'secondary' },
            { name: 'Cleveland Cavaliers', abbr: 'cle', logo: cle, status: 'secondary' },
            { name: 'Dallas Mavericks', abbr: 'dal', logo: dal, status: 'secondary' },
            { name: 'Denver Nuggets', abbr: 'den', logo: den, status: 'secondary' },
            { name: 'Detroit Pistons', abbr: 'det', logo: det, status: 'secondary' },
            { name: 'Golden State Warriors', abbr: 'gsw', logo: gsw, status: 'secondary' },
            { name: 'Houston Rockets', abbr: 'hou', logo: hou, status: 'secondary' },
            { name: 'Indiana Pacers', abbr: 'ind', logo: ind, status: 'secondary' },
            { name: 'Los Angeles Clippers', abbr: 'lac', logo: lac, status: 'secondary' },
            { name: 'Los Angeles Lakers', abbr: 'lal', logo: lal, status: 'secondary' },
            { name: 'Memphis Grizzlies', abbr: 'mem', logo: mem, status: 'secondary' },
            { name: 'Miami Heat', abbr: 'mia', logo: mia, status: 'secondary' },
            { name: 'Milwalkee Bucks', abbr: 'mil', logo: mil, status: 'secondary' },
            { name: 'Minnesota Timberwolves', abbr: 'min', logo: min, status: 'secondary' },
            { name: 'New Orleans Pelicans', abbr: 'nop', logo: nop, status: 'secondary' },
            { name: 'New York Knicks', abbr: 'nyk', logo: nyk, status: 'secondary' },
            { name: 'Oklahoma City Thunder', abbr: 'okc', logo: okc, status: 'secondary' },
            { name: 'Orlando Magic', abbr: 'orl', logo: orl, status: 'secondary' },
            { name: 'Philadelphia 76ers', abbr: 'phi', logo: phi, status: 'secondary' },
            { name: 'Pheonix Suns', abbr: 'phx', logo: phx, status: 'secondary' },
            { name: 'Portland Trailblazers', abbr: 'por', logo: por, status: 'secondary' },
            { name: 'Sacramento Kings', abbr: 'sac', logo: sac, status: 'secondary' },
            { name: 'San Antonio Spurs', abbr: 'sas', logo: sas, status: 'secondary' },
            { name: 'Toronto Raptors', abbr: 'tor', logo: tor, status: 'secondary' },
            { name: 'Utah Jazz', abbr: 'uta', logo: uta, status: 'secondary' },
            { name: 'Washington Wizards', abbr: 'was', logo: was, status: 'secondary' }
          ]
        }

        this.toggle = this.toggle.bind(this);
        this.toggleActive = this.toggleActive.bind(this);
        this.findWins = this.findWins.bind(this);
        this.changeLogo = this.changeLogo.bind(this);
        this.postTeams = this.postTeams.bind(this);
        this.findTeamGames = this.findTeamGames.bind(this);
        this.findNextGames = this.findNextGames.bind(this);
        this.postTeamGames = this.postTeamGames.bind(this);
        this.findRecentPicks = this.findRecentPicks.bind(this);
        this.findNextDays = this.findNextDays.bind(this);
      }

    // componentWillMount() {
    //   this.findWins()
    // }

    componentDidMount() {
        this.findWins()
        this.findNextDays()
        //this.postTeams()
        //this.postTeamGames()
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

      console.log('Find the next games for this team: ', teamAbbr)
      let self = this
      API.getTeam(teamAbbr)
        .then(res => {
          console.log(res.data)
          self.setState({
            activeTeam: res.data[0],
            homeGames: res.data[0].homeGames,
            awayGames: res.data[0].awayGames
          })
          let homeGames = this.state.homeGames
          let awayGames = this.state.awayGames
          console.log('HOME GAMES: ', this.state.homeGames)
          console.log('AWAY GAMES: ', this.state.awayGames)
          self.findNextGames(homeGames, awayGames)
        })
        .catch(err => console.log(err))

      // API.getGamesByTeam(teamAbbr)
      //   .then(res => {
      //       console.log(res)
      //   })
      //   .catch(err => (console.log(err)))
      }

    findNextGames = (homeGames, awayGames) => {
      //console.log('FIND NEXT GAMES FROM THESE: ', homeGames, awayGames)
      let allGames = []
      for (var n=0; n<homeGames.length; n++) {
        allGames.push(homeGames[n], awayGames[n])
      }
      let sortedGames = allGames.sort((a, b) => new Date(...a.gameDate.split('/').reverse()) - new Date(...b.gameDate.split('/').reverse()));
      //console.log('SORTED GAMES: ', sortedGames)
      this.setState({
        allGames: sortedGames
      })
      //console.log('ALL GAMES FOUND: ', this.state.allGames)
      
      console.log('NEXT 7 DAYS: ', this.state.nextDays)
      let nextGames = []
      for (var u=0; u<this.state.nextDays.length; u++) {  
        let newGame = ''
        let noGame = {
          gameDate: this.state.nextDays[u],
          homeAlias: 'No Game',
          awayAlias: 'No Game'
        }
        for (var b=0; b<this.state.allGames.length; b++) {
          if (this.state.allGames[b].gameDate === this.state.nextDays[u]) {
            newGame = this.state.allGames[b]
            // nextGames.push(this.state.allGames[b])
          } 
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
      console.log('THE NEXT GAMES: ', this.state.nextGames)
      }

    findRecentPicks = () => {
      
      let recentPicks = [ 
        {
          date: moment().subtract(6,'day').format('MM-DD'),
          team: 'NO PICK',
          status: 'pastPick'
        },
        {
          date: moment().subtract(5,'days').format('MM-DD'),
          team: 'NO PICK',
          status: 'pastPick'
        },
        {
          date: moment().subtract(4,'days').format('MM-DD'),
          team: 'NO PICK',
          status: 'pastPick'
        },
        {
          date: moment().subtract(3,'days').format('MM-DD'),
          team: 'NO PICK',
          status: 'pastPick'
        },
        {
          date: moment().subtract(2,'days').format('MM-DD'),
          team: 'NO PICK',
          status: 'pastPick'
        },
        {
          date: moment().subtract(1,'days').format('MM-DD'),
          team: 'NO PICK',
          status: 'pastPick'
        },
        {
          date: moment().format('MM-DD'),
          team: 'NO PICK',
          status: 'todaysPick'
        },
        {
          date: moment().add(1,'day').format('MM-DD'),
          team: 'NO PICK',
          status: 'futurePick'
        },
        {
          date: moment().add(2,'days').format('MM-DD'),
          team: 'NO PICK',
          status: 'futurePick'
        },
        {
          date: moment().add(3,'days').format('MM-DD'),
          team: 'NO PICK',
          status: 'futurePick'
        },
        {
          date: moment().add(4,'days').format('MM-DD'),
          team: 'NO PICK',
          status: 'futurePick'
        },
        {
          date: moment().add(5,'days').format('MM-DD'),
          team: 'NO PICK',
          status: 'futurePick'
        },
        {
          date: moment().add(6,'days').format('MM-DD'),
          team: 'NO PICK',
          status: 'futurePick'
        },
        {
          date: moment().add(7,'days').format('MM-DD'),
          team: 'NO PICK',
          status: 'futurePick'
        }
        
    ]
      console.log('USER PICKS: ', this.state.userPicks)
      for (var k=0; k<recentPicks.length; k++) {  
        // console.log('RECENT PICK: ', recentPicks[k].date)
        for (var m=0; m<this.state.userPicks.length; m++) {
          let thisUserPick = this.state.userPicks[m]
          let thisUserPickDate = moment(thisUserPick.gameDate).format('MM-DD')
          // console.log('THIS PICK: ', moment(thisUserPick.gameDate).format('MM-DD'))
          if (thisUserPickDate === recentPicks[k].date) {
            let newPick = {
              date: recentPicks[k].date,
              team: this.state.userPicks[m].team,
              status: recentPicks[k].status
            }
            console.log('THIS IS A NEW PICK: ', newPick)
            recentPicks[k] = newPick
            
            // recentPicks.push(this.state.allGames[m])
            
            
          } 
        }
        
      }
      
      this.setState({
        recentPicks: recentPicks
      })
      console.log('THE NEXT PICKS: ', recentPicks)
      }

    findNextDays = () => {
      // this.findWins()
      let today = moment().format('YYYY-MM-DD')
      let nextDays = []
      console.log('GAMES FOR THIS WEEK: ', today)

      for (var c=0; c<14; c++) {
        let thisDay = moment(today).add(c, 'days').format('YYYY-MM-DD')
        // console.log('THIS DAY: ', thisDay)
        nextDays.push(thisDay)
      }

      this.setState({
        nextDays: nextDays
      })

      this.findRecentPicks()

      }
 
    findWins = () => {
      let localUser = localStorage.getItem('user')
      let self = this
      API.getUser(localUser)
        .then(res => {
          console.log('BIG result: ', res.data)
          self.setState({ 
            userWins: res.data[0].wins,
            userId: res.data[0].username,
            userPicks: res.data[0].picks
           })
          self.changeLogo()
          self.findRecentPicks()
        })
        .catch(err => console.log(err))
      
        $(document).ready(function(){
       
            var target = $('.pastPick');
            if (target.length)
            {
                let top = target.offset().top;
                $('.recentPicks').animate({scrollTop: '300%'}, 1000);
                // $('recentPicks').scrollTo('.todaysPick')
                return false;
            }
          
          // $('.recentPicks').animate({scrollTop: '320%'}, 800); 
        });
     
      }
    
    changeLogo = () => {
        let wins = this.state.userWins
        let teams = JSON.parse(JSON.stringify(this.state.teams))
        let teamWins = []
        for (var j=0; j<wins.length; j++) {
          for (var y=0; y<teams.length; y++) {
            if (teams[y].name.trim() === wins[j].win.trim()) {
              // console.log('this is a winning team: ', teams[y])
              teams[y].status = 'success'
              let teamWin = teams[y]
              teamWins.push(teamWin)
            }
          }
          this.setState({
              teams: teams
          })

          // console.log('NEW TEAMS ARRAY: ', this.state.teams)

        }


      }

    postTeams = () => {
      let teams = this.state.teams
      console.log('POSTING JUST THESE TEAMS: ', teams)
      for (var x=0; x<teams.length; x++) {
        let newTeam = {
          teamName: teams[x].name,
          teamAlias: teams[x].abbr.toUpperCase(),
          homeGames: [],
          awayGames: []
        }
        API.postTeams(newTeam)
          .then(res => {
            console.log(res.data)
          })
          .catch(err => console.log(err))
        }
      }
    
    postTeamGames = () => {
      let allGames = []
      API.getGames()
        .then(res => {
          allGames.push(res.data)
          let theGames = allGames[0]
          for (var t=0; t<this.state.teams.length; t++) {
            let thisTeam = this.state.teams[t].abbr.toUpperCase()
            // console.log('ALL GAMES: ', theGames)
            console.log('THIS TEAM: ', thisTeam)
            for (var p=0; p<theGames.length; p++) {
              //let homeA = theGames[p].homeAlias
              let awayA = theGames[p].awayAlias
              // if (homeA === thisTeam) {
              //   console.log('THE GAME: ', theGames[p])
              //   console.log('THIS TEAM IS THE HOME TEAM', thisTeam)
              //   API.addGamesByTeam(thisTeam, theGames[p])
              //     .then(res => {
              //       console.log(res)
              //     })
              //     .catch(err => console.log(err))
              // }
              if (awayA === thisTeam) {
                console.log('THE GAME: ', theGames[p])
                console.log('THIS TEAM IS THE AWAY TEAM', thisTeam)
                API.addGamesByTeam(thisTeam, theGames[p])
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
        let modalStyle = {
          backgroundColor: 'gold',
          color: 'darkblue'
        }                                                
        return (

            <div className="row profileBar">
              <Jumbotron>
                <Container fluid>
                  <h1 className="display-4">
                    Username: {this.props.username} <br /> 
                    Today's Pick: {this.props.todaysPick} <br />
                    Wins: {this.props.winsCount}
                  </h1>
                </Container>
              </Jumbotron>
              <span className='row recentPicks'>
                <div className="col-11-md">
                <table className='table table-striped table-hover'>
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Pick</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        this.state.recentPicks.map((nextPick, i) => (
                          <tr key={uuidv4()} className={nextPick.status}>
                            <td>{nextPick.date}</td>
                            <td>{nextPick.team}</td>
                          </tr> 
                            )
                          )     
                      }
                       
                    </tbody>
                  </table>
                </div>
                <div className="col-1-md title">
                  <h4>Recent Picks</h4>
                </div>
              </span>
              
                <span className="col-md"> 
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
                    Upcoming Games
                  </ModalHeader>
                    <ModalBody id='modalBody' className='nextGames' style={modalStyle}>
                        <div className="thisTeam">
                          <table className='table table-striped table-hover'>
                            <thead>
                              <tr>
                                <th>Date</th>
                                <th>Matchup</th>
                              </tr>
                            </thead>
                            <tbody>
                            {
                              this.state.nextGames.map((nextGame) => (
                                <tr key={uuidv4()} >
                                  <td>{nextGame.gameDate}</td>
                                  <td>{nextGame.homeAlias} vs. {nextGame.awayAlias}</td>
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
                </span>
                
            </div>
            
                
        )
    }
}

export default ProfileBar