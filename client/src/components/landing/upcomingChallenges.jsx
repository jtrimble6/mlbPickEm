import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { Card, CardImg, CardText, CardBody, CardLink,
    CardTitle, CardSubtitle } from 'reactstrap';


class UpcomingChallenges extends Component {
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
            <div className="upcomingChallenges">
            {this.renderRedirect()}
              {
                this.props.challenges.map(challenge => (
                    <div key={uuidv4()} className='challengeCard' data={challenge.url}>
                        <Card>
                          <CardBody>
                            <CardTitle>{challenge.name}</CardTitle>
                            <CardSubtitle>Sign Up Ends ({challenge.startDate})</CardSubtitle>
                            </CardBody>
                              <img width="100%" src={require('../../css/images/' + challenge.img.toLowerCase() + '')} alt={challenge.name} />
                            <CardBody>
                            <CardText><em>{challenge.info}</em></CardText>
                            <CardLink href="#">Bookmark Challenge</CardLink><br />
                            <CardLink href="/rules">Checkout The Rules</CardLink><br />
                            <CardLink href="#">Sign Up Now</CardLink>
                          </CardBody>
                        </Card>
                    </div>
                ))
              }
            </div>
              
        )
    }
}

export default UpcomingChallenges