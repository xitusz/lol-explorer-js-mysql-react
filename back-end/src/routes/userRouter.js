const router = require("express").Router();
const userController = require("../controllers/userController");
const {
  validToken,
  validName,
  validEmail,
  validPassword,
} = require("../middlewares/createMiddleware");

router.get("/", validToken, userController.getProfileInfo);
router.put("/edit/name", validToken, validName, userController.updateName);
router.put("/edit/email", validToken, validEmail, userController.updateEmail);
router.put(
  "/edit/password",
  validToken,
  validPassword,
  userController.updatePassword
);
router.delete("/", validToken, userController.deleteUser);
router.post("/validate/email", userController.validateEmail);

module.exports = router;
