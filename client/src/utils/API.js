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
    savePick: function(id, thisPick) {
        return axios.put('/api/users/' + id, thisPick)
    },
    deletePick: function(id, date) {
        return axios.delete('/api/users/' + id + '/' + date)
    },
    getPicks: function(id) {
        return axios.get('/api/users/' + id)
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