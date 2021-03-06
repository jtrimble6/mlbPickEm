import React, { Component } from 'react'
import API from '../../utils/API'
// import AdminBar from '../../components/nav/AdminBar'
import { UncontrolledCollapse, Button } from 'reactstrap';
import '../../css/editChallenge.css'
import ExistingAccount from "../../components/alerts/ExistingAccount";
import PasswordError from '../../components/alerts/PasswordError';
import SaveChalError from '../../components/alerts/SaveChalError'
//import $ from 'jquery'
// import EditSuccess from '../../components/alerts/EditSuccess';
// import EditError from '../../components/alerts/EditError';
import moment from 'moment'
import { atl, bkn, bos, cha, chi, cle, dal, den, det, gsw, hou, ind, lac, lal, mem, mia, mil, min, nop, nyk, okc, orl, phi, phx, por, sac, sas, tor, uta, was } from '../../css/nbaLogos'
// import { ari, atl2, bal, bos2, chc, cws, cle2, cin, col, det2, mia2, hou2, kc, laa, lad, nym, nyy, mil2, min2, oak, pit, sd, sf, phi2, sea, stl, tb, tex, tor2, wsh } from '../../css/mlbLogos'

class EditChallenge extends Component {
    constructor(props) {
        super(props)
        this.state = {
            editSuccess: false,
            deletionSuccess: false,
            nameTaken: false,
            passwordError: false,
            saveChalError: false,
            formError: false,
            allActiveChallenges: [],
            activeChallenge: '',
            challengeData: '',
            challengeId: '',
            challengeName: '',
            challengeStatus: '',
            openSignUp: '',
            startDate: '',
            buyIn: 0,
            maxEntries: '',
            url: '',
            rulesUrl: '',
            editor: localStorage.getItem('user'),
            sport: '',
            teams: '',
            challengeTeams: '',
            info: '',
            img: '',
            password: '',
            confirmPassword: '',
            golfers: [],
            nbaTeams: [
                { name: 'Atlanta Hawks', abbr: 'atl', logo: atl, status: 'secondary' },
                { name: 'Brooklyn Nets', abbr: 'bkn', logo: bkn, status: 'secondary' },
                { name: 'Boston Celtics', abbr: 'bos', logo: bos, status: 'secondary' },
                { name: 'Charlotte Hornets', abbr: 'cha', logo: cha, status: 'secondary' },
                { name: 'Chicago Bulls', abbr: 'chi', logo: chi, status: 'secondary' },
                { name: 'Cleveland Cavaliers', abbr: 'cle', logo: cle, status: 'secondary' },
                { name: 'Dallas Mavericks', abbr: 'dal', logo: dal, status: 'secondary' },
                { name: 'Denver Nuggets', abbr: 'den', logo: den, status: 'secondary' },
                { name: 'Detroit Pistons', abbr: 'det', logo: det, status: 'secondary' },
                { name: 'Golden State Warriors', abbr: 'gsw', logo: gsw, status: 'secondary' },
                { name: 'Houston Rockets', abbr: 'hou', logo: hou, status: 'secondary' },
                { name: 'Indiana Pacers', abbr: 'ind', logo: ind, status: 'secondary' },
                { name: 'Los Angeles Clippers', abbr: 'lac', logo: lac, status: 'secondary' },
                { name: 'Los Angeles Lakers', abbr: 'lal', logo: lal, status: 'secondary' },
                { name: 'Memphis Grizzlies', abbr: 'mem', logo: mem, status: 'secondary' },
                { name: 'Miami Heat', abbr: 'mia', logo: mia, status: 'secondary' },
                { name: 'Milwalkee Bucks', abbr: 'mil', logo: mil, status: 'secondary' },
                { name: 'Minnesota Timberwolves', abbr: 'min', logo: min, status: 'secondary' },
                { name: 'New Orleans Pelicans', abbr: 'nop', logo: nop, status: 'secondary' },
                { name: 'New York Knicks', abbr: 'nyk', logo: nyk, status: 'secondary' },
                { name: 'Oklahoma City Thunder', abbr: 'okc', logo: okc, status: 'secondary' },
                { name: 'Orlando Magic', abbr: 'orl', logo: orl, status: 'secondary' },
                { name: 'Philadelphia 76ers', abbr: 'phi', logo: phi, status: 'secondary' },
                { name: 'Pheonix Suns', abbr: 'phx', logo: phx, status: 'secondary' },
                { name: 'Portland Trail Blazers', abbr: 'por', logo: por, status: 'secondary' },
                { name: 'Sacramento Kings', abbr: 'sac', logo: sac, status: 'secondary' },
                { name: 'San Antonio Spurs', abbr: 'sas', logo: sas, status: 'secondary' },
                { name: 'Toronto Raptors', abbr: 'tor', logo: tor, status: 'secondary' },
                { name: 'Utah Jazz', abbr: 'uta', logo: uta, status: 'secondary' },
                { name: 'Washington Wizards', abbr: 'was', logo: was, status: 'secondary' }
              ],
              nbaPlayoffTeams: [
                { name: 'Milwalkee Bucks', abbr: 'mil', logo: mil, status: 'secondary', conf: 'east', seed: '1' },
                { name: 'Toronto Raptors', abbr: 'tor', logo: tor, status: 'secondary', conf: 'east', seed: '2' },
                { name: 'Philadelphia 76ers', abbr: 'phi', logo: phi, status: 'secondary', conf: 'east', seed: '3' },
                { name: 'Boston Celtics', abbr: 'bos', logo: bos, status: 'secondary', conf: 'east', seed: '4' },
                { name: 'Indiana Pacers', abbr: 'ind', logo: ind, status: 'secondary', conf: 'east', seed: '5' },
                { name: 'Brooklyn Nets', abbr: 'bkn', logo: bkn, status: 'secondary', conf: 'east', seed: '6' },
                { name: 'Orlando Magic', abbr: 'orl', logo: orl, status: 'secondary', conf: 'east', seed: '7' },
                { name: 'Detroit Pistons', abbr: 'det', logo: det, status: 'secondary', conf: 'east', seed: '8' },
                { name: 'Golden State Warriors', abbr: 'gsw', logo: gsw, status: 'secondary', conf: 'west', seed: '1' },
                { name: 'Denver Nuggets', abbr: 'den', logo: den, status: 'secondary', conf: 'west', seed: '2' },
                { name: 'Portland Trail Blazers', abbr: 'por', logo: por, status: 'secondary', conf: 'west', seed: '3' },
                { name: 'Houston Rockets', abbr: 'hou', logo: hou, status: 'secondary', conf: 'west', seed: '4' },
                { name: 'Utah Jazz', abbr: 'uta', logo: uta, status: 'secondary', conf: 'west', seed: '5' },
                { name: 'Oklahoma City Thunder', abbr: 'okc', logo: okc, status: 'secondary', conf: 'west', seed: '6' },
                { name: 'San Antonio Spurs', abbr: 'sas', logo: sas, status: 'secondary', conf: 'west', seed: '7' },
                { name: 'Los Angeles Clippers', abbr: 'lac', logo: lac, status: 'secondary', conf: 'west', seed: '8' },
              ],
              mlbTeams: [
                { name: 'Arizona Diamondbacks', abbr: 'ari', logo: 'ari', status: 'secondary', division: 'NL West' },
                { name: 'Atlanta Braves', abbr: 'atl', logo: 'atl2', status: 'secondary', division: 'NL East' },
                { name: 'Baltimore Orioles', abbr: 'bal', logo: 'bal', status: 'secondary', division: 'AL East' },
                { name: 'Boston Red Sox', abbr: 'bos', logo: 'bos2', status: 'secondary', division: 'AL East' },
                { name: 'Chicago White Sox', abbr: 'cws', logo: 'cws', status: 'secondary', division: 'AL Central' },
                { name: 'Chicago Cubs', abbr: 'chc', logo: 'chc', status: 'secondary', division: 'NL Central' },
                { name: 'Cincinnati Reds', abbr: 'cin', logo: 'cin', status: 'secondary', division: 'NL Central' },
                { name: 'Cleveland Indians', abbr: 'cle', logo: 'cle2', status: 'secondary', division: 'AL Central' },
                { name: 'Colorado Rockies', abbr: 'col', logo: 'col', status: 'secondary', division: 'NL West' },
                { name: 'Detroit Tigers', abbr: 'det', logo: 'det2', status: 'secondary', division: 'AL Central' },
                { name: 'Houston Astros', abbr: 'hou', logo: 'hou2', status: 'secondary', division: 'AL West' },
                { name: 'Kansas City Royals', abbr: 'kc', logo: 'kc', status: 'secondary', division: 'AL Central' },
                { name: 'Los Angeles Angels', abbr: 'laa', logo: 'laa', status: 'secondary', division: 'AL West' },
                { name: 'Los Angeles Dodgers', abbr: 'lad', logo: 'lad', status: 'secondary', division: 'NL West' },
                { name: 'Miami Marlins', abbr: 'mia', logo: 'mia2', status: 'secondary', division: 'NL East' },
                { name: 'Milwaukee Brewers', abbr: 'mil', logo: 'mil2', status: 'secondary', division: 'NL Central' },
                { name: 'Minnesota Twins', abbr: 'min', logo: 'min2', status: 'secondary', division: 'AL Central' },
                { name: 'New York Yankees', abbr: 'nyy', logo: 'nyy', status: 'secondary', division: 'AL East' },
                { name: 'New York Mets', abbr: 'nym', logo: 'nym', status: 'secondary', division: 'NL East' },
                { name: 'Oakland Athletics', abbr: 'oak', logo: 'oak', status: 'secondary', division: 'AL West' },
                { name: 'Philadelphia Phillies', abbr: 'phi', logo: 'phi2', status: 'secondary', division: 'NL East' },
                { name: 'Pittsburgh Pirates', abbr: 'pit', logo: 'pit', status: 'secondary', division: 'NL Central' },
                { name: 'San Diego Padres', abbr: 'sd', logo: 'sd', status: 'secondary', division: 'NL West' },
                { name: 'San Francisco Giants', abbr: 'sf', logo: 'sf', status: 'secondary', division: 'NL West' },
                { name: 'Seattle Mariners', abbr: 'sea', logo: 'sea', status: 'secondary', division: 'AL West' },
                { name: 'St. Louis Cardinals', abbr: 'stl', logo: 'stl', status: 'secondary', division: 'NL Central' },
                { name: 'Tampa Bay Rays', abbr: 'tb', logo: 'tb', status: 'secondary', division: 'AL East' },
                { name: 'Texas Rangers', abbr: 'tex', logo: 'tex', status: 'secondary', division: 'AL West' },
                { name: 'Toronto Blue Jays', abbr: 'tor', logo: 'tor2', status: 'secondary', division: 'AL East' },
                { name: 'Washington Nationals', abbr: 'wsh', logo: 'wsh', status: 'secondary', division: 'NL East' }
              ],
              nflTeams: [
                { name: 'Arizona Cardinals', abbr: 'ari', logo: 'ari2', status: 'secondary', division: 'NFC West' },
                { name: 'Atlanta Falcons', abbr: 'atl', logo: 'atl3', status: 'secondary', division: 'NFC South' },
                { name: 'Baltimore Ravens', abbr: 'bal', logo: 'bal2', status: 'secondary', division: 'AFC North' },
                { name: 'Buffalo Bills', abbr: 'buf', logo: 'buf', status: 'secondary', division: 'AFC East' },
                { name: 'Carolina Panthers', abbr: 'car', logo: 'car', status: 'secondary', division: 'NFC South' },
                { name: 'Chicago Bears', abbr: 'chi', logo: 'chi2', status: 'secondary', division: 'NFC North' },
                { name: 'Cincinnati Bengals', abbr: 'cin', logo: 'cin', status: 'secondary', division: 'AFC North' },
                { name: 'Cleveland Browns', abbr: 'cle', logo: 'cle3', status: 'secondary', division: 'AFC North' },
                { name: 'Dallas Cowboys', abbr: 'dal', logo: 'dal2', status: 'secondary', division: 'NFC East' },
                { name: 'Denver Broncos', abbr: 'den', logo: 'den', status: 'secondary', division: 'AFC West' },
                { name: 'Detroit Lions', abbr: 'det', logo: 'det3', status: 'secondary', division: 'NFC North' },
                { name: 'Green Bay Packers', abbr: 'gb', logo: 'gb', status: 'secondary', division: 'NFC North' },
                { name: 'Houston Texans', abbr: 'hou', logo: 'hou2', status: 'secondary', division: 'AFC South' },
                { name: 'Indianapolis Colts', abbr: 'ind', logo: 'ind2', status: 'secondary', division: 'AFC South' },
                { name: 'Jacksonville Jaguars', abbr: 'jac', logo: 'jac', status: 'secondary', division: 'AFC South' },
                { name: 'Kansas City Chiefs', abbr: 'kc', logo: 'kc', status: 'secondary', division: 'AFC West' },
                { name: 'Los Angeles Chargers', abbr: 'lac', logo: 'lac2', status: 'secondary', division: 'AFC West' },
                { name: 'Los Angeles Rams', abbr: 'la', logo: 'la', status: 'secondary', division: 'NFC West' },
                { name: 'Miami Dolphins', abbr: 'mia', logo: 'mia2', status: 'secondary', division: 'AFC East' },
                { name: 'Minnesota Vikings', abbr: 'min', logo: 'min2', status: 'secondary', division: 'NFC North' },
                { name: 'New England Patriots', abbr: 'ne', logo: 'ne', status: 'secondary', division: 'AFC East' },
                { name: 'New Orleans Saints', abbr: 'no', logo: 'no', status: 'secondary', division: 'NFC South' },
                { name: 'New York Giants', abbr: 'nyg', logo: 'nyg', status: 'secondary', division: 'NFC East' },
                { name: 'New York Jets', abbr: 'nyj', logo: 'nyj', status: 'secondary', division: 'AFC East' },
                { name: 'Oakland Raiders', abbr: 'oak', logo: 'oak', status: 'secondary', division: 'AFC West' },
                { name: 'Philadelphia Eagles', abbr: 'phi', logo: 'phi', status: 'secondary', division: 'NFC East' },
                { name: 'Pittsburgh Steelers', abbr: 'pit', logo: 'pit', status: 'secondary', division: 'AFC North' },
                { name: 'Seattle Seahawks', abbr: 'sea', logo: 'sea', status: 'secondary', division: 'NFC West' },
                { name: 'San Francisco 49ers', abbr: 'sf', logo: 'sf', status: 'secondary', division: 'NFC West' },
                { name: 'Tampa Bay Buccaneers', abbr: 'tb', logo: 'tb', status: 'secondary', division: 'NFC South' },
                { name: 'Tennessee Titans', abbr: 'ten', logo: 'ten', status: 'secondary', division: 'AFC South' },
                { name: 'Washington Redskins', abbr: 'was', logo: 'was2', status: 'secondary', division: 'NFC East' }
              ]
          }
          this.getChallenges = this.getChallenges.bind(this)
          this.createForm = this.createForm.bind(this)
          this.checkPassword = this.checkPassword.bind(this)
          this.handleInputChange = this.handleInputChange.bind(this)
          this.handleFormSubmit = this.handleFormSubmit.bind(this)
          this.handleFormError = this.handleFormError.bind(this)
    }

    componentDidMount() {
        this.getChallenges()
        // this.getAllTeams()
        // this.getChallengeData()
      }

      getAllTeams = () => {
        let self = this
        API.getMlbTeams()
          .then(res => {
            console.log('MLB TEAMS: ', res.data)
            self.setState({
              mlbTeams: res.data
            })
          })
  
        API.getNbaTeams()
          .then(res => {
            console.log('NBA TEAMS: ', res.data)
            self.setState({
              nbaTeams: res.data
            })
          })
  
        API.getGolfers()
          .then(res => {
            console.log('GOLFERS: ', res.data)
            self.setState({
              golfers: res.data
            })
          })
      }

    getChallenges = () => {
        API.getChallenges()
          .then(res => {
              let filterActiveChallenges = (challenges) => {
                return challenges.challengeStatus === 'active'
              }
              let activeChallenges = res.data.filter(filterActiveChallenges)
              this.setState({
                  allActiveChallenges: activeChallenges
              })
          })
          .catch(err => console.log(err)) 
      }

    createForm = (challenge) => {
        console.log('CHALLENGE FORM DATA: ', challenge)
        let allActiveChallenges = this.state.allActiveChallenges
        let findChallengeFunc = (challenges) => {
            return challenges.challengeName === challenge
        }
        let thisChallenge = allActiveChallenges.filter(findChallengeFunc)
        console.log('EDIT THIS CHALLENGE: ', thisChallenge[0])
        let chal = thisChallenge[0]
        console.log('ABBR: ', chal.teams[0].abbr)
        let chalTeams = ''
        if (chal.teams[0].abbr === 'atl') {
            chalTeams = 'nba'
        } else if (chal.teams[1].abbr === 'atl') {
            chalTeams = 'nfl'
        } else {
            chalTeams = 'mlb'
        }

        this.setState({
            challengeId: chal._id,
            challengeName: chal.challengeName,
            challengeStatus: chal.challengeStatus,
            openSignUp: moment(chal.openSignUp).format('YYYY-MM-DD'),
            startDate: moment(chal.startDate).format('YYYY-MM-DD'),
            endDate: moment(chal.endDate).format('YYYY-MM-DD'),
            buyIn: chal.buyIn,
            maxEntries: chal.maxEntries,
            url: chal.url,
            rulesUrl: chal.rulesUrl,
            sport: chal.sport,
            users: chal.users,
            winner: chal.winner,
            teams: chalTeams,
            info: chal.info,
            img: chal.img,
        })

        // API.getChallenge()
        // let thisChallenge = challenge.dataset.name
        console.log('CHALLENGE DATA: ', thisChallenge)
        console.log('CHALLENGE URL: ', chal.url)
      
      }

    checkPassword = event => {
        const password = event.target.value
        this.setState({
         confirmPassword: password
        })
        if (this.state.password !== password) {
            console.log('THE PASSWORDS DO NOT MATCH')
            this.setState({
                passwordError: 'PASSWORDS DO NOT MATCH'
            })
        } else {
            this.setState({
                passwordError: 'PASSWORDS MATCH'
            })
        }
      } 

    handleInputChange = event => {
        const { name, value } = event.target
        this.setState({
            [name]: value
        })

        if (name === 'challengeData') {
          this.createForm(value)
        }
        
      }

    handleFormError = () => {
        if (this.state.formError) {
            console.log('FORM ERROR!')
        }
      }

    handleFormSubmit = event => {
        event.preventDefault();
        // let editSuccess = false
        let self = this
        this.setState({
            nameTaken: false,
        })
        let teams = ( 
          this.state.teams === 'nba' ? this.state.nbaTeams : 
          this.state.teams === 'mlb' ? this.state.mlbTeams : 
          this.state.teams === 'nfl' ? this.state.nflTeams : 
          this.state.teams === 'nbaPlayoff' ? this.state.nbaPlayoffTeams : 
          this.state.teams === 'masters' ? this.state.golfers : 
          '' 
          ) 
        let challengeDeletionId = this.state.challengeId
        //console.log(this.state)
        let challengeData = {
            challengeName: this.state.challengeName,
            challengeStatus: this.state.challengeStatus,
            openSignUp: this.state.openSignUp,
            startDate: this.state.startDate,
            endDate: this.state.endDate,
            buyIn: this.state.buyIn,
            maxEntries: this.state.maxEntries,
            url: this.state.url,
            rulesUrl: this.state.rulesUrl,
            creator: this.state.editor,
            sport: this.state.sport,
            users: this.state.users,
            winner: this.state.winner,
            teams: teams,
            info: this.state.info,
            img: this.state.img
            // password: this.state.confirmPassword
        };
        console.log('NEW CHALLENGE DATA: ', challengeData);
        console.log('CHALLENGE DELETION ID: ', challengeDeletionId)
        
        API.saveChallenge(challengeData)
          .then(res => {
              console.log('RESULT: ', res)
          })
          .catch(err => {
              console.log(err)
              self.setState({
                  saveChalError: true
              })
              self.handleFormError()
              return;
            })

            
            API.deleteChallenge(challengeDeletionId)
                .then(res => {
                    console.log('DELETION RESULT: ', res)
                    self.setState({
                        deletionSuccess: true
                    })
                })
                .catch(err => {
                    console.log(err)
                    self.setState({
                      formError: true
                    })
                    self.handleFormError()
                  })

              self.setState({
                  challengeData: '',
                  challengeName: '',
                  challengeStatus: '',
                  openSignUp: '',
                  startDate: '',
                  buyIn: 0,
                  maxEntries: '',
                  url: '',
                  sport: '',
                  teams: '',
                  info: '',
                  img: '',
                  password: '',
                  confirmPassword: '',
              })
            

            
      }

    render() {
        let uuidv4 = require('uuid/v4')
        let challengeData = this.state.challengeData
        // let chalUrl = 
        return (
            <div id="editChallengePage">
            {/* <AdminBar /> */}
              {/* {this.renderRedirect()} */}
              <Button color="primary" id="togglerEditChallenge" style={{ marginBottom: '1rem' }}>
                  Edit Challenge <i class="fas fa-caret-down"></i>
                </Button>
              <UncontrolledCollapse toggler="#togglerEditChallenge">
              <div className="formContainer adminEditChallengeFormDiv">    
                <form className="formSignup" action="index.html">                    
                  <div id='editChalForm' className='signupWrap'>
                    <h2 
                    className="formSignup-heading adminEditChallengeTitle"
                    > 
                    { 
                      this.state.challengeName.length ? 
                      'Currently Editing Challenge (' + this.state.challengeName + ')' 
                      : '' 
                    }
                    </h2>
                      <div className="form-group">
                        <label htmlFor="challengeEditName" className='challengeSelectorTitle'>Select Challenge</label>
                          <select 
                            value={this.state.challengeData}
                            name="challengeData"
                            onChange={this.handleInputChange}
                            type="text"
                            className="form-control"
                            id="challengeEditName"
                          >
                          <option value=''>Select One</option>
                          {
                            this.state.allActiveChallenges.map((challenge) => (
                                <option 
                                  key={(uuidv4())} 
                                  value={challenge.challengeName}
                                  data-data={challenge}
                                  onClick={this.handleFormSelection}
                                //   name={challengeData}
                                //   onClick={this.handleInputChange}
                                //   className='challengeSelection'
                                  
                                >
                                  {challenge.challengeName}
                                </option>
                            ))
                          }
                        </select>
                        <small id="usernameError" className="form-text text-muted">{this.state.nameTaken}</small>
                      </div>
                    </div>
                  </form>
                </div>

                {(challengeData === '' ) ? 

                <div className="formPlaceholder">
                    <p>Form selection will appear here</p>
                </div>
                :
                <div className="formContainer adminEditChallengeFormDiv">    
                  <form className="formSignUp" action="index.html">                    
                    <div className="signUpWrap adminEditChallengeForm">
                        <div className="form-group">
                            <label htmlFor="challengeName">Challenge Name</label>
                                <input 
                                value={this.state.challengeName}
                                name="challengeName"
                                onChange={this.handleInputChange}
                                type="text"
                                className="form-control"
                                id="challengeName"
                                placeholder="Name of Challenge"
                            />
                            <small id="usernameError" className="form-text text-muted">{this.state.nameTaken}</small>
                        </div>
                        <div className="form-group">
                            <label htmlFor="challengeStatus">Challenge Status</label>
                              <select
                                    name="challengeStatus"
                                    value={this.state.challengeStatus}
                                    onChange={this.handleInputChange}
                                    type="text"
                                    className="form-control"
                                    id="challengeStatus"                                       
                                >
                                <option value=''>Select One</option>
                                <option value='active'>Active</option>
                                <option value='inactive'>Inactive</option>
                              </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="openSignUp">Open Sign Up Date</label>
                            <input 
                                value={this.state.openSignUp}
                                name="openSignUp"
                                onChange={this.handleInputChange}
                                type="date"
                                className="form-control"
                                id="openSignUp"
                                placeholder={moment().format('MM/DD/YYYY')}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="startDate">Challenge Start Date</label>
                            <input 
                                value={this.state.startDate}
                                name="startDate"
                                onChange={this.handleInputChange}
                                type="date"
                                className="form-control"
                                id="startDate"
                                default="MM/DD/YYYY"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="endDate">End Date (optional)</label>
                            <input 
                                value={this.state.endDate}
                                name="endDate"
                                onChange={this.handleInputChange}
                                type="date"
                                className="form-control"
                                id="endDate"
                                placeholder="MM/DD/YYYY"
                            />
                        </div>
                        <div className="form-group">
                          <label htmlFor="buyIn">Entry Fee</label>
                            <select
                                    name="buyIn"
                                    value={this.state.buyIn}
                                    onChange={this.handleInputChange}
                                    type="text"
                                    className="form-control"
                                    id="buyIn"                                       
                                >
                                <option value={0}>--</option>
                                <option value={1}>1</option>
                                <option value={2}>2</option>
                                <option value={3}>3</option>
                                <option value={4}>4</option>
                                <option value={5}>5</option>
                                <option value={10}>10</option>
                                <option value={15}>15</option>
                                <option value={20}>20</option>
                                <option value={25}>25</option>
                                <option value={30}>30</option>
                                <option value={35}>35</option>
                                <option value={40}>40</option>
                                <option value={45}>45</option>
                                <option value={50}>50</option>
                                <option value={75}>75</option>
                                <option value={100}>100</option>
                                <option value={150}>150</option>
                                <option value={200}>200</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="maxEntries">Max Entries</label>
                            <select
                                    name="maxEntries"
                                    value={this.state.maxEntries}
                                    onChange={this.handleInputChange}
                                    type="text"
                                    className="form-control"
                                    id="maxEntries"                                       
                                >
                                <option value={0}>No limit</option>
                                <option value={2}>2</option>
                                <option value={3}>3</option>
                                <option value={4}>4</option>
                                <option value={5}>5</option>
                                <option value={10}>10</option>
                                <option value={15}>15</option>
                                <option value={20}>20</option>
                                <option value={25}>25</option>
                                <option value={30}>30</option>
                                <option value={35}>35</option>
                                <option value={40}>40</option>
                                <option value={45}>45</option>
                                <option value={50}>50</option>
                                <option value={75}>75</option>
                                <option value={100}>100</option>
                                <option value={150}>150</option>
                                <option value={200}>200</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="sport">Sport</label>
                            <select
                                    name="sport"
                                    value={this.state.sport}
                                    onChange={this.handleInputChange}
                                    type="text"
                                    className="form-control"
                                    id="sport"                                       
                                >
                                <option value=''>Select One</option>
                                <option value='nfl'>NFL</option>
                                <option value='mlb'>MLB</option>
                                <option value='nba'>NBA</option>
                                <option value='golf'>MASTERS</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="teams">Teams</label>
                              <select
                                    name="teams"
                                    value={this.state.teams}
                                    onChange={this.handleInputChange}
                                    type="text"
                                    className="form-control"
                                    id="teams"                                       
                                >
                                <option value=''>Select One</option>
                                <option value='nfl'>NFL Teams</option>
                                <option value='mlb'>MLB Teams</option>
                                <option value='nba'>NBA Teams</option>
                                <option value='nbaPlayoff'>NBA 2018-19 PLAYOFF TEAMS</option>
                                <option value='masters'>PGA 2018-19 MASTERS</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="url">URL</label>
                            <select
                                    name="url"
                                    value={this.state.url}
                                    onChange={this.handleInputChange}
                                    type="text"
                                    className="form-control"
                                    id="url"                                       
                                >
                                <option value=''>Select One</option>
                                <option value='/actionNFL'>NFL Challenge</option>
                                <option value='/actionMLB'>MLB Challenge</option>
                                <option value='/action'>NBA Challenge</option>
                                <option value='/nbaPlayoffs'>NBA Playoff Challenge</option>
                                <option value='/masters'>MASTERS Challenge</option>
                                </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="rulesUrl">Rules URL</label>
                            <select
                                    name="rulesUrl"
                                    value={this.state.rulesUrl}
                                    onChange={this.handleInputChange}
                                    type="text"
                                    className="form-control"
                                    id="rulesUrl"                                       
                                >
                                <option value=''>Select One</option>
                                <option value='/nflRules'>NFL Rules</option>
                                <option value='/mlbRules'>MLB Rules</option>
                                <option value='/rules'>NBA Rules</option>
                                <option value='/nbaPlayoffRules'>NBA Playoff Rules</option>
                                <option value='/mastersRules'>Masters Rules</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Editor</label>
                                <input
                                    readOnly
                                    value={this.state.editor}
                                    name="editor"
                                    type="text"
                                    className="form-control"
                                    id="editor"
                                    aria-describedby="emailHelp"
                                    placeholder={this.state.editor}
                                />
                        </div>
                        <div className="form-group">
                            <label htmlFor="info">Challenge Info</label>
                                <textarea 
                                value={this.state.info}
                                name="info"
                                onChange={this.handleInputChange}
                                type="text"
                                className="form-control"
                                id="info"
                                placeholder="Challenge info"
                                />
                        </div>
                        <div className="form-group">
                        <label htmlFor="img">Image</label>
                            <select
                                name="img"
                                value={this.state.img}
                                onChange={this.handleInputChange}
                                type="text"
                                className="form-control"
                                id="img"                                       
                            >
                                <option value=''>Select One</option>
                                <option value='nfldivisionchallenge.jpeg'>NFL</option>
                                <option value='mlbpickemchallenge.jpeg'>MLB</option>
                                <option value='nbaplayoffchallenge.jpg'>NBA</option>
                                <option value='masterschallenge.jpg'>MASTERS</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">Change Password (optional)</label>
                            <input
                                value={this.state.password}
                                name="password"
                                onChange={this.handleInputChange}
                                type="password"
                                className="form-control"
                                id="password"
                                placeholder="Password"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">Confirm Password</label>
                            <input
                                value={this.state.confirmPassword}
                                name="confirmPassword"
                                onChange={this.checkPassword}
                                type="password"
                                className="form-control"
                                id="confirmPassword"
                                placeholder="Confirm Password"
                            />
                            <small id="passwordError" className="form-text text-muted">{this.state.passwordError}</small>
                        </div>
                        <ExistingAccount
                          nameTaken={this.state.nameTaken}
                        />
                        <PasswordError
                          passwordError={this.state.passwordError}
                        />
                        <SaveChalError 
                          saveChalError={this.state.saveChalError}
                        />
                        {/* <EditError
                          creationError={this.state.formError}
                        />
                        <EditSuccess
                          editSuccess={this.state.editSuccess}
                        /> */}
                        <button
                          type="submit"
                          className="btn btn-primary submit btnMaster"
                          onClick={this.handleFormSubmit}
                        >
                        Submit
                        </button>
                    </div>
                  </form>
                </div>
                }
                </UncontrolledCollapse>
              </div> 
        
        )
    };
};

export default EditChallenge;
       