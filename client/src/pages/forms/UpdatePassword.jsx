import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
// import API from '../../utils/API'
import LoginBar from '../../components/nav/LoginBar'
import PasswordError from "../../components/alerts/PasswordError";
import PasswordSuccess from "../../components/alerts/PasswordSuccess";
// import crypto from 'crypto'
// import nodemailer from 'nodemailer'
import EmailNotFound from "../../components/alerts/EmailNotFound";
import EmailFound from "../../components/alerts/EmailFound";
import '../../css/login.css'
import API from '../../utils/API';
import moment from 'moment-timezone'
// require('nodemailer')

require('dotenv').config();


class UpdatePassword extends Component {
  constructor(props) {
      super(props) 
      this.state = {
        password: '',
        confirmPassword: '',
        email: '',
        token: '',
        username: '',
        loadingUser: false,
        redirect: false,
        error: false,
        passwordError: false,
        passwordSuccess: false,
        messageFromServer: '',
        }

        this.setRedirect = this.setRedirect.bind(this)
        this.renderRedirect = this.renderRedirect.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
        this.checkPassword = this.checkPassword.bind(this)
        this.handleFormSubmit = this.handleFormSubmit.bind(this)
        
  }

    

    componentDidMount() {
        // console.log('Ready')
        this.setState({
            loadingUser: true
        })
        let params = (new URL(document.location)).searchParams
        let username = params.get("username")
        let token = params.get("token")
        // let username = (new URL(document.location)).searchParams
        // let token = this.props.match.params.token

        console.log('PARAMS: ', params)
        console.log('USERNAME: ', username)
        console.log('TOKEN: ', token)
        this.setState({
            username: username,
            token: token
        })
        API.getUser(username)
          .then(res => {
            //   console.log(res)
            //   console.log('CHANGING PASSWORD FOR THIS USER: ', res.data[0])
              let user = res.data[0]
              let userToken = user.passwordResetToken
              let userTokenExp = user.passwordResetExp
              let tokenDate = moment(userTokenExp).format('YYYY-MM-DDTHH:mm:ss')
              let realTime = moment().tz('America/New_York').format('YYYY-MM-DDTHH:mm:ss')
            //   let expDate = new Date(userTokenExp*1000);
              console.log('URL TOKEN: ', token)
              console.log('USER TOKEN: ', userToken)
              console.log('RESET TOKEN EXP: ', userTokenExp)
              console.log('TOKEN DATE EXP: ', tokenDate)
              console.log('REAL TIME: ', realTime)
              if (token === user.passwordResetToken && moment(tokenDate).isAfter(moment(realTime))) {
                  console.log('VALID TOKEN')
                  this.setState({
                    error: false,
                    loadingUser: true
                })
              } else {
                  console.log('INVALID TOKEN')
                  this.setState({
                      error: true,
                      loadingUser: false
                  })
              }
          })
          .catch(err => console.log(err))
        // console.log('TOKEN: ', token)
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
        if (this.state.confirmPassword !== '') {
            const password = event.target.value
            this.setState({
                password: password
            })
            if (this.state.confirmPassword !== password) {
                // console.log('THE PASSWORDS DO NOT MATCH')
                this.setState({
                    passwordError: 'PASSWORDS DO NOT MATCH'
                })
            } else {
                this.setState({
                    passwordError: 'PASSWORDS MATCH'
                })
            }
        }
      }

    checkPassword = event => {
        const password = event.target.value
        this.setState({
         confirmPassword: password
        })
        if (this.state.password !== password) {
            this.setState({
                passwordError: 'PASSWORDS DO NOT MATCH'
            })
        } else {
            this.setState({
                passwordError: 'PASSWORDS MATCH'
            })
        }
      }

    handleFormSubmit = event => {
        event.preventDefault()
        let newPassword = this.state.password
        // let confirmPassword = this.state.confirmPassword
        let username = this.state.username
        // const nodemailer = require('nodemailer');
        // let password = this.state.password

        if (this.state.password === '' || this.state.passwordError === 'PASSWORDS DO NOT MATCH') {
            this.setState({
                passwordError: true,
                password: '',
                confirmPassword: ''
            })
            // return
        } else {
            // console.log('USERNAME: ', username)
            // console.log('PASSWORD: ', newPassword)
            // console.log('CONFIRM PASSWORD: ', confirmPassword)
            let newPass = { newPassword: newPassword }
            API.updatePassword(username, newPass)
                .then(res => {
                    // console.log('RESULT: ', res.data)
                    // console.log('FINISHED')
                    this.setState({
                        password: '',
                        confirmPassword: '',
                        passwordSuccess: true,
                        redirect: true
                    })
                })
                .catch(err => console.log(err))
        
        }
        
    }

    render() {
        return (
            <div id="loginPage">
            <LoginBar />
              {this.renderRedirect()}
                    {
                        this.state.loadingUser ?

                        <div className="formContainer">    
                          <form className="formLogin" action="index.html">
                            <h2 className="formLoginHeading">Reset Password</h2> <br />
                                <div className="loginWrap">
                                    <div className="form-group">
                                        <label htmlFor="exampleInputPassword1">Create New Password</label>
                                        <input
                                            value={this.state.password}
                                            name="password"
                                            onChange={this.handleInputChange}
                                            type="password"
                                            className="form-control"
                                            id="password"
                                            placeholder="Password"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputPassword1">Confirm Password</label>
                                        <input
                                            value={this.state.confirmPassword}
                                            name="confirmPassword"
                                            onChange={this.checkPassword}
                                            type="password"
                                            className="form-control"
                                            id="confirmPassword"
                                            placeholder="Confirm Password"
                                        />
                                        <small id="passwordError" className="form-text text-muted">{this.state.passwordError}</small>
                                    </div>
                                    <label className="checkbox">
                                        <span className="pull-middle">
                                            <a href="/login">Back to login</a>               
                                        </span>
                                    </label>
                                    <PasswordError
                                        passwordError={this.state.passwordError}
                                    />
                                     <PasswordSuccess
                                        passwordSuccess={this.state.passwordSuccess}
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

                        :

                        <div className="formContainer">    
                          <form className="formLogin" action="index.html">  
                            <small className='invalidToken'>*The token used is invalid and/or expired. Please enter your email below to receive a new password reset token!*</small>
                            <h2 className="formLoginHeading">Password Reset</h2> <br />
                                <div className="loginWrap">
                                    <input
                                        value={this.state.email.toLowerCase()}
                                        name="email"
                                        onChange={this.handleInputChange}
                                        type="text"
                                        className="form-control"
                                        placeholder="Email address"
                                        autoFocus
                                    />
                                    <label className="checkbox">
                                        <span className="pull-middle">
                                            <a href="/login">Back to login</a>               
                                        </span>
                                    </label>
                                    <EmailNotFound
                                        emailError={this.state.emailError}
                                    />
                                    <EmailFound
                                        emailError={this.state.emailSuccess}
                                    />
                                    <hr/>
                                    <button
                                        className="btn btn-primary btn-block"
                                        href="index.html"
                                        type="submit"
                                        onClick={this.handleFormSubmit}
                                        >
                                        <i className="fa fa-lock"></i> Reset Password
                                    </button>         
                                </div>
                            </form>	  	
                        </div>  

                    }
                  
            </div>
        )
    }
}

export default UpdatePassword;
       




                      