const router = require("express").Router();
const registerRouter = require("./registerRouter");
const loginRouter = require("./loginRouter");
const favoriteRouter = require("./favoriteRouter");
const userRouter = require("./userRouter");

router.use("/register", registerRouter);
router.use("/login", loginRouter);
router.use("/favorites", favoriteRouter);
router.use("/profile", userRouter);

module.exports = router;
