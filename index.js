const express = require('express')
require('./db/connection')
const app = express()
const cors = require('cors')
require('dotenv').config()
const router = require('./routes/Router')
const userRouter = require('./routes/UserRouter')
const imageRouter = require('./routes/ImageRouter')
const corsOptions = {
    origin: 'https://denisse-morales.netlify.app',
    optionsSuccessStatus: 200,
    credentials: true 
  }

app.set('port', process.env.PORT)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors(corsOptions))

app.use((err, req, res, next) => {
    const statusCode = res.statusCode || 500
    const message = err.message || 'Internal Server Error'
    res.status(statusCode).send(message)
})

app.use('/api/appointments', router)

app.use('/api/users', userRouter)

app.use('/api/salonPhotos', imageRouter)

app.listen(app.get('port'), () => {
	console.log(`✅ PORT: ${app.get('port')} 🌟`)
})