const router = require("express").Router();
const userController = require("../controllers/userController");
const { validToken } = require("../middlewares/createMiddleware");

router.get("/", validToken, userController.getProfileInfo);

module.exports = router;
