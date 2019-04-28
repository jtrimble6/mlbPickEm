import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import API from '../../utils/API'
import LoginBar from '../../components/nav/LoginBar'
import PasswordError from "../../components/alerts/PasswordError";
// import EmailFound from "../../components/alerts/EmailFound";
import crypto from 'crypto'
// import nodemailer from 'nodemailer'
import '../../css/login.css'

// require('nodemailer')

require('dotenv').config();


class UpdatePassword extends Component {
  constructor(props) {
      super(props) 
      this.state = {
        email: '',
        redirect: false,
        emailError: false,
        emailSuccess: false,
        messageFromServer: '',
        }

        this.setRedirect = this.setRedirect.bind(this)
        this.renderRedirect = this.renderRedirect.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleFormSubmit = this.handleFormSubmit.bind(this)

  }

    

    componentDidMount() {
        // console.log('Ready')
    }

    setRedirect = () => {
        this.setState({
            redirect: true
        })
      }

    renderRedirect = () => {
        if (this.state.redirect === true) {
          return <Redirect to='/login' />
        }
        else {}
      }

    handleInputChange = event => {
        const { name, value } = event.target
        this.setState({
            [name]: value
        })
      }

    handleFormSubmit = event => {
        event.preventDefault()
        // const nodemailer = require('nodemailer');
        let email = this.state.email
        let findEmailFunc = (users) => {
            return users.email.toLowerCase().trim() === email.trim()
          }
        if (this.state.email === '') {
            this.setState({
                emailError: true,
                messageFromServer: '',
            })
        } else {
            API.getUsers()
              .then(res => {
                console.log(res.data)
                let currentUsers = res.data
                let emailMatch = currentUsers.filter(findEmailFunc)
                if(emailMatch[0]) {
                console.log('EMAIL MATCH', emailMatch[0].username)
                this.setState({
                    emailSuccess: true,
                  })
                const token = crypto.randomBytes(20).toString('hex');
                let username = emailMatch[0].username
                let passInfo = {
                    username: username,
                    passwordResetToken: token,
                    passwordResetExp: Date.now() + 360000,
                  }
                
                API.updatePassToken(username, passInfo)
                  .then(res => {
                    //   console.log('PASSWORD RESET TOKEN SENT!')
                    //   console.log('PASS INFO:', username, passInfo.passwordResetToken, passInfo.passwordResetExp)
                    //   console.log(res.data)
                      this.setState({
                        email: '',
                        messageFromServer: '',
                      })
                      this.renderRedirect()
                    })
                  .catch(err => console.log(err))                
                } else {
                    console.log('NO MATCH')
                    this.setState({
                        emailError: true,
                        email: '',
                        messageFromServer: '',
                      })
                }
              })
              .catch(err => console.log(err))
        }
        
    }

    render() {
        return (
            <div id="loginPage">
            <LoginBar />
              {this.renderRedirect()}
                <div className="formContainer">    
                    <form className="formLogin" action="index.html">
                        
                      <h2 className="formLoginHeading">Update Password</h2> <br />
                        <div className="loginWrap">
                            <input
                                value={this.state.email.toLowerCase()}
                                name="password"
                                onChange={this.handleInputChange}
                                type="text"
                                className="form-control"
                                placeholder="New Password"
                                autoFocus
                            />
                            <input
                                value={this.state.email.toLowerCase()}
                                name="passwordConf"
                                onChange={this.handleInputChange}
                                type="text"
                                className="form-control"
                                placeholder="Re-enter Password"
                                autoFocus
                            />
                            <label className="checkbox">
                                <span className="pull-middle">
                                    <a href="/login">Back to login</a>               
                                </span>
                            </label>
                            <PasswordError
                                emailError={this.state.emailError}
                            />
                            {/* <EmailFound
                                emailError={this.state.emailSuccess}
                            /> */}
                            <hr/>
                            <button
                                className="btn btn-primary btn-block"
                                href="index.html"
                                type="submit"
                                onClick={this.handleFormSubmit}
                                >
                                <i className="fa fa-lock"></i> Change Password
                            </button>         
                        </div>

                    </form>	  	
                </div>
            </div>
        )
    }
}

export default UpdatePassword;
       




                      