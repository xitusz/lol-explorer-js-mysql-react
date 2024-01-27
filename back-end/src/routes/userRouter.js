const router = require("express").Router();
const userController = require("../controllers/userController");
const { validToken } = require("../middlewares/createMiddleware");

router.get("/", validToken, userController.getProfileInfo);
router.put("/edit/name", validToken, userController.updateName);
router.put("/edit/email", validToken, userController.updateEmail);
router.put("/edit/password", validToken, userController.updatePassword);
router.delete("/", validToken, userController.deleteUser);
router.post("/validate/email", userController.validateEmail);

module.exports = router;
