const express = require('express')
const userCtrl = require('../controllers/user-ctrl')
const auth = require('../middleware/auth')
const router = express.Router()

router.post('/api/users', userCtrl.createUser)
router.get('/api/users/me/:username', userCtrl.getUserByName)

router.post('/api/users/login', userCtrl.loginUser)
router.post('/api/users/logout', auth, userCtrl.logoutUser)

module.exports = router