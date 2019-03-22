import React, { Component } from 'react'
// import { Redirect } from 'react-router-dom'
// import API from '../utils/API'
import LoginBar from '../../components/nav/LoginBar'
// import Games from '../components/calendar/Games'
import '../../css/aboutPage.css'

class Contact extends Component {

    render() {
        return(
            <div id='aboutPage'>
              <LoginBar />
              <div id='aboutHeader'>
                <h1>Contact Us</h1>
                <hr />
                <span>
                <h3>Questions/Comments/Concerns?</h3>
                  Email: TheChallengeMaster@SportHabits.com
                <hr />
                {/* <h3>Payment Info:</h3>
                  Paypal: SportHabitsPaypal21 */}
                </span>
              </div>
              
            </div>
        )
    }
}

export default Contact