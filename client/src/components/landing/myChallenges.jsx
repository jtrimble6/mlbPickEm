import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { Button } from 'reactstrap'



class MyChallenges extends Component {
    constructor(props) {
        super(props)
        this.state ={
            username: this.props.username,
            redirect: false,
            url: ''
        }
        this.setRedirect = this.setRedirect.bind(this)
        this.renderRedirect = this.renderRedirect.bind(this)
        
    }

    setRedirect = (challenge) => {
        console.log('REDIRECT TO: ', challenge.target)
        let url = ''
        if (challenge.target.type) {
            let thisUrl = challenge.target
            let thisUrlAlt = thisUrl.attributes['data'].value
            url = thisUrlAlt
        } else {
            let thisUrl = challenge.target.alt
            let teamAlt = thisUrl.trim()
            let thisUrlAlt = teamAlt
            url = thisUrlAlt
        }
        console.log('URL: ', url)
        this.setState({
            redirect: true,
            url: url
        })
    }

    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to={this.state.url} />
          }
      }


    render() {
        let uuidv4 = require('uuid/v4')
        
        return(
            <div className="myChallenges">
            {this.renderRedirect()}
              {
                this.props.challenges.map(challenge => (
                    <Button
                      key={uuidv4()}
                      color='warning'
                      className='challengeButton'
                      data={challenge.url}
                      onClick={this.setRedirect}
                    >
                    {challenge.name}
                    </Button>
                ))
              }
            </div>
              
        )
    }
}

export default MyChallenges