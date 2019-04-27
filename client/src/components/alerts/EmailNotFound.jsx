import React, { Component } from 'react';
import { Alert } from 'reactstrap'

//import { Link } from 'react-router-dom';

class EmailNotFound extends Component {
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
        // console.log(this.props.emailError);
        if (this.props.emailError === true) {
            return (
                <Alert color='danger' isOpen={this.state.visible} toggle={this.onDismiss}>
                    Please enter a valid email address!
                </Alert>
            )
        } else {
            return <div></div>
        }
    }
}

export default EmailNotFound;