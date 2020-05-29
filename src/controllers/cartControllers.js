const Cart = require("../models/cart")
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.createCart = catchAsync(async function (req, res){
  let cart
  let item = req.body
  if(!await Cart.exists({"user": req.user._id})){
    item.total = item.quantity * item.price
    cart = await Cart.create({user: req.user._id})
    cart.items.push(item)
  } else {
    cart = await Cart.findOne({user: req.user._id})
    const idx = cart.items.findIndex(el => el.id.toString() === item.id)
    if(idx !== -1){
      let product = cart.items.find(el => el.id.toString() === item.id)
      product.quantity = item.quantity + product.quantity
      product.total = item.price * product.quantity
    } else{
      cart.items.push(item)
    }
  }
  await cart.save()
  return res.status(201).json({status: "success", data: cart})
})

exports.getCart = catchAsync(async function (req, res){
  const cart = await Cart.findOne({user: req.user._id})
  return res.status(200).json({status: "success", data: cart})
})