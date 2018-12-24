import React, { Component } from 'react';

//import { Link } from 'react-router-dom';

class ExistingAccount extends Component {
    render() {
        console.log(this.props.nameTaken);
        if (this.props.nameTaken === true) {
            return (
                <div className="alert alert-warning alert-dismissible" role="alert">
                {/* <div className="alert alert-warning alert-dismissible fade show" role="alert"> */}
                    <strong>Holy guacamole!</strong> Looks like that username is taken! Try a different one.
                    <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            )
        } else {
            return <div></div>
        }
    }
}

export default ExistingAccount;