const mongoose = require("mongoose")

const cartSchema = mongoose.Schema({
  user:{
    type: mongoose.Schema.ObjectId,
    ref: "User"
  },
  items: [{
    id: {
      type: mongoose.Schema.ObjectId,
      ref: "Product"
    },
    image: {
      type: String
    },
    price:{
      type: Number
    },
    product: {
      type: String
    },
    quantity: {
      type: Number,
      default: 1
    },
    total: {
      type: Number
    }
  }]
})

const Cart = mongoose.model("Cart", cartSchema)

module.exports = Cart