import React, { Component } from 'react';
import { Alert } from 'reactstrap'

class SaveChalError extends Component {
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
        console.log(this.props.saveChalError);
        if (this.props.saveChalError === true) {
            return (
                <Alert color='danger' isOpen={this.state.visible} toggle={this.onDismiss}>
                    There was an error saving the revised Challenge!
                </Alert>
            )
        } else {
            return <div></div>
        }
    }
}

export default SaveChalError;