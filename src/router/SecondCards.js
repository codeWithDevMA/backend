const express = require("express");
const rout = express.Router();
const multer = require("multer");
const checkAuth = require("../middleware/checkAuth");
const SecondCards = require("../controllers/secondCards");
var uploadsecondcard = multer({ dest: "./uploads/secondcard" });
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./uploads/");
//   },
//   filename: function (req, file, cb) {
//     cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
//   },
// });

// const fileFilter = (req, file, cb) => {
//   // reject a file
//   if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
//     cb(null, true);
//   } else {
//     cb(null, false);
//   }
// };

// const upload = multer({
//   storage: storage,
//   limits: {
//     fileSize: 1024 * 1024 * 40,
//   },
//   fileFilter: fileFilter,
// });

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
rout.patch("/:secondCardsId", SecondCards.patch_secondCards);
/*-----------------------------delete card-----------------------------*/
rout.delete("/:delete", SecondCards.delete_secondCards);
module.exports = rout;
