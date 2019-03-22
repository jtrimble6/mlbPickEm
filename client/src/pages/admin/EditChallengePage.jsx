import React, { Component } from 'react'
// import { Redirect } from 'react-router-dom'
// import API from '../utils/API'
import AdminBar from '../../components/nav/AdminBar'
import EditChallenge from '../forms/EditChallenge'
import '../../css/adminPage.css'

class EditChallengePage extends Component {

    render() {
        return(
            <div id='editChallengePage'>
              <AdminBar />

              <h1>Edit Challenges</h1>

              <EditChallenge 
                username={this.props.username}
              />
                
            </div>
        )
    }
}

export default EditChallengePage