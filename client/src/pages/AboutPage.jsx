import React, { Component } from 'react'
// import { Redirect } from 'react-router-dom'
// import API from '../utils/API'
import LoginBar from '../components/nav/LoginBar'
// import Games from '../components/calendar/Games'
import '../css/aboutPage.css'

class About extends Component {

    render() {
        return(
            <div id='aboutPage'>
              <LoginBar />
              <div id='aboutHeader'>
                <h1>About Page</h1>
                <hr />
              </div>
              
            </div>
        )
    }
}

export default About