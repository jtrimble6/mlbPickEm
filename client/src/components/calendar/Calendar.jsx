import React, { Component } from 'react'
import '../../css/calendar/calendar.css'
import '../../css/calendar/fullcalendar.css'
import '../../css/calendar/fullcalendar.print.css'
import '../../css/calendar/fullcalendar.min.css'
import FullCalendar from 'fullcalendar-reactwrapper';
import Countdown from 'react-countdown-now';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import API from '../../utils/API'
import $ from 'jquery'
import moment from 'moment';

class Calendar extends Component {
    constructor(props) {
        super(props);
        this.state = { modal: false, nestedModal: false, closeAll: false, scheduledGames: [], myPicks: [], myWins: [], title: '', teams: '', status: '', id: '', activePick: '', activeDate: '', today: '', timeDiff: ''};
        this.handleChangeTitle = this.handleChangeTitle.bind(this);
        this.handleChangeTeams = this.handleChangeTeams.bind(this);
        this.handleChangeStatus = this.handleChangeStatus.bind(this);
        this.toggle = this.toggle.bind(this);
        this.toggleActive = this.toggleActive.bind(this);
        this.toggleInvalidPick = this.toggleInvalidPick.bind(this);
        this.toggleAll = this.toggleAll.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.checkPrevPicks = this.checkPrevPicks.bind(this);
        this.checkPrevDates = this.checkPrevDates.bind(this);
        this.overridePick = this.overridePick.bind(this);
        this.getSchedule = this.getSchedule.bind(this);
        this.createTimer = this.createTimer.bind(this);
        this.getFirstGame = this.getFirstGame.bind(this);
      }

    componentDidMount() {
        this.getFirstGame()
        this.getSchedule()
        this.checkPrevPicks()
      }

    toggle() {
        this.setState({
          modal: !this.state.modal
        });
      }

    toggleActive() {
        let _this = this
        $('.modal-open #modalBody .thisGame .team').click(function(){
            $(this).addClass('active');
            $(this).parent().children('.team').not(this).removeClass('active');
            let myPick = $(this).text()
            _this.setState({ activePick: myPick })
          }); 
      }

    toggleInvalidPick() {
      this.setState({
        nestedModal: !this.state.nestedModal,
        closeAll: false
      });
      console.log('WOAAAAH INVALID PICK DOOOOOD')
      let invalidPickAlert = <div className='row invalidPick'>Sorry, you have already won with this team!</div>
      $('.modal-open .modal-header').prepend(invalidPickAlert)
    }

    toggleAll() {
      this.setState({
        nestedModal: !this.state.nestedModal,
        closeAll: true
      });
    }

    handleChangeTitle(event) {
        this.setState({title: event.target.value})
        console.log('Title: ', this.state.title)
      }

    handleChangeTeams(event) {
        this.setState({homeTeam: event.homeTeam, awayTeam: event.awayTeam});
        console.log('Home team: ', this.state.homeTeam)
        console.log('Away team: ', this.state.awayTeam)
      }

    handleChangeStatus(event) {
        let gameTime = moment(event.start._d).format("MMM Do, hA")
        let gameStatus = event.status.toUpperCase()
        let gameId = event._id
        this.setState({ status: gameStatus, time: gameTime, activeDate: event.date, gameId: gameId });
        console.log('Status: ', this.state.status)
        console.log('Start Time: ', this.state.time)
        console.log('Game ID: ', this.state.gameId)
      }

    handleSubmit(event) {
        event.preventDefault();
        let self = this
        let myId = this.props.username
        let myPicks = this.state.myPicks
        let myWins = this.state.myWins
        let teamPick = this.state.activePick
        let pickDate = this.state.activeDate
        let prevDates = this.state.myDatesPicked
        let gameId = this.state.gameId
        let toggle = true
        let thisPick = { team: teamPick, gameDate: pickDate, gameId: gameId, result: '' }

        //FIND OUT IF USER HAS ALREADY WON WITH THIS PICK
        let pickAlreadyWon = (wins) => {
          return wins.win === teamPick
          }
        let thisPickWinner = myWins.filter(pickAlreadyWon)

        // CHECK TO SEE IF ALREADY A WINNING TEAM OR DATE PICKED
        if(myPicks.length) {
          for (var j=0; j<myPicks.length; j++) {
            if (thisPickWinner) {
              let pickHasWon = thisPickWinner[0]
              if (pickHasWon) {
                toggle = false
                self.toggleInvalidPick()
                console.log('YOU HAVE ALREADY WON WITH THIS TEAM', teamPick)
                return;
              } else if (thisPick.gameDate === myPicks[j].gameDate) {
                // console.log('TEAM PICKED ALREADY: ', this.state.myPicks[j])
                // console.log('Prev Dates Picked: ', prevDates)
                console.log('These dates match', pickDate, prevDates[j])
                this.overridePick(pickDate)
                
                } 
              }
            }
          }
        
        // SAVE PICK TO DATABASE
        API.savePick(myId, thisPick)
          .then(res => { 
            console.log(res)
           } )
          .catch(err => { console.log(err) } )

        // CLOSE MODAL IF VALID PICK
        if (toggle) {
          this.toggle()
          document.location.reload()
        }

      
        

      }

    checkPrevPicks() {
        API.getUser(this.props.username)
          .then(res => {
            this.setState({myPicks: res.data[0].picks})
            this.setState({myWins: res.data[0].wins})
            // console.log('CURRENT DATA: ', res.data[0].wins[0].win)
            console.log('Current picks: ', this.state.myPicks)
            console.log('Current Wins: ', this.state.myWins)
            this.checkPrevDates()
          })
          .catch(err => {console.log(err)
        })
      }

    checkPrevDates() {
        let currentPicks = this.state.myPicks
        let currentDatesPicked = []
        for (var i=0; i<currentPicks.length; i++) {
          let thisDate = currentPicks[i].gameDate
          //console.log('Date already picked: ', thisDate)
          currentDatesPicked.push(thisDate)
        }
        this.setState({myDatesPicked: currentDatesPicked})
        console.log('Official dates picked: ', this.state.myDatesPicked)
      }
    
    overridePick(date) {
        console.log(date)
        API.deletePick(this.props.username, date)
          .then(res => {
              console.log(res)
          })
          .catch(err => {console.log(err)
        })
      }

    getSchedule = () => {
        console.log('Getting schedule...')
        API.getGames()
          .then(res => {
              let games = []
              res.data.forEach((game) => {
                  let splitDate = game.gameDate.split('T')
                  let gameDate = splitDate[0]
                  // let splitTime = game.gameTime.split('T')
                  // let gameTime = splitTime[1]
                  // let gameDate2 = moment(gameDate).format('YYYY-MM-DD')
                  let gameInfo = {
                      id: game.gameId,
                      date: gameDate,
                      start: game.gameTime,
                      status: game.gameStatus,
                      homeTeam: game.homeTeam,
                      awayTeam: game.awayTeam,
                      title: game.homeAlias + ' vs ' + game.awayAlias,
                      color: 'yellow',
                      textColor: 'black',
                      borderColor: 'blue'

                  }
                  games.push(gameInfo)
                  // console.log(gameDate2)
              })
              this.setState({ scheduledGames: games })
              
              // console.log('We have pulled the schedule')
              console.log('Here are all of the games: ', this.state.scheduledGames)
              
          })
            .catch(err => console.log(err))
      }

