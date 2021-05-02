import React, { Component } from 'react';
//import API from '../../utils/API'
import { Redirect } from 'react-router-dom';
import { Collapse, Nav, NavItem, NavLink } from 'reactstrap';
import logo from '../../css/images/logo2.png'
import '../../css/navbar.css'

class HomeBar extends Component {
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
        console.log('LOG ME OUT')
        
        return(
          <Redirect to='/login' />
        )
          
      }

    render() {                                                                  
        return (
          <div>
            <nav className="navbar navbar-expand-lg navbar-light fixed-top" id="mainNav">
                <div className="container">
                    {/* <a className="navbar-brand js-scroll-trigger" href="/">SportHabits</a> */}
                    <a className="navbar-brand" href="/">
                        <img src={logo} alt="" />
                    </a>
                    <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" onClick={this.toggleNavbar}>
                      <Collapse isOpen={!this.state.collapsed} navbar>
                        <Nav navbar className='navItems'>
                            {/* <NavItem>
                                <NavLink href="/aboutUser">ABOUT</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/saved">SAVED</NavLink>
                            </NavItem> */}
                            <NavItem>
                                <NavLink href='/signout'>SIGN OUT</NavLink>
                            </NavItem>
                        </Nav>
                      </Collapse>
                    </span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarResponsive">
                      <ul className="navbar-nav ml-auto">
                        {/* <li className="nav-item">
                            <a className="nav-link js-scroll-trigger" href="/aboutUser">ABOUT</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link js-scroll-trigger" href="/saved">SAVED</a>
                        </li> */}
                        <li className="nav-item">
                            <NavLink className="nav-link js-scroll-trigger" href='/signout' >SIGN OUT</NavLink>
                        </li>
                      </ul>
                    </div>
                </div>
            </nav>
            <div className="row">
              <h2 className="navbar-brand js-scroll-trigger challengeName">{this.props.username}</h2>
            </div>
          </div>
        )
    }
}

export default HomeBar