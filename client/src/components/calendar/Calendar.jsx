import React, { Component } from 'react'
import '../../css/calendar/calendar.css'
import '../../css/calendar/fullcalendar.css'
import '../../css/calendar/fullcalendar.print.css'
import '../../css/calendar/fullcalendar.min.css'
import FullCalendar from 'fullcalendar-reactwrapper';
import Countdown from 'react-countdown-now';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faIgloo, faCaretRight, faBasketballBall } from '@fortawesome/free-solid-svg-icons'
import API from '../../utils/API'
import $ from 'jquery'
import Moment from 'moment';
import { atl, bkn, bos, cha, chi, cle, dal, den, det, gsw, hou, ind, lac, lal, mem, mia, mil, min, nop, nyk, okc, orl, phi, phx, por, sac, sas, tor, uta, was } from '../../css/nbaLogos'

class Calendar extends Component {
    constructor(props) {
        super(props);
        this.state = { modal: false, nestedModal: false, nestedModalExpPick: false, nestedModalNoPick: false, closeAll: false, closeAllExpPick: false, closeAllNoPick: false, scheduledGames: [], myPicks: [], myWins: [], title: '', teams: '', status: '', id: '', activePick: '', activeDate: '', today: '', timeDiff: '', homeTeam: '', awayTeam: '', homeAlias: '', awayAlias: ''};
        this.handleChangeTitle = this.handleChangeTitle.bind(this);
        this.handleChangeTeams = this.handleChangeTeams.bind(this);
        this.handleChangeStatus = this.handleChangeStatus.bind(this);
        this.toggle = this.toggle.bind(this);
        this.toggleActive = this.toggleActive.bind(this);
        this.toggleInvalidPick = this.toggleInvalidPick.bind(this);
        this.toggleNoPick = this.toggleNoPick.bind(this);
        this.toggleAllNoPick = this.toggleAllNoPick.bind(this);
        this.toggleExpiredPick = this.toggleExpiredPick.bind(this);
        this.toggleAll = this.toggleAll.bind(this);
        this.toggleAllExpPick = this.toggleAllExpPick.bind(this);
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
      let invPickAlert = <div className='row invalidPick'>Sorry, you have already won with this team!</div>
      $('.modal-open .modal-header').prepend(invPickAlert)
      }

    toggleNoPick() {
      this.setState({
        nestedModalNoPick: !this.state.nestedModalNoPick,
        closeAllNoPick: false
      });
       let noPickAlert = <div className='row invalidPick'>Sorry, you have to pick a team!</div>
       $('.modal-open .modal-header').prepend(noPickAlert)
      }
    
    toggleExpiredPick() {
      this.toggleActive()
      this.toggle()
      this.setState({
        nestedModalExpPick: !this.state.nestedModalExpPick,
        closeAllExpPick: false
      });
      console.log('EXPIRED PICK')
      let expPickAlert = <div className='row invalidPick'>Sorry, this is an old game!</div>
      $('.modal-open .modal-header').prepend(expPickAlert)
      }

    toggleAll() {
      this.setState({
        nestedModal: !this.state.nestedModal,
        closeAll: true
      });
      }

    toggleAllExpPick() {
      this.setState({
        nestedModalExpPick: !this.state.nestedModalExpPick,
        closeAllExpPick: true
      });
      }

    toggleAllNoPick() {
      this.setState({
        nestedModalNoPick: !this.state.nestedModalNoPick,
        closeAllNoPick: true
      });
    }

    handleChangeTitle(event) {
        this.setState({title: event.target.value})
        console.log('Title: ', this.state.title)
      }

    handleChangeTeams(event) {
        this.setState({
          homeTeam: event.homeTeam, 
          awayTeam: event.awayTeam,
          homeAlias: event.homeAlias,
          awayAlias: event.awayAlias
        });
        console.log('Home team: ', this.state.homeTeam)
        console.log('Away team: ', this.state.awayTeam)
      }

    handleChangeStatus(event) {
        let gameTime = Moment(event.start._d).add(6, 'hours').format("MMM Do, h:mmA")
        let gameStatus = event.status.toUpperCase()
        let gameId = event._id
        this.setState({ 
          status: gameStatus, 
          time: gameTime, 
          activeDate: event.date, 
          gameId: gameId 
        });
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
          return wins.win.trim() === teamPick.trim()
          }
        let thisPickWinner = myWins.filter(pickAlreadyWon)

        // CHECK TO SEE IF ALREADY A WINNING TEAM OR DATE PICKED
        if(teamPick === '') {
          // console.log('NO PICK')
          self.toggleNoPick()
          return;
        }
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
      let localUser = localStorage.getItem('user')
        API.getUser(localUser)
          .then(res => {
            this.setState({myPicks: res.data[0].picks})
            this.setState({myWins: res.data[0].wins})
            // console.log('CURRENT DATA: ', res.data)
            // console.log('Current picks: ', this.state.myPicks)
            // console.log('Current Wins: ', this.state.myWins)
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
        // console.log('Official dates picked: ', this.state.myDatesPicked)
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
        // console.log('Getting schedule...')
        API.getGames()
          .then(res => {
              let games = []
              res.data.forEach((game) => {
                  let splitDate = game.gameDate.split('T')
                  let gameDate = splitDate[0]
                  let homeAlias = game.homeAlias.toLowerCase()
                  let awayAlias = game.awayAlias.toLowerCase()
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
                      homeAlias: homeAlias,
                      awayAlias: awayAlias,
                      title: game.homeAlias + ' vs ' + game.awayAlias,
                      color: 'yellow',
                      textColor: 'white',
                      borderColor: 'blue'

                  }
                  games.push(gameInfo)
                  // console.log(gameDate2)
              })
              this.setState({ scheduledGames: games })
              // console.log('We have pulled the schedule')
              // console.log('Here are all of the games: ', this.state.scheduledGames)
              
          })
            .catch(err => console.log(err))
      }

    getFirstGame = () => {
      let now = Moment().format()
      let date = Moment(now).format('YYYY-MM-DD')
      // console.log('Todays date: ', date)

      API.getGamesByDate(date)
        .then (res => {
          let games = res.data
          // console.log('ALLL THE DAMN GAMES: ', games)
          let now = Moment().format()
          let sortedGames = games.sort((a,b) => new Moment(a.gameTime) - new Moment (b.gameTime))
          // console.log('NOW: ', now)
          // console.log('SORTED GAMES: ', sortedGames)
          if (!sortedGames[0]) {
            console.log('THERE MUST BE NO GAMES TODAY')
            $('.timer').html('<div>THERE ARE NO GAMES TODAY</div>')
            return;
          }
          let firstGame = sortedGames[0]
          let firstGameTime = firstGame.gameTime
          let realGameTime = Moment(firstGameTime).add(6, 'hours').format('HH:mm:ss a')
          let realGameTimeAdj = Moment(realGameTime, 'HH:mm:ss a')
          let realTime = Moment(now).format('HH:mm:ss a')
          let realTimeAdj = Moment(realTime, 'HH:mm:ss a')
          let timeDiff = Moment.duration(realGameTimeAdj.diff(realTimeAdj))
          this.createTimer(timeDiff)
        })
        .catch(err => console.log(err))
      
      }

    createTimer = (timeDiff) => {
        //console.log('Time until first game: ', timeDiff)
        let seconds = Moment.duration(timeDiff).asSeconds() * 1000
        //console.log('In seconds milliseconds: ', seconds)
        this.setState({ timeDiff: seconds })
      }

    loadLogo = (team) => {
      //console.log('THIS IS THE TEAM LOGO: ', team)
      switch (true) {
        case (team === 'atl'):
          return atl;
          
        case (team === 'bkn'):
          return bkn;
          
        case (team === 'bos'):
          return bos;
          
        case (team === 'cha'):
          return cha;
          
        case (team === 'chi'):
          return chi;
           
        case (team === 'cle'):
          return cle;
           
        case (team === 'dal'):
          return dal;
           
        case (team === 'den'):
          return den;
           
        case (team === 'det'):
          return det;
           
        case (team === 'gsw'):
          return gsw;
           
        case (team === 'hou'):
          return hou;
           
        case (team === 'ind'):
          return ind;
           
        case (team === 'lac'):
          return lac;
           
        case (team === 'lal'):
          return lal;
           
        case (team === 'mem'):
          return mem;
           
        case (team === 'mia'):
          return mia;
        
        case (team == 'mil'):
          return mil;
           
        case (team === 'min'):
          return min;
           
        case (team === 'nop'):
          return nop;
           
        case (team === 'nyk'):
          return nyk;
           
        case (team === 'okc'):
          return okc;
           
        case (team === 'orl'):
          return orl;
           
        case (team === 'phi'):
          return phi;
           
        case (team === 'phx'):
          return phx;
           
        case (team === 'por'):
          return por;
           
        case (team === 'sac'):
          return sac;
           
        case (team === 'sas'):
          return sas;
           
        case (team === 'tor'):
          return tor;
           
        case (team === 'uta'):
          return uta;
           
        case (team === 'was'):
          return was;
           
        default:
          return uta;
        }  

      }

    render() {
      library.add(faIgloo, faCaretRight, faBasketballBall)
      let timerEnded = false;
      let EndTimer = () => {
          timerEnded = true
          return (
            <span>Today's games have already begun.</span>
          )
        }
        
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
                    <Modal className='invPick' isOpen={this.state.nestedModalNoPick} toggle={this.toggleNoPick} onClosed={this.state.closeAllNoPick ? this.toggle : undefined}>
                      <ModalHeader>No Pick</ModalHeader>
                      <ModalBody>You must pick a team!</ModalBody>
                      <ModalFooter>
                        <Button color="primary" onClick={this.toggleNoPick}>Close</Button>{' '}
                        <Button color="secondary" onClick={this.toggleAllNoPick}>Close All</Button>
                      </ModalFooter>
                    </Modal>
                    <Modal className='invPick' isOpen={this.state.nestedModal} toggle={this.toggleInvalidPick} onClosed={this.state.closeAll ? this.toggle : undefined}>
                      <ModalHeader>Invalid Pick</ModalHeader>
                      <ModalBody>You have already won with the {this.state.activePick}!</ModalBody>
                      <ModalFooter>
                        <Button color="primary" onClick={this.toggleInvalidPick}>Close</Button>{' '}
                        <Button color="secondary" onClick={this.toggleAll}>Close All</Button>
                      </ModalFooter>
                    </Modal>
                    <Modal className='invPick' isOpen={this.state.nestedModalExpPick} toggle={this.toggleExpiredPick} onClosed={this.state.closeAllExpPick ? this.toggle : undefined}>
                      <ModalHeader>Invalid Pick</ModalHeader>
                      <ModalBody>This is an old game!</ModalBody>
                      <ModalFooter>
                        <Button color="secondary" onClick={this.toggleAllExpPick}>Close All</Button>
                      </ModalFooter>
                    </Modal>
                        <div className="thisGame row">
                            <span className='col-md-5 team awayTeam' value={this.state.awayTeam} onClick={this.toggleActive}>
                              {this.state.awayTeam} <br />
                              <img 
                                className='teamLogo' 
                                src={this.loadLogo(this.state.awayAlias)}
                                alt={this.state.awayAlias} 
                                fluid='true'
                              />
                            </span>
                            <span className='atSymbol col-md-2'>
                              @
                            </span>
                            <span className='col-md-5 team homeTeam' value={this.state.homeTeam} onClick={this.toggleActive}>
                              {this.state.homeTeam} <br />
                              <img 
                                className='teamLogo' 
                                src={this.loadLogo(this.state.homeAlias)}
                                alt={this.state.homeAlias} 
                                fluid='false'
                              />
                            </span>
                        {/* <input type="text" value={this.state.teams} onChange={this.handleChangeTeams} className="form-control" /> */}
                        </div> <hr />
                        <div className="status row">
                          Game Time: {this.state.time} 
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <input type="submit" value="Submit" color="primary" className="btn btn-primary" onClick={this.handleSubmit} />
                        <Button color="danger" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </form>
                </Modal>

              <div className="row countdown">
              <div className="col-3"></div>
              <div className="col-6 timer">
                TIME TO PICK <FontAwesomeIcon icon="basketball-ball" /> <Countdown date={Date.now() + this.state.timeDiff} zeroPadTime={2} daysInHours={true} renderer={this.timerRender}>
                    <EndTimer />
                  </Countdown>
              </div>
              <div className="col-3"></div>
                
                
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
                  if(Moment(calEvent.date).isBefore(Moment().subtract(1, 'day'))) {
                      console.log('YOU CANT PICK THAT DATE')
                      // $('#calendar').fullCalendar('unselect');
                      this.handleChangeTeams(calEvent)
                      this.handleChangeStatus(calEvent)
                      this.toggleExpiredPick()
                      return false;
                    } 
                    else if (timerEnded && (Moment(calEvent.date).isBefore(Moment()))) {
                      this.handleChangeTeams(calEvent)
                      this.handleChangeStatus(calEvent)
                      this.toggleExpiredPick()
                    }
                    else 
                    {
                      this.handleChangeTeams(calEvent)
                      this.handleChangeStatus(calEvent)
                      console.log(calEvent)
                      this.toggle()
                    }
                  //this.handleChangeTitle(calEvent)
                    }
                  }
                
              />
            </div>
        )
    }
}

export default Calendar

