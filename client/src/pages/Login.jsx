import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import API from '../utils/API'
import LoginBar from '../components/nav/LoginBar'
import '../css/login.css'

class Login extends Component {

    state = {
        username: '',
        password: '',
        redirect: false,
        loginError: false
    }

    componentDidMount() {
        console.log('Ready')
    }

    setRedirect = () => {
        this.setState({
            redirect: true
        })
    }

    renderRedirect = () => {
        if (this.state.redirect === true) {
          return <Redirect to='/action' />
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
        let userData = {
            username: this.state.username,
            password: this.state.password
        }

        API.loginUser(userData)
          .then(response => {
              if (response.status === 200) {
                  console.log('Authenticated!')
                  let thisUser = response.data.username
                  this.props.updateUser({
                      loggedIn: true,
                      username: response.data.username
                  })
                  let sessionData = {
                      sessionUserID: response.data.username
                  }
                  API.createSession(sessionData)
                    .then(response => {
                        this.props.updateUser({
                            sessionID: response.data._id
                        })
                    }).catch(error => {
                        console.log('Login Error: ', error)
                    })
                    API.getUser(thisUser)
                      .then(response => {
                        console.log(response)
                        this.setRedirect()
                      })
              }
          }).catch(error => {
              this.setState({
                  loginError: true
              })
              console.log('Login Error: ', error)
          })
    }

    render() {
        return (
            <div id="loginPage">
            <LoginBar />
              {this.renderRedirect()}
                <div className="formContainer">    
                    <form className="formLogin" action="index.html">
                        <h2 className="formLoginHeading">Sign In</h2>
                        <div className="loginWrap">
                            <input
                                value={this.state.username}
                                name="username"
                                onChange={this.handleInputChange}
                                type="text"
                                className="form-control"
                                placeholder="Username"
                                autoFocus
                            />
                            <br/>
                            <input
                                value={this.state.password}
                                name="password"
                                onChange={this.handleInputChange}
                                type="password"
                                className="form-control"
                                placeholder="Password"
                            />
                            <label className="checkbox">
                                <span className="pull-right">
                                    <a data-toggle="modal" href="login.html#myModal">Forgot Password?</a>               
                                </span>
                            </label>
                            {/* <AlertUsername
                            loginError={this.state.loginError}
                            /> */}
                            <button
                                className="btn btn-primary btn-block"
                                href="index.html"
                                type="submit"
                                onClick={this.handleFormSubmit}
                                >
                                <i className="fa fa-lock"></i>
                                SIGN IN
                            </button>
                            <hr/>
                            <div className="registration">
                                Don't have an account yet?<br/>
                                <a className="" href="/signup">
                                    CREATE AN ACCOUNT
                                </a>
                            </div>            
                        </div> 
                        {/* <!-- Modal --> */}
                        <div aria-hidden="true" aria-labelledby="myModalLabel" role="dialog" tabIndex="-1" id="myModal" className="modal fade">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                                        <h4 className="modal-title">Forgot Password ?</h4>
                                    </div>
                                    <div className="modal-body">
                                        <p>Enter your e-mail address below to reset your password.</p>
                                        <input type="text" name="email" placeholder="Email" autoComplete="off" className="form-control placeholder-no-fix"/>
                
                                    </div>
                                    <div className="modal-footer">
                                        <button data-dismiss="modal" className="btn btn-default" type="button">Cancel</button>
                                        <button className="btn btn-theme" type="button">Submit</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <!-- modal --> */}
                    </form>	  	
                </div>
            </div>
        )
    }
}

export default Login
       