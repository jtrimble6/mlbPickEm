import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import API from '../../utils/API'
import SignupBar from '../../components/nav/SignupBar'
import Footer from '../../components/nav/Footer'
import '../../css/signup.css'
import ExistingAccount from "../../components/alerts/ExistingAccount";
import PasswordError from '../../components/alerts/PasswordError';
import DateError from '../../components/alerts/DateError';
import EmailError from '../../components/alerts/EmailError';
import SignUpError from '../../components/alerts/SignUpError';
import { atl, bkn, bos, cha, chi, cle, dal, den, det, gsw, hou, ind, lac, lal, mem, mia, mil, min, nop, nyk, okc, orl, phi, phx, por, sac, sas, tor, uta, was } from '../../css/nbaLogos'
// import moment from 'moment'


class Signup extends Component {
    constructor(props) {
        super(props)
        this.state = {
            firstName: '',
            lastName: '',
            birthDate: '',
            gender: '',
            favoriteTeam: '',
            email: '',
            username: '',
            password: '',
            confirmPassword: '',
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
                { name: 'Portland Trail Blazers', abbr: 'por', logo: por, status: 'secondary' },
                { name: 'Sacramento Kings', abbr: 'sac', logo: sac, status: 'secondary' },
                { name: 'San Antonio Spurs', abbr: 'sas', logo: sas, status: 'secondary' },
                { name: 'Toronto Raptors', abbr: 'tor', logo: tor, status: 'secondary' },
                { name: 'Utah Jazz', abbr: 'uta', logo: uta, status: 'secondary' },
                { name: 'Washington Wizards', abbr: 'was', logo: was, status: 'secondary' }
              ],
            redirect: false,
            nameTaken: false,
            passwordError: false,
            dateError: false,
            emailError: false,
            signUpError: false
        }
        this.setRedirect = this.setRedirect.bind(this)
        this.renderRedirect = this.renderRedirect.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleFormSubmit = this.handleFormSubmit.bind(this)
        this.checkPassword = this.checkPassword.bind(this)
        this.checkUserName = this.checkUserName.bind(this)
        // this.checkDate = this.checkDate.bind(this)
        this.checkEmail = this.checkEmail.bind(this)
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

    checkPassword = event => {
        const password = event.target.value
        this.setState({
         confirmPassword: password
        })
        if (this.state.password !== password) {
            console.log('THE PASSWORDS DO NOT MATCH')
            this.setState({
                passwordError: 'PASSWORDS DO NOT MATCH'
            })
        } else {
            this.setState({
                passwordError: 'PASSWORDS MATCH'
            })
        }
      }

    checkUserName = event => {
        const username = event.target.value;
        console.log(username);
        this.setState({
          username: username.toLowerCase()
        });
        API.getUser(username)
          .then(res => {
            console.log(res)
            if (!res.data[0]) {
                // console.log("USERNAME AVAILABLE");
                this.setState({
                  nameTaken: "USERNAME AVAILABLE"
                })
            } else {
                // console.log("USERNAME UNAVAILABLE");
                this.setState({
                  nameTaken: "USERNAME UNAVAILABLE"
                })
            }
        })
          .catch(error => {
            console.log(error)
        })
      }

    // checkDate = event => {
    //     if (!event) { 
    //         return;
    //     }
    //     const date = event.target.value;
    //     console.log(date);
    //     this.setState({
    //       birthDate: date
    //     });
    //     // let date = this.state.birthDate
    //     let isAfter = moment(date).isAfter(moment().subtract(115, 'years').format('MM-DD-YYYY'))
    //     let isBefore = moment(date).isBefore(moment().subtract(21, 'years').format('MM-DD-YYYY'))
    //     if (isBefore && isAfter) { 
    //         console.log('VALID DATE: ', date)
    //         this.setState({
    //             dateError: false
    //         })
    //     } else {
    //         console.log('INVALID DATE: ', date)
    //         this.setState({
    //             dateError: true
    //         })
    //         return;
    //     }
    //   }

    checkEmail = event => {
        // if (!event) {
        //     return;
        // }
        const email = event.target.value;
        console.log(email);
        let emailValid = email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        console.log('EMAIL VALID? ', emailValid)
        if (emailValid === null) {
            this.setState({ emailError: true }) 
        } else { this.setState({ emailError: false }) }

        this.setState({
          email: email
        });
        
        
      }

    handleFormSubmit = event => {
        // this.checkDate()
        this.setState({
            passwordError: false,
            nameTaken: false,
        })
        event.preventDefault();
        // debugger;
        //console.log(this.state)
        let userData = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            favoriteTeam: this.state.favoriteTeam,
            birthDate: this.state.birthDate,
            gender: this.state.gender,
            email: this.state.email,
            username: this.state.username,
            password: this.state.password,
        };
        console.log(userData);
        if (this.state.password !== this.state.confirmPassword) {
            console.log('THE PASSWORDS DO NOT MATCH')
            this.setState({
                passwordError: true,
                password: '',
                confirmPassword: ''
            })
        } 

        // if (this.state.dateError) {
        //     console.log('ONE OF TWO ERRORS')
        //     return;
        // }

        if (this.state.emailError) {
            console.log('ONE OF ONE ERRORS')
            return;
        }
        
        else {
          API.getUser(userData.username)
          .then(res => {
            console.log(res)
            if (!res.data[0]) {
                console.log("USERNAME AVAILABLE");
                API.saveUser(userData)
                .then(res => {
                    console.log(res)
                    console.log("Successful signup!")
                    this.setState({
                        signUpError: false
                    })
                    this.setRedirect();
                })
                .catch(error => {
                    console.log("Signup error")
                    console.log(error)
                    this.setState({
                        signUpError: true
                    })
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
        } 
      }

    

    render() {
        return (
            <div id="signUpPage">
            <SignupBar />
              {this.renderRedirect()}
                <div className="formContainer formSignUpContainer userFormSignUpContainer">    
                  <form className="formSignUp" action="index.html">
                    <h2 className="formSignUp-heading formSignUpHeading">Sign Up</h2>
                      <div className="signUpWrap">
                        <div className="form-group formSignUpGroup">
                            <label className="formSignUpLabel" htmlFor="firstName">First Name</label>
                                <input 
                                value={this.state.firstName}
                                name="firstName"
                                onChange={this.handleInputChange}
                                type="text"
                                className="form-control formSignUpControl"
                                id="firstName"
                                placeholder="First name"
                            />
                        </div>
                        <div className="form-group formSignUpGroup">
                            <label className="formSignUpLabel" htmlFor="lastName">Last Name</label>
                                <input
                                    value={this.state.lastName}
                                    name="lastName"
                                    onChange={this.handleInputChange}
                                    type="text"
                                    className="form-control formSignUpControl"
                                    id="lastName"
                                    placeholder="Last name"                                        
                                />
                        </div>
                        <div className="form-group formSignUpGroup">
                            <label className="formSignUpLabel" htmlFor="favoriteTeam">Favorite Team</label>
                                <input
                                    value={this.state.favoriteTeam}
                                    name="favoriteTeam"
                                    onChange={this.handleInputChange}
                                    type="text"
                                    className="form-control formSignUpControl"
                                    id="favoriteTeam"
                                    placeholder="Favorite team"                                        
                                />
                        </div>
                        <div className="form-group formSignUpGroup">
                            <label className="formSignUpLabel" htmlFor="birthDate">Birth Date</label>
                                <input 
                                value={this.state.birthDate}
                                name="birthDate"
                                onChange={this.handleInputChange}
                                type="date"
                                className="form-control formSignUpControl"
                                id="birthDate"
                                placeholder="MM/DD/YYYY"
                            />
                            <small id="dateError" className="form-text text-muted">{this.state.dateError}</small>
                        </div>
                        <div className="form-group formSignUpGroup">
                            <label className="formSignUpLabel" htmlFor="gender">Gender</label>
                                <select
                                    name="gender"
                                    value={this.state.gender}
                                    onChange={this.handleInputChange}
                                    type="text"
                                    className="form-control formSignUpControl"
                                    id="gender"                                       
                                >
                                <option value='optout'>(optional)</option>
                                <option value='male'>Male</option>
                                <option value='female'>Female</option>
                                </select>
                        </div>
                        <div className="form-group formSignUpGroup">
                            <label className="formSignUpLabel" htmlFor="exampleInputEmail1">Email Address</label>
                                <input
                                    value={this.state.email}
                                    name="email"
                                    onChange={this.handleInputChange}
                                    type="email"
                                    className="form-control formSignUpControl"
                                    id="exampleInputEmail1"
                                    aria-describedby="emailHelp"
                                    placeholder="Email"
                                />
                            <small id="emailError" className="form-text text-muted">{this.state.emailError}</small>
                        </div>
                        <div className="form-group formSignUpGroup">
                            <label className="formSignUpLabel" htmlFor="username">Username</label>
                            <input
                                value={this.state.username}
                                name="username"
                                onChange={this.checkUserName}
                                type="text"
                                className="form-control formSignUpControl"
                                id="username"
                                placeholder="Username"                                        
                            />
                            <small id="usernameError" className="form-text text-muted">{this.state.nameTaken}</small>
                        </div>
                        {/* <div className="form-group formSignUpGroup">
                            <label className="formSignUpLabel" htmlFor="image">Image</label>
                            <input
                                value={this.state.img}
                                name="img"
                                onChange={this.handleInputChange}
                                type="text"
                                className="form-control formSignUpControl"
                                id="img"
                                placeholder="Image URL"                                        
                            />
                        </div> */}
                        <div className="form-group formSignUpGroup">
                            <label className="formSignUpLabel" htmlFor="exampleInputPassword1">Create Password</label>
                            <input
                                value={this.state.password}
                                name="password"
                                onChange={this.handleInputChange}
                                type="password"
                                className="form-control formSignUpControl"
                                id="password"
                                placeholder="Password"
                            />
                        </div>
                        <div className="form-group formSignUpGroup">
                            <label className="formSignUpLabel" htmlFor="exampleInputPassword1">Confirm Password</label>
                            <input
                                value={this.state.confirmPassword}
                                name="confirmPassword"
                                onChange={this.checkPassword}
                                type="password"
                                className="form-control formSignUpControl"
                                id="confirmPassword"
                                placeholder="Confirm Password"
                            />
                            <small id="passwordError" className="form-text text-muted">{this.state.passwordError}</small>
                        </div>
                        <ExistingAccount
                          nameTaken={this.state.nameTaken}
                        />
                        <PasswordError
                          passwordError={this.state.passwordError}
                        />
                        <DateError
                          dateError={this.state.dateError}
                        />
                        <EmailError
                          emailError={this.state.emailError}
                        />
                        <SignUpError
                          signUpError={this.state.signUpError}
                        />
                        <div className='formSignUpGroup'>
                          <button
                              type="submit"
                              className="btn btn-primary submit btnMaster formSignUpSubmitButton"
                              onClick={this.handleFormSubmit}
                          >
                            Submit
                          </button>
                        </div>
                    </div>
                  </form>
                </div>
              <Footer />
            </div>
        
        )
    };
};

export default Signup;
       