import axios from 'axios'

const API = {
    // ADMIN API CALLS
    saveAdmin: function(adminData) {
        return axios.post('/api/admins', adminData)
    },
    loginAdmin: function(adminData) {
        return axios.post('/api/admins/adminLogin', adminData)
    },
    createAdminSession: function(sessionData) {
        return axios.post('/api/sessions', sessionData)
    },
    checkAdminSession: function(id, localSessionID) {
        return axios.get('/api/sessions/' + id, localSessionID)
    },
    logoutAdminSession: function(sessionData) {
        return axios.delete('/api/sessions', sessionData)
    },
    getAdmins: function() {
        return axios.get('/api/admins')
    },
    getAdmin: function(id) {
        return axios.get('/api/admins/' + id)
    },
    
    

    // USERS API CALLS
    saveUser: function(userData) {
        return axios.post('/api/users', userData)
    },
    loginUser: function(userData) {
        return axios.post('/api/users/login', userData)
    },
    createUserSession: function(sessionData) {
        return axios.post('/api/sessions', sessionData)
    },
    checkUserSession: function(id, localSessionID) {
        return axios.get('/api/sessions/' + id, localSessionID)
    },
    logoutUserSession: function(sessionData) {
        return axios.delete('/api/sessions', sessionData)
    },
    getUsers: function() {
        return axios.get('/api/users/')
    },
    getUser: function(id) {
        return axios.get('/api/users/' + id)
    },
    findUsersByChallengeId: function(challengeId) {
        return axios.get('/api/users/find/' + challengeId)
    },
    deleteUser: function(id) {
        return axios.delete('/api/users/' + id)
    },
    addUserPick: function(id, pick) {
        return axios.post('/api/users/' + id, pick)
    },
    updateUserPick: function(id, gameId, result) {
        return axios.put('/api/users/' + id + '/' + gameId + '/' + result)
    },
    overrideUserPick: function(id, challengeId, gameDate, pick) {
        return axios.put('/api/users/update/' + id + '/' + challengeId + '/' + gameDate, pick)
    },

    // PASSWORD RESET API CALLS
    updatePassToken: function(username, passInfo) {
        return axios.put('/api/passwordReset/' + username, passInfo)
    },
    updatePassword: function(username, newPassword) {
        return axios.put('/api/updatePassword/' + username, newPassword)
    },
    
    
    // MESSAGE BOARD API CALLS
    saveMessageBoard: function(userData) {
        return axios.post('/api/messageBoard', userData)
    },
    getMessageBoards: function() {
        return axios.get('/api/messageBoard/')
    },
    getMessageBoard: function(user) {
        return axios.get('/api/messageBoard/' + user)
    },
    deleteMessageBoard: function(user, id) {
        return axios.delete('/api/messageBoard/' + user, id)
    },


    // NBA API CALLS 
    postNbaGames: function(data) {
        return axios.post('/api/nbagames/', data)
    },
    getNbaGames: function() {
        return axios.get('/api/nbagames/')
    },
    getNbaGamesByDate: function(date) {
        return axios.get('/api/nbagames/' + date)
    },
    postNbaTeams: function(data) {
        return axios.post('/api/nbateams/', data)
    },
    addNbaGamesByTeam: function(team, game) {
        return axios.put('/api/nbateams/' + team, game)
    },
    removeNbaGamesByTeam: function(team) {
        return axios.delete('/api/nbateams/' + team)
    },
    getNbaTeam: function(team) {
        return axios.get('/api/nbateams/' + team)
    },
    getNbaTeams: function() {
        return axios.get('/api/nbateams/')
    },
    getNbaGamesById: function(date, id) {
        return axios.get('/api/nbagames/' + date + '/' + id)
    },
    updateNbaGame: function(date, id, gameResult) {
        return axios.put('/api/nbagames/' + date + '/' + id, gameResult)
    },

    // MASTERS API
    postGolfers: function(data) {
        return axios.post('/api/masters/', data)
    },
    getGolfer: function(id) {
        return axios.get('/api/masters/' + id)
    },
    getGolfers: function() {
        return axios.get('/api/masters/')
    },
    saveMastersGolfers: function(id, user, theGolfers) {
        return axios.put('/api/challenges/' + id + '/users/' + user, theGolfers)
    },
    deleteMastersGolfers: function(id, user, date) {
        return axios.delete('/api/challenges/' + id + '/users/' + user + '/' + date)
    },
    updateMastersGolfer: function(id, roundResult) {
        return axios.put('/api/masters/' + id, roundResult)
    },
    updateMastersPick: function(id, user, date, result) {
        return axios.put('/api/challenges/' + id + '/users/' + user + '/' + date, result)
    },

    // NBA PLAYOFF API
    postNbaPlayoffGames: function(data) {
        return axios.post('/api/nbaPlayoffGames/', data)
    },
    getNbaPlayoffGames: function() {
        return axios.get('/api/nbaPlayoffGames/')
    },
    getNbaPlayoffGamesByDate: function(date) {
        return axios.get('/api/nbaPlayoffGames/' + date)
    },
    postNbaPlayoffTeams: function(data) {
        return axios.post('/api/nbaPlayoffTeams/', data)
    },
    addNbaPlayoffGamesByTeam: function(team, game) {
        return axios.put('/api/nbaPlayoffTeams/' + team, game)
    },
    getNbaPlayoffTeam: function(team) {
        return axios.get('/api/nbaPlayoffTeams/' + team)
    },
    getNbaPlayoffTeams: function() {
        return axios.get('/api/nbaPlayoffTeams/')
    },
    getNbaPlayoffGamesById: function(date, id) {
        return axios.get('/api/nbaPlayoffGames/' + date + '/' + id)
    },
    updateNbaPlayoffGame: function(date, id, gameResult) {
        return axios.put('/api/nbaPlayoffGames/' + date + '/' + id, gameResult)
    },
    addNbaPlayoffWin: function(id, user, newLoss) {
        return axios.post('/api/challenges/' + id + '/users/' + user, newLoss)
    },
    saveNbaPlayoffPick: function(id, user, thisPick) {
        return axios.put('/api/challenges/' + id + '/users/' + user, thisPick)
    },
    deleteNbaPlayoffPick: function(id, user, date) {
        return axios.delete('/api/challenges/' + id + '/users/' + user + '/' + date)
    },
    updateNbaPlayoffPick: function(id, user, date, result) {
        return axios.put('/api/challenges/' + id + '/users/' + user + '/' + date, result)
    },


    // MISC / NOT USED
    addResult: function(game) {
        return axios.post('/api/results/', game)
    },
    saveUserChallenge: function(id, thisChallenge) {
        return axios.put('/api/users/' + id, thisChallenge)
    },


    // NFL API CALLS
    postNflGames: function(data) {
        return axios.post('/api/nflgames/', data)
    },
    getNflGames: function() {
        return axios.get('/api/nflgames/')
    },
    getNflGamesByDate: function(date) {
        return axios.get('/api/nflgames/' + date)
    },
    postNflTeams: function(data) {
        return axios.post('/api/nflteams/', data)
    },
    addNflGamesByTeam: function(team, game) {
        return axios.put('/api/nflteams/' + team, game)
    },
    getNflTeam: function(team) {
        return axios.get('/api/nflteams/' + team)
    },
    getNflTeams: function() {
        return axios.get('/api/nflteams/')
    },
    getNflGamesById: function(date, id) {
        return axios.get('/api/nflgames/' + date + '/' + id)
    },
    updateNflGame: function(date, id, gameResult) {
        return axios.put('/api/nflgames/' + date + '/' + id, gameResult)
    },
    addNflWin: function(id, user, newWin) {
        return axios.post('/api/challenges/' + id + '/users/' + user, newWin)
    },
    saveNflPick: function(id, user, thisPick) {
        return axios.put('/api/challenges/' + id + '/users/' + user, thisPick)
    },
    deleteNflPick: function(id, user, date) {
        return axios.delete('/api/challenges/' + id + '/users/' + user + '/' + date)
    },
    updateNflPick: function(id, user, date, result) {
        return axios.put('/api/challenges/' + id + '/users/' + user + '/' + date, result)
    },

    

    // MLB API CALLS
    postMlbGames: function(data) {
        return axios.post('/api/mlbgames/', data)
    },
    getMlbGames: function() {
        return axios.get('/api/mlbgames/')
    },
    getMlbGamesByDate: function(date) {
        return axios.get('/api/mlbgames/' + date)
    },
    postMlbTeams: function(data) {
        return axios.post('/api/mlbteams/', data)
    },
    addMlbGamesByTeam: function(team, game) {
        return axios.put('/api/mlbteams/' + team, game)
    },
    getMlbTeam: function(team) {
        return axios.get('/api/mlbteams/' + team)
    },
    getMlbTeams: function() {
        return axios.get('/api/mlbteams/')
    },
    getMlbGamesById: function(date, id) {
        return axios.get('/api/mlbgames/' + date + '/' + id)
    },
    updateMlbGame: function(date, id, gameResult) {
        return axios.put('/api/mlbgames/' + date + '/' + id, gameResult)
    },
    addMlbWin: function(id, user, newWin) {
        return axios.post('/api/challenges/' + id + '/users/' + user, newWin)
    },
    saveMlbPick: function(id, user, thisPick) {
        return axios.put('/api/challenges/' + id + '/users/' + user, thisPick)
    },
    deleteMlbPick: function(id, user, date) {
        return axios.delete('/api/challenges/' + id + '/users/' + user + '/' + date)
    },
    updateMlbPick: function(id, user, date, result) {
        return axios.put('/api/challenges/' + id + '/users/' + user + '/' + date, result)
    },

    
    
    
    getPickByDate: function(id, date) {
        return axios.get('/api/users/' + id + '/' + date)
    },
    
    changeStatus: function(id, team) {
        return axios.put('/api/users/' + id + '/mlbteams/' + team)
    },

    // CHALLENGE API CALLS
    getChallenges: function() {
        return axios.get('/api/challenges')
    },
    getChallenge: function(id) {
        return axios.get('/api/challenges/' + id)
    },
    saveChallenge: function(challengeData) {
        return axios.post('/api/challenges', challengeData)
    },
    deleteChallenge: function(id) {
        return axios.put('/api/challenges/' + id)
    },
    addUserToChallenge: function(id, userData) {   
        return axios.post('/api/challenges/' + id, userData)
    },

    // CHALLENGE API CALLS
    addNbaWin: function(id, user, newWin) {
        return axios.post('/api/challenges/' + id + '/users/' + user, newWin)
    },
    saveNbaPick: function(id, user, thisPick) {
        return axios.put('/api/challenges/' + id + '/users/' + user, thisPick)
    },
    deleteNbaPick: function(id, user, date) {
        return axios.delete('/api/challenges/' + id + '/users/' + user + '/' + date)
    },
    updateNbaPick: function(id, user, date, result) {
        return axios.put('/api/challenges/' + id + '/users/' + user + '/' + date, result)
    },
    // updateUserPick: function(id, user, gameId, result) {
    //     return axios.put('/api/challenges/' + id + '/users/' + user + '/' + gameId + '/' + result)
    // }

};

export default API;