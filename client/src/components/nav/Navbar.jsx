import React, { Component } from 'react';
//import API from '../../utils/API'
import { Redirect } from 'react-router-dom';
import { Collapse, Nav, NavItem, NavLink } from 'reactstrap';
import '../../css/navbar.css'

class Navbar extends Component {
    constructor(props) {
        super(props);

        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.state = {
            collapsed: true
        }
    }

    toggleNavbar() {
        this.setState({
            collapsed: !this.state.collapsed
        })
      }

    handleLogout() {
      localStorage.clear()
      return(
        <Redirect to='\' />
      )
        
    }

    render() {                                                                  
        return (
            <nav className="navbar navbar-expand-lg navbar-light fixed-top" id="mainNav">
                <div className="container">
                    <a className="navbar-brand" href="/">
                        <img src={require('../../css/images/logo2.png')} alt='SportHabits' />
                    </a>
                    {/* <a className="navbar-brand js-scroll-trigger" href="/">SportHabits</a> */}
                    <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" onClick={this.toggleNavbar}>
                      <Collapse isOpen={!this.state.collapsed} navbar>
                        <Nav navbar className='navItems'>
                            <NavItem>
                                <NavLink href="/landing">Home</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/leaderboard">Leaderboard</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/mlbRules">Rules</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/signout">Sign Out</NavLink>
                            </NavItem>
                        </Nav>
                      </Collapse>
                    </span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarResponsive">
                    <ul className="navbar-nav ml-auto">
                      <li className="nav-item">
                        <a className="nav-link js-scroll-trigger" href="/landing">Home</a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link js-scroll-trigger" href="/leaderboard">Leaderboard</a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link js-scroll-trigger" href="/mlbRules">Rules</a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link js-scroll-trigger" href='/signout'>Sign Out</a>
                      </li>
                    </ul>
                    </div>
                </div>
                <footer className="footer">
                  <p>WWW.SPORTHABITS.COM</p>
                </footer>
            </nav>
        )
    }
}

export default Navbar