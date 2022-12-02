const express = require("express");
const router = express.Router();
const historiques = require("../controllers/historiques");
const checkAuth = require("../middleware/checkAuth");
/*-----------------------------get all orders-----------------------------*/
router.get("/", historiques.get_Historique);
/*-----------------------------post order -----------------------------*/
router.post("/",checkAuth, historiques.post_Historique);
/*-----------------------------update order-----------------------------*/
router.patch("/:UserId",checkAuth, historiques.patch_Historique);
/*----------------------------delete order-----------------------------*/
router.delete("/:delete",checkAuth, historiques.delete_Historique);
module.exports = router;
