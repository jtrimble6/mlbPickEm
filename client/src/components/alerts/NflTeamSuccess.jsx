import React, { Component } from 'react';
import { Alert } from 'reactstrap'

class NflTeamSuccess extends Component {
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
        // console.log(this.props.NflTeamSuccess);
        if (this.props.nflTeamSuccess === true) {
            return (
                <Alert color='success' isOpen={this.state.visible} toggle={this.onDismiss}>
                    The team values were successfully set!
                </Alert>
            )
        } else {
            return <div></div>
        }
    }
}

export default NflTeamSuccess;