import React, { Component } from 'react';
import { Alert } from 'reactstrap'

class ChallengeDelay extends Component {
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
        // console.log(this.props.challengeDelay);
        if (this.props.challengeDelay === true) {
            return (
                <Alert color='warning' isOpen={this.state.visible} toggle={this.onDismiss}>
                    The MLB Pick Em II Challenge will now start on June 1st!
                </Alert>
            )
        } else {
            return <div></div>
        }
    }
}

export default ChallengeDelay;