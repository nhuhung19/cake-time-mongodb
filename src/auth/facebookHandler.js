const passport = require("passport")



exports.loginFacebook = passport.authenticate("facebook", {scope: ['email']})

exports.facebookAuth = function (req, res, next) {
    passport.authenticate("facebook", function (err, user) {
        if(err) return res.redirect("https://e-commerce-caketime.netlify.app/login")
    //    console.log("facebook=========", user)
       return res.redirect(`https://e-commerce-caketime.netlify.app/?token=${user.tokens[user.tokens.length-1]}`)
    })(req, res, next);
}