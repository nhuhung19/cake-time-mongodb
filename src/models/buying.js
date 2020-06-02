const mongoose = require("mongoose");

const buyingSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "Buying must have userID"],
    },
    products: [
      {
        id: {
          type: mongoose.Schema.ObjectId,
          ref: "Product",
          required: [true, "Buying must have productID"],
        },
        quantity: {
          type: Number,
          required: [true, "product must have quantity"],
          min: [1, "Quantity must be equal or greater than 1"],
        },
        price:{
          type: Number,
          required :[true, "price is required"]
        },
        product: {
          type: String,
          required: [true, "product must have name"]
        },
        total: {
          type: Number,
          min: [0, "total must be equal or greater than 0"]
        }
      },
    ],
    paymentID: {
      type: String,
      default: null,
      required: [true, "Buying must have paymentID"],
    },
    total: {
      type: Number,
      required: [true, "Booking must have total"],
      min: [0, "total must be equal or greater than 0"],
    },
    paid: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

buyingSchema.post("save", async function(){
  let buyObject = {...this.toObject()}
  delete buyObject.paymentID
  delete buyObject.paid
  const userBuyer = await mongoose.model('User').findById(this.user)
  userBuyer.listOrder.push(buyObject)
  await userBuyer.save()
})

buyingSchema.post("save", async function(){
  for(let i=0; i< this.products.length; i++){
    const product = await mongoose.model('Product').findById(this.products[i].id)
    const userSeller = await mongoose.model('User').findById(product.owner)
    userSeller.listSold.push(this.products[i])
    await userSeller.save()
  }
})

const Buying = mongoose.model("Buying", buyingSchema)

module.exports = Buying
