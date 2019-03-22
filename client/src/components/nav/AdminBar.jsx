import React, { Component } from 'react';
//import API from '../../utils/API'
import { Collapse, Nav, NavItem, NavLink } from 'reactstrap';
import '../../css/navbar.css'

class AdminBar extends Component {
    constructor(props) {
        super(props);

        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.logout = this.logout.bind(this);
        this.state = {
            collapsed: true
        }
    }

    logout() {
      localStorage.clear()
      }

    toggleNavbar() {
        this.setState({
            collapsed: !this.state.collapsed
        })
      }

    // logout() {
    //     let localUser = localStorage.getItem('user')
    //     let sessionData = {
    //         sessionUserID: localUser
    //       }
    //     console.log('LOGOUT: ', sessionData)
    //     // API.logout(sessionData)
    //     //   .then(res => console.log(res))
    //     //   .catch(err => console.log(err))
    // }

    render() {                                                                  
        return (
            <nav className="navbar navbar-expand-lg navbar-light fixed-top" id="mainNav">
                <div className="container">
                    <a className="navbar-brand" href="/">
                        <img src={require('../../css/images/bannerLogo.png')} alt='SportHabits' />
                    </a>
                    {/* <a className="navbar-brand js-scroll-trigger" href="/">SportHabits</a> */}
                    <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" onClick={this.toggleNavbar}>
                      <Collapse isOpen={!this.state.collapsed} navbar>
                        <Nav navbar className='navItems'>
                            <NavItem>
                                <NavLink href="/adminPage">Home</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/addChallenge">Add/Remove Challenge</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/mlbRules">Rules</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/logout">Sign Out</NavLink>
                            </NavItem>
                        </Nav>
                      </Collapse>
                    </span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarResponsive">
                    <ul className="navbar-nav ml-auto">
                      <li className="nav-item">
                        <a className="nav-link js-scroll-trigger" href="/adminPage">Home</a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link js-scroll-trigger" href="/addChallenge">Add/Remove Challenge</a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link js-scroll-trigger" href="/mlbRules">Rules</a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link js-scroll-trigger" href="/logout">Sign Out</a>
                      </li>
                    </ul>
                    </div>
                </div>
                <footer class="footer">
                  <p>WWW.SPORTHABITS.COM</p>
                </footer>
            </nav>
        )
    }
}

export default AdminBar