import axios from 'axios'

export default {
    getUser: function(id) {
        return axios.get('/api/users/' + id)
    },
    getUsers: function() {
        return axios.get('/api/users/')
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
    getGamesById: function(date, id) {
        return axios.get('/api/games/' + date + '/' + id)
    },
    updateGame: function(date, id, gameResult) {
        return axios.put('/api/games/' + date + '/' + id, gameResult)
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
        return axios.put('/api/users/' + id, newWin)
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
    checkSession: function(id, localSessionID) {
        return axios.get('/api/sessions/' + id, localSessionID)
    }
        
}