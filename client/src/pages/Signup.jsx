import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import API from '../utils/API'
import Navbar from '../components/nav/Navbar'
import '../css/signup.css'
import ExistingAccount from "../components/alerts/ExistingAccount";
import { atl, bkn, bos, cha, chi, cle, dal, den, det, gsw, hou, ind, lac, lal, mem, mia, mil, min, nop, nyk, okc, orl, phi, phx, por, sac, sas, tor, uta, was } from '../css/nbaLogos'

class Signup extends Component {

    state = {
        firstName: '',
        lastName: '',
        email: '',
        username: '',
        password: '',
        img: '',
        teams: [
            { name: 'Atlanta Hawks', abbr: 'atl', logo: atl, status: 'secondary' },
            { name: 'Brooklyn Nets', abbr: 'bkn', logo: bkn, status: 'secondary' },
            { name: 'Boston Celtics', abbr: 'bos', logo: bos, status: 'secondary' },
            { name: 'Charlotte Hornets', abbr: 'cha', logo: cha, status: 'secondary' },
            { name: 'Chicago Bulls', abbr: 'chi', logo: chi, status: 'secondary' },
            { name: 'Cleveland Cavaliers', abbr: 'cle', logo: cle, status: 'secondary' },
            { name: 'Dallas Mavericks', abbr: 'dal', logo: dal, status: 'secondary' },
            { name: 'Denver Nuggets', abbr: 'den', logo: den, status: 'secondary' },
            { name: 'Detroit Pistons', abbr: 'det', logo: det, status: 'secondary' },
            { name: 'Golden State Warriors', abbr: 'gsw', logo: gsw, status: 'secondary' },
            { name: 'Houston Rockets', abbr: 'hou', logo: hou, status: 'secondary' },
            { name: 'Indiana Pacers', abbr: 'ind', logo: ind, status: 'secondary' },
            { name: 'Los Angeles Clippers', abbr: 'lac', logo: lac, status: 'secondary' },
            { name: 'Los Angeles Lakers', abbr: 'lal', logo: lal, status: 'secondary' },
            { name: 'Memphis Grizzlies', abbr: 'mem', logo: mem, status: 'secondary' },
            { name: 'Miami Heat', abbr: 'mia', logo: mia, status: 'secondary' },
            { name: 'Milwalkee Bucks', abbr: 'mil', logo: mil, status: 'secondary' },
            { name: 'Minnesota Timberwolves', abbr: 'min', logo: min, status: 'secondary' },
            { name: 'New Orleans Pelicans', abbr: 'nop', logo: nop, status: 'secondary' },
            { name: 'New York Knicks', abbr: 'nyk', logo: nyk, status: 'secondary' },
            { name: 'Oklahoma City Thunder', abbr: 'okc', logo: okc, status: 'secondary' },
            { name: 'Orlando Magic', abbr: 'orl', logo: orl, status: 'secondary' },
            { name: 'Philadelphia 76ers', abbr: 'phi', logo: phi, status: 'secondary' },
            { name: 'Pheonix Suns', abbr: 'phx', logo: phx, status: 'secondary' },
            { name: 'Portland Trailblazers', abbr: 'por', logo: por, status: 'secondary' },
            { name: 'Sacramento Kings', abbr: 'sac', logo: sac, status: 'secondary' },
            { name: 'San Antonio Spurs', abbr: 'sas', logo: sas, status: 'secondary' },
            { name: 'Toronto Raptors', abbr: 'tor', logo: tor, status: 'secondary' },
            { name: 'Utah Jazz', abbr: 'uta', logo: uta, status: 'secondary' },
            { name: 'Washington Wizards', abbr: 'was', logo: was, status: 'secondary' }
          ],
        redirect: false,
        nameTaken: false

    }

    componentDidMount() {
        console.log('Ready')
    }

    setRedirect = () => {
        console.log("Redirect");
        this.setState({
          redirect: true
        })
    };

    renderRedirect = () => {
        if (this.state.redirect) {
          return <Redirect to='/login' />
        }
    };

    handleInputChange = event => {
        const { name, value } = event.target
        this.setState({
            [name]: value
        })
    }

    checkUserName = event => {
        const username = event.target.value;
        console.log(username);
        this.setState({
            username: username
        });
        API.getUser(username)
        .then(res => {
            console.log(res)
            if (!res.data[0]) {
                console.log("Username available");
                this.setState({
                    nameTaken: "Username available"
                })
            } else {
                console.log("Username taken");
                this.setState({
                    nameTaken: "Username taken"
                })
            }
        })
        .catch(error => {
            console.log(error)
        })
    }

    handleFormSubmit = event => {
        event.preventDefault();
        //console.log(this.state)
        let userData = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            username: this.state.username,
            password: this.state.password,
            img: this.state.img,
            teams: this.state.teams
        };
        console.log(userData);
        API.getUser(userData.username)
        .then(res => {
            console.log(res)
            if (!res.data[0]) {
                console.log("Username available");
                API.saveUser(userData)
                .then(res => {
                    console.log(res)
                    if (res.data) {
                        console.log("Successful signup!")
                        this.setRedirect();
                    } else {
                        console.log("Signup error")
                    }
                })
                .catch(error => {
                    console.log(error)
                })
            } else {
                console.log("Username taken");
                this.setState({
                    nameTaken: true
                })
            }
        })
        .catch(error => {
            console.log(error)
        })
    };

    render() {
        return (
            <div id="loginPage">
            <Navbar />
              {this.renderRedirect()}
                <div className="formContainer">    
                  <form className="formSignup" action="index.html">
                    <h2 className="formSignup-heading">Sign Up</h2>
                      <div className="signupWrap">
                        <div className="form-group">
                            <label htmlFor="firstName">First Name</label>
                                <input 
                                value={this.state.firstName}
                                name="firstName"
                                onChange={this.handleInputChange}
                                type="text"
                                className="form-control"
                                id="firstName"
                                placeholder="First name"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastName">Last Name</label>
                                <input
                                    value={this.state.lastName}
                                    name="lastName"
                                    onChange={this.handleInputChange}
                                    type="text"
                                    className="form-control"
                                    id="lastName"
                                    placeholder="Last name"                                        
                                />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Email address</label>
                                <input
                                    value={this.state.email}
                                    name="email"
                                    onChange={this.handleInputChange}
                                    type="email"
                                    className="form-control"
                                    id="exampleInputEmail1"
                                    aria-describedby="emailHelp"
                                    placeholder="Enter email"
                                />
                            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                        </div>
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input
                                value={this.state.username}
                                name="username"
                                onChange={this.checkUserName}
                                type="text"
                                className="form-control"
                                id="username"
                                placeholder="Username"                                        
                            />
                            <small id="usernameAvail" className="form-text text-muted">{this.state.nameTaken}</small>
                        </div>
                        <div className="form-group">
                            <label htmlFor="image">Image</label>
                            <input
                                value={this.state.img}
                                name="img"
                                onChange={this.handleInputChange}
                                type="text"
                                className="form-control"
                                id="img"
                                placeholder="Image URL"                                        
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">Password</label>
                            <input
                                value={this.state.password}
                                name="password"
                                onChange={this.handleInputChange}
                                type="password"
                                className="form-control"
                                id="exampleInputPassword1"
                                placeholder="Password"
                            />
                        </div>
                        <ExistingAccount
                        nameTaken={this.state.nameTaken}
                        />
                        <button
                            type="submit"
                            className="btn btn-primary"
                            onClick={this.handleFormSubmit}
                        >
                        Submit
                        </button>
                        </div>
                    </form>
                </div>
            </div>
        
        )
    };
};

export default Signup;
       