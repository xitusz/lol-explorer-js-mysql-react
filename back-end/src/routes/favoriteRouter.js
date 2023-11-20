const router = require("express").Router();
const favoriteController = require("../controllers/favoriteController");
const { validToken } = require("../middlewares/createMiddleware");

router.get("/", validToken, favoriteController.listFavorites);
router.post("/", validToken, favoriteController.addFavorite);
router.delete("/", validToken, favoriteController.removeFavorite);

module.exports = router;
