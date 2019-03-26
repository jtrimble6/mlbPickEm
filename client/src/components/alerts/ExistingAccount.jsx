import React, { Component } from 'react';
import { Alert } from 'reactstrap'

//import { Link } from 'react-router-dom';

class ExistingAccount extends Component {
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
        // console.log(this.props.nameTaken);
        if (this.props.nameTaken === true) {
            return (
                <Alert color='info' isOpen={this.state.visible} toggle={this.onDismiss}>
                    Sorry, that username is taken already!
                </Alert>
            )
        } else {
            return <div></div>
        }
    }
}

export default ExistingAccount;