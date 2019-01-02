import React, { Component } from 'react'
import '../../css/calendar/calendar.css'
import '../../css/calendar/fullcalendar.css'
import '../../css/calendar/fullcalendar.print.css'
import '../../css/calendar/fullcalendar.min.css'
import FullCalendar from 'fullcalendar-reactwrapper';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
//import Games from './Games'
import API from '../../utils/API'
import $ from 'jquery'
//import moment from 'moment';

class Calendar extends Component {
    constructor(props) {
        super(props);

        this.state = { modal: false, scheduledGames: [], title: '', teams: '', status: ''};
        this.handleChangeTitle = this.handleChangeTitle.bind(this);
        this.handleChangeTeams = this.handleChangeTeams.bind(this);
        this.handleChangeStatus = this.handleChangeStatus.bind(this);
        this.toggle = this.toggle.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggle() {
        this.setState({
          modal: !this.state.modal
        });
      }

    handleChangeTitle(event) {
        this.setState({title: event.target.value});
        console.log('Title: ', this.state.title)
      }

    handleChangeTeams(event) {
        this.setState({homeTeam: event.homeTeam, awayTeam: event.awayTeam});
        console.log('Home team: ', this.state.homeTeam)
        console.log('Away team: ', this.state.awayTeam)
      }

    handleChangeStatus(event) {
        this.setState({status: event.target.value});
        console.log('Event: ', this.state.event)
      }

    handleSubmit(event) {
        event.preventDefault();
      }

    componentDidMount() {
        this.getSchedule()
    }

    getSchedule = () => {
        console.log('Getting schedule...')
        API.getGames()
          .then(res => {
              let games = []
              res.data.forEach((game) => {
                  let splitDate = game.gameDate.split('T')
                  let gameDate = splitDate[0]
                  let gameInfo = {
                      date: gameDate,
                      start: game.gameDate,
                      status: game.gameStatus,
                      homeTeam: game.homeTeam,
                      awayTeam: game.awayTeam,
                      title: game.homeAlias + ' vs ' + game.awayAlias,
                      color: 'yellow',
                      textColor: 'black',
                      borderColor: 'blue'

                  }
                  games.push(gameInfo)
              })
              this.setState({ scheduledGames: games })
              console.log('We have pulled the schedule')
              console.log('Here are all of the games: ', this.state.scheduledGames)
          })
            .catch(err => console.log(err))
    }

    render() {
        return (
            <div className='calendar'>
               <Modal isOpen={this.state.modal} className='fullCalModal'>
                <form onSubmit={this.handleSubmit}>
                  <ModalHeader id='modalTitle'>
                    Make Your Pick
                  </ModalHeader>
                    <ModalBody id='modalBody'>
                    <div className="row">
                        <h3 className='col-md-5 awayTeam'>{this.state.awayTeam}</h3>
                        <h3 className='col-md-2'>@</h3>
                        <h3 className='col-md-5 homeTeam'>{this.state.homeTeam}</h3>
                      {/* <input type="text" value={this.state.teams} onChange={this.handleChangeTeams} className="form-control" /> */}
                    </div>
                    </ModalBody>
                    <ModalFooter>
                        <input type="submit" value="Submit" color="primary" className="btn btn-primary" />
                        <Button color="danger" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </form>
                </Modal>
              {/* <div id="fullCalModal" className="modal fade">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal"><span aria-hidden="true">×</span> <span className="sr-only">close</span></button>
                            <h4 id="modalTitle" className="modal-title"></h4>
                        </div>
                        <div id="modalBody" className="modal-body"></div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                            <button className="btn btn-primary"><a id="eventUrl" target="_blank">Event Page</a></button>
                        </div>
                    </div>
                </div>
              </div> */}
              <FullCalendar
                id = "calendar"
                header = {{
                    left: 'prev,next today myCustomButton',
                    center: 'title',
                    right: 'month,basicWeek,basicDay'
                }}
                navLinks= {true} // can click day/week names to navigate views
                editable= {false}
                eventLimit= {false} // allow "more" link when too many events
                displayEventTime= {true}
                timeFormat= 'h(:mm)'
                events= {this.state.scheduledGames}
                eventClick= {(calEvent) => {
                //   this.handleChangeTitle(calEvent)
                  this.handleChangeTeams(calEvent)
                  //$('.modal-content', '.modal-header').append(calEvent.title);
                  //$('.modal-content', '.modal-body').append(calEvent.description);
                  //$('#fullCalModal').modal();
                  console.log(calEvent)
                  this.toggle()
                
                  }
                }
              />
              {/* <Games /> */}
            </div>
        )
    }
}

export default Calendar

