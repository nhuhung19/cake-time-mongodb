const mongoose = require("mongoose");
const Review = require("./review")

const productSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "title is required"],
      trim: true,
    },
    category: {
      type: mongoose.Schema.ObjectId,
      ref: "Category",
      required: [true, "product must have category"],
    },
    description: {
      type: String,
      required: [true, "product must have description"],
      minLength: 10,
    },
    owner: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "product must have owner"],
    },
    ratingAverage: {
      type: Number,
      default: 0,
      min: [0, "Rating must be above 0"],
      max: [5, "Rating must be below 5.0"],
      set: (value) => Math.round(value * 10) / 10,
    },
    ratingQuantity: {
      type: Number,
      default: 0,
    },
    stock:{
      type: Number,
      required: [true, "stock is required"],
      min: [1, "Stock must be equal or great than 1"]
    },
    availability: {
      type: Number,
      min: [0, "availability must be equal or than 0"],
    },
    price: {
      type: Number,
      required: [true, "product must have price"],
      min: [0, "price must have atleast 0 dollar"],
    },
    image: {
      type: String,
      required: [true, "product must have picture"]
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

productSchema.pre(/^find/, function (next){
  this
  .populate("owner", "-password -__v -tokens -createdAt -updatedAt")
  .populate("category", "_id category")
  next()
})

productSchema.post("findOneAndDelete", async function(){
  // console.log("========",this)
  await Review.deleteMany({product: this._conditions._id})
})


const Product = mongoose.model("Product", productSchema)
module.exports = Product