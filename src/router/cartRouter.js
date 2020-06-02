const router = require("express").Router()
const {auth} = require("../controllers/authControllers")
const {createCart, getCart, deleteCart, deleteItemCart} = require("../controllers/cartControllers")


router.route("/user")
.post(auth, createCart)
.get(auth, getCart)
.delete(auth, deleteCart)
router.route("/item/:id")
.delete(auth, deleteItemCart)

module.exports = router