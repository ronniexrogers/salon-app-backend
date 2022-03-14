require('dotenv').config()
import mongoose, { connection, connect } from "mongoose"

const mongoURI = process.env.DATABASE_URL
const db = connection

connect(mongoURI, {
	useNewUrlParser: true,
	useUnifiedTopology: true
})

db.on('error', (err) => console.log(err.message + ' is Mongod not running?'))
db.on('connected', () => console.log('mongo connected at your URI'))
db.on('disconnected', () => console.log('mongo disconnected'))
db.on('open', () => {
    console.log('✅ mongo connection made!')
  })

export default mongoose