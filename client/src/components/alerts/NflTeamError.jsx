import React, { Component } from 'react';
import { Alert } from 'reactstrap'

class NflTeamError extends Component {
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
        // console.log(this.props.NflTeamError);
        if (this.props.nflTeamError === true) {
            return (
                <Alert color='danger' isOpen={this.state.visible} toggle={this.onDismiss}>
                    There was an error setting the team values!
                </Alert>
            )
        } else {
            return <div></div>
        }
    }
}

export default NflTeamError;