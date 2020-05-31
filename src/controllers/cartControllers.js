const Cart = require("../models/cart");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.createCart = catchAsync(async function (req, res) {
  let cart;
  let item = req.body;
  if (!(await Cart.exists({ user: req.user._id }))) {
    item.total = item.quantity * item.price;
    cart = await Cart.create({ user: req.user._id });
    cart.items.push(item);
    cart.totalPrice = cart.items.reduce(
      (accumulator, currentValue) => accumulator + currentValue.total,
      0
    );
  } else {
    cart = await Cart.findOne({ user: req.user._id });
    const idx = cart.items.findIndex((el) => el.id.toString() === item.id);
    if (idx !== -1) {
      let product = cart.items.find((el) => el.id.toString() === item.id);
      product.quantity = item.quantity + product.quantity;
      product.total = item.price * product.quantity;
    } else {
      item.total = item.quantity * item.price;
      cart.items.push(item);
    }
    cart.totalPrice = cart.items.reduce(
      (accumulator, currentValue) => accumulator + currentValue.total,
      0
    );
  }
  await cart.save();
  return res.status(201).json({ status: "success", data: cart });
});

exports.getCart = catchAsync(async function (req, res) {
  const cart = await Cart.findOne({ user: req.user._id });
  // console.log("======", cart)
  let totalQuantity;
  if (cart && cart.items.length !== 0) {
    totalQuantity = cart.items.reduce(
      (accumulator, currentValue) => accumulator + currentValue.quantity,
      0
    );
    cart.totalPrice = cart.items.reduce(
      (accumulator, currentValue) => accumulator + currentValue.total,
      0
    );
  } else {
    totalQuantity = 0;
  }
  return res
    .status(200)
    .json({ status: "success", data: cart, totalQuantity: totalQuantity });
});

exports.deleteItemCart = catchAsync(async function (req, res) {
  const itemId = req.params.id;
  const cart = await Cart.findOne({ user: req.user._id });
  const index = cart.items.findIndex((el) => el.id.toString() === itemId);
  console.log(index)
  cart.items.splice(index, 1);
  cart.totalPrice = cart.items.reduce(
    (accumulator, currentValue) => accumulator + currentValue.total,
    0
  );
  // console.log(cart.items)
  await cart.save();
  return res.status(204).json({ status: "success", data: null });
});
