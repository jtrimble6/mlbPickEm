import React, { Component } from 'react'
// import { Redirect } from 'react-router-dom'
// import API from '../utils/API'
import AdminBar from '../../components/nav/AdminBar'
import CreateAdmin from '../forms/CreateAdmin'
import '../../css/adminPage.css'

class ManageAdminPage extends Component {

    render() {
        return(
            <div id='createChalPage'>
              <AdminBar />

              <h1 className='adminFormHeading'>Manage Admins</h1>

              <CreateAdmin 
                username={this.props.username}
              />
                
            </div>
        )
    }
}

export default ManageAdminPage