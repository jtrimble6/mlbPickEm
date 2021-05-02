import React, { Component } from 'react';

class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            test: 'test'
        }
        
    }

    componentDidMount() {
    }

    render() {                                                                  
        return (
            <div className="footer">
              <footer>
                  <p>WWW.SPORTHABITS.COM</p>
                  <small className='disclaimer'>*DISCLAIMER: THIS SITE IS FOR ENTERTAINMENT PURPOSES ONLY*</small>
              </footer>
            </div>
        )
    }
}

export default Footer