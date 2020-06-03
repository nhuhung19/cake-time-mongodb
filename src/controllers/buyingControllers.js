const Buying = require("../models/buying")
const catchAsync = require("../utils/catchAsync")
const Cart = require("../models/cart")
const Product = require("../models/product")
const AppError = require("../utils/appError")
const stripe = require("stripe")(process.env.STRIPE_SECRET)

exports.createBuying = catchAsync(async function(req, res, next){
  const {cc_number, cc_exp_month, cc_exp_year, cc_cvc } = req.body
  const cardToken = await stripe.tokens.create(
    {
        card: {
            number: cc_number,
            exp_month: cc_exp_month,
            exp_year: cc_exp_year,
            cvc: cc_cvc,
        },
    }
);
  const cart = await Cart.findOne({user : req.user._id})
  const listItems = cart.items
  for(let i =0; i< listItems.length; i++){
    let product = await Product.findById(listItems[i].id)
    if(listItems[i].quantity > product.stock)
    return next(new AppError(400, "Quantity is not available"));
    product.stock = product.stock - listItems[i].quantity
    // console.log(product)
    await product.save({validateBeforeSave: false})
  }
  const payment = await stripe.charges.create(
    {
      amount: cart.totalPrice * 100,
      currency: 'usd',
      source: cardToken.id,
      description: `Payment from user ${req.user.name} for : ${listItems.map(el => el.name).join(" ")}`
    }
  );
  const buying = await Buying.create({
    user: req.user._id,
    products: listItems,
    total: cart.totalPrice,
    paid: true,
    paymentID: payment.id
  })
  return res.status(201).json({status: "success", data: buying})
})