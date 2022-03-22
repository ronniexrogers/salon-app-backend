const config = require('config')
const axios = require('axios')
const qs = require('qs')
const res = require('express/lib/response')

    const getGoogle0AuthTokens = async (code) => {
    const url = 'https://oauth2.googleapis.com/token'

    const values = {
        code,
        clientId: config.get('googleClientId'),
        client_secret: config.get('googleClientSecret'),
        redirect_uri: config.get('google0authRedirectUri'),
        grant_type: 'authorization_code'
    }
    try {
        const res = await axios.post(url, qs.stringify(values), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        })
        return res.data
    }catch(err) {
        console.error(err, 'failed to fetch google 0auth tokens')
    }
}

module.exports = {getGoogle0AuthTokens}