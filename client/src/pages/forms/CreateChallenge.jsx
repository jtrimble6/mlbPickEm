import React, { Component } from 'react'
import API from '../../utils/API'
import AdminBar from '../../components/nav/AdminBar'
import '../../css/createChallenge.css'
import ExistingChallenge from "../../components/alerts/ExistingChallenge";
import PasswordError from '../../components/alerts/PasswordError';
import CreationSuccess from '../../components/alerts/CreationSuccess';
import CreationError from '../../components/alerts/CreationError';
import moment from 'moment'
import { atl, bkn, bos, cha, chi, cle, dal, den, det, gsw, hou, ind, lac, lal, mem, mia, mil, min, nop, nyk, okc, orl, phi, phx, por, sac, sas, tor, uta, was } from '../../css/nbaLogos'
// import { cws } from '../../css/mlbLogos'
// import { ari, atl2, bal, bos2, chc, cws, cle2, cin, col, det2, mia2, hou2, kc, laa, lad, nym, nyy, mil2, min2, oak, pit, sd, sf, phi2, sea, stl, tb, tex, tor2, wsh } from '../../css/mlbLogos'

class CreateChallenge extends Component {
    constructor(props) {
        super(props)
        this.state = {
            creationSuccess: false,
            nameTaken: false,
            nameError: false,
            passwordError: false,
            formError: false,
            allChallenges: [],
            challengeName: '',
            challengeStatus: '',
            openSignUp: '',
            startDate: '',
            maxEntries: 0,
            buyIn: 0,
            url: '',
            rulesUrl: '',
            creator: localStorage.getItem('user'),
            sport: '',
            teams: '',
            challengeInfo: '',
            img: '',
            password: '',
            confirmPassword: '',
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
              { name: 'Toronto Raptors', abbr: 'tor', logo: tor, status: 'secondary', conf: 'east', seed: '1' },
              { name: 'Boston Celtics', abbr: 'bos', logo: bos, status: 'secondary', conf: 'east', seed: '2' },
              { name: 'Philadelphia 76ers', abbr: 'phi', logo: phi, status: 'secondary', conf: 'east', seed: '3' },
              { name: 'Cleveland Cavaliers', abbr: 'cle', logo: cle, status: 'secondary', conf: 'east', seed: '4' },
              { name: 'Indiana Pacers', abbr: 'ind', logo: ind, status: 'secondary', conf: 'east', seed: '5' },
              { name: 'Miami Heat', abbr: 'mia', logo: mia, status: 'secondary', conf: 'east', seed: '6' },
              { name: 'Milwalkee Bucks', abbr: 'mil', logo: mil, status: 'secondary', conf: 'east', seed: '7' },
              { name: 'Washington Wizards', abbr: 'was', logo: was, status: 'secondary', conf: 'east', seed: '8' },
              { name: 'Houston Rockets', abbr: 'hou', logo: hou, status: 'secondary', conf: 'west', seed: '1' },
              { name: 'Golden State Warriors', abbr: 'gsw', logo: gsw, status: 'secondary', conf: 'west', seed: '2' },
              { name: 'Portland Trail Blazers', abbr: 'por', logo: por, status: 'secondary', conf: 'west', seed: '3' },
              { name: 'Oklahoma City Thunder', abbr: 'okc', logo: okc, status: 'secondary', conf: 'west', seed: '4' },
              { name: 'Utah Jazz', abbr: 'uta', logo: uta, status: 'secondary', conf: 'west', seed: '5' },
              { name: 'New Orleans Pelicans', abbr: 'nop', logo: nop, status: 'secondary', conf: 'west', seed: '6' },
              { name: 'San Antonio Spurs', abbr: 'sas', logo: sas, status: 'secondary', conf: 'west', seed: '7' },
              { name: 'Minnesota Timberwolves', abbr: 'min', logo: min, status: 'secondary', conf: 'west', seed: '8' },

            ],
            mlbTeams: [
              { name: 'Arizona Diamondbacks', abbr: 'ari', logo: 'ari', status: 'secondary' },
              { name: 'Atlanta Braves', abbr: 'atl', logo: 'atl2', status: 'secondary' },
              { name: 'Baltimore Orioles', abbr: 'bal', logo: 'bal', status: 'secondary' },
              { name: 'Boston Red Sox', abbr: 'bos', logo: 'bos2', status: 'secondary' },
              { name: 'Chicago White Sox', abbr: 'cws', logo: 'cws', status: 'secondary' },
              { name: 'Chicago Cubs', abbr: 'chc', logo: 'chc', status: 'secondary' },
              { name: 'Cincinnati Reds', abbr: 'cin', logo: 'cin', status: 'secondary' },
              { name: 'Cleveland Indians', abbr: 'cle', logo: 'cle2', status: 'secondary' },
              { name: 'Colorado Rockies', abbr: 'col', logo: 'col', status: 'secondary' },
              { name: 'Detroit Tigers', abbr: 'det', logo: 'det2', status: 'secondary' },
              { name: 'Houston Astros', abbr: 'hou', logo: 'hou2', status: 'secondary' },
              { name: 'Kansas City Royals', abbr: 'kc', logo: 'kc', status: 'secondary' },
              { name: 'Los Angeles Angels', abbr: 'laa', logo: 'laa', status: 'secondary' },
              { name: 'Los Angeles Dodgers', abbr: 'lad', logo: 'lad', status: 'secondary' },
              { name: 'Miami Marlins', abbr: 'mia', logo: 'mia2', status: 'secondary' },
              { name: 'Milwaukee Brewers', abbr: 'mil', logo: 'mil2', status: 'secondary' },
              { name: 'Minnesota Twins', abbr: 'min', logo: 'min2', status: 'secondary' },
              { name: 'New York Yankees', abbr: 'nyy', logo: 'nyy', status: 'secondary' },
              { name: 'New York Mets', abbr: 'nym', logo: 'nym', status: 'secondary' },
              { name: 'Oakland Athletics', abbr: 'oak', logo: 'oak', status: 'secondary' },
              { name: 'Philadelphia Phillies', abbr: 'phi', logo: 'phi2', status: 'secondary' },
              { name: 'Pittsburgh Pirates', abbr: 'pit', logo: 'pit', status: 'secondary' },
              { name: 'San Diego Padres', abbr: 'sd', logo: 'sd', status: 'secondary' },
              { name: 'San Francisco Giants', abbr: 'sf', logo: 'sf', status: 'secondary' },
              { name: 'Seattle Mariners', abbr: 'sea', logo: 'sea', status: 'secondary' },
              { name: 'St. Louis Cardinals', abbr: 'stl', logo: 'stl', status: 'secondary' },
              { name: 'Tampa Bay Rays', abbr: 'tb', logo: 'tb', status: 'secondary' },
              { name: 'Texas Rangers', abbr: 'tex', logo: 'tex', status: 'secondary' },
              { name: 'Toronto Blue Jays', abbr: 'tor', logo: 'tor2', status: 'secondary' },
              { name: 'Washington Nationals', abbr: 'wsh', logo: 'wsh', status: 'secondary' }
            ]
          }

          this.checkPassword = this.checkPassword.bind(this)
          this.checkChallengeName = this.checkChallengeName.bind(this)
          this.handleInputChange = this.handleInputChange.bind(this)
          this.handleFormSubmit = this.handleFormSubmit.bind(this)
          this.handleFormError = this.handleFormError.bind(this)
          this.getAllTeams = this.getAllTeams.bind(this)
    }

    componentDidMount() {
        // this.getAllTeams()
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


    }

    checkChallengeName = event => {
      let self = this
      const challengeName = event.target.value;
      console.log(challengeName);
      this.setState({
        challengeName: challengeName
      });
      API.getChallenges()
      .then(res => {
          let allChallenges = res.data
          console.log('ALL CHALLENGES: ', allChallenges)
          let findChalFunc = (challenges) => {
            return challenges.challengeName.toLowerCase() === challengeName.toLowerCase()
          }
          let foundChal = allChallenges.filter(findChalFunc)
          if (!foundChal[0]) {
              // console.log("CHALLENGE NAME AVAILABLE");
              self.setState({
                nameError: 'CHALLENGE NAME AVAILABLE',
                nameTaken: false
              })
          } else {
              // console.log("CHALLENGE NAME UNAVAILABLE");
              self.setState({
                nameError: 'CHALLENGE NAME UNAVAILABLE',
                nameTaken: true
              })
          }
      })
      .catch(error => {
          console.log(error)
      })
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
      }

    handleFormError = () => {
        if (this.state.formError) {
            console.log('FORM ERROR!')
        }
      }

    handleFormSubmit = event => {
        let self = this
        // this.setState({
        //     nameTaken: false,
        // })
        let teams = ( this.state.teams === 'nba' ? this.state.nbaTeams : this.state.teams === 'mlb' ? this.state.mlbTeams : this.state.nbaPlayoffTeams ) 
        event.preventDefault();
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
            creator: this.state.creator,
            sport: this.state.sport,
            teams: teams,
            info: this.state.challengeInfo,
            img: this.state.img,
        };
        console.log('NEW CHALLENGE DATA: ', challengeData);
        // debugger
        API.saveChallenge(challengeData)
          .then(res => {
              console.log('RESULT: ', res)
              self.setState({
                creationSuccess: true,
                challengeName: '',
                challengeStatus: '',
                openSignUp: '',
                startDate: '',
                maxEntries: 0,
                buyIn: 0,
                url: '',
                sport: '',
                teams: '',
                challengeInfo: '',
                img: '',
                password: '',
                confirmPassword: '',
              })
          })
          .catch(err => {
              console.log(err)
              self.setState({
                  formError: true
              })
              self.handleFormError()
            })
      }

    render() {
        return (
            <div id="createChal">
            <AdminBar />
              {/* {this.renderRedirect()} */}
                <div className="formContainer">    
                  <form className="formSignup" action="index.html">
                    <h2 className="formSignup-heading">Create Challenge</h2>
                      <div className="signupWrap">
                        <div className="form-group">
                            <label htmlFor="challengeName">Challenge Name</label>
                                <input 
                                value={this.state.challengeName}
                                name="challengeName"
                                onChange={this.checkChallengeName}
                                type="text"
                                className="form-control"
                                id="challengeName"
                                placeholder="Name of Challenge"
                            />
                            <small id="challengeNameError" className="form-text text-muted">{this.state.nameError}</small>
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
                                <option value={1}>$1</option>
                                <option value={2}>$2</option>
                                <option value={3}>$3</option>
                                <option value={4}>$4</option>
                                <option value={5}>$5</option>
                                <option value={10}>$10</option>
                                <option value={15}>$15</option>
                                <option value={20}>$20</option>
                                <option value={25}>$25</option>
                                <option value={30}>$30</option>
                                <option value={35}>$35</option>
                                <option value={40}>$40</option>
                                <option value={45}>$45</option>
                                <option value={50}>$50</option>
                                <option value={75}>$75</option>
                                <option value={100}>$100</option>
                                <option value={150}>$150</option>
                                <option value={200}>$200</option>
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
                                <option value='mlb'>MLB</option>
                                <option value='nba'>NBA</option>
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
                                <option value='mlb'>MLB Teams</option>
                                <option value='nba'>NBA Teams</option>
                                <option value='nbaPlayoff'>NBA 2018-19 PLAYOFF TEAMS</option>
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
                                  <option value='/actionMlb'>MLB Challenge</option>
                                  <option value='/actionNba'>NBA Challenge</option>
                                  <option value='/nbaPlayoffs'>NBA Playoff Challenge</option>
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
                                  <option value='/mlbRules'>MLB Rules</option>
                                  <option value='/nbaRules'>NBA Rules</option>
                                  <option value='/nbaPlayoffRules'>NBA Playoff Rules</option>
                              </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Creator</label>
                                <input
                                    readOnly
                                    value={this.state.creator}
                                    name="creator"
                                    type="text"
                                    className="form-control"
                                    id="creator"
                                    aria-describedby="emailHelp"
                                    placeholder={this.state.creator}
                                />
                        </div>
                        <div className="form-group">
                            <label htmlFor="challengeInfo">Challenge Info</label>
                                <textarea 
                                value={this.state.challengeInfo}
                                name="challengeInfo"
                                onChange={this.handleInputChange}
                                type="text"
                                className="form-control"
                                id="challengeInfo"
                                placeholder="Add some info about the challenge!"
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
                                <option value='mlbpickemchallenge.jpeg'>MLB</option>
                                <option value='nbaplayoffchallenge.jpg'>NBA</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">Create Password (optional)</label>
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
                        <ExistingChallenge
                          nameTaken={this.state.nameTaken}
                        />
                        <PasswordError
                          passwordError={this.state.passwordError}
                        />
                        <CreationError
                          creationError={this.state.formError}
                        />
                        <CreationSuccess
                          creationSuccess={this.state.creationSuccess}
                        />
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
            </div>
        
        )
    };
};

export default CreateChallenge;
       