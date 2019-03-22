import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
import { Collapse, Nav, NavItem, NavLink } from 'reactstrap';
import '../../css/navbar.css'

class SignupBar extends Component {
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
                        <img src={require('../../css/images/bannerLogo.png')} alt='SportHabits' />
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
                                <NavLink href="/login">Log In</NavLink>
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
                        <a className="nav-link js-scroll-trigger" href="/login">Log In</a>
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

export default SignupBar