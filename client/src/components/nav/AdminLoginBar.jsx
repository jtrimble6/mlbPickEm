import React, { Component } from 'react';
//import API from '../../utils/API'
import { Collapse, Nav, NavItem, NavLink } from 'reactstrap';
import logo from '../../css/images/logo2.png'
import '../../css/navbar.css'

class AdminLoginBar extends Component {
    constructor(props) {
        super(props);

        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.signout = this.signout.bind(this);
        this.state = {
            collapsed: true
        }
    }

    signout() {
      localStorage.clear()
      }

    toggleNavbar() {
        this.setState({
            collapsed: !this.state.collapsed
        })
      }

    // signout() {
    //     let localUser = localStorage.getItem('user')
    //     let sessionData = {
    //         sessionUserID: localUser
    //       }
    //     console.log('LOGOUT: ', sessionData)
    //     // API.signout(sessionData)
    //     //   .then(res => console.log(res))
    //     //   .catch(err => console.log(err))
    // }

    render() {                                                                  
        return (
            <nav className="navbar navbar-expand-lg navbar-light fixed-top" id="mainNav">
                <div className="container">
                    <a className="navbar-brand" href="/">
                        <img src={logo} alt='SportHabits' />
                    </a>
                    {/* <a className="navbar-brand js-scroll-trigger" href="/">SportHabits</a> */}
                    <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" onClick={this.toggleNavbar}>
                      <Collapse isOpen={!this.state.collapsed} navbar>
                        <Nav navbar className='navItems'>
                            <NavItem>
                                <NavLink href="/">Home</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/login">Login</NavLink>
                            </NavItem>
                        </Nav>
                      </Collapse>
                    </span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarResponsive">
                    <ul className="navbar-nav ml-auto">
                      <li className="nav-item">
                        <a className="nav-link js-scroll-trigger" href="/">Home</a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link js-scroll-trigger" href="/login">Login</a>
                      </li>
                    </ul>
                    </div>
                </div>
            </nav>
        )
    }
}

export default AdminLoginBar