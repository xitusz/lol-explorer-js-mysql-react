const router = require("express").Router();
const userController = require("../controllers/userController");
const {
  validName,
  validEmail,
  validPassword,
} = require("../middlewares/createMiddleware");

router.post("/", validName, validEmail, validPassword, userController.create);

module.exports = router;
