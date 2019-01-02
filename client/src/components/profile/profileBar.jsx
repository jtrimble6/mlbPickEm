import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
import '../../css/profileBar.css'

class ProfileBar extends Component {

    render() {                                                                  
        return (

            <div className="row profileBar">
              <div className='col-md-2'></div>
                <span className="col-md profileData">
                    Username: {this.props.username} | Points: {this.props.points} | Today's Pick: {this.props.todaysPick}
                </span>
                <div className='col-md-2'></div>
            </div>
            
                
        )
    }
}

export default ProfileBar