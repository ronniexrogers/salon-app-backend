const express = require('express')
const router = express.Router()
const User = require('../models/User')
const cors = require('cors')

const corsOptions = {
  origin: 'https://denisse-morales.netlify.app',
  optionsSuccessStatus: 200
}

router.post('/createUser', cors(corsOptions), async (req, res) => {
    try {
      const userData = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      googleId: req.body.googleId,
      profilePicturePath: req.body.profilePicturePath,
    }
    await new User(userData).save()
  }   catch(error) {
    console.error(error)
  }
  })

router.get('/:id', async (req, res, next) => {
    try{
        const user = await User.find({ googleId: req.params.id })
        res.json(user)
    } catch(err){
        next(err)
    }
})


module.exports = router

