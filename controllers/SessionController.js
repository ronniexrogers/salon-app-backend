const { getGoogle0AuthTokens } = require('../userService')

async function google0authHandler(req, res) {
    // Get code from qs
    const code = req.query.code

    try{


    // get id and access token from the code
    const {id_token, access_token} = await getGoogle0AuthTokens({code})

    //get user with tokens

    //upsert user

    //create a session

    //create access and refresh tokens

    //set cookies

    //redirect back to client
    }catch(err){
        console.log(err, 'failed to authorize google user')
        return res.redirect('http://localhost:5000/')
    }

}

module.exports = {google0authHandler}