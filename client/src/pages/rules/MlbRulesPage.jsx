import React, { Component } from 'react'
// import { Redirect } from 'react-router-dom'
// import API from '../utils/API'
import RulesBar from '../../components/nav/RulesBar'
// import Games from '../components/calendar/Games'
import '../../css/rulesPage.css'

class MlbRules extends Component {

    render() {
        return(
            <div id='rulesPage'>
              <RulesBar />
              <div id='rulesHeader'>
              <h1>Rules</h1>
                <hr /> <br />
                <h2>MLB 2019 Winners Challenge Rules</h2>
                <br />
                <h5>How the Challenge works:</h5>
                <p>
                  Each day you will pick ONE MLB team that is playing a game on that particular day (see below for how to make a pick). Picks are due each day BEFORE the scheduled time of the first game on that particular day. <br /> <br />
                  <strong>FOR EXAMPLE:</strong> Opening day is March 28th. The first game that day is scheduled to begin at 1:05 EST. that means all picks for March 28th are due at 1:05 EST. The next day March 29th the first pitch is not schedule until 7:07 EST. Picks for March 29th are due by 7:07 EST.
                </p>
                <h5>Objective: </h5>
                <p>
                  Get 30 points/Win ONE game with all 30 MLB teams. <br />
                  1 win with a new team = 1 point
                </p>
                <h5>How to win:</h5>
                <p>
                If you pick the Cardinals on opening day and they win, you get 1 point. You now will no longer need to pick the Cardinals throughout the Challenge. If the Cardinals lose, you will need to try and pick the Cardinals again on another day to recieve that point. 
                </p> 
                
                <h5>Important notes:</h5>
                <h4>Delayed/Postponed/Canceled Games</h4><p>
                <strong>Applys to All</strong>--These occurences DO NOT affect the pick locking timer. <br /><br />
                <strong>Delayed</strong>--Games that are delayed will only be counted if the game is finished in the same calendar day selected AND a team has been granted a WIN by the MLB.<br /><br />
                <strong>Postponed</strong>--Games that are postponed to a later calendar date will be considered a 'NO PICK' by the user unless changed before the pick timer ends. The postponed game will then be moved to be available to pick on the calendar date it has been rescheduled to. <br /><em>NOTE: This is currently a manual process and therefore imperfect. Any assistance in keeping this process accurate is greatly appreciated!</em><br /><br />
                <strong>Canceled</strong>--Games that are canceled will be considered a 'NO PICK' by the user unless changed before the pick locking timer ends.</p>
                <p>
                <strong>Once the picks lock for a particular day you will not be able to go back and change your pick.</strong> <br />
                <strong>Picks are always due at the original scheduled time of the first game on each respective day.</strong> <br />
                <strong>You can make picks as far out in the future as you would like.</strong> <br /> <br /> <hr />
                For any questions/comments/concerns please email us directly at: TheChallengeMaster@SportHabits.com <br />
                Good luck!
                </p>
              </div>
            </div>
        )
    }
}

export default MlbRules