import React, { Component } from 'react'
// import { Redirect } from 'react-router-dom'
// import API from '../utils/API'
import Navbar from '../components/nav/Navbar'
// import Games from '../components/calendar/Games'
import '../css/rulesPage.css'

class RulesUser extends Component {

    render() {
        return(
            <div id='rulesPage'>
              <Navbar />
              <div id='rulesHeader'>
              <h1>Rules</h1>
                <hr /> <br />
                <h2>MLB 2019 Winners Challenge Rules</h2>
                <br />
                <h5>How the challenge works:</h5>
                <p>
                  Each day you will pick ONE MLB team that is playing a game on that particular day (see below for how to make a pick). Picks are due each day BEFORE the scheduled time of the first game on that particular day. <br /> <br />
                  <em>For example:</em> Opening day is March 28th. The first game that day is scheduled to begin at 1:05 EST. that means all picks for March 28th are due at 1:05 EST. The next day March 29th the first pitch is not schedule until 7:07 EST. Picks for March 29th are due by 7:07 EST.
                </p>
                <h5>Objective: </h5>
                <p>
                  Get 30 points/Win ONE game with all 30 MLB teams. <br />
                  1 win with a new team = 1 point
                </p>
                <h5>How to win:</h5>
                <p>
                If you pick the Cardinals on opening day and they win, you get 1 point. You now will no longer pick the Cardinals throughout the challenge. If the Cardinals lose, nothing happens and you can pick the Cardinals again at any time. 
                </p> 
                <h5>Important notes:</h5>
                <p>
                Once your picks lock for a particular day you will not be able to go back and make a pick. <br />
                If you lock in a pick, and the team you picked is involved in a game that is canceled for any reason that day, no points are awarded. Furthermore, if the game is  suspended mid game, and DOES NOT finish on that day, no points are awarded. The final out of the 9th inning must be recorded on that day for the game to count. <br />
                If the first game of the day is delayed, that does not effect the time that picks are due. Picks are always due at the scheduled time of the first game on each respective day. <br />
                You can make picks as far out in the future as you would like. <br /> <br />
                For any questions/comments/concerns please email us directly at: TheSp0rtsC0mpany@gmail.com <br />
                Good luck!
                </p>
              </div>
            </div>
        )
    }
}

export default RulesUser