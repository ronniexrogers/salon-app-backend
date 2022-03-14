const express = require('express')
const router = express.Router()

const fs = require('fs')
const util = require('util')
const unlinkFile = util.promisify(fs.unlink)
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
const imageController = require('../controllers/imageController')
const Appointment = require('../models/Appointment')
const cors = require('cors')

var corsOptions = {
  origin: 'https://denisse-app-backend.herokuapp.com',
  optionsSuccessStatus: 200
}


const { google0authHandler } = require('../controllers/SessionController')
const { uploadFile, downloadFile } = require('../s3')
const { default: axios } = require('axios')


router.get('/:key', cors(corsOptions), (req, res) => {
    const key = req.params.key
    const readStream = downloadFile(key)
    readStream.pipe(res)
  })
  
router.post('/createAppointment', cors(corsOptions), upload.single('image'), async (req, res) => {
    const file = req.file
    console.log(file)
    const result = await uploadFile(file)
    unlinkFile(file.path)
    const description = req.body.description
    const appointmentData = {
      imagePath: result.Location,
      description: req.body.description,
      name: req.body.clientName,
      number: req.body.number,
      date: req.body.date
    }
    await new Appointment(appointmentData).save()
  })

router.get('/', cors(corsOptions), async (req, res, next) => {
  try{
      const allAppointments = await Appointment.find()
      res.json(allAppointments)
  } catch(err){
      next(err)
  }
})

router.delete('/:id', cors(corsOptions), async (req, res, next) => {
  try {
    const appointmentToDelete = await Appointment.findByIdAndDelete(req.params.id)
    console.log(appointmentToDelete)
    if (appointmentToDelete) {
      res.sendStatus(204)
    } else {
      res.sendStatus(404)
    }
  } catch (err) {
    next(err)
  }
})


module.exports = router