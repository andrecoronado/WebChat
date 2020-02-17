import axios from 'axios'

const api = axios.create({
    // baseURL: 'http://localhost:3000/api'
    baseURL: 'https://andrecoronado.com:8020/api'
})

function apiToken(token) {
    api.defaults.headers.common['Authorization'] = 'Bearer ' + token;
}

export const  createUser = payload => api.post('/users', payload)
export const  getUserByName = username => api.get('/users/me/' + username)
export const  loginUser = user => api.post('/users/login', user)
function logout() { return api.post('/users/logout') }

export const  createMessage = payload => api.post('/messages', payload)
export const  updateMessage = payload => api.patch('/message/' + payload._id, { liked: payload.liked })
function getMessages() { return api.get('/messages') }

const apis = {
    apiToken,
    createUser,
    getUserByName,
    loginUser,
    logout,
    createMessage,
    updateMessage,
    getMessages
}

export default apis