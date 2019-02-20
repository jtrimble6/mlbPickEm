import React, { Component } from 'react';
import API from '../../utils/API'
import { Collapse, Nav, NavItem, NavLink } from 'reactstrap';
import '../../css/navbar.css'

class Navbar extends Component {
    constructor(props) {
        super(props);

        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.logout = this.logout.bind(this);
        this.state = {
            collapsed: true
        }
    }

    toggleNavbar() {
        this.setState({
            collapsed: !this.state.collapsed
        })
      }

    logout() {
        let localUser = localStorage.getItem('user')
        let sessionData = {
            sessionUserID: localUser
          }
        console.log('LOGOUT: ', sessionData)
        // API.logout(sessionData)
        //   .then(res => console.log(res))
        //   .catch(err => console.log(err))
    }

    render() {                                                                  
        return (
            <nav className="navbar navbar-expand-lg navbar-light fixed-top" id="mainNav">
                <div className="container">
                    <a className="navbar-brand js-scroll-trigger" href="\">The Company</a>
                    <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" onClick={this.toggleNavbar}>
                      <Collapse isOpen={!this.state.collapsed} navbar>
                        <Nav navbar className='navItems'>
                            <NavItem>
                                <NavLink href="/action">Home</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/leaderboard">Leaderboard</NavLink>
                            </NavItem>
                            {/* <NavItem>
                                <NavLink href="/about">About</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/rules">Rules</NavLink>
                            </NavItem> */}
                            <NavItem>
                                <NavLink href="/logout" onClick={this.logout}>Sign Out</NavLink>
                            </NavItem>
                        </Nav>
                      </Collapse>
                    </span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarResponsive">
                    <ul className="navbar-nav ml-auto">
                      <li className="nav-item">
                        <a className="nav-link js-scroll-trigger" href="/action">Home</a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link js-scroll-trigger" href="/leaderboard">Leaderboard</a>
                      </li>
                      {/* <li className="nav-item">
                        <a className="nav-link js-scroll-trigger" href="/about">About</a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link js-scroll-trigger" href="/rules">Rules</a>
                      </li> */}
                      <li className="nav-item">
                        <a className="nav-link js-scroll-trigger" href="/logout" onClick={this.logout}>Sign Out</a>
                      </li>
                    </ul>
                    </div>
                </div>
            </nav>
        )
    }
}

export default Navbar