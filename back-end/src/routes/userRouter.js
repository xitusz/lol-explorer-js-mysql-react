const router = require("express").Router();
const userController = require("../controllers/userController");
const { validToken } = require("../middlewares/createMiddleware");

router.get("/", validToken, userController.getProfileInfo);
router.put("/edit/name", validToken, userController.updateName);

module.exports = router;
