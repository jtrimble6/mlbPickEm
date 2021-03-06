import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { UncontrolledCollapse, Button } from 'reactstrap';
import API from '../../utils/API'
// import AdminBar from '../../components/nav/AdminBar'
// import Footer from '../../components/nav/Footer'
import '../../css/signup.css'
import ExistingAccount from "../../components/alerts/ExistingAccount";
import PasswordError from '../../components/alerts/PasswordError';
import SignUpError from '../../components/alerts/SignUpError';
//import { atl, bkn, bos, cha, chi, cle, dal, den, det, gsw, hou, ind, lac, lal, mem, mia, mil, min, nop, nyk, okc, orl, phi, phx, por, sac, sas, tor, uta, was } from '../../css/nbaLogos'


class Signup extends Component {

    state = {
        admin: true,
        position: '',
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
        redirect: false,
        nameTaken: false,
        passwordError: false,
        signUpError: false

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
          return <Redirect to='/admin' />
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
                console.log("USERNAME AVAILABLE");
                this.setState({
                  nameTaken: "USERNAME AVAILABLE"
                })
            } else {
                console.log("USERNAME UNAVAILABLE");
                this.setState({
                  nameTaken: "USERNAME UNAVAILABLE"
                })
            }
        })
        .catch(error => {
            console.log(error)
        })
      }

    handleFormSubmit = event => {
        this.setState({
            passwordError: false,
            nameTaken: false,
        })
        event.preventDefault();
        //console.log(this.state)
        let userData = {
            admin: this.state.admin,
            position: this.state.position,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            favoriteTeam: this.state.favoriteTeam,
            birthDate: this.state.birthDate,
            gender: this.state.gender,
            email: this.state.email,
            img: this.state.img,
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
        } else {
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
    };

    render() {
        return (
            <div id="signUpPage">
            {/* <AdminBar /> */}
              {this.renderRedirect()}
              <Button color="primary" id="togglerCreateAdmin" style={{ marginBottom: '1rem' }}>
                  Create Admin <i class="fas fa-caret-down"></i>
                </Button>
              <UncontrolledCollapse toggler="#togglerCreateAdmin">
                <div className="formContainer formSignUpContainer">    
                  <form className="formSignUp" action="index.html">
                    <h2 className="formSignUp-heading formSignUpHeading">Sign Up Admin</h2>
                      <div className="signUpWrap">
                      <div className="form-group formSignUpGroup">
                            <label className="formSignUpLabel" htmlFor="position">Position</label>
                                <input 
                                value={this.state.position}
                                name="position"
                                onChange={this.handleInputChange}
                                type="text"
                                className="form-control formSignUpControl"
                                id="position"
                                placeholder="Position"
                            />
                        </div>
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
                            <label className="formSignUpLabel" htmlFor="exampleInputEmail1">Email address</label>
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
                        <div className="form-group formSignUpGroup">
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
                        </div>
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
                </UncontrolledCollapse>
                {/* <Footer /> */}
            </div>
        
        )
    };
};

export default Signup;
       