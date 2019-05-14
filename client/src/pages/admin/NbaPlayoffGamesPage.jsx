import React, { Component } from 'react'
import ReactTable from "react-table";
import matchSorter from 'match-sorter'
// import { Redirect } from 'react-router-dom'
import API from '../../utils/API'
import AdminBar from '../../components/nav/AdminBar'
import moment from 'moment'
import $ from 'jquery'
import 'react-table/react-table.css'
import '../../css/gamesPage.css'

class NbaPlayoffGamesPage extends Component {
  constructor(props) {
    super(props) 
    this.state = {
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
      this.renderEditable = this.renderEditable.bind(this);
      this.getAllGames = this.getAllGames.bind(this)
      this.postGames = this.postGames.bind(this)
      this.getGames = this.getGames.bind(this)
      this.getResults = this.getResults.bind(this)
      this.findGameWinners = this.findGameWinners.bind(this)
      this.postGameWinners = this.postGameWinners.bind(this)
      this.checkYesterday = this.checkYesterday.bind(this)
    }

  componentDidMount() {
      this.getAllGames()
      // this.getGames()
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

      if (moment(gameDate).isSame(moment().format())) {
        console.log('TODAYS GAME')
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
      } else {
        console.log('NOT TODAY')
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
        }
      }
    }

  getGames = () => {
    let self = this

    // const mlbKey = 't3ed9fy74zen5fynprhhkmw2'
    // const nbaKey = '2kuh4yhq78h5rdmf9vrsprgg'
    // const nbaKey2 = '4y7q3vsbv9rdj9kbevdfng4j'
    const nbaKey3 = 'pucmd9ehjna2p25aa2qzkvn3'

    // API CALL TO PULL ENTIRE SEASON SCHEDULE
    $.ajax({
      // url: "https://cors-everywhere.herokuapp.com/http://api.sportradar.us/mlb/trial/v6.5/en/games/" + this.state.today + "/schedule.json?api_key=" + mlbKey,
      url: 'https://cors-everywhere.herokuapp.com/http://api.sportradar.us/nba/trial/v5/en/games/2018/PST/schedule.json?api_key=' + nbaKey3,
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
    const nbaKey3 = 'pucmd9ehjna2p25aa2qzkvn3'

    // API CALL TO GET EACH NBA GAME RESULT (DELAY 1.5 SECONDS)
    for (let m=0; m<yesterdayGamesIds.length; m++) {
      let k = m
      setTimeout ( 
        function() {
          $.ajax({
            url: 'https://cors-everywhere.herokuapp.com/http://api.sportradar.us/nba/trial/v5/en/games/' + yesterdayGamesIds[k] + '/boxscore.json?api_key=' + nbaKey3,
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
            
              <AdminBar />

                <div id='nbaGames'>
                  <h1>NBA GAMES DATABASE</h1>
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