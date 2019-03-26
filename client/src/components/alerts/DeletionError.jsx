import React, { Component } from 'react';
import { Alert } from 'reactstrap'

class DeletionError extends Component {
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
        // console.log(this.props.deletionError);
        if (this.props.deletionError === true) {
            return (
                <Alert color='info' isOpen={this.state.visible} toggle={this.onDismiss}>
                    You must select a challenge!
                </Alert>
            )
        } else {
            return <div></div>
        }
    }
}

export default DeletionError;