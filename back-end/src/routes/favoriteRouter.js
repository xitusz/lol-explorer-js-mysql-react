const router = require("express").Router();
const favoriteController = require("../controllers/favoriteController");
const { validToken } = require("../middlewares/createMiddleware");

router.get("/", validToken, favoriteController.listFavorites);
router.post("/", validToken, favoriteController.addFavorite);

module.exports = router;