    getFirstGame = () => {
      let now = moment().format()
      let date = moment(now).format('YYYY-MM-DD')
      console.log('Todays date: ', date)
      API.getGamesByDate(date)
        .then (res => {
          let firstGame = res.data[0]
          let firstGameTime = firstGame.gameTime
          let realGameTime = moment(firstGameTime).add(6, 'hours').format('HH:mm:ss a')
          let realGameTimeAdj = moment(realGameTime, 'HH:mm:ss a')
          let realTime = moment(now).format('HH:mm:ss a')
          let realTimeAdj = moment(realTime, 'HH:mm:ss a')
          // let fgTime = moment(realGameTimeAdj).format('HH:mm:ss a')
          // let timeDiff = moment.utc(moment(now).diff(moment(fgTime))).format("hh:mm:ss")
          let timeDiff = moment.duration(realGameTimeAdj.diff(realTimeAdj))
          let seconds = timeDiff.asHours()
          console.log('Todays first game: ', firstGameTime)
          console.log('Right now: ', now)
          console.log('Game Time: ', realGameTimeAdj)
          console.log('Time diff: ', timeDiff)
          console.log('Hours til: ', seconds)
          this.createTimer(timeDiff)
        })
        .catch(err => console.log(err))
      
    }

    createTimer = (timeDiff) => {
      console.log('Time until first game: ', timeDiff)
      let seconds = moment.duration(timeDiff).asSeconds() * 1000
      console.log('In seconds: ', seconds)
      this.setState({ timeDiff: seconds })
    }

    render() {
        return (
            <div className='calendar'>
               <Modal 
                 isOpen={this.state.modal} 
                 autoFocus={true}
                 centered={true}
                 size='lg'
                 className='fullCalModal'
               >
                <form onSubmit={this.handleSubmit}>
                  <ModalHeader id='modalTitle'>
                    Make Your Pick
                  </ModalHeader>
                    <ModalBody id='modalBody'>
                    <Modal isOpen={this.state.nestedModal} toggle={this.toggleInvalidPick} onClosed={this.state.closeAll ? this.toggle : undefined}>
                      <ModalHeader>Nested Modal title</ModalHeader>
                      <ModalBody>Stuff and things</ModalBody>
                      <ModalFooter>
                        <Button color="primary" onClick={this.toggleInvalidPick}>Done</Button>{' '}
                        <Button color="secondary" onClick={this.toggleAll}>All Done</Button>
                      </ModalFooter>
                    </Modal>
                        <div className="thisGame row">
                            <span className='col-md-5 team awayTeam' value={this.state.awayTeam} onClick={this.toggleActive}>{this.state.awayTeam}</span>
                            <span className='col-md-2'>@</span>
                            <span className='col-md-5 team homeTeam' value={this.state.homeTeam} onClick={this.toggleActive}>{this.state.homeTeam}</span>
                        {/* <input type="text" value={this.state.teams} onChange={this.handleChangeTeams} className="form-control" /> */}
                        </div> <hr />
                        <div className="row">
                            <span className='status'>Game Status: {this.state.status} | Game Time: {this.state.time} </span>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <input type="submit" value="Submit" color="primary" className="btn btn-primary" onClick={this.handleSubmit} />
                        <Button color="danger" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </form>
                </Modal>

              <div className="row countdown">
                <h3>TIME TO PICK:</h3>
                  <Countdown 
                    date={Date.now() + this.state.timeDiff}
                  />
                
              </div>
              
              <FullCalendar
                id = "calendar"
                header = {{
                    left: 'prev,next today myCustomButton',
                    center: 'title',
                    right: 'month,basicWeek,basicDay'
                }}
              
                defaultView= 'basicWeek'
                themeSystem= 'bootstrap4'
                navLinks= {true} // can click day/week names to navigate views
                editable= {false}
                eventLimit= {false} // allow "more" link when too many events
                displayEventTime= {true}
                timeFormat= 'h(:mm)A'
                showNonCurrentDates= {false}
                events= {this.state.scheduledGames}
                eventClick= {(calEvent) => {
                  //this.handleChangeTitle(calEvent)
                  this.handleChangeTeams(calEvent)
                  this.handleChangeStatus(calEvent)
                  //$('.modal-content', '.modal-header').append(calEvent.title);
                  //$('.modal-content', '.modal-body').append(calEvent.description);
                  //$('#fullCalModal').modal();
                  console.log(calEvent)
                  this.toggle()
                
                  }
                }
              />
            </div>
        )
    }
}

export default Calendar

