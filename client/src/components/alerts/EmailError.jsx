import React, { Component } from 'react';
import { Alert } from 'reactstrap'

//import { Link } from 'react-router-dom';

class EmailError extends Component {
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
                    That email address was not found!
                </Alert>
            )
        } else {
            return <div></div>
        }
    }
}

export default EmailError;