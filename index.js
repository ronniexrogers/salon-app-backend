const express = require('express')
require('./db/connection')
const app = express()
const cors = require('cors')
require('dotenv').config()
const router = require('./routes/Router')
const userRouter = require('./routes/UserRouter')
const imageRouter = require('./routes/ImageRouter')

app.set('port', process.env.PORT)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.use((err, req, res, next) => {
    const statusCode = res.statusCode || 500
    const message = err.message || 'Internal Server Error'
    res.status(statusCode).send(message)
})

app.use('/api/appointments', cors(), router)

app.use('/api/users', cors(), userRouter)

app.use('/api/salonPhotos', cors(), imageRouter)

app.listen(app.get('port'), () => {
	console.log(`✅ PORT: ${app.get('port')} 🌟`)
})