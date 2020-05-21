const mongoose = require("mongoose")

const categorySchema = mongoose.Schema({
  category: {
    type: String,
    required: [true, "category is required"],
    strim: true,
    unique: true
  }
},
{
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
})


const Category = mongoose.model("Category", categorySchema)

module.exports = Category