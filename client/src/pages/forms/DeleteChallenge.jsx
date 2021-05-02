import React, { Component } from 'react'
import API from '../../utils/API'
// import AdminBar from '../../components/nav/AdminBar'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, UncontrolledCollapse } from 'reactstrap';
import DeletionError from "../../components/alerts/DeletionError";
import DeletionSuccess from "../../components/alerts/DeletionSuccess";
import '../../css/createChallenge.css'
// import moment from 'moment'

class DeleteChallenge extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modal: false,
            allChallenges: [],
            challengeName: '',
            challengeId: '',
            eraser: localStorage.getItem('user'),
            deletionError: false,
            formError: false
          }
          this.toggle = this.toggle.bind(this)
          this.toggleInitial = this.toggleInitial.bind(this)
          this.getChallenges = this.getChallenges.bind(this)
          this.handleInputChange = this.handleInputChange.bind(this)
          this.handleFormSubmit = this.handleFormSubmit.bind(this)
          this.handleFormError = this.handleFormError.bind(this)
    }

    componentDidMount() {
        this.getChallenges()
      }

    toggle() {
        this.setState({
            modal: !this.state.modal
        })
    }

    toggleInitial() {
        if (!this.state.challengeName) {
            this.setState({
                deletionError: true
            })
            return
        }
        this.setState({
          modal: !this.state.modal,
        });
      }

    getChallenges = () => {
        API.getChallenges()
          .then(res => {
              this.setState({
                  allChallenges: res.data
              })
          })
          .catch(err => console.log(err)) 
    }

    handleInputChange = event => {
        const { name, value } = event.target
        this.setState({
            [name]: value
        })
      }

    handleFormError = () => {
        if (this.state.formError) {
            console.log('FORM ERROR!')
        }
    }

    handleFormSubmit = event => {
        let self = this
        let allChallenges = this.state.allChallenges
        event.preventDefault();
        //console.log(this.state)
        let challengeData = {
            challengeName: this.state.challengeName,
        };

        let challengeIdFunc = (challenges) => {
            return challenges.challengeName === challengeData.challengeName
        }
        let challengeObj = allChallenges.filter(challengeIdFunc)
        let challengeId = challengeObj[0]._id

        API.deleteChallenge(challengeId)
          .then(res => {
              console.log('RESULT: ', res)
              // debugger;
              self.setState({
                deletionSuccess: true
              })
            self.toggle()
            window.location.reload()
          })
          .catch(err => {
              console.log(err)
              self.setState({
                  deletionError: true
              })
              // self.handleFormError()
              self.toggle()
            })

        self.setState({
            challengeName: '',
        })
    };

    render() {
        let uuidv4 = require('uuid/v4')
        return (
          <div id="chalDeletionPage">
            {/* <AdminBar /> */}
              {/* {this.renderRedirect()} */}

              <Modal 
                isOpen={this.state.modal} 
                autoFocus={true}
                centered={true}
                size='lg'
                className='challengeDeletionModal'
              >
              <form onSubmit={this.handleSubmit}>
                <ModalHeader id='modalTitle'>
                    Confirm Challenge Deletion
                </ModalHeader>
                <ModalBody id='modalBody'>
                    {/* <Modal className='invPick' isOpen={this.state.dupAddModal} toggle={this.toggleDupAdd} onClosed={this.state.closeAll ? this.toggle : undefined}>
                        <ModalHeader>Duplicate entry</ModalHeader>
                        <ModalBody>You are already in this Challenge!</ModalBody>
                        <ModalFooter>
                            <Button color="secondary" onClick={this.toggleAll}>Close All</Button>
                        </ModalFooter>
                    </Modal> */}
                  <div className="deletionRow row">
                    <p>Are you sure you want to deactivate {this.state.challengeName}?</p><br />
                    <strong>This challenge will be set as inactive and undiscoverable by users.</strong>

                  </div> <hr />
                </ModalBody>
                    <ModalFooter>
                        <input type="submit" value="Confirm Delete" color="primary" className="btn btn-primary" onClick={this.handleFormSubmit} />
                        <Button color="danger" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                  </form>
                </Modal>
                <Button color="primary" id="togglerDeleteChallenge" style={{ marginBottom: '1rem' }}>
                  Delete Challenge <i class="fas fa-caret-down"></i>
                </Button>
                <UncontrolledCollapse toggler="#togglerDeleteChallenge">
                  <div className="formContainer formSignUpContainer">    
                    <form className="formSignUp" action="index.html">
                      <h2 className="formSignUp-heading formSignUpHeading">Delete Challenge</h2>
                        <div className="signUpWrap">
                          <div className="form-group formSignUpGroup">
                            <label className="formSignUpLabel" htmlFor="challengeDeletionName">Challenge Name</label>
                              <select 
                                value={this.state.challengeName}
                                name="challengeName"
                                onChange={this.handleInputChange}
                                type="text"
                                className="form-control"
                                id="challengeDeletionName"
                              >
                                <option value=''>Select One</option>
                                {
                                    this.state.allChallenges.map((challenge) => (
                                        <option 
                                          key={(uuidv4())} 
                                          value={challenge.challengeName}
                                        >
                                          {challenge.challengeName}
                                        </option>
                                    ))
                                }
                              </select>
                            <small id="usernameError" className="form-text text-muted">{this.state.nameTaken}</small>
                        </div>
                        <div className="form-group">
                            <label className="formSignUpLabel" htmlFor="eraser">Eraser</label>
                                <input
                                    readOnly
                                    value={this.state.eraser}
                                    name="eraser"
                                    type="text"
                                    className="form-control"
                                    id="eraser"
                                    aria-describedby="emailHelp"
                                    placeholder={this.state.eraser}
                                />
                        </div>
                        <DeletionError 
                          deletionError={this.state.deletionError}
                        />
                        <DeletionSuccess 
                          deletionSuccess={this.state.deletionSuccess}
                        />
                        <button
                            type="button"
                            color="danger"
                            className="btn btn-primary submit btnMaster"
                            onClick={this.toggleInitial}
                        >
                        Delete
                        </button>
                        </div>
                    </form>
                  </div>
                </UncontrolledCollapse>
                
            </div>
        
        )
    };
};

export default DeleteChallenge;
       