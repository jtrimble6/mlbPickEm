import React, { Component } from 'react'
import $ from 'jquery'
//import API from '../../utils/API'
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
          self.postGames(data.games)
            for (var i = 0; i < data.games.length; i++) {
                var homeTeams = [];
                var awayTeams = [];
                var awayTeam = data.games[i].away.name;
                var homeTeam = data.games[i].home.name;
                homeTeams.push(homeTeam);
                awayTeams.push(awayTeam);
            }
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