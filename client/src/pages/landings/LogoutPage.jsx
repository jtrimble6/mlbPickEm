import React, { Component } from 'react'
// import moment from 'moment';
import '../../css/logout.css'

class LogoutPage extends Component {

    constructor(props) {
        super(props)
          this.state ={
            redirect: false,
            loginRedirect: false,
            loggedOut: false
          }
          this.renderLogout = this.renderLogout.bind(this)
          
      }

    componentDidMount() {
        this.renderLogout()
    }

    renderLogout = () => {
        localStorage.clear()
        let afterLogoutUser = localStorage.getItem('user')
        // console.log('USER AFTER LOGOUT: ', afterLogoutUser)
        if (afterLogoutUser === null) {
            this.setState({
                loggedOut: true
            })
          }
    }
    


    render() {
        // let background1 = require('../../css/images/landing2.jpeg')
        let loggedOut = this.state.loggedOut
        return (
            <div id='logoutPage'>
              <h2>Thank you for doing your chores!</h2>
                {
                  (loggedOut) ? <small id="logoutSuccess" className="form-text text-muted">You have successfully logged out!</small> :
                  <small id="logoutFailure" className="form-text text-muted">There was an error logging you out!</small>
                }
            </div>
        )
    }

}

export default LogoutPage