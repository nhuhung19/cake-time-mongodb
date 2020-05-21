const catchAsync = require("../utils/catchAsync")
const AppError = require("../utils/appError")

exports.updateOne = Model => catchAsync(async function (req, res){
  let allow = []
  let id = req.params.id
  switch (Model.modelName) {
    case "User":
      allows = ["password", "address"]
      id = req.user._id
      break;
    default:
      allow = []
      id = req.params.id 
  }
  Object.keys(req.body).forEach(el => {
    if(!allows.includes(el)){
      delete req.body[el]
    }
  })
  const newItem = await Model.findOneAndUpdate({_id: id}, req.body, {new: true})
  res.status(202).json({status: "success", data: newItem})
})