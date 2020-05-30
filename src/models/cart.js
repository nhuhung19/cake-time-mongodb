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
      type: String,
      required :[true, "image is required"]
    },
    price:{
      type: Number,
      required :[true, "price is required"]
    },
    product: {
      type: String,
      required: [true, "product must have name"]
    },
    quantity: {
      type: Number,
      default: 1,
      required:[true, "product must have quantity"]
    },
    total: {
      type: Number
    }
  }],
  totalPrice: {
    type: Number
  }
})

const Cart = mongoose.model("Cart", cartSchema)

module.exports = Cart