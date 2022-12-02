const express = require("express");
const rout = express.Router();
rout.use(express.json());
const multer = require("multer");
const checkAuth = require("../middleware/checkAuth");
const cards = require("../controllers/cards");
var upload = multer({ dest: "./uploads/card1" });
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
// const storageVideo = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./public/videoUpload");
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + "-" + file.originalname);
//   },
// });
// const fileFilterVideo = (req, file, cb) => {
//   if (file.mimetype === "video/mp4") {
//     cb(null, true);
//   } else {
//     cb({ message: "Unsupported File Format" }, false);
//   }
// };
// const uploadVideo = multer({
//   storage: storage,
//   fileFilter: fileFilterVideo,
// });
/*-----------------------------getting all  card-----------------------------*/
rout.get("/", cards.get_cards);
/*-----------------------------posting a card-----------------------------*/
rout.post("/", checkAuth, upload.single("imagesCard"), cards.post_cards);
/*-----------------------------getting  card-----------------------------*/
rout.get("/:cardsId", cards.get_cards_id);
/*-----------------------------update card-----------------------------*/
rout.patch("/:cardsId", cards.patch_cards);
/*-----------------------------delete card-----------------------------*/
rout.delete("/:delete", cards.delete_cards);
module.exports = rout;
