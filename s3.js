require('dotenv').config()
const fs = require('fs')
const S3 = require('aws-sdk/clients/s3')

const bucketName = process.env.AWS_BUCKET_NAME
const bucketRegion = process.env.AWS_BUCKET_REGION
const secretAccessKey = process.env.AWS_SECRET_KEY
const accessKeyId = process.env.AWS_ACCESS_KEY_ID

const s3 = new S3({
    bucketRegion,
    accessKeyId,
    secretAccessKey
})

// function that uploads a file to s3
const uploadFile = (file) => {
    const fileStream = fs.createReadStream(file.path)
    const uploadParams = {
        Bucket: bucketName,
        Body: fileStream,
        Key: file.filename
    }
    return s3.upload(uploadParams).promise()
}
exports.uploadFile = uploadFile

// function that downloads a file from s3
const downloadFile = (fileKey) => {
    const downloadParams = {
        Key: fileKey,
        Bucket: bucketName
    }
    return s3.getObject(downloadParams).createReadStream()
}
exports.downloadFile = downloadFile