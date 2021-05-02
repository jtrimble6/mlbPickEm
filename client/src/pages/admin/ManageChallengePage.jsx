import React, { Component } from 'react'
// import { Redirect } from 'react-router-dom'
// import API from '../utils/API'
import AdminBar from '../../components/nav/AdminBar'
import CreateChallenge from '../forms/CreateChallenge'
import DeleteChallenge from '../forms/DeleteChallenge'
import EditChallenge from '../forms/EditChallenge'
import '../../css/adminPage.css'

class ManageChallengePage extends Component {

    render() {
        return(
            <div id='createChalPage'>
              <AdminBar />

              <h1 className='adminFormHeading'>Manage Challenges</h1>

              <CreateChallenge 
                username={this.props.username}
              />

              <EditChallenge 
                username={this.props.username}
              />

              <DeleteChallenge
                username={this.props.username}
              />
                
            </div>
        )
    }
}

export default ManageChallengePage