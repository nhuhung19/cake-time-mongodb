const router = require("express").Router()
const {auth} = require("../controllers/authControllers")
const {createBuying} = require("../controllers/buyingControllers")


router.route("/").post(auth, createBuying)

module.exports = router