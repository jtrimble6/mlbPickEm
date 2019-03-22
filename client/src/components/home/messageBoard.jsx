import React, { Component } from 'react'
import 'react-chat-elements/dist/main.css';
import '../../css/home.css'
import { MessageList } from 'react-chat-elements'
// import { MessageBox } from 'react-chat-elements';
// import { ChatItem } from 'react-chat-elements'
import moment from 'moment'
import API from '../../utils/API';


class MessageBoard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userData: {},
            messageBoardData: {},
            recentMessageData: [],
            messageUsername: '',
            messageText: '',
            messageType: 'text'
        }
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.getUser = this.getUser.bind(this)
        this.getMessageBoard = this.getMessageBoard.bind(this)
        this.createMessageBoard = this.createMessageBoard.bind(this)
        
    }

    componentWillReceiveProps() {
        this.getUser()
        this.getMessageBoard()
      }

    handleInputChange = event => {
        const { name, value } = event.target
        this.setState({
            [name]: value
        })
      }

    getUser = () => {
        let username = localStorage.getItem('user')
        let self = this
        console.log('MESSAGE USER: ', username)
        API.getUser(username)
          .then(res => {
              self.setState({
                  userData: res.data[0]
              })
            //   console.log('USER DATA: ', this.state.userData)
          })
          .catch(err => console.log(err))
    }

    getMessageBoard = () => {
        API.getMessageBoard()
          .then(res => {
              console.log('MESSAGE BOARD: ', res.data)
              this.setState({
                  messageBoardData: res.data
              })
              this.createMessageBoard()
          })
          .catch(err => console.log(err))
      }

    createMessageBoard = () => {
        let messageBoard = this.state.messageBoardData
        let aWeekAgo = moment().subtract(7, 'days').format('YYYY-MM-DD')
        let recentMessages = []
        let recentMessageFunc = (messages) => {
            return messages.date >= aWeekAgo
        }

        let allRecentMessages = messageBoard.filter(recentMessageFunc)
        console.log('ALL RECENT MESSAGES: ', allRecentMessages)

        for (var w=0; w<allRecentMessages.length; w++) {
            let admin = false
            if (allRecentMessages[w].admin) {
                admin = true
            }
            let adminSide = (!admin ? 'right' : 'left')
            let thisMessage = {
                position: adminSide,
                type: allRecentMessages[w].type,
                text: allRecentMessages[w].text,
                title: allRecentMessages[w].username,
                dateString: moment(allRecentMessages[w].date).format('ddd, hA')
            }
            recentMessages.push(thisMessage)
        }

        this.setState({
            recentMessageData: recentMessages
        })
        console.log('ONLY THE RECENT MESSAGES: ', this.state.recentMessageData)
    }

    
    handleSubmit = event => {
        event.preventDefault()
        let user = this.state.userData
        let messageBoardData = {
            admin: user.admin,
            username: user.username,
            type: this.state.messageType,
            text: this.state.messageText
          }

        console.log('MESSAGE INFO: ', messageBoardData)
        API.saveMessageBoard(messageBoardData)
          .then(res => {
              console.log('MESSAGE RESULT: ', res)
              this.setState({
                  messageText: '',
              })
              this.getMessageBoard()
          })
          .catch(err => console.log(err))

      }
    
    
    render() {
        // let uuidv4 = require('uuid/v4')
        
        return(
            <div className="messageBoard">
              <div className="messageList">
                <MessageList
                    className='messageList'
                    dataSource={this.state.recentMessageData}
                />
              </div>
              
              <div className="form-group messageBox">

                {/* <label htmlFor="messageType" className='messageType'>Message Type</label>
                  <select
                    name="messageType"
                    value={this.state.messageType}
                    onChange={this.handleInputChange}
                    type="text"
                    className="form-control"
                    id="messageType"                                       
                  >
                    <option value='text'>Text</option>
                    <option value='photo'>Photo</option>
                  </select> */}

                <label htmlFor="messageText">Send a Message</label>
                  <textarea 
                    value={this.state.messageText}
                    name="messageText"
                    onChange={this.handleInputChange}
                    type="text"
                    className="form-control"
                    id="messageText"
                    placeholder="Send a message to all Challengers!"
                />
                                
                <button
                    type="submit"
                    className="btn btn-primary submit"
                    onClick={this.handleSubmit}
                    >
                    Submit
                </button>
              </div>
                
            </div>
              
        )
    }
}

export default MessageBoard