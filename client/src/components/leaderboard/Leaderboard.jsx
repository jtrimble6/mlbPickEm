import React, { Component } from 'react'
import $ from 'jquery'
import API from '../../utils/API'
import '../../css/leaderboard.css'
import { Button, Jumbotron, Container, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { atl, bkn, bos, cha, chi, cle, dal, den, det, gsw, hou, ind, lac, lal, mem, mia, mil, min, nop, nyk, okc, orl, phi, phx, por, sac, sas, tor, uta, was } from '../../css/nbaLogos'

class Leaderboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allUsers: [],
            leaders: [],
            userPlace: {},

        }
        this.getUsers = this.getUsers.bind(this);
        // this.changeLogo = this.changeLogo.bind(this);
        this.createLeaderboard = this.createLeaderboard.bind(this);
    }
    componentDidMount() {
        this.getUsers()
      }

    getUsers = () => {
        let self = this
        let allUserData = []
        let teams = [
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
        API.getUsers()
          .then(res => {
            for (var q=0; q<res.data.length; q++) {
                let userData = res.data[q]
                allUserData.push(userData)
            }
            // let userData = {
            //     userInfo: res.data,
            //     userTeams: teams
            // }
            //allUserData.push(userData)
              console.log('THESE ARE ALL THE USERS: ', allUserData)
              self.setState({ allUsers: allUserData })
              self.createLeaderboard()
            //   self.changeLogo()
          })
      }

    createLeaderboard = () => {
        let users = this.state.allUsers
        console.log('Create leaderboard with this data: ', users)
        let placedUsers = users.map(function(el, i) {
            return { index: i, value: el.wins.length }
        })
        console.log('PLACED USERS: ', placedUsers)
        placedUsers.sort(function(a, b) {
            if (a.value > b.value) {
                return -1;
            }
            if (a.value < b.value) {
                return 1;
            }
            return 0;
        })
        let leaders = placedUsers.map(function(el) {
            return users[el.index]
        })
        console.log('LEADERS: ', leaders)
        this.setState({ leaders: leaders })

        console.log('NEW LEADERBOARD: ', this.state.allUsers)
        
    }

    // changeLogo = () => {
    //     let allUsers = this.state.allUsers
    //     console.log('CHANGE LOGOS FOR THESE USERS: ', allUsers)
    //     let teams = JSON.parse(JSON.stringify(allUsers[0].userTeams))
    //     console.log('TEAMS: ', teams)
    //     let wins = allUsers[0].userInfo.wins
    //     let teamWins = []
    //     for (var j=0; j<wins.length; j++) {
    //       for (var y=0; y<teams.length; y++) {
    //         if (teams[y].name.trim() === wins[j].win.trim()) {
    //           // console.log('this is a winning team: ', teams[y])
    //           teams[y].status = 'success'
    //           let teamWin = teams[y]
    //           teamWins.push(teamWin)
    //         }
    //       }
    //     console.log('TEAM WINS: ', teamWins)
    //     //   this.setState({
    //     //       teams: teams
    //     //   })

    //     //   // console.log('NEW TEAMS ARRAY: ', this.state.teams)

    //     }


    //   }

    render() {
        let uuidv4 = require('uuid/v4')
        let leaderStyle = {
            overflow: 'scroll'
        }
        return(
            <div className='leaderboard'>
                <h2>Leaderboard</h2>
                <table className='table table-striped table-hover'>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>User</th>
                        <th>Points</th>
                        {/* <th>Teams</th> */}
                    </tr>
                    </thead>
                    <tbody>
                    {
                      this.state.leaders.map((leader, i) => (
                        
                        <tr key={uuidv4()} className='allRows'>
                        <td className='leaderRow' style={leaderStyle}>{i+1}</td>
                        <td className='leaderRow' style={leaderStyle}>{leader.username}</td>
                        <td className='leaderRow' style={leaderStyle}>{leader.wins.length}</td>
                        
                        
                        {/* {

                        leader.teams.map((team, i) => (
                            <td key={uuidv4()} className='teamLogos' style={leaderStyle}>
                              <Button 
                                key={uuidv4()}
                                onClick={this.findTeamGames}
                                color={team.status} 
                                className='userTeamButton'
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
                              </td>
                            ))
                            
                        } */}
                        
                        
                        </tr>
                      ))
                    }
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Leaderboard