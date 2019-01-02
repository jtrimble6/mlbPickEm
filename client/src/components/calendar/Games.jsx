import React, { Component } from 'react'
import $ from 'jquery'
import API from '../../utils/API'
import '../../css/games.css'

class Games extends Component {

    state = {
        year: '',
        fullSchedule: []
    }
    
    componentDidMount() {
      this.getGames()

    }

    postGames = (data) => {
      console.log('FULL SCHEDULE: ', data)
      console.log(data.length)
      for (let i=0; i<data.length; i++) {
        console.log(data[i])
        let gameData = {
          gameDate: data[i].scheduled,
          gameStatus: data[i].status,
          gameId: data[i].id,
          homeTeam: data[i].home.name,
          awayTeam: data[i].away.name,
          homeAlias: data[i].home.alias,
          awayAlias: data[i].away.alias
        }
        API.postGames(gameData)
          .then(res=> console.log(res))
          .catch(err => console.log(err))
      }
      API.postGames(data)
        .then(res => console.log(res))
        .catch(err => console.log(err))
    }

    getGames = () => {
      //const mlbKey = 't3ed9fy74zen5fynprhhkmw2'
      //const nbaKey = '4y7q3vsbv9rdj9kbevdfng4j'
      let self = this
      $.ajax({
        // url: "https://cors-everywhere.herokuapp.com/http://api.sportradar.us/mlb/trial/v6.5/en/games/2018/07/02/schedule.json?api_key=" + mlbKey,
        // url: "https://cors-everywhere.herokuapp.com/http://api.sportradar.us/nba/trial/v5/en/games/2018/12/23/schedule.json?api_key=" + nbaKey,
        url: 'https://cors-everywhere.herokuapp.com/http://api.sportradar.us/nba/trial/v5/en/games/2018/REG/schedule.json?api_key=4y7q3vsbv9rdj9kbevdfng4j',
        type: "GET",
        success: function(data) {
          console.log('GAMES: ', data.games);
          self.setState({ fullSchedule: data.games });
          //console.log('FULL SCHEDULE: ', self.state.fullSchedule);
          //self.postGames(data.games)
            // for (let i = 0; i < data.games.length; i++) {
            //     let homeTeams = [];
            //     let awayTeams = [];
            //     let awayTeam = data.games[i].away.name;
            //     let homeTeam = data.games[i].home.name;
            //     // let homeAlias = data.games[i].home.alias;
            //     // let awayAlias = data.games[i].away.alias;
            //     homeTeams.push(homeTeam);
            //     awayTeams.push(awayTeam);
            // }
        }
      })
    }

    render() {
      return (
        <div>Here are the games of the day</div>
      )
    }
}

export default Games