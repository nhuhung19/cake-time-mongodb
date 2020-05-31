const router = require("express").Router()
const {auth} = require("../controllers/authControllers")
const {createCart, getCart, deleteItemCart} = require("../controllers/cartControllers")


router.route("/user")
.post(auth, createCart)
.get(auth, getCart)
router.route("/item/:id")
.delete(auth, deleteItemCart)

module.exports = router