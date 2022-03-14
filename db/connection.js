require('dotenv').config()
const mongoose = require("mongoose")

const mongoURI = process.env.DATABASE_URL
const db = mongoose.connection

mongoose.connect(mongoURI, {
	useNewUrlParser: true,
	useUnifiedTopology: true
})

db.on('error', (err) => console.log(err.message + ' is Mongod not running?'))
db.on('connected', () => console.log('mongo connected at your URI'))
db.on('disconnected', () => console.log('mongo disconnected'))
db.on('open', () => {
    console.log('✅ mongo connection made!')
  })

module.exports = mongoose