import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
import { Collapse, Nav, NavItem, NavLink } from 'reactstrap';
import '../../css/navbar.css'

class LoginBar extends Component {
    constructor(props) {
        super(props);

        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.state = {
            collapsed: true
        }
    }

    toggleNavbar() {
        this.setState({
            collapsed: !this.state.collapsed
        })
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
                                <NavLink href="/about">About</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/contact">Contact</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/signup">Sign Up</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/admin">Admin</NavLink>
                            </NavItem>
                        </Nav>
                      </Collapse>
                    </span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarResponsive">
                    <ul className="navbar-nav ml-auto">
                      <li className="nav-item">
                        <a className="nav-link js-scroll-trigger" href="/about">About</a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link js-scroll-trigger" href="/contact">Contact</a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link js-scroll-trigger" href="/signup">Sign Up</a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link js-scroll-trigger" href="/admin">Admin</a>
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

export default LoginBar