const express = require('express')
const router = express.Router()

const fs = require('fs')
const util = require('util')
const unlinkFile = util.promisify(fs.unlink)
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
const Image = require('../models/Image')
const cors = require('cors')

const { uploadFile, downloadFile } = require('../s3')

router.get('/:key', (req, res) => {
    const key = req.params.key
    const readStream = downloadFile(key)
    readStream.pipe(res)
  })

router.post('/', upload.single('image'), cors(), async (req, res) => {
  try {
  const file = req.file
  console.log(file)
  const result = await uploadFile(file)
  unlinkFile(file.path)
  console.log(result)
  const photoData = {
    imagePath: result.Location,
    description: req.body.description,
    type: req.body.type
  }
  await new Image(photoData).save() }
  catch(error) {
    console.log(error)
  }
})

router.get('/', async (req, res, next) => {
  try{
      const allPhotos = await Image.find()
      res.json(allPhotos)
  } catch(err){
      next(err)
  }
})


module.exports = router