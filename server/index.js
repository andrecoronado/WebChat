const express = require('express')
const db = require('./db')
const cors = require('cors')
const userRouter = require('./routers/user-router')
const messageRouter = require('./routers/message-router')
const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(userRouter)
app.use(messageRouter)

db.on('error', console.error.bind(console, 'MongoDB connection error:'))
  
if(process.env.ENVIRON==='PROD'){
  const httpsServer = https.createServer({
    key: fs.readFileSync('/home/admin/conf/web/ssl.andrecoronado.com.key'),
    cert: fs.readFileSync('/home/admin/conf/web/ssl.andrecoronado.com.crt'),
  }, app)

  app.get('/api', function (req, res) {
    res.send('<h1>Welcome to WebChat | by andreCoronado</h1>')
  }) 
  
  app.get('*', function (req, res) {
  res.redirect('https://andrecoronado.com/webchat/')
  })

  httpsServer.listen(port, () => {
  console.log('HTTPS Server running on port ' + port)
  });  
}
else{
  app.get('/api', function (req, res) {
    res.send('<h1>Welcome to WebChat | by andreCoronado</h1>')
  })
  app.listen(port, () => {
    console.log('Server is up on port ' + port)
  })
}

