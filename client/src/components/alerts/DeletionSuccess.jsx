import React, { Component } from 'react';
import { Alert } from 'reactstrap'

class DeletionSuccess extends Component {
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
        console.log(this.props.deletionSuccess);
        if (this.props.deletionSuccess === true) {
            return (
                <Alert color='green' isOpen={this.state.visible} toggle={this.onDismiss}>
                    The challenge was successfully deleted!
                </Alert>
            )
        } else {
            return <div></div>
        }
    }
}

export default DeletionSuccess;