const router = require("express").Router();
const favoriteController = require("../controllers/favoriteController");
const { validToken } = require("../middlewares/createMiddleware");

router.post("/create", validToken, favoriteController.createFavorites);
router.get("/", validToken, favoriteController.listFavorites);
router.post("/", validToken, favoriteController.addFavorite);
router.delete("/", validToken, favoriteController.removeFavorite);
router.delete("/clear", validToken, favoriteController.clearFavorites);

module.exports = router;
