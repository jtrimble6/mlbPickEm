import axios from 'axios'

export default {
    getUser: function(id) {
        return axios.get('/api/users/' + id)
    },
    getUsers: function() {
        return axios.get('api/users/')
    },
    deleteUser: function(id) {
        return axios.delete('/api/users/' + id)
    },
    postGames: function() {
        return axios.post('api/games/')
    },
    getGames: function() {
        return axios.get('api/games/')
    },
    savePick: function(id, thisPick) {
        return axios.put('/api/users/' + id, thisPick)
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
    checkSession: function(localSessionID) {
        return axios.get('/api/sessions', localSessionID)
    }
        
}