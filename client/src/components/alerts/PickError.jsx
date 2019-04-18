import React, { Component } from 'react';
import { Alert } from 'reactstrap'

class PickError extends Component {
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
        // console.log(this.props.creationError);
        if (this.props.pickError === true) {
            return (
                <Alert color='danger' isOpen={this.state.visible} toggle={this.onDismiss}>
                    There was an error submitting your pick!
                </Alert>
            )
        } else {
            return <div></div>
        }
    }
}

export default PickError;