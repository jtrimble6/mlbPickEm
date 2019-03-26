import React, { Component } from 'react'
// import { Redirect } from 'react-router-dom'
// import API from '../utils/API'
import LoginBar from '../../components/nav/LoginBar'
// import Games from '../components/calendar/Games'
import '../../css/aboutPage.css'

class About extends Component {

    render() {
        return(
            <div id='aboutPage'>
              <LoginBar />
              <div id='aboutHeader'>
                <h1>About Us</h1>
                <hr />
                <span>
                <h2>Who We Are:</h2>
                SportHabits was made with the everyday sports fan in mind. We all love sports, and what’s better than watching your favorite team win? Enjoying that win with them. Imagine those Wednesday nights you spend, thinking about the two days left of the work week to come, and already fatigued from the three days you just worked. Our goal is to give you something to look forward to that night! Whether it is the outcome of a game played out on the diamond, or how many points a team scores on the hardcourt. We want to see sports mean something to you, just like it does for the players. 
                <br /><br />
                <h2>Our Mission:</h2>
                Our vision for SportHabits is to make every game you watch equally as exciting as watching your favorite sports team play.  Whether it’s Opening Day, Saturday Night primetime, a mid-week matchup, or the final game of the year determine playoff position — we want to bring the game more excitement.  Traditionally daily Challenges and fantasy sports are also great ways to enjoy games as well, and we are not looking to replace those in your sports experience. Our mission is to run along side, and give you a new unique opportunity to enjoy sports. If we can get you to watch a new sport, team, player that you may not have watched before, then we are doing exactly what we set out to do.
                <br /><br />
                <h2>Strategic Challenges:</h2>
                Our Challenges are going to Challenge you to think outside the box. We pride ourselves on creating Challenges that will require strategic thinking, and not just picking and praying. Sure you will make picks/calls on outcomes, however our goal is to make you think about the WHY just as much as the WHO.
                <br /><br />
                <h2>What To Look For:</h2>
                The MLB Challenge will be our first live Challenge on the site. This will begin on March 28th, 2019. Check out the Rules tab once you create an account to learn more about that Challenge. The second Challenge to be launched will be the NBA playoff Challenge beginning on opening night of the NBA playoffs (April 13th, 2019). Check the site in early April for more on that Challenge!
                <br /><br />
                <h2>Questions/Comments/Feedback?</h2>
                Send us an email at TheChallengeMaster@SportHabits.com. 
                We want to hear from you and your thoughts on the experience. Whether that is something you particularly enjoy, something you particular don’t enjoy, or anything that can make your user experience better.
                <br /><br />
                All in all we want you to enjoy your experience and hopefully reap the benefits as well!<br />
                Enjoy the Challenges!<br />
                SportHabits
                </span>
              </div>
              
            </div>
        )
    }
}

export default About