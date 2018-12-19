import axios from 'axios'

export default {
    getUser: function(username) {
        return axios.get('/api/users/' + username)
    },
    getUsers: function() {
        return axios.get('api/pations/')
    },
    deleteUser: function(username) {
        return axios.delete('/api/users/' + username)
    },
    savePick: function(username, thisPick) {
        return axios.put('/api/pations/' + username, thisPick)
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