const router = require("express").Router();
const registerRouter = require("./registerRouter");
const loginRouter = require("./loginRouter");
const favoriteRouter = require("./favoriteRouter");

router.use("/register", registerRouter);
router.use("/login", loginRouter);
router.use("/favorites", favoriteRouter);

module.exports = router;
