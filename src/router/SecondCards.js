const express = require("express");
const rout = express.Router();
const multer = require("multer");
const checkAuth = require("../middleware/checkAuth");
const SecondCards = require("../controllers/secondCards");
var uploadsecondcard = multer({
  dest: "./uploads/secondcard/",
});

/*-----------------------------getting all  card-----------------------------*/
rout.get("/", SecondCards.get_secondCards);
/*-----------------------------posting a card-----------------------------*/
rout.post(
  "/",

  uploadsecondcard.fields([
    {
      name: "imagesSecondCard",
      maxCount: 1,
    },
    {
      name: "imagesCardSupervisor",
      maxCount: 1,
    },
  ]),
  SecondCards.post_secondCards
);
/*-----------------------------getting  card-----------------------------*/
rout.get("/:secondCardsId", SecondCards.get_secondCards_id);
/*-----------------------------update card-----------------------------*/
rout.patch("/:secondCardsId", checkAuth, SecondCards.patch_secondCards);
/*-----------------------------delete card-----------------------------*/
rout.delete("/:delete", checkAuth, SecondCards.delete_secondCards);
module.exports = rout;
