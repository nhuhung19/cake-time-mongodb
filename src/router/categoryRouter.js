const router = require("express").Router();
const {auth} = require("../controllers/authControllers")
const {checkCategory} = require("../middleware/checker")
const {
  getCategorys,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryControllers");

router.route("/")
.get(getCategorys)
.post(auth, createCategory)
router.route("/:cId")
.put(auth, checkCategory, updateCategory)
.delete(auth, checkCategory, deleteCategory)

module.exports = router