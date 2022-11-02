const express = require("express");
const router = express.Router();
const historiques = require("../controllers/historiques");
/*-----------------------------get all orders-----------------------------*/
router.get("/", historiques.get_Historique);
/*-----------------------------post order -----------------------------*/
router.post("/", historiques.post_Historique);
/*-----------------------------update order-----------------------------*/
router.patch("/:historiquesId", historiques.patch_Historique);
/*----------------------------delete order-----------------------------*/
router.delete("/:delete", historiques.delete_Historique);
module.exports = router;
