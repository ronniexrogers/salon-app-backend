//Basic Config
const express = require('express')
require('./db/connection')
const app = express()

const fs = require('fs')
const util = require('util')
const unlinkFile = util.promisify(fs.unlink)
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
const { uploadFile, downloadFile } = require('./s3')

app.set('port', 8000)
const cors = require('cors')
app.use(cors())

//Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


//Routes

app.get('/', function(req, res){
  res.render('../frontend/src/App.js');
});

app.get('/images/:key', (req, res) => {
    console.log(req.params)
    const key = req.params.key
    const readStream = getFileStream(key)
  
    readStream.pipe(res)
  })
  
  app.post('/images', upload.single('image'), async (req, res) => {
    const file = req.file
    console.log(file)
  
    // apply filter
    // resize 
  
    const result = await uploadFile(file)
    await unlinkFile(file.path)
    console.log(result)
    const description = req.body.description
    res.send({imagePath: `/images/${result.Key}`})
  })
  

//Controllers
const usersController = require('./controllers/usersController')
app.use('/api/users/', usersController)

app.use((err, req, res, next) => {
    const statusCode = res.statusCode || 500
    const message = err.message || 'Internal Server Error'
    res.status(statusCode).send(message)
})

app.get('/', (req, res) => {
    res.send('Im the backend');
  });

  
//Start Server
app.listen(app.get('port'), () => {
    console.log(`✅ PORT: ${app.get('port')} 🌟`)
})