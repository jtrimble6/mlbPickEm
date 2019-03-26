import React, { Component } from 'react';
import { Alert } from 'reactstrap'

class CreationSuccess extends Component {
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
        // console.log(this.props.creationSuccess);
        if (this.props.creationSuccess === true) {
            return (
                <Alert color='success' isOpen={this.state.visible} toggle={this.onDismiss}>
                    The challenge was successfully created!
                </Alert>
            )
        } else {
            return <div></div>
        }
    }
}

export default CreationSuccess;