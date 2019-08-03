import React, { Component } from 'react'
// import { Redirect } from 'react-router-dom'
// import API from '../utils/API'
import NflDivisionActionNav from '../../components/nav/NflDivisionActionNav'
// import Games from '../components/calendar/Games'
import '../../css/rulesPage.css'

class NflDivisionRules extends Component {

    render() {
        return(
            <div id='rulesPage'>
              <NflDivisionActionNav />
              <div id='rulesHeader'>
                <h1 className='nflRulesTitle'>NFL Division Challenge Rules</h1>
                <hr /> 
                <br />
                <h5>How the Challenge works:</h5> <br />
                <p>
                  Each week you will pick (1) NFL team to win that week. Each game is disabled at the individually scheduled game time and each pick is locked once the selected game begins. <br /> <br />
                  <em>FOR EXAMPLE:</em> All 1PM EST games will be locked at 1PM EST while the 4PM, SNF, and MNF games will still be avaliable to select. Additionally, if you pick a 1PM game, your pick will lock at 1PM. <br /> <br />
                </p>
                <h5>Caveats:</h5> <br />
                <p>
                  A value known as the 'par line' will be set at the beginning of the challenge that cannot be crossed by any user at any point. Each team will have an individual value that is potentially reset each week and that value is incured by all users selecting that team in that particular week. Each user will start with an individual 'par line' value of 0. <br /> <br />
                  <em>FOR EXAMPLE:</em> The 'par line' is set at (12.5). User A and User B both select the same game [ Bengals (set value = -2) vs. Patriots (set value = 2) ]. User A selects [ Patriots (2) ]. User B selects [ Bengals (-2) ]. When each pick locks at the scheduled start of the game, User A's individual line will change to (2) and User B's individual line will change to (-2). If the game end's in a tie, User B will be in 1st place while User A will be in 2nd place. <br /> <br />
                </p>
                <h5>Objective: </h5> <br />
                <p>
                  Get a win with at least (1) team in ALL (8) NFL divisions. <br /> <br />
                </p>
                <h5>How to win:</h5> <br />
                <p>
                  The first user to have (1) win with a team in ALL (8) NFL divisions. Ties are determined by individual value lines. <br /> <br />
                </p> 
                <h5>Important notes:</h5> <br />
                <p>
                You can pick the same team as many times as you want as long as you do not exeed the 'par line' and have not already won with a team in that division. <br />
                Once you win in a particular division, you cannot select another team from that division <br />
                If a user does not pick, or cannot make a pick, that user will automatically receive (4)pts added to their individual 'par line'. <br /> <br /> <br /> <br />
                For any questions/comments/concerns please email us directly at: TheChallengeMaster@SportHabits.com <br /> <br />
                Good luck!
                </p>
              </div>
            </div>
        )
    }
}

export default NflDivisionRules