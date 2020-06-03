const passport = require("passport")


exports.loginGoogle = passport.authenticate("google")

exports.googleAuth = function (req, res, next) {
    passport.authenticate("google", function (err, user) {
       if(err) return res.redirect("https://e-commerce-caketime.netlify.app/login")
    //    console.log(user)
       return res.redirect(`https://e-commerce-caketime.netlify.app/?token=${user.tokens[user.tokens.length-1]}`)
    })(req, res, next);
}