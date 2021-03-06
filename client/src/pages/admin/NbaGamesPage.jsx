import React, { Component } from 'react'
import ReactTable from "react-table-6";  
import { matchSorter } from 'match-sorter'
import LoadingOverlay from 'react-loading-overlay';
import API from '../../utils/API'
import AdminBar from '../../components/nav/AdminBar'
import { Button } from 'reactstrap'
import moment from 'moment'
import $ from 'jquery'
import "react-table-6/react-table.css";
import '../../css/gamesPage.css'

class NbaGamesPage extends Component {
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
      yesterdayPulled: false
      }
      this.handleUploadSchedulePreloader = this.handleUploadSchedulePreloader.bind(this);
      this.handleUpdateWinnersPreloader = this.handleUpdateWinnersPreloader.bind(this)
      this.renderEditable = this.renderEditable.bind(this);
      this.getAllGames = this.getAllGames.bind(this)
      this.postGames = this.postGames.bind(this)
      this.getNBASeasonGames = this.getNBASeasonGames.bind(this)
      this.getResults = this.getResults.bind(this)
      this.findGameWinners = this.findGameWinners.bind(this)
      this.postGameWinners = this.postGameWinners.bind(this)
      // this.checkYesterday = this.checkYesterday.bind(this)
    }

  componentDidMount() {
      this.getAllGames()
      // this.getNBASeasonGames()
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
      API.getNbaGames()
        .then(res => {
          console.log('ALL NBA GAMES: ', res.data)
          self.setState({
            allGames: res.data
          })
          self.getYesterdaysGames()
          self.getResults()
        })
        .catch(err => console.log(err))
    }

  getYesterdaysGames = () => {
    let yesterday = moment().subtract(1, 'day').format('YYYY-MM-DD')
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

    // console.log('GAME #1 RESULT: ', yesterdaysGames[0].gameResult)

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

  // checkYesterday = () => {
  //   // GET RESULTS FROM YESTERDAY IF RESULTS EMPTY
  //   let checkNoResult = this.state.yesterdaysGames.filter(game => {
  //     return game.gameResult === 'none'
  //   })
  //   console.log('ANY GAMES WITHOUT RESULTS? ', checkNoResult)
  //   if (checkNoResult.length) {
  //     console.log('THE STATE: ', this.state.yesterdaysGames)
  //     console.log('NEED TO GET RESULTS')
  //     this.handleUpdateWinnersPreloader()
  //     this.getResults()
  //   } else {
  //     console.log('HAVE RESULTS')
  //   }
  //   }

  postGames = (data) => {
    let postedGames = 0
    for (let i=0; i<data.length; i++) {
      postedGames++
      // console.log('GAME DATA LENGTH: ', data.length, postedGames)
      let gameDateAdj = moment(data[i].scheduled).subtract(5, 'hours').format()
      let splitDate = gameDateAdj.split('T')
      let gameDate = splitDate[0]
      
      let gameData = {
        gameDate: gameDate,
        gameTime: gameDateAdj,
        gameStatus: data[i].status,
        gameId: data[i].id,
        homeTeam: data[i].home.name,
        awayTeam: data[i].away.name,
        homeAlias: data[i].home.alias,
        awayAlias: data[i].away.alias,
        gameResult: 'none'
      }
      console.log('GAME DATA: ', gameData)
      // debugger;

      //POST ENTIRE SCHEDULE
      API.postNbaGames(gameData)
        .then( res => {
          // console.log(res)
        })
        .catch(err => console.log(err))
        
  
      }
      
      
      if (postedGames === data.length) {
        setTimeout(() => {  
          this.handleUploadSchedulePreloader()
          this.getAllGames()
         }, 5000);
      }
    }

  getNBASeasonGames = () => {
    this.handleUploadSchedulePreloader()
    let self = this
    const nbaKey = '34jjnkcxwesx9n9khfd6m3x3'

    // API CALL TO PULL ENTIRE SEASON SCHEDULE
    $.ajax({
      url: 'https://cors-everywhere.herokuapp.com/http://api.sportradar.us/nba/trial/v7/en/games/2020/REG/schedule.json?api_key=' + nbaKey,
      type: 'GET',
      success: function(data) {
        self.setState({ fullSchedule: data.games });
        console.log('ALL GAMES: ', data.games)

        // POST ENTIRE SCHEDULE
        self.postGames(data.games)
        }
      })
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

        const nbaKey = '34jjnkcxwesx9n9khfd6m3x3'

        yesterdaysGameIds.forEach(function(gameId, k) {
          setTimeout ( 
            function() {
              $.ajax({
                url: 'https://cors-everywhere.herokuapp.com/http://api.sportradar.us/nba/trial/v7/en/games/' + yesterdaysGameIds[k] + '/boxscore.json?api_key=' + nbaKey,
                type: 'GET',
                success: function(data) {
                  // console.log('RESPONSE: ', data)
                  // console.log('Game results: ', data)
                  gameResults.push(data)
                  self.setState({ gameResults: gameResults })
                  if (gameResults.length === yesterdaysGameIds.length) {
                    self.findGameWinners()
                  }
                }
              })
            }, 1500*k)
          })
        } else {
          // console.log('FOUND RESULTS FOR YESTERDAY')
          // console.log('LAST GAME RESULT: ', yesterdaysGames[lastGame].gameWinner)
          return
        }

      }

  findGameWinners = () => {
    // FIND GAME RESULTS FROM YESTERDAY
    let gameResults = this.state.gameResults
    
    let winningTeams = []
    for (let x=0; x<gameResults.length; x++) {
      let gameId = gameResults[x].id
      let gameDate = this.state.yesterday
      let homeTeam = {
          team: gameResults[x].home.market + ' ' + gameResults[x].home.name ,
          points: gameResults[x].home.points
        }
      let awayTeam = {
          team: gameResults[x].away.market + ' ' + gameResults[x].away.name,
          points: gameResults[x].away.points
        }

      if (homeTeam.points > awayTeam.points) {
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
    
      API.updateNbaGame(gameDate, gameId, gameResult)
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
          filterAll: true,
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
          matchSorter(rows, filter.value, { keys: ["teams"] }),
          filterAll: true,
      },{
        Header: 'Game Time',
        headerClassName: 'gamesHeaders',
        accessor: 'gameTime',
        Cell: props => <span className='number'>{(moment(props.value).add(5, 'hours').format('h:mm a'))}</span> 
      },{
        Header: 'Status',
        headerClassName: 'gamesHeaders',
        accessor: 'gameStatus',
        // Cell: props => <span className='string'>{props.value}</span>
        Cell: this.renderEditable,
        filterMethod: (filter, rows) =>
          matchSorter(rows, filter.value, { keys: ["gameStatus"] }),
          filterAll: true,
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
            <div className='adminTablePage'>
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
                <h1 className='adminDatabaseHeader'>NBA GAMES DATABASE</h1>
                <div className='row adminDatabaseControlsRow'>
                  <Button className='adminDatabaseControlsButton' onClick={this.getNBASeasonGames}>Upload Season Schedule</Button>
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

export default NbaGamesPage