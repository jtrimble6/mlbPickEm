import React, { Component } from 'react';
import { Alert } from 'reactstrap'

//import { Link } from 'react-router-dom';

class PasswordSuccess extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: true
        }

        this.onDismiss = this.onDismiss.bind(this)
    }

    onDismiss() {
        this.setState({ visible: false });
    }

    render() {
        // console.log(this.props.passwordError);
        if (this.props.passwordSuccess === true) {
            return (
                <Alert color='success' isOpen={this.state.visible} toggle={this.onDismiss}>
                    You have successfully reset your password!
                </Alert>
            )
        } else {
            return <div></div>
        }
    }
}

export default PasswordSuccess;