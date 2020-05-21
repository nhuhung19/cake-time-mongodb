require("dotenv").config({path: ".env"})
const passport = require("passport-google-oauth2")
const googleStrategy = passport.Strategy
const User = require("../models/user")

module.exports = (new googleStrategy({
    // 1st arg is configuration
    
    clientID: process.env.GG_ID,
    clientSecret: process.env.GG_SECRET,
    callbackURL: process.env.DOMAIN + process.env.GG_CB,
    scope: ["email", "profile"]
},
// verification function (callback)
    async function (accessToken, refreshToken, profile, cb) {
        // console.log(profile._json)
        const {name, email} = profile._json
        const user = await User.findOneOrCreate(name, email)
        cb(null, user)
    }
))
