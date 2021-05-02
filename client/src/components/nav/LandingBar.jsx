import React, { Component } from 'react';
//import API from '../../utils/API'
import { Collapse, Nav, NavItem, NavLink } from 'reactstrap';
import '../../css/navbar.css'
import logo from '../../css/images/logo2.png'

class LandingBar extends Component {
    constructor(props) {
        super(props);

        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.state = {
            collapsed: true
        }
    }

    componentDidMount() {
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
                    {/* <a className="navbar-brand js-scroll-trigger" href="/">SportHabits</a> */}
                    <a className="navbar-brand" href="/">
                        <img src={logo} alt='SportHabits' />
                    </a>
                    <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" onClick={this.toggleNavbar}>
                      <Collapse isOpen={!this.state.collapsed} navbar>
                        <Nav navbar className='navItems'>
                            {/* <NavItem>
                                <NavLink href="/challenges">CHALLENGES</NavLink>
                            </NavItem> */}
                            <NavItem>
                                <NavLink href="/about">ABOUT</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/contact">CONTACT</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/login">LOGIN/SIGN UP</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/admin">ADMIN</NavLink>
                            </NavItem>
                        </Nav>
                      </Collapse>
                    </span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarResponsive">
                      <ul className="navbar-nav ml-auto">
                        {/* <li className="nav-item">
                            <a className="nav-link js-scroll-trigger" href="/challenges">CHALLENGES</a>
                        </li> */}
                        <li className="nav-item">
                            <a className="nav-link js-scroll-trigger" href="/about">ABOUT</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link js-scroll-trigger" href="/contact">CONTACT</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link js-scroll-trigger" href="/login">LOGIN/SIGN UP</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link js-scroll-trigger" href="/admin">ADMIN</a>
                        </li>
                      </ul>
                    </div>
                </div>
            </nav>
        )
    }
}

export default LandingBar