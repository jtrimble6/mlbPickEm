import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
import '../../css/profileBar.css'
import API from '../../utils/API';
import { Button } from 'reactstrap'
import $ from 'jquery'
import { atl, bkn, bos, cha, chi, cle, dal, den, det, gsw, hou, ind, lac, lal, mem, mia, mil, min, nop, nyk, okc, orl, phi, phx, por, sac, sas, tor, uta, was } from '../../css/nbaLogos'

class ProfileBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: '',
            userWins: [],
            teams: []
        }

        this.findWins = this.findWins.bind(this);
        this.getTeams = this.getTeams.bind(this);
        this.changeLogo = this.changeLogo.bind(this);
      }

    componentDidMount() {
        this.getTeams()
        this.findWins()
      }

    getTeams = () => {
        this.setState({  teams: [
            { name: 'Atlanta Hawks', abbr: 'atl', logo: atl, status: 'danger' },
            { name: 'Brooklyn Nets', abbr: 'bkn', logo: bkn, status: 'danger' },
            { name: 'Boston Celtics', abbr: 'bos', logo: bos, status: 'danger' },
            { name: 'Charlotte Hornets', abbr: 'cha', logo: cha, status: 'danger' },
            { name: 'Chicago Bulls', abbr: 'chi', logo: chi, status: 'danger' },
            { name: 'Cleveland Cavaliers', abbr: 'cle', logo: cle, status: 'danger' },
            { name: 'Dallas Mavericks', abbr: 'dal', logo: dal, status: 'danger' },
            { name: 'Denver Nuggets', abbr: 'den', logo: den, status: 'danger' },
            { name: 'Detroit Pistons', abbr: 'det', logo: det, status: 'danger' },
            { name: 'Golden State Warriors', abbr: 'gsw', logo: gsw, status: 'danger' },
            { name: 'Houston Rockets', abbr: 'hou', logo: hou, status: 'danger' },
            { name: 'Indiana Pacers', abbr: 'ind', logo: ind, status: 'danger' },
            { name: 'Los Angelos Clippers', abbr: 'lac', logo: lac, status: 'danger' },
            { name: 'Los Angelos Lakers', abbr: 'lal', logo: lal, status: 'danger' },
            { name: 'Memphis Grizzlies', abbr: 'mem', logo: mem, status: 'danger' },
            { name: 'Miami Heat', abbr: 'mia', logo: mia, status: 'danger' },
            { name: 'Milwalkee Bucks', abbr: 'mil', logo: mil, status: 'danger' },
            { name: 'Minnesota Timberwolves', abbr: 'min', logo: min, status: 'danger' },
            { name: 'New Orleans Pelicans', abbr: 'nop', logo: nop, status: 'danger' },
            { name: 'New York Knicks', abbr: 'nyk', logo: nyk, status: 'danger' },
            { name: 'Oklahoma City Thunder', abbr: 'okc', logo: okc, status: 'danger' },
            { name: 'Orlando Magic', abbr: 'orl', logo: orl, status: 'danger' },
            { name: 'Philadelphia 76ers', abbr: 'phi', logo: phi, status: 'danger' },
            { name: 'Pheonix Suns', abbr: 'phx', logo: phx, status: 'danger' },
            { name: 'Portland Trailblazers', abbr: 'por', logo: por, status: 'danger' },
            { name: 'Sacramento Kings', abbr: 'sac', logo: sac, status: 'danger' },
            { name: 'San Antonio Spurs', abbr: 'sas', logo: sas, status: 'danger' },
            { name: 'Toronto Raptors', abbr: 'tor', logo: tor, status: 'danger' },
            { name: 'Utah Jazz', abbr: 'uta', logo: uta, status: 'danger' },
            { name: 'Washington Wizards', abbr: 'was', logo: was, status: 'danger' }
          ] })
    }
 
    findWins = () => {
      let localUser = localStorage.getItem('user')
      let self = this
      API.getUser(localUser)
        .then(res => {
            console.log('MY PROFILE DATA: ', res.data)
            this.setState({ userWins: res.data[0].wins})
            this.setState({ userId: res.data[0].username})
            console.log('MY PROFILE WINS: ', this.state.userWins)
            self.changeLogo()
        })
        .catch(err => console.log(err))
      }
    
    changeLogo = () => {
        let wins = this.state.userWins
        let teams = JSON.parse(JSON.stringify(this.state.teams))
        console.log('real wins: ', wins)
        let teamWins = []
        for (var j=0; j<wins.length; j++) {
            let thisWin = wins[j]
            // console.log('HERE IS THE WIN: ', thisWin)
          for (var y=0; y<teams.length; y++) {
            // let thisTeam = teams[y]
            // console.log('THIS IS THE TEAM: ', thisTeam)
            if (teams[y].name.trim() === wins[j].win.trim()) {
              console.log('this is a winning team: ', teams[y])
              teams[y].status = 'success'
              let teamWin = teams[y]
              teamWins.push(teamWin)
            }
          }
          this.setState({
              teams: teams
          })

          console.log('NEW TEAMS ARRAY: ', this.state.teams)

        }


    }

    render() {              
        let uuidv4 = require('uuid/v4')                                                    
        return (

            <div className="row profileBar">
              
                <span className="col-md">
                  <div className="row profileData">
                    Username: {this.props.username} | 
                    Today's Pick: {this.props.todaysPick} |
                    Wins: {this.props.winsCount}
                  </div>
                   
                  <div className="row teamLogos">
                    
                    {
                        this.state.teams.map((team) => (
                            <div className='col-md teamLogo' id={uuidv4()} key={uuidv4()}>
                            <Button color={team.status} className='teamButton'>
                                <img
                                className='profLogo'
                                src={team.logo}
                                alt={team.abbr}
                                fluid='true'
                                />
                                <br />
                                {team.abbr.toUpperCase()}
                            </Button>
                            </div>
                        ))
                    }
                    
                  </div>
                </span>
                
            </div>
            
                
        )
    }
}

export default ProfileBar