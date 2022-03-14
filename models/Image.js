const mongoose = require('../db/connection')

// make a new schema with 2 properties, and assign it to a variable
const ImageSchema = new mongoose.Schema({
	imagePath: String,
	description: String,
	type: String
})

// instantiate the model, calling it "Image" and with the schema we just made
const SalonImage = mongoose.model('salonImages', ImageSchema)

// export the newly created model
module.exports = SalonImage