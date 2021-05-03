import React, { Component } from 'react'
import ReactTable from "react-table-6";  
import "react-table-6/react-table.css" 
import { Button } from 'reactstrap'
import { matchSorter } from 'match-sorter'
import LoadingOverlay from 'react-loading-overlay';
import API from '../../utils/API'
import AdminBar from '../../components/nav/AdminBar'
import moment from 'moment'
import $ from 'jquery'
import '../../css/gamesPage.css'

class MlbGamesPage extends Component {
  constructor(props) {
    super(props) 
    this.state = {
      isUploadScheduleLoaderActive: false,
      isUpdateWinnersLoaderActive: false,
      username: localStorage.getItem('user'),
      allGames: [],
      todaysGames: [],
      yesterday: '',
      yesterdaysGames: [],
      yesterdaysGameIds: [],
      gameResults: [],
      signInError: false,
      yesterdayPulled: false,
      sortedSchedule: []
      }
      this.handleUploadSchedulePreloader = this.handleUploadSchedulePreloader.bind(this);
      this.handleUpdateWinnersPreloader = this.handleUpdateWinnersPreloader.bind(this)
      this.renderEditable = this.renderEditable.bind(this);
      this.getAllGames = this.getAllGames.bind(this)
      this.postGames = this.postGames.bind(this)
      this.sortSchedule = this.sortSchedule.bind(this)
      this.getMLBSeasonGames = this.getMLBSeasonGames.bind(this)
      this.getResults = this.getResults.bind(this)
      this.findGameWinners = this.findGameWinners.bind(this)
      this.postGameWinners = this.postGameWinners.bind(this)
      this.checkYesterday = this.checkYesterday.bind(this)
    }

  componentDidMount() {
      this.getAllGames()
      // this.getMLBSeasonGames()
    }

  handleUploadSchedulePreloader() {
      this.setState({
        isUploadScheduleLoaderActive: !this.state.isUploadScheduleLoaderActive
      });
    }

  handleUpdateWinnersPreloader() {
      this.setState({
        isUpdateWinnersLoaderActive: !this.state.isUpdateWinnersLoaderActive
      });
    }

  getAllGames = () => {
    let self = this
      API.getMlbGames()
        .then(res => {
          console.log('ALL MLB GAMES: ', res.data)
          self.setState({
            allGames: res.data
          })
          self.getYesterdaysGames()
          self.checkYesterday()
        })
        .catch(err => console.log(err))
    }

  getYesterdaysGames = () => {
    let yesterday = moment().subtract(1, 'days').format('YYYY-MM-DD')
    this.setState({
      yesterday: yesterday
    })
    let allGames = this.state.allGames
    let yesterdaysGames = []
    let yesterdaysGameIds = []

    // FIND EACH GAME FROM YESTERDAY, SET STATE
    let findYesterdaysGames = (games) => {
      return games.gameDate === yesterday
    }
    yesterdaysGames = allGames.filter(findYesterdaysGames)

    // FIND EACH GAME ID FROM YESTERDAY, SET STATE
    yesterdaysGames.forEach(game => {
      yesterdaysGameIds.push(game.gameId)
    })

    console.log('YESTERDAYS GAMES: ', yesterdaysGames)
    // console.log('YESTERDAYS GAME IDS: ', yesterdaysGameIds)
    this.setState({
        yesterdaysGames: yesterdaysGames,
        yesterdaysGameIds: yesterdaysGameIds
      })

    console.log('GAME #1 RESULT: ', yesterdaysGames[0].gameResult)

  }

  renderEditable(cellInfo) {
    return (
      <div
        style={{ backgroundColor: "darkblue" }}
        contentEditable
        suppressContentEditableWarning
        onBlur={e => {
          const allGames = [...this.state.allGames];
          allGames[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
          this.setState({ allGames });
        }}
        dangerouslySetInnerHTML={{
          __html: this.state.allGames[cellInfo.index][cellInfo.column.id]
        }}
      />
    );
    }

  checkYesterday = () => {
    // GET RESULTS FROM YESTERDAY IF RESULTS EMPTY
    if (this.state.yesterdaysGames[0].gameResult === 'none') {
      console.log('THE STATE: ', this.state.yesterdaysGames)
      console.log('NEED TO GET RESULTS')
      this.getResults()
    } else {
      console.log('HAVE RESULTS')
    }
    }

  postGames = (data) => {
    let postedGames = 0
    for (let i=0; i<1000; i++) {
      postedGames++
      let gameDateAdj = moment(data[i].scheduled).subtract(5, 'hours').format()
      let splitDate = gameDateAdj.split('T')
      let gameDate = splitDate[0]
      let homeTeam = data[i].home.market + ' ' + data[i].home.name
      let awayTeam = data[i].away.market + ' ' + data[i].away.name
      let gameData = {
        gameDate: gameDate,
        gameTime: gameDateAdj,
        gameStatus: data[i].status,
        gameId: data[i].id,
        homeTeam: homeTeam,
        awayTeam: awayTeam,
        homeAlias: data[i].home.abbr,
        awayAlias: data[i].away.abbr,
        gameResult: 'none'
      }
      // console.log('GAME DATA: ', gameData)
      // debugger;

      //POST ENTIRE SCHEDULE
      API.postMlbGames(gameData)
        .then(res => {
          // console.log(res)
        })
        .catch(err => console.log(err))
      }
      

      if (postedGames.length === data.length) {
        setTimeout(() => {  
          this.handleUploadSchedulePreloader()
          this.getAllGames()
         }, 5000);
      }

    }

  getMLBSeasonGames = () => {
    this.handleUploadSchedulePreloader()
    let self = this
    const mlbKey = '6xb38cgkgmt9yb7z6dz3qf4c'

    // API CALL TO PULL ENTIRE SEASON SCHEDULE
    $.ajax({
      url: 'https://cors-everywhere.herokuapp.com/http://api.sportradar.us/mlb/trial/v7/en/games/2021/REG/schedule.json?api_key=' + mlbKey,
      type: 'GET',
      success: function(data) {
        self.setState({ fullSchedule: data.games });
        console.log('ALL GAMES: ', data.games)

        // POST ENTIRE SCHEDULE
        // self.postGames(data.games)
        self.sortSchedule(data.games)
        }
      })
    }

  sortSchedule = (allGames) => {
      let sortedGames = allGames.sort(function(a, b) {
        if (moment(a.scheduled).isBefore(moment(b.scheduled))) {
            return -1;
        }
        if (moment(a.scheduled).isAfter(moment(b.scheduled))) {
            return 1;
        }
        return 0;
      })

      console.log('SORTED SCHEDULE: ', sortedGames)
      this.setState({
        sortedSchedule: sortedGames
      }, () => {
        this.postGames(sortedGames)
      })
      // console.log('THE SORTED GAMES: ', sortedGames)
      //console.log('THE OLD PICKS: ', this.state.oldGames)
      
    
      }
  
  getResults = () => {

    let self = this
    let yesterdaysGames = this.state.yesterdaysGames
    let yesterdaysGameIds = this.state.yesterdaysGameIds
    // let lastGame = yesterdaysGames.length - 1
    let yesterdaysGameResultFunc = (games) => {
      return games.gameResult === 'none'
    }
    let yesterdaysGameResultUndefined = yesterdaysGames.filter(yesterdaysGameResultFunc)
    // console.log('UNDEFINED GAMES: ', yesterdaysGameResultUndefined)
    if (yesterdaysGameResultUndefined[0]) {
      console.log('FOUND: ', yesterdaysGameResultUndefined)
      this.handleUpdateWinnersPreloader()
      // console.log('NO FOUND RESULTS FOR YESTERDAY')
      // console.log('ALL THE GAMES: ', yesterdaysGames)
      // console.log('NUMBER OF GAMES: ', yesterdaysGames.length)
      // console.log('LAST GAME RESULT: ', yesterdaysGames[lastGame].gameWinner)

      let gameResults = []

      const mlbKey = '6xb38cgkgmt9yb7z6dz3qf4c'

      yesterdaysGameIds.forEach(function(gameId, k) {
        setTimeout ( 
          function() {
            $.ajax({
              url: "https://cors-everywhere.herokuapp.com/http://api.sportradar.us/mlb/trial/v7/en/games/" + yesterdaysGameIds[k] + "/boxscore.json?api_key=" + mlbKey,
              // url: "https://cors-everywhere.herokuapp.com/http://api.sportradar.us/mlb/trial/v6.5/en/games/" + yesterday + "/schedule.json?api_key=" + mlbKey,
              type: 'GET',
              success: function(data) {
                console.log('Game results: ', data.game)
                // debugger
                gameResults.push(data.game)
                self.setState({
                  gameResults: gameResults
                })
                // console.log('GAME RESULTS: ', gameResults)
                self.findGameWinners()
              }
            })
          }, 1500*k)
        })
      } else {
        // console.log('FOUND RESULTS FOR YESTERDAY')
        // console.log('LAST GAME RESULT: ', yesterdaysGames[lastGame].gameWinner)
        return
      }


    // console.log('GETTING RESULTS')
    // let self = this
    // let yesterday = moment(this.state.yesterday).format('YYYY/MM/DD')
    // let yesterdaysGameIds = this.state.yesterdaysGameIds
    // let gameResults = []
    // // console.log('GETTING RESULTS: ', yesterdaysGameIds)
    // // console.log('YESTERDAY: ', yesterday)

    // const mlbKey = '6xb38cgkgmt9yb7z6dz3qf4c'

    // // API CALL TO GET EACH MLB GAME RESULT (DELAY 1.5 SECONDS)
    // for (let m=0; m<yesterdaysGameIds.length; m++) {
    //   let k = m
    //   setTimeout ( 
    //     function() {
    //       $.ajax({
    //         url: "https://cors-everywhere.herokuapp.com/http://api.sportradar.us/mlb/trial/v7/en/games/" + yesterdaysGameIds[m] + "/boxscore.json?api_key=" + mlbKey,
    //         // url: "https://cors-everywhere.herokuapp.com/http://api.sportradar.us/mlb/trial/v6.5/en/games/" + yesterday + "/schedule.json?api_key=" + mlbKey,
    //         type: 'GET',
    //         success: function(data) {
    //           console.log('Game results: ', data.game)
    //           // debugger
    //           gameResults.push(data.game)
    //           self.setState({
    //             gameResults: gameResults
    //           })
    //           // console.log('GAME RESULTS: ', gameResults)
    //           self.findGameWinners()
    //         }
    //       })
    //     }, 1500*k)
    //   }
    }

  findGameWinners = () => {
    // FIND GAME RESULTS FROM YESTERDAY
    let gameResults = this.state.gameResults
    console.log('GAME RESULTS: ', gameResults)
    // debugger;
    let winningTeams = []
    for (let x=0; x<gameResults.length; x++) {
      let gameId = gameResults[x].id
      let gameDate = this.state.yesterday
      let homeTeam = {
          team: gameResults[x].home.market + ' ' + gameResults[x].home.name ,
          runs: gameResults[x].home.runs
        }
      let awayTeam = {
          team: gameResults[x].away.market + ' ' + gameResults[x].away.name,
          runs: gameResults[x].away.runs
        }

      if (homeTeam.runs > awayTeam.runs) {
          winningTeams.push({gameId: gameId, gameDate: gameDate, winningTeam: homeTeam.team})
        } else {
          winningTeams.push({gameId: gameId, gameDate: gameDate, winningTeam: awayTeam.team})
        }
        this.setState({ winningTeams: winningTeams })
      }

    this.postGameWinners(this.state.winningTeams)

    }

  postGameWinners = (data) => {
    console.log('GAME RESULTS: ', data)
    let postedWinners = 0
    for (let y=0; y<data.length; y++) {
      postedWinners++
      // let thisDate = data[y].scheduled
      let gameDate = data[y].gameDate
      let gameId = data[y].gameId
      let gameResult = { gameResult: data[y].winningTeam }
      console.log('ALL GAME DATA: ', gameDate, gameId, gameResult)
    
      API.updateMlbGame(gameDate, gameId, gameResult)
          .then(res => console.log(res))
          .catch(err => console.log(err))
        }

      if (postedWinners === this.state.yesterdaysGameIds.length) {
          setTimeout(() => {  
            console.log('POSTED WINNERS: ', this.state.yesterdaysGameIds.length, postedWinners)
            this.handleUpdateWinnersPreloader()
            
           }, 5000);
        }
      
    }

    render() {
      const games = this.state.allGames
      const columns = [{
        Header: 'Game Date',
        headerClassName: 'gamesHeaders',
        accessor: 'gameDate',
        Cell: props => <span className='gameDate'>{props.value}</span>,
        filterMethod: (filter, rows) =>
          matchSorter(rows, filter.value, { keys: ["gameDate"] }),
          filterAll: true
      },
      {
        Header: 'Teams',
        headerClassName: 'gamesHeaders',
        id: 'teams',
        accessor: d =>
          <div
            dangerouslySetInnerHTML={{
              __html: d.homeAlias + " vs. " + d.awayAlias
            }}
          />,
        filterMethod: (filter, rows) =>
          matchSorter(rows, filter.value, { keys: [d => [d.homeAlias, d.awayAlias]] }),
          filterAll: true
      },{
        Header: 'Game Time',
        headerClassName: 'gamesHeaders',
        accessor: 'gameTime',
        Cell: props => <span className='number'>{(moment(props.value).add(5, 'hours').format('h:mm a'))}</span> 
      },{
        Header: 'Status',
        headerClassName: 'gamesHeaders',
        accessor: 'gameStatus',
        filterMethod: (filter, rows) =>
          matchSorter(rows, filter.value, { keys: ["gameStatus"] }),
          filterAll: true,
        // Cell: props => <span className='string'>{props.value}</span>
        Cell: this.renderEditable
      },{
        Header: 'Winner',
        id: 'winner',
        headerClassName: 'gamesHeaders',
        accessor: d => ( (d.gameResult.gameResult) ? d.gameResult.gameResult : d.gameResult ),
        filterMethod: (filter, rows) =>
          matchSorter(rows, filter.value, { keys: ["winner"] }),
          filterAll: true
        // Cell: this.renderEditable
      },
    
    ]
    
        return(
            <div id='nbaGamesPage'>
              <LoadingOverlay
                active={this.state.isUploadScheduleLoaderActive}
                // active={true}
                spinner
                styles={{
                  spinner: (base) => ({
                    ...base,
                    width: '50%',
                    height: '50%',
                    background: 'transparent',
                    '& svg circle': {
                      stroke: 'gold'
                    }
                  })
                }}
                text='PLEASE WAIT... Uploading Schedule... (this may take up to 30-45 seconds)'
                >
              </LoadingOverlay>

              <LoadingOverlay
                active={this.state.isUpdateWinnersLoaderActive}
                // active={true}
                spinner
                styles={{
                  spinner: (base) => ({
                    ...base,
                    width: '50%',
                    height: '50%',
                    background: 'transparent',
                    '& svg circle': {
                      stroke: 'gold'
                    }
                  })
                }}
                text='PLEASE WAIT... Finding game results... (this may take up to 30-45 seconds)'
                >
              </LoadingOverlay>

              <AdminBar />

              <div id='nbaGames'>
                <h1 className='adminDatabaseHeader'>MLB GAMES DATABASE</h1>
                <div className='row adminDatabaseControlsRow'>
                  <Button className='adminDatabaseControlsButton' onClick={this.getMLBSeasonGames}>Upload Season Schedule</Button>
                  <Button className='adminDatabaseControlsButton'>Find Game Results By Date</Button>
                  <Button className='adminDatabaseControlsButton'>Check Yesterday's Results</Button>
                </div>
                <ReactTable
                  filterable
                  defaultFilterMethod={(filter, row) =>
                    String(row[filter.id]) === filter.value}
                  data={games}
                  resolveData={data => data.map(row => row)}
                  columns={columns}
                  className='gamesTable'
                />
              </div>
            </div>
        )
    }
}

export default MlbGamesPage