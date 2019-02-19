import React, { Component } from 'react'
// import { Redirect } from 'react-router-dom'
// import API from '../utils/API'
import Navbar from '../components/nav/Navbar'
// import Games from '../components/calendar/Games'
import '../css/aboutPage.css'

class About extends Component {

    render() {
        return(
            <div id='aboutPage'>
              <Navbar />
              <div id='aboutHeader'>
                <h1>About Page</h1>
                <hr />
              </div>
              
            </div>
        )
    }
}

export default About