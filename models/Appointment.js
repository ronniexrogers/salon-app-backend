const mongoose = require('../db/connection')

// make a new schema with 2 properties, and assign it to a variable
const AppointmentSchema = new mongoose.Schema({
	name: String,
    date: String,
    time: String,
	number: String,
    description: String,
    imagePath: String,
    email: String,
    googleId: String
})

// instantiate the model, calling it "Image" and with the schema we just made
const Appointment = mongoose.model('clientAppointment', AppointmentSchema)

// export the newly created model
module.exports = Appointment