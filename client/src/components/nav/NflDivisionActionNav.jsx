import React, { Component } from 'react';
//import API from '../../utils/API'
import { Collapse, Nav, NavItem, NavLink } from 'reactstrap';
import '../../css/navbar.css'

class NflDivisionActionNav extends Component {
    constructor(props) {
        super(props);

        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.signout = this.signout.bind(this);
        this.state = {
            collapsed: true
        }
    }

    toggleNavbar() {
        this.setState({
            collapsed: !this.state.collapsed
        })
      }

    signout() {
      localStorage.clear()
    }

    render() {                                                                  
        return (
          <div className="mlbNav">
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
                                <NavLink href="/home">Home</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/actionNfl">Action</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/nflDivLeaderboard">Leaderboard</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/nflRules">Rules</NavLink>
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
                        <a className="nav-link js-scroll-trigger" href="/home">Home</a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link js-scroll-trigger" href="/actionNfl">Action</a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link js-scroll-trigger" href="/nflDivLeaderboard">Leaderboard</a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link js-scroll-trigger" href="/nflRules">Rules</a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link js-scroll-trigger" href="/signout">Sign Out</a>
                      </li>
                    </ul>
                    </div>
                </div>
                <footer className="footer">
                  <p>WWW.SPORTHABITS.COM</p>
                  <small className='disclaimer'>*DISCLAIMER: THIS SITE IS FOR ENTERTAINMENT PURPOSES ONLY*</small>
                </footer>
            </nav>
            <div className="row nameRow">
              <h2 className="navbar-brand js-scroll-trigger username">{this.props.challengeName}</h2>
            </div>
            
            </div>
        )
    }
}

export default NflDivisionActionNav