import React, { Component } from 'react';
import { Alert } from 'reactstrap'

//import { Link } from 'react-router-dom';

class DuplicateGolfer extends Component {
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
        if (this.props.duplicateGolfer === true) {
            return (
                <Alert color='danger' className='dupGolfer' isOpen={this.state.visible} toggle={this.onDismiss}>
                    You have selected duplicate golfers!
                </Alert>
            )
        } else {
            return <div></div>
        }
    }
}

export default DuplicateGolfer;