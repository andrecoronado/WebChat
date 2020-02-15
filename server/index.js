const express = require('express')
const db = require('./db')
const cors = require('cors')
const userRouter = require('./routers/user-router')
const messageRouter = require('./routers/message-router')
const app = express()
const port = 3000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(userRouter)
app.use(messageRouter)

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.get('/api', function (req, res) {
    res.send('<h1>Welcome to WebChat | by andreCoronado</h1>')
  })

app.listen(port, () => {
    console.log('Server is up on port ' + port)
  })

