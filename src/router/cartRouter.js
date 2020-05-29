const router = require("express").Router()
const {auth} = require("../controllers/authControllers")
const {createCart, getCart} = require("../controllers/cartControllers")


router.route("/user")
.post(auth, createCart)
.get(auth, getCart)

module.exports = router