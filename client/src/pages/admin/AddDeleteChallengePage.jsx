import React, { Component } from 'react'
// import { Redirect } from 'react-router-dom'
// import API from '../utils/API'
import AdminBar from '../../components/nav/AdminBar'
import CreateChallenge from '../forms/CreateChallenge'
import DeleteChallenge from '../forms/DeleteChallenge'
import '../../css/adminPage.css'

class AddChallenge extends Component {

    render() {
        return(
            <div id='adminChallengePage'>
              <AdminBar />

              <h1>Add/Delete Challenges</h1>

              <CreateChallenge 
                username={this.props.username}
              />

              <DeleteChallenge
                username={this.props.username}
              />
                
            </div>
        )
    }
}

export default AddChallenge