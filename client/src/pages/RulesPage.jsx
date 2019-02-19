import React, { Component } from 'react'
// import { Redirect } from 'react-router-dom'
// import API from '../utils/API'
import Navbar from '../components/nav/Navbar'
// import Games from '../components/calendar/Games'
import '../css/rulesPage.css'

class Rules extends Component {

    render() {
        return(
            <div id='rulesPage'>
              <Navbar />
              <div id='rulesHeader'>
                <h1>Rules Page</h1>
                <hr />
              </div>
            </div>
        )
    }
}

export default Rules