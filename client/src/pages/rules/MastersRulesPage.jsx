import React, { Component } from 'react'
// import { Redirect } from 'react-router-dom'
// import API from '../utils/API'
import RulesBar from '../../components/nav/RulesBar'
// import Games from '../components/calendar/Games'
import '../../css/rulesPage.css'

class MastersRules extends Component {

    render() {
        return(
            <div id='rulesPage' className='mastersRules'>
              <RulesBar />
              <div id='rulesHeader'>
                <h1>Masters Challenge Rules</h1> <hr />
                <br />                
                {/* <h1>How to start: </h1> <hr /> */}
                <h2>How to start: </h2>
                <p>
                Select YOUR 5 different golfers before the Masters tee off Thursday morning. You can pick any 5 different golfers set to play in the Masters tournament.  <br /> <br />
                </p>
                <hr />
                <h2>Daily Picks: </h2>
                <em>PICKS ARE DUE DAILY BY 9AM</em>
                <h3>Thursday/Friday</h3>
                <p>
                Each day you will pick 2 golfers. You are picking golfers based on the amount of strokes that they will get that day. <br />
                <strong>FOR EXAMPLE: if you picked Justin Thomas Thursday and he shoots (-3), and you picked Tiger Woods and he shot a -2, your score on Thursday would be -5. </strong><br />
                <em>Once you pick a golfer from your list, you cannot use them again. If you don’t play a golfer, you get an automatic score of +5 for that slot. </em>
                </p>
                
                <h3>Saturday/Sunday:</h3>
                <p>After you pick on Thursday/Friday, you will have one golfer remaining. On both Saturday and
                Sunday, a computer generated random pool of 4 golfers will be released to select from. To clarify,
                that is 4 golfers Saturday, and then 4 NEW golfers Sunday. The random pool of golfers will be released after the leaderboard is set from the previous day. </p>
                <strong>Saturday you pick 2 golfers</strong> <br />
                <strong>Sunday you pick 1 golfer</strong> <br />
                <em>In the event that your remaining eligible golfer from the original 5 selected also appears in the random pool for Saturday, then you have the opportunity to play this golfer in both slots on Saturday or play that golfer once on Saturday and again on Sunday. </em>

                <hr />
                <h2>How to win:</h2>
                <p>Lowest combined score from the 4 days wins. Meaning lowest strokes between all 7 players combined.</p>

                <h2>Further broken down: </h2>

                <p>Lets say you pick the following 5 golfers: Justin Thomas, Jordan Spieth, Tiger Woods, Dustin Johnson, Patrick Reed</p>

                <p>On <em>Thursday</em> you select <em>Spieth</em> and <em>Tiger</em></p>
                <p>Spieth shoots -2</p>
                <p>Tiger shoots -2</p>
                <em>Your score after Thursday: -4 </em>
                <hr />

                <p>On <em>Friday</em> you select <em>Reed</em> and <em>Thomas</em></p>
                <p>Reed shoots +1</p>
                <p>Justin Thomas shoots -4</p>
                <em>Your total score after Friday: -7 </em>
                <hr />

                <p>On <em>Saturday</em> the random golfer board outputs <em>Adam Scott</em>, <em>Rory</em>, <em>Koepka</em> and <em>Dustin Johnson</em></p>
                <p>You then select <em>Dustin Johnson</em> and <em>Koepka</em> on <em>Saturday</em></p>
                <p>Johnson shoots -2</p>
                <p>Koepka shoots -1</p>
                <em>Your total score after Saturday: -10 </em>
                <hr />
                
                <p>On <em>Sunday</em> the random golfer board outputs <em>Patrick Reed</em>, <em>Jason Day</em>, <em>Rickie Fowler</em> and <em>Tiger Woods</em></p>
                <p>You select <em>Dustin Johnson</em> on <em>Sunday</em></p>
                <p>Johnson shoots +2</p>
                <em>Your final score: -8</em>
                <hr />
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