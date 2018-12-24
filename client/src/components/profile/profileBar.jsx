import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
import '../../css/profileBar.css'

class ProfileBar extends Component {

    render() {                                                                  
        return (

            <div className="row profileBar">
                <span className="profileData">
                    Username: {this.props.username} | Points: {this.props.points} | Today's Pick: {this.props.todaysPick}
                </span>
            </div>
            
                
        )
    }
}

export default ProfileBar