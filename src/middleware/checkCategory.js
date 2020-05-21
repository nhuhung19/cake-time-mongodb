const Category = require("../models/category")

async function checkCategory(req, res, next){
  if (!req.params.cId || !await Category.exists({ "_id": req.params.cId }))
    return res.status(400).json({status: "fail", error: err.message})
  next()
}

module.exports = checkCategory