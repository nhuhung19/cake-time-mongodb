const express = require("express")
require("dotenv").config()
const app = express()
const mongoose = require("mongoose")
const router = express.Router()
const bodyParser = require("body-parser")
const userRouter = require("./src/router/userRouter")
const authRouter = require("./src/router/authRouter")
const categoryRouter = require("./src/router/categoryRouter")
const productRouter = require("./src/router/productRouter")
const reviewRouter = require("./src/router/reviewRouter")
const cartRouter = require("./src/router/cartRouter")
const buyRouter = require("./src/router/buyRouter")
const passport = require('./src/auth/passport')
const cors = require('cors')
const AppError = require("./src/utils/appError")

mongoose.connect(process.env.DB_LOCAL, {
  useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(() => console.log("succeessfully connect to database")).catch(error => console.log(error))

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(router)
app.use(passport.initialize())

router.route("/").get((req, res) => {
  res.status(200).json({ status: "ok", data: [] })
})

router.use("/users", userRouter)
router.use("/buy", buyRouter)
router.use("/cart", cartRouter)
router.use("/auth", authRouter)
router.use("/categorys", categoryRouter)
router.use("/products", productRouter)
router.use("/products/:pId", reviewRouter)

function notFound (req, res, next) {
  next (new AppError(404, "API NOT FOUND"))
}

router.route("*").all(notFound)
const errorHandler = require("./src/utils/errorHandler")

app.use(errorHandler)

module.exports = app;



