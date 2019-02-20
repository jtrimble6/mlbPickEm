import axios from 'axios'

export default {
    getUsers: function() {
        return axios.get('/api/users/')
    },
    getUser: function(id) {
        return axios.get('/api/users/' + id)
    },
    deleteUser: function(id) {
        return axios.delete('/api/users/' + id)
    },
    postGames: function(data) {
        return axios.post('/api/games/', data)
    },
    getGames: function() {
        return axios.get('/api/games/')
    },
    getGamesByDate: function(date) {
        return axios.get('/api/games/' + date)
    },
    postTeams: function(data) {
        return axios.post('/api/teams/', data)
    },
    addGamesByTeam: function(team, game) {
        return axios.put('/api/teams/' + team, game)
    },
    getTeam: function(team) {
        return axios.get('/api/teams/' + team)
    },
    getTeams: function() {
        return axios.get('/api/teams/')
    },
    getGamesById: function(date, id) {
        return axios.get('/api/games/' + date + '/' + id)
    },
    updateGame: function(date, id, gameResult) {
        return axios.put('/api/games/' + date + '/' + id, gameResult)
    },
    addResult: function(game) {
        return axios.post('/api/results/', game)
    },
    savePick: function(id, thisPick) {
        return axios.put('/api/users/' + id, thisPick)
    },
    updatePick: function(id, result) {
        return axios.put('/api/users/' + id, result)
    },
    deletePick: function(id, date) {
        return axios.delete('/api/users/' + id + '/' + date)
    },
    getPicks: function(id) {
        return axios.get('/api/users/' + id)
    },
    addWin: function(id, newWin) {
        return axios.post('/api/users/' + id, newWin)
    },
    changeStatus: function(id, team) {
        return axios.put('/api/users/' + id + '/teams/' + team)
    },
    saveUser: function(userData) {
        return axios.post('/api/users', userData)
    },
    loginUser: function(userData) {
        return axios.post('/api/users/login', userData)
    },
    createSession: function(sessionData) {
        return axios.post('/api/sessions', sessionData)
    },
    logout: function(sessionData) {
        return axios.delete('/api/sessions', sessionData)
    },
    checkSession: function(id, localSessionID) {
        return axios.get('/api/sessions/' + id, localSessionID)
    }
        
}