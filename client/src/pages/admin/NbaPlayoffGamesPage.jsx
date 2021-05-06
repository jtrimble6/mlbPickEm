import React, { Component } from 'react'
import {matchSorter} from 'match-sorter'
import LoadingOverlay from 'react-loading-overlay';
import API from '../../utils/API'
import AdminBar from '../../components/nav/AdminBar'
import moment from 'moment'
import { Button } from 'reactstrap'
import $ from 'jquery'
import ReactTable from "react-table-6";  
import "react-table-6/react-table.css" 
import '../../css/gamesPage.css'

class NbaPlayoffGamesPage extends Component {
  constructor(props) {
    super(props) 
    this.state = {
        isUploadScheduleLoaderActive: false,
        username: localStorage.getItem('user'),
        allGames: [],
        todaysGames: [],
        yesterday: '',
        yesterdaysGames: [],
        yesterdayGamesIds: [],
        gameResults: [],
        signInError: false,
        yesterdayPulled: false
      }
      this.handleUploadSchedulePreloader = this.handleUploadSchedulePreloader.bind(this);
      this.renderEditable = this.renderEditable.bind(this);
      this.getAllGames = this.getAllGames.bind(this)
      this.postGames = this.postGames.bind(this)
      this.getNBAPlayoffGames = this.getNBAPlayoffGames.bind(this)
      this.getResults = this.getResults.bind(this)
      this.findGameWinners = this.findGameWinners.bind(this)
      this.postGameWinners = this.postGameWinners.bind(this)
      this.checkYesterday = this.checkYesterday.bind(this)
    }

  componentDidMount() {
      this.getAllGames()
      // this.getNBAPlayoffGames()
    }

  handleUploadSchedulePreloader() {
      this.setState({
        isUploadScheduleLoaderActive: !this.state.isUploadScheduleLoaderActive
      });
    }

  getAllGames = () => {
    let self = this
      API.getNbaPlayoffGames()
        .then(res => {
          console.log('ALL NBA PLAYOFF GAMES: ', res.data)
          self.setState({
            allGames: res.data
          })
          self.getYesterdaysGames()
          // self.checkYesterday()
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
    let yesterdayGamesIds = []

    // FIND EACH GAME FROM YESTERDAY, SET STATE
    let findYesterdaysGames = (games) => {
      return games.gameDate === yesterday
    }
    yesterdaysGames = allGames.filter(findYesterdaysGames)

    // FIND EACH GAME ID FROM YESTERDAY, SET STATE
    yesterdaysGames.forEach(game => {
      yesterdayGamesIds.push(game.gameId)
    })

    console.log('YESTERDAYS GAMES: ', yesterdaysGames)
    // console.log('YESTERDAYS GAME IDS: ', yesterdayGamesIds)
    this.setState({
        yesterdaysGames: yesterdaysGames,
        yesterdayGamesIds: yesterdayGamesIds
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
    for (let i=0; i<data.length; i++) {
      let gameDateAdj = moment(data[i].scheduled).subtract(5, 'hours').format()
      let splitDate = gameDateAdj.split('T')
      let gameDate = splitDate[0]

      // if (moment(gameDate).isSame(moment().format())) {
      //   console.log('TODAYS GAME')
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
        API.postNbaPlayoffGames(gameData)
          .then(res=> console.log(res))
          .catch(err => console.log(err))
      // } else {
        // console.log('NOT TODAY')
        // let gameData = {
        //   gameDate: gameDate,
        //   gameTime: gameDateAdj,
        //   gameStatus: data[i].status,
        //   gameId: data[i].id,
        //   homeTeam: data[i].home.name,
        //   awayTeam: data[i].away.name,
        //   homeAlias: data[i].home.alias,
        //   awayAlias: data[i].away.alias,
        //   gameResult: 'none'
        // }
        // console.log('GAME DATA: ', gameData)
        // // debugger;
  
        // //POST ENTIRE SCHEDULE
        // API.postNbaPlayoffGames(gameData)
        //   .then(res=> console.log(res))
        //   .catch(err => console.log(err))
        // }
      }
    }

  getNBAPlayoffGames = () => {
    this.handleUploadSchedulePreloader()
    let self = this
    const nbaPlayoffKey = '34jjnkcxwesx9n9khfd6m3x3'

    // API CALL TO PULL ENTIRE SEASON SCHEDULE
    $.ajax({
      url: 'https://cors-everywhere.herokuapp.com/http://api.sportradar.us/nba/trial/v7/en/games/2019/PST/schedule.json?api_key=' + nbaPlayoffKey,
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
    console.log('GETTING RESULTS')
    let self = this
    let yesterdayGamesIds = this.state.yesterdayGamesIds
    let gameResults = []
    console.log('GETTING RESULTS: ', yesterdayGamesIds)
    // const nbaKey = '2kuh4yhq78h5rdmf9vrsprgg'
    // const nbaKey2 = '4y7q3vsbv9rdj9kbevdfng4j'
    const nbaPlayoffKey = 'pucmd9ehjna2p25aa2qzkvn3'

    // API CALL TO GET EACH NBA GAME RESULT (DELAY 1.5 SECONDS)
    for (let m=0; m<yesterdayGamesIds.length; m++) {
      let k = m
      setTimeout ( 
        function() {
          $.ajax({
            url: 'https://cors-everywhere.herokuapp.com/http://api.sportradar.us/nba/trial/v5/en/games/' + yesterdayGamesIds[k] + '/boxscore.json?api_key=' + nbaPlayoffKey,
            type: 'GET',
            success: function(data) {
              console.log('Game results: ', data)
              gameResults.push(data)
              self.setState({
                gameResults: gameResults
              })
              self.findGameWinners()
            }
          })
        }, 1500*k)
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
    
    for (let y=0; y<data.length; y++) {
      // let thisDate = data[y].scheduled
      let gameDate = moment().subtract(1, 'day').format('YYYY-MM-DD')
      let gameId = data[y].gameId
      let gameResult = { gameResult: data[y].winningTeam }
      console.log('ALL GAME DATA: ', gameDate, gameId, gameResult)
    
      API.updateNbaPlayoffGame(gameDate, gameId, gameResult)
          .then(res => console.log(res))
          .catch(err => console.log(err))
        }
      
      // window.location.reload()
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
              <AdminBar />

                <div id='nbaGames'>
                  <h1 className='adminDatabaseHeader'>NBA GAMES DATABASE</h1>
                  <div className='row adminDatabaseControlsRow'>
                    <Button className='adminDatabaseControlsButton' onClick={this.getNBAPlayoffGames}>Upload Season Schedule</Button>
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

export default NbaPlayoffGamesPage