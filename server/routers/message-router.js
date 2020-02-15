const express = require('express')
const auth = require('../middleware/auth')
const messageCtrl = require('../controllers/message-ctrl')
const router = new express.Router()

router.post('/api/messages', auth, messageCtrl.createMessage)
router.get('/api/messages', auth, messageCtrl.getMessages) 
router.patch('/api/message/:id', auth, messageCtrl.updateMessage)
 
module.exports = router