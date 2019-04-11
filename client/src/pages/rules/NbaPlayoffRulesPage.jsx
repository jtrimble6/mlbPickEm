import React, { Component } from 'react'
// import { Redirect } from 'react-router-dom'
// import API from '../utils/API'
import RulesBar from '../../components/nav/RulesBar'
// import Games from '../components/calendar/Games'
import '../../css/rulesPage.css'

class NbaPlayoffRules extends Component {

    render() {
        return(
            <div id='rulesPage'>
              <RulesBar />
              <div id='rulesHeader'>
                <h1>NBA Playoff Challenge Rules</h1> <hr />
                <br />
                <h1>How To Win: </h1> <hr />
                <p>1. Be the last person standing with 9 or less strikes.</p>
                <p>2. Have the lowest amount of strikes at the end of the playoff</p>
                <h1>How To Play: </h1> <hr />
                <h2>1st Round / 2nd Round / Conference Finals</h2> <hr />
                <h3>Day to Day: </h3>
                <p>
                Pick ONE team each day. Picks are due before scheduled tip off of the first game on that
                particular day. <br /> <br />
                  <em>FOR EXAMPLE:</em> If the Celtics and Pacers play at 7 PM EST on April 13th, all picks for April 13th are due by 7 PM EST.
                </p>
                <p>
                You can pick ANY team ANY night. You are picking a team to WIN THE GAME. This portion of the challenge will not incorporate the spread.
                </p>
                <h2>How the scoring works: </h2>
                <p>
                  If the team you pick wins that day: nothing happens, you survive that day.  <br />
                  If the team you pick loses that day: You get 1 strike.
                </p>
                <p>
                  10 Strikes in total and you are eliminated from the challenge!
                  * This goes until the conclusion of the Western and Eastern conference finals. You must have 9 or less strikes at the conclusion of the conference finals to qualify for the NBA Finals Round. *
                </p> <hr />
                <h1>The Finals Round:</h1> <hr />

                <h2>How to qualify:</h2>
                <p>
                  Have 9 or less losses leading up to Game 1 of the NBA Finals
                </p> 
                <p>
                  The strikes you obtained from the games before the finals carry over into the finals.
                </p>

                <h2>How the scoring CHANGES: </h2>
                <p>
                  Now each game is worth (+) or (-) 1 point.
                </p>

                <p>
                  In the finals, you pick a team everyday if they lose you get a strike added to your score. If they
                  win, you get a strike taken off your score. Example: You have 8 strikes going into the finals. (i.e.
                  you lost 8 games during the playoffs leading up to the finals). Game 1 of the Finals you pick the
                  winner, you now have 7 strikes.
                </p>

                <p>
                  For any questions/comments/concerns please email us directly at: TheChallengeMaster@SportHabits.com <br />
                  Good luck!
                </p>
              </div>
            </div>
        )
    }
}

export default NbaPlayoffRules