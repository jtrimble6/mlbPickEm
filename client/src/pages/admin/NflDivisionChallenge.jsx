import React, { Component } from 'react'
import moment from 'moment'
import AdminBar from '../../components/nav/AdminBar'
import API from '../../utils/API'
import $ from 'jquery'
import LoadingOverlay from 'react-loading-overlay';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import data from './NflData'
import NflTeamSuccess from '../../components/alerts/NflTeamSuccess'
import NflTeamError from '../../components/alerts/NflTeamError'
import '../../css/gamesPage.css'

class NflDivisionChallengePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedOptions: {
              0: 'option1',
              1: 'option1',
              2: 'option1',
              3: 'option1',
              4: 'option1',
              5: 'option1',
              6: 'option1',
              7: 'option1',
              8: 'option1',
              9: 'option1',
              10: 'option1',
              11: 'option1',
              12: 'option1',
              13: 'option1',
              14: 'option1',
              15: 'option1',
              16: 'option1',
              17: 'option1',
              18: 'option1',
              19: 'option1',
              20: 'option1',
              21: 'option1',
              22: 'option1',
              23: 'option1',
              24: 'option1',
              25: 'option1',
              26: 'option1',
              27: 'option1',
              28: 'option1',
              29: 'option1',
              30: 'option1',
              31: 'option1'
            },
            isActive: false,
            data: data,
            nflTeamSuccess: false,
            nflTeamError: false,
            week: '',
            users: [],
            teams: data.nflTeams,
            fullSchedule: [],
            thisWeek: [],
            origTeams: [],
            tier1: [],
            tier2: [],
            tier3: [],
            tier4: [],
            tier5: [],
            tier6: [],
            nflTeams: [
                { teamName: 'Arizona Cardinals', teamAlias: 'ari', logo: 'ari2', status: 'secondary', id: 1, valueWeek: 0, value: 0, tier: 0, homeGames: [], awayGames: [], division: 'NFC West' },
                { teamName: 'Atlanta Falcons', teamAlias: 'atl', logo: 'atl3', status: 'secondary', id: 2, valueWeek: 0, value: 0, tier: 0, homeGames: [], awayGames: [], division: 'NFC South' },
                { teamName: 'Baltimore Ravens', teamAlias: 'bal', logo: 'bal2', status: 'secondary', id: 3, valueWeek: 0, value: 0, tier: 0, homeGames: [], awayGames: [], division: 'AFC North' },
                { teamName: 'Buffalo Bills', teamAlias: 'buf', logo: 'buf', status: 'secondary', id: 4, valueWeek: 0, value: 0, tier: 0, homeGames: [], awayGames: [], division: 'AFC East' },
                { teamName: 'Carolina Panthers', teamAlias: 'car', logo: 'car', status: 'secondary', id: 5, valueWeek: 0, value: 0, tier: 0, homeGames: [], awayGames: [], division: 'NFC South' },
                { teamName: 'Chicago Bears', teamAlias: 'chi', logo: 'chi2', status: 'secondary', id: 6, valueWeek: 0, value: 0, tier: 0, homeGames: [], awayGames: [], division: 'NFC North' },
                { teamName: 'Cincinnati Bengals', teamAlias: 'cin', logo: 'cin', status: 'secondary', id: 7, valueWeek: 0, value: 0, tier: 0, homeGames: [], awayGames: [], division: 'AFC North' },
                { teamName: 'Cleveland Browns', teamAlias: 'cle', logo: 'cle3', status: 'secondary', id: 8, valueWeek: 0, value: 0, tier: 0, homeGames: [], awayGames: [], division: 'AFC North' },
                { teamName: 'Dallas Cowboys', teamAlias: 'dal', logo: 'dal2', status: 'secondary', id: 9, valueWeek: 0, value: 0, tier: 0, homeGames: [], awayGames: [], division: 'NFC East' },
                { teamName: 'Denver Broncos', teamAlias: 'den', logo: 'den', status: 'secondary', id: 10, valueWeek: 0, value: 0, tier: 0, homeGames: [], awayGames: [], division: 'AFC West' },
                { teamName: 'Detroit Lions', teamAlias: 'det', logo: 'det3', status: 'secondary', id: 11, valueWeek: 0, value: 0, tier: 0, homeGames: [], awayGames: [], division: 'NFC North' },
                { teamName: 'Green Bay Packers', teamAlias: 'gb', logo: 'gb', status: 'secondary', id: 12, valueWeek: 0, value: 0, tier: 0, homeGames: [], awayGames: [], division: 'NFC North' },
                { teamName: 'Houston Texans', teamAlias: 'hou', logo: 'hou2', status: 'secondary', id: 13, valueWeek: 0, value: 0, tier: 0, homeGames: [], awayGames: [], division: 'AFC South' },
                { teamName: 'Indianapolis Colts', teamAlias: 'ind', logo: 'ind2', status: 'secondary', id: 14, valueWeek: 0, value: 0, tier: 0, homeGames: [], awayGames: [], division: 'AFC South' },
                { teamName: 'Jacksonville Jaguars', teamAlias: 'jac', logo: 'jac', status: 'secondary', id: 15, valueWeek: 0, value: 0, tier: 0, homeGames: [], awayGames: [], division: 'AFC South' },
                { teamName: 'Kansas City Chiefs', teamAlias: 'kc', logo: 'kc', status: 'secondary', id: 16, valueWeek: 0, value: 0, tier: 0, homeGames: [], awayGames: [], division: 'AFC West' },
                { teamName: 'Los Angeles Chargers', teamAlias: 'lac', logo: 'lac2', status: 'secondary', id: 17, valueWeek: 0, value: 0, tier: 0, homeGames: [], awayGames: [], division: 'AFC West' },
                { teamName: 'Los Angeles Rams', teamAlias: 'la', logo: 'la', status: 'secondary', id: 18, valueWeek: 0, value: 0, tier: 0, homeGames: [], awayGames: [], division: 'NFC West' },
                { teamName: 'Miami Dolphins', teamAlias: 'mia', logo: 'mia2', status: 'secondary', id: 19, valueWeek: 0, value: 0, tier: 0, homeGames: [], awayGames: [], division: 'AFC East' },
                { teamName: 'Minnesota Vikings', teamAlias: 'min', logo: 'min2', status: 'secondary', id: 20, valueWeek: 0, value: 0, tier: 0, homeGames: [], awayGames: [], division: 'NFC North' },
                { teamName: 'New England Patriots', teamAlias: 'ne', logo: 'ne', status: 'secondary', id: 21, valueWeek: 0, value: 0, tier: 0, homeGames: [], awayGames: [], division: 'AFC East' },
                { teamName: 'New Orleans Saints', teamAlias: 'no', logo: 'no', status: 'secondary', id: 22, valueWeek: 0, value: 0, tier: 0, homeGames: [], awayGames: [], division: 'NFC South' },
                { teamName: 'New York Giants', teamAlias: 'nyg', logo: 'nyg', status: 'secondary', id: 23, valueWeek: 0, value: 0, tier: 0, homeGames: [], awayGames: [], division: 'NFC East' },
                { teamName: 'New York Jets', teamAlias: 'nyj', logo: 'nyj', status: 'secondary', id: 24, valueWeek: 0, value: 0, tier: 0, homeGames: [], awayGames: [], division: 'AFC East' },
                { teamName: 'Oakland Raiders', teamAlias: 'oak', logo: 'oak', status: 'secondary', id: 25, valueWeek: 0, value: 0, tier: 0, homeGames: [], awayGames: [], division: 'AFC West' },
                { teamName: 'Philadelphia Eagles', teamAlias: 'phi', logo: 'phi', status: 'secondary', id: 26, valueWeek: 0, value: 0, tier: 0, homeGames: [], awayGames: [], division: 'NFC East' },
                { teamName: 'Pittsburgh Steelers', teamAlias: 'pit', logo: 'pit', status: 'secondary', id: 27, valueWeek: 0, value: 0, tier: 0, homeGames: [], awayGames: [], division: 'AFC North' },
                { teamName: 'San Francisco 49ers', teamAlias: 'sf', logo: 'sf', status: 'secondary', id: 29, valueWeek: 0, value: 0, tier: 0, homeGames: [], awayGames: [], division: 'NFC West' },
                { teamName: 'Seattle Seahawks', teamAlias: 'sea', logo: 'sea', status: 'secondary', id: 28, valueWeek: 0, value: 0, tier: 0, homeGames: [], awayGames: [], division: 'NFC West' },
                { teamName: 'Tampa Bay Buccaneers', teamAlias: 'tb', logo: 'tb', status: 'secondary', id: 30, valueWeek: 0, value: 0, tier: 0, homeGames: [], awayGames: [], division: 'NFC South' },
                { teamName: 'Tennessee Titans', teamAlias: 'ten', logo: 'ten', status: 'secondary', id: 31, valueWeek: 0, value: 0, tier: 0, homeGames: [], awayGames: [], division: 'AFC South' },
                { teamName: 'Washington Redskins', teamAlias: 'was', logo: 'was2', status: 'secondary', id: 32, valueWeek: 0, value: 0, tier: 0, homeGames: [], awayGames: [], division: 'NFC East' }
              ]

        }
        this.getSchedule = this.getSchedule.bind(this)
        this.postGames = this.postGames.bind(this)
        this.getGames = this.getGames.bind(this)
        this.postTeams = this.postTeams.bind(this)
        this.postTeamGames = this.postTeamGames.bind(this)
        this.getTeams = this.getTeams.bind(this)
        this.submitTeams = this.submitTeams.bind(this)
        this.resetTeams = this.resetTeams.bind(this)
        this.retrieveTeams = this.retrieveTeams.bind(this)
        this.getWeek = this.getWeek.bind(this)
        this.handleOptionChange = this.handleOptionChange.bind(this)
        this.handlePreloader = this.handlePreloader.bind(this);
        this.clearSchedule = this.clearSchedule.bind(this);
    }

    componentDidMount() {
        // this.getSchedule()
        this.getTeams()
        this.getWeek()
        this.postTeams()
        this.postTeamGames()
        // this.getGames()
      }

    handleOptionChange = changeEvent => {
        let currentOptions = this.state.selectedOptions
        let num = changeEvent.target.dataset.num
        currentOptions[num] = changeEvent.target.value
        this.setState({
          selectedOptions: currentOptions 
        });
        // console.log('SELECTED OPTIONS: ', this.state.selectedOptions)
      };
    
    handlePreloader() {
        this.setState({
          isActive: !this.state.isActive
        });
      }  

    getWeek = () => {
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
  
        let today = moment().format('YYYY-MM-DD')
        let _this = this
        for (let w=0; w<nflWeeks.length; w++) {
          let thisWeek = nflWeeks[w].date
          // let nextWeek = nflWeeks[w++].date
          // let prevWeek = nflWeeks[w--].date
          if(moment(today).isSameOrAfter(thisWeek) && moment(today).isBefore(moment(thisWeek).add(7, 'days').format('YYYY-MM-DD'))) {
            // console.log('THIS WEEK: ', nflWeeks[w].week)
            _this.setState({
              week: nflWeeks[w].week
            })
          } else {
            // console.log('NOT THIS WEEK: ', nflWeeks[w].week)
          } 
        }
  
      }

    getGames = () => {
      let self = this

      const nflKey = 'bdqyj8auvbh3gmwmuqasrxen'

      // API CALL TO PULL ENTIRE SEASON SCHEDULE
      $.ajax({
        url: 'https://cors-everywhere.herokuapp.com/http://api.sportradar.us/nfl/official/trial/v5/en/games/2018/REG/schedule.json?api_key=' + nflKey,
        type: 'GET',
        success: function(data) {
          self.setState({ fullSchedule: data.weeks });
          console.log('ALL 2018 NFL GAMES: ', data.weeks)

        //   POST ENTIRE SCHEDULE
          self.postGames(data.weeks)
          }
        })
      }

    postGames = (data) => {
        for (let i=0; i<data.length; i++) {
          let thisWeek = data[i]
          let theseGames = thisWeek.games
          for (let d=0; d<theseGames.length; d++) {
            let adjGameDate = moment(theseGames[d].scheduled).add(9, 'months').format()
            let gameDateAdj = moment(adjGameDate).subtract(5, 'hours').format()
            let splitDate = gameDateAdj.split('T')
            let gameDate = splitDate[0]
            
            let gameData = {
              gameWeek: thisWeek.sequence,
              gameDate: gameDate,
              gameTime: gameDateAdj,
              gameStatus: theseGames[d].status,
              gameId: theseGames[d].id,
              homeTeam: theseGames[d].home.name,
              awayTeam: theseGames[d].away.name,
              homeAlias: theseGames[d].home.alias,
              awayAlias: theseGames[d].away.alias,
              gameResult: 'none'
            }
            console.log('GAME DATA: ', gameData)
            // debugger;
    
            //POST ENTIRE SCHEDULE
            API.postNflGames(gameData)
              .then(res=> console.log(res))
              .catch(err => console.log(err))
            }
          }
          
      }

    clearSchedule = () => {
        this.setState({
          thisWeek: []
        })
      }
    
    getSchedule = () => {
      this.handlePreloader()
      let self = this

      // PULL GAMES FROM YESTERDAY
      API.getNflGames()
        .then(res => {
            let games = []
            res.data.forEach((game) => {
              let splitDate = game.gameDate.split('T')
              let gameDate = splitDate[0]
              let gameInfo = {
                  gameWeek: game.gameWeek,
                  id: game.gameId,
                  date: gameDate,
                  start: game.gameDate,
                  status: game.gameStatus,
                  homeTeam: game.homeTeam,
                  awayTeam: game.awayTeam,
                  gameWinner: game.gameResult.gameResult,
                  title: game.homeAlias + ' vs ' + game.awayAlias,
                  color: 'yellow',
                  textColor: 'black',
                  borderColor: 'blue'
                }
                games.push(gameInfo)
            
                self.setState({ fullSchedule: games })
                
              })

            // GET RESULTS FROM YESTERDA IF THEY HAVEN'T BEEN PULLED(UNDEFINED)
            console.log('THESE GAMES: ', this.state.fullSchedule)
            let schedule = this.state.fullSchedule
            let thisWeeksGamesFunc = (games) => {
                return games.gameWeek === this.state.week
            }
            let thisWeeksGames = schedule.filter(thisWeeksGamesFunc)
            console.log('THIS WEEKS GAMES: ', thisWeeksGames)
            this.setState({
                thisWeek: thisWeeksGames
            }, () => {
              this.handlePreloader()
            })
            // if(this.state.yesterdaysGames[0].gameWinner === undefined) {
                // self.getResults()
              // } else {
              //   //FIND ALL USERS PICKS
              //   // console.log('finding user picks')
              //   self.findUserPicks()
              // }

        })
          .catch(err => console.log(err))
      }
    
    postTeams = () => {
        let teams = this.state.nflTeams
        API.postNflTeams(teams)
          .then(res => {
              console.log(res)

          })
          .catch(err => console.log(err))
      }

    postTeamGames = () => {
      let teams = this.state.nflTeams
      let origTeams = []
      API.getNflGames()
        .then(res => {
          origTeams.push(res.data)
          let theGames = origTeams[0]
          console.log('THE GAMES: ', theGames)
          for (var t=0; t<teams.length; t++) {
            let thisTeam = teams[t].teamAlias.toUpperCase()
            // console.log('ALL GAMES: ', theGames)
            // console.log('THIS TEAM: ', thisTeam)
            for (var p=0; p<theGames.length; p++) {
              let homeA = theGames[p].homeAlias
              // let awayA = theGames[p].awayAlias
              if (homeA === thisTeam) {
                // console.log('THE GAME: ', theGames[p])
                // console.log('THIS TEAM IS THE HOME TEAM', thisTeam)
                API.addNflGamesByTeam(thisTeam.toLowerCase(), theGames[p])
                  .then(res => {
                    console.log(res)
                  })
                  .catch(err => console.log(err))
              }
              // if (awayA === thisTeam) {
              //   console.log('THE GAME: ', theGames[p])
              //   console.log('THIS TEAM IS THE AWAY TEAM', thisTeam)
              //   API.addNflGamesByTeam(thisTeam.toLowerCase(), theGames[p])
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
        let findOrigTeamsFunc = (teams) => {
            return teams.valueWeek === 0
        }
        API.getNflTeams()
          .then(res => {
              let allTeams = res.data
              let origTeams = allTeams.filter(findOrigTeamsFunc)
              this.setState({
                  origTeams: origTeams
              })
              console.log('ORIG NFL TEAMS: ', origTeams)
          })
          .catch(err => {
              console.log(err)
          })
      }
    
    submitTeams = () => {
        console.log('WEEK ' + this.state.week + ' TEAM VALUES: ', this.state.selectedOptions)
        // debugger;
        let options = this.state.selectedOptions
        let teams = this.state.nflTeams
        // console.log('SELECTED OPTIONS: ', options)
        for(let g=0; g<32; g++) {
          console.log('STARTING SCRIPT')
            let teamValue
            let teamTier = options[g]
            
            if (teamTier === 'option1') {
              teamValue = 2
            } else if (teamTier === 'option2') {
              teamValue = 1
            } else if (teamTier === 'option3') {
              teamValue = -1
            } else if (teamTier === 'option4') {
              teamValue = -2
            } else {
              teamValue = 0
            }

            let thisTeam = {
                teamName: teams[g].teamName,
                teamAlias: teams[g].teamAlias,
                logo: teams[g].logo,
                status: teams[g].status,
                homeGames: teams[g].homeGames,
                awayGames: teams[g].awayGames,
                division: teams[g].division,
                value: teamValue,
                tier: teamTier,
                valueWeek: this.state.week,
            }
            console.log('THIS TEAM: ', thisTeam)
            // debugger;
            API.postNflTeams(thisTeam)
              .then(res => {
                  console.log(res)
                //   console.log('THIS TEAM: ', thisTeam)
                  this.setState({
                      nflTeamSuccess: true
                  })
                  this.getTeams()
              })
              .catch(err => {
                  console.log(err)
                  this.setState({
                    nflTeamError: true
                  })
                })
        }
      }

    resetTeams = () => {
       this.setState({
        selectedOptions: {
          0: 'option1',
          1: 'option1',
          2: 'option1',
          3: 'option1',
          4: 'option1',
          5: 'option1',
          6: 'option1',
          7: 'option1',
          8: 'option1',
          9: 'option1',
          10: 'option1',
          11: 'option1',
          12: 'option1',
          13: 'option1',
          14: 'option1',
          15: 'option1',
          16: 'option1',
          17: 'option1',
          18: 'option1',
          19: 'option1',
          20: 'option1',
          21: 'option1',
          22: 'option1',
          23: 'option1',
          24: 'option1',
          25: 'option1',
          26: 'option1',
          27: 'option1',
          28: 'option1',
          29: 'option1',
          30: 'option1',
          31: 'option1'
        },
       })
      }

    retrieveTeams = () => {
        API.getNflTeams()
          .then(res => {
              let teams = res.data
              let lastTeams = teams.slice(Math.max(teams.length - 32))
              console.log('MOST RECENT TEAMS: ', lastTeams)
              let orderedTeams = lastTeams.sort(function(a,b){
                if(a.teamName < b.teamName) { return -1; }
                if(a.teamName > b.teamName) { return 1; }
                return 0;
              })
              console.log('ORDERED TEAMS: ', orderedTeams)
              let currentOptions = this.state.selectedOptions
              for (let u=0; u<32; u++) {
                let num = u
                currentOptions[num] = lastTeams[u].tier
              }
              this.setState({
                selectedOptions: currentOptions 
              });
              // console.log('LAST SELECTED OPTIONS: ', this.state.selectedOptions)
              // for (let f=0; f<lastTeams.length; f++) {
              //   console.log('LAST TEAMS: ', lastTeams)
              //   let teamTier = lastTeams[f].tier
                
              // }
              // this.setState({
              //     origTeams: lastTeams
              // })
          })
          .catch(err => {
              console.log(err)
          })
      }
 
    render() {
        let thisWeek = this.state.thisWeek
        let nflTeams = this.state.nflTeams
        let uuidv4 = require('uuid/v4')
        
        return(
            <div>
                <AdminBar />
                <div className="nflAdminPage">
                    <h2 className="nflTitle">Week {this.state.week}</h2> 
                    <div className="row buttonRow">
                      <Button className='loadSchedule' color='warning' onClick={this.getSchedule} disabled={thisWeek[0]}>
                        Load Schedule
                      </Button>
                      <Button className='loadSchedule' color='danger' onClick={this.clearSchedule} disabled={!thisWeek[0]}>
                        Clear Schedule
                      </Button>
                    </div>
                    <div className="row">
                      <LoadingOverlay
                        active={this.state.isActive}
                        spinner
                        className='nflSpinner'
                        styles={{
                          spinner: (base) => ({
                            ...base,
                            width: '200px',
                            '& svg circle': {
                              stroke: 'gold'
                            }
                          })
                        }}
                        text='Loading This Weeks Games...'
                        >
                      </LoadingOverlay>
                    </div>
                    
                    <div className="weeklyGames row">
                        {
                            thisWeek[0] ? 
                            
                            thisWeek.map((game, x) => (
                                <Button color="success" key={uuidv4()}>
                                    Game #{x+1}: {game.title} 
                                </Button>
                            ))
                            :
                            <span>
                                
                            </span>

                        }
                    </div> <hr />
                    <h1 className="nflTitle">Tier Selection</h1>
                    <h2 className='nflLegend'>Tier 1 = 2pts | Tier 2 = 1pt | Tier 3 = -1pt | Tier 4 = -2pts</h2>
                    <div className="row nflTeamTable">
                      

                        {
                          nflTeams.map((team, y) => (
                            <Form key={uuidv4()} className='nflTeamOption'>
                              <span className='teamNum'>
                                {y+1}
                              </span>
                              <FormGroup>
                                <Label className='nflTeamLabel' for='nflTeam'>{team.teamName}</Label>
                              </FormGroup>
                              <FormGroup check>
                                <Label check>
                                  <Input type="radio" data-num={y} onChange={this.handleOptionChange} name="radio1" value='option1' checked={this.state.selectedOptions[y] === 'option1'} />{' '}
                                  1
                                </Label>
                                <Label check className='check2'>
                                  <Input type="radio" data-num={y} onChange={this.handleOptionChange} name="radio2" value='option2' checked={this.state.selectedOptions[y] === 'option2'} />{' '}
                                  2
                                </Label>
                              </FormGroup>
                              <FormGroup check>
                                <Label check>
                                  <Input type="radio" data-num={y} onChange={this.handleOptionChange} name="radio3" value='option3' checked={this.state.selectedOptions[y] === 'option3'} />{' '}
                                  3
                                </Label>
                                <Label check className='check2'>
                                  <Input type="radio" data-num={y} onChange={this.handleOptionChange} name="radio4" value='option4' checked={this.state.selectedOptions[y] === 'option4'} />{' '}
                                  4
                                </Label>
                              </FormGroup>
                              {/* <FormGroup check>
                                <Label check>
                                  <Input type="radio" data-num={y} onChange={this.handleOptionChange} name="radio3" value='option3' checked={this.state.selectedOptions[y] === 'option3'} />{' '}
                                  3
                                </Label>
                                <Label check className='check2'>
                                  <Input type="radio" data-num={y} onChange={this.handleOptionChange} name="radio7" value='option7' checked={this.state.selectedOptions[y] === 'option7'} />{' '}
                                  7
                                </Label>
                              </FormGroup>
                              <FormGroup check>
                                <Label check>
                                  <Input type="radio" data-num={y} onChange={this.handleOptionChange} name="radio4" value='option4' checked={this.state.selectedOptions[y] === 'option4'} />{' '}
                                  4
                                </Label>
                                <Label check className='check2'>
                                  <Input type="radio" data-num={y} onChange={this.handleOptionChange} name="radio8" value='option8' checked={this.state.selectedOptions[y] === 'option8'} />{' '}
                                  8
                                </Label>
                              </FormGroup> */}
                            </Form> 
                          ))
                        }

                    </div>

                    {/* <div className="row nflTeamTable">
                        <div className="col-2">
                            <RLDD
                            items={nflTeams}
                            itemRenderer={(nflTeams) => {
                                return (
                                    <Button className='nflButton'>{nflTeams.teamName}</Button>
                                )
                            }}
                            onChange={this.handleRLDDChange}
                            />
                        </div>

                        <div className="col-4">
                            <div className="tier">
                                <h3>Tier 1</h3> <hr />
                                <RLDD
                                    items={nflTeamsTier1}
                                    itemRenderer={(nflTeams) => {
                                        return (
                                            <Button className='nflButton'>{nflTeams.teamName}</Button>
                                        )
                                    }}
                                    onChange={this.handleRLDDChangeTier1}
                                />
                            </div>
                            <div className="tier">
                                <h3>Tier 2</h3> <hr />
                                <RLDD
                                    items={nflTeamsTier2}
                                    itemRenderer={(nflTeams) => {
                                        return (
                                            <Button className='nflButton'>{nflTeams.teamName}</Button>
                                        )
                                    }}
                                    onChange={this.handleRLDDChangeTier2}
                                />
                            </div>
                            <div className="tier">
                                <h3>Tier 3</h3> <hr />
                                <RLDD
                                    items={nflTeamsTier3}
                                    itemRenderer={(nflTeams) => {
                                        return (
                                            <Button className='nflButton'>{nflTeams.teamName}</Button>
                                        )
                                    }}
                                    onChange={this.handleRLDDChangeTier3}
                                />
                            </div>
                        </div>

                        <div className="col-4">
                            <div className="tier">
                                <h3>Tier 4</h3> <hr />
                                <RLDD
                                    items={nflTeamsTier4}
                                    itemRenderer={(nflTeams) => {
                                        return (
                                            <Button className='nflButton'>{nflTeams.teamName}</Button>
                                        )
                                    }}
                                    onChange={this.handleRLDDChangeTier4}
                                />
                            </div>
                            <div className="tier">
                                <h3>Tier 5</h3> <hr />
                                <RLDD
                                    items={nflTeamsTier5}
                                    itemRenderer={(nflTeams) => {
                                        return (
                                            <Button className='nflButton'>{nflTeams.teamName}</Button>
                                        )
                                    }}
                                    onChange={this.handleRLDDChangeTier5}
                                />
                            </div>
                            <div className="tier">
                                <h3>Tier 6</h3> <hr />
                                <RLDD
                                    items={nflTeamsTier6}
                                    itemRenderer={(nflTeams) => {
                                        return (
                                            <Button className='nflButton'>{nflTeams.teamName}</Button>
                                        )
                                    }}
                                    onChange={this.handleRLDDChangeTier6}
                                />
                            </div>
                        </div> */}
                        
                        {/* {

                            <ReactTable
                                defaultFilterMethod={(filter, row) => String(row[filter.id]) === filter.value}
                                defaultPageSize={32}
                                data={origTeams}
                                resolveData={data => data.map(row => row)}
                                columns={columns}
                                className='gamesTable'
                            />
                            
                        } */}
                    </div> <hr />
                    {/* <DragDropContext>
                        <Container>
                        {this.state.data.columnsort.map(columnId => {
                            const column = this.state.data.columns[columnId]
                            const teams = column.teamIds.map(teamId => this.state.teams[teamId]);
                            return <Column key={Column.id} column={column} teams={teams} />
                        })}
                        </Container>
                    </DragDropContext> */}
                    <NflTeamSuccess 
                        nflTeamSuccess={this.state.nflTeamSuccess}
                    />
                    <NflTeamError 
                        nflTeamError={this.state.nflTeamError}
                    />
                    <div className="adminActions row">
                        <Button className='nflButton' color="danger" onClick={this.resetTeams}> Reset Values </Button>
                        <Button className='nflButton' color="warning" onClick={this.retrieveTeams}> Retrieve Last Set Values </Button>
                        <Button className='nflButton' color="success" onClick={this.submitTeams}> Submit Teams </Button> 
                    </div>
                    
                </div>
                
            // </div>
            
        )
    }
}

export default NflDivisionChallengePage