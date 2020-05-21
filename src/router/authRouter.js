const router = require("express").Router()
const {login, logout, logoutAll, auth} = require("../controllers/authControllers")
const {loginFacebook, facebookAuth} = require("../auth/facebookHandler")
const {loginGoogle, googleAuth} = require("../auth/googleHandler")


router.get("/facebook", loginFacebook)
router.get("/facebook/authorized", facebookAuth)
router.get("/google", loginGoogle)
router.get("/google/authorized", googleAuth)
router.route("/login").post(login)
router.route("/logout").get(auth, logout)
router.route("/logoutAll").get(auth, logoutAll)

module.exports = router