import React, { Component } from 'react'
import API from '../../utils/API'
import AdminBar from '../../components/nav/AdminBar'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
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
              self.handleFormError()
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
            <AdminBar />
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
                    <p>Are you sure you want to delete {this.state.challengeName}?</p><br />
                    <strong>*ALERT*  THIS CHALLENGE CANNOT BE RECOVERED ONCE DELETED *ALERT*</strong>

                  </div> <hr />
                </ModalBody>
                    <ModalFooter>
                        <input type="submit" value="Confirm Delete" color="primary" className="btn btn-primary footer" onClick={this.handleFormSubmit} />
                        <Button color="danger" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                  </form>
                </Modal>

                <div className="formContainer">    
                  <form className="formSignup" action="index.html">
                    <h2 className="formSignup-heading">Delete Challenge</h2>
                      <div className="signupWrap">
                        <div className="form-group">
                            <label htmlFor="challengeDeletionName">Challenge Name</label>
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
                            <label htmlFor="eraser">Eraser</label>
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
                            className="btn btn-primary submit"
                            onClick={this.toggleInitial}
                        >
                        Delete
                        </button>
                        </div>
                    </form>
                </div>
            </div>
        
        )
    };
};

export default DeleteChallenge;
       