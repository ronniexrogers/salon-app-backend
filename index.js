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
app.use(cors({ credentials: true }))

app.use(function (req, res, next) {
    // Website you wish to allow to connect
    // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    res.setHeader('Access-Control-Allow-Origin', 'https://denisse-morales.netlify.app');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.set('port', process.env.PORT)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use((err, req, res, next) => {
    const statusCode = res.statusCode || 500
    const message = err.message || 'Internal Server Error'
    res.status(statusCode).send(message)
})

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