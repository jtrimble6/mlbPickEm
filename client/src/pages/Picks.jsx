import React, { Component } from 'react'
// import { Redirect } from 'react-router-dom'
// import API from '../utils/API'
import Navbar from '../components/nav/Navbar'
// import Games from '../components/calendar/Games'
import '../css/picks.css'

class Picks extends Component {

    render() {
        return(
            <div id='picksPage'>
              <Navbar />
              {/* <Games /> */}
            </div>
        )
    }
}

export default Picks