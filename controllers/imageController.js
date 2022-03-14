exports.createAppointment = (req, res, next) => {
    console.log(req.body)
    
}

exports.uploadSalonImage = (req, res, next) => {
    console.log(req.body)
    res.status(200).json({ data: req.body })
}