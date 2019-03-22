import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import LazyHero from 'react-lazy-hero'
import { Button } from 'reactstrap'
import LandingBar from '../../components/nav/LandingBar'
// import moment from 'moment';
import $ from 'jquery'
import '../../css/landing.css'

class LandingPage extends Component {

    constructor(props) {
        super(props)
          this.state ={
            redirect: false,
            loginRedirect: false
          }
          this.setRedirect = this.setRedirect.bind(this)
          this.setLoginRedirect = this.setLoginRedirect.bind(this)
          this.renderRedirect = this.renderRedirect.bind(this)
          this.handlePreloader = this.handlePreloader.bind(this)
          
      }

    handlePreloader() {
      $(".se-pre-con").fadeOut("slow");
    }

    setRedirect = () => {
        this.setState({
          redirect: true,
        })
      }

    setLoginRedirect = () => {
        this.setState({
          loginRedirect: true,
        })
      }

    renderRedirect = () => {
        window.addEventListener('load', this.handlePreloader());
        if (this.state.redirect) {
            return <Redirect to='/signup' />
          }
        else if (this.state.loginRedirect) {
          return <Redirect to='/login' />
        }
      }

    render() {
        let background1 = require('../../css/images/landing2.jpeg')
        return (
            <div id='landingPage'>
              {this.renderRedirect()}
              <div className="se-pre-con"></div>
              <LandingBar 
                username={this.state.username}
              />
              <LazyHero 
                imageSrc={background1}
                className='lazyHero'
                parallaxOffset={100}
                minHeight='700px'
              >
                <p className='heroTitle'>Home of sports <em className='emphasis'>Challenges!</em></p> <br />
                <p className='heroText'>
                  Join today and begin competing in the ultimate sports <em>Challenges</em> ranging across all major sports leagues and events! 
                </p> <br />
                <Button outline color='warning' className='signUpButton' onClick={this.setRedirect}>
                  SIGN UP
                </Button>
                <Button outline color='warning' className='loginButton' onClick={this.setLoginRedirect}>
                  LOGIN
                </Button>
              </LazyHero>
              
            </div>
        )
    }

}

export default LandingPage