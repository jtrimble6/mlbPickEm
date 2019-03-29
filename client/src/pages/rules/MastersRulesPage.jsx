import React, { Component } from 'react'
// import { Redirect } from 'react-router-dom'
// import API from '../utils/API'
import RulesBar from '../../components/nav/RulesBar'
// import Games from '../components/calendar/Games'
import '../../css/rulesPage.css'

class MastersRules extends Component {

    render() {
        return(
            <div id='rulesPage'>
              <RulesBar />
              <div id='rulesHeader'>
                <h1>NBA Playoff Challenge Rules</h1> <hr />
                <br />                
                <h1>1st Round / 2nd Round / Conference Finals</h1> <hr />
                <h2>Day to Day: </h2>
                <p>
                  Pick ONE team each day. Picks are due before scheduled tip off of the first game on that particular day. <br /> <br />
                  <em>FOR EXAMPLE:</em> If the Celtics and Pacers play at 7 PM EST on April 13, all picks for April 13 are due by 7 PM EST.
                </p>
                <p>
                  You can pick any team any night. You are picking a team to WIN THE GAME. This portion of the challenge will not incorporate the spread.
                </p>
                <h2>How the scoring works: </h2>
                <p>
                  If the team you pick wins that day: nothing happens, you are safe for that day.  <br />
                  If the team you pick loses that day: You get 1 point ( you don’t want points) 
                </p>
                <p>
                  10 Points in total and you are eliminated from the challenge!
                  * This goes until the conclusion of the western and eastern conference finals. You must have 9 or less loses at the conclusion of the conference finals to qualify for the NBA Finals Round. *
                </p> <hr />
                <h1>The Finals Round:</h1> <hr />

                <h2>How to qualify:</h2>
                <p>
                  Have 9 or less losses leading up to Game 1 of the NBA Finals
                </p> 
                <p>
                  The points you obtained from the games before the finals carry over into the finals. You still pick one team a night, and you still get a point for a loss.
                </p>

                <h2>How the scoring CHANGES: </h2>
                <p>
                  If you pick the underdog in the game and they win, you will be awarded 1.5 off of your total points before that game started. If you pick the favorite, you will only be awarded 1 point off off of your total points before that game started. 
                </p>

                <em>FOR EXAMPLE:</em> 

                <p>Finals sample scenario:</p>
                <p>Jazz vs Raptors</p>
                <p>Game 1 Raptors are favored by 6 i.e Raptors -6 </p>
                <p>Here is how Game 1 would work for you if you did the following (remember you want to lose points, you don’t want points): </p>
                <p>Raptors win</p>
                <p>You picked Raptors: -1</p>
                <p>You Picked Jazz: -1 </p>
                <p>Jazz win</p>
                <p>You picked Raptors: +1</p>
                <p>You Picked Jazz: -1.5 </p>
                <p><em>Please note the most you can have added to your score for any wrong pick is 1 point.</em></p>

                <h2>How to win:</h2>
                <p>1. Be the last person left with 9 or less points.</p>
                <p>2. Have the lowest amount of points at the end of the playoffs. </p>

                <p>
                  For any questions/comments/concerns please email us directly at: TheChallengeMaster@SportHabits.com <br />
                  Good luck!
                </p>
              </div>
            </div>
        )
    }
}

export default MastersRules