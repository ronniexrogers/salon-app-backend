//Basic Config
const express = require('express')
const axios = require('axios')
require('./db/connection')
const app = express()
require('dotenv').config()

const fs = require('fs')
const util = require('util')
const unlinkFile = util.promisify(fs.unlink)
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
const router = require('./routes/Router')
const userRouter = require('./routes/UserRouter')
const imageRouter = require('./routes/ImageRouter')

// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

const cors = require('cors')
app.use(cors())

app.set('port', process.env.PORT )
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