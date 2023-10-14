const router = require("express").Router();
const favoriteController = require("../controllers/favoriteController");
const { validToken } = require("../middlewares/createMiddleware");

router.get("/", validToken, favoriteController.listFavorites);

module.exports = router;
