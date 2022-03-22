//Basic Config
const express = require('express')
require('./db/connection')
const cors = require('cors')
const app = express()
require('dotenv').config()
const router = require('./routes/Router')
const userRouter = require('./routes/UserRouter')
const imageRouter = require('./routes/ImageRouter')
const corsOptions = {
    origin: 'https://denisse-morales.netlify.app',
    optionsSuccessStatus: 200
  }

app.set('port', process.env.PORT)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use((err, req, res, next) => {
    const statusCode = res.statusCode || 500
    const message = err.message || 'Internal Server Error'
    res.status(statusCode).send(message)
})
app.use(cors({ credentials: true }))

app.use('/api/appointments', router)

app.use('/api/users', userRouter)

app.use('/api/salonPhotos', imageRouter)


app.get('/', (req, res) => {
    res.send('Im the backend')
  })

  
//Start Server
app.listen(app.get('port'), () => {
	console.log(`✅ PORT: ${app.get('port')} 🌟`)
})