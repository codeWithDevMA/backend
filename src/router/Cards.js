const express = require("express");
const rout = express.Router();
rout.use(express.json());

const multer = require("multer");
const checkAuth = require("../middleware/checkAuth");
const cards = require("../controllers/cards");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
// const storageVideo = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./public/videoUpload");
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + "-" + file.originalname);
//   },
// });
const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === "image/jpg" || file.mimetype === "image/PNG") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
// const fileFilterVideo = (req, file, cb) => {
//   if (file.mimetype === "video/mp4") {
//     cb(null, true);
//   } else {
//     cb({ message: "Unsupported File Format" }, false);
//   }
// };
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 61024 * 61024 * 640,
  },
  fileFilter: fileFilter,
});
// const uploadVideo = multer({
//   storage: storage,
//   fileFilter: fileFilterVideo,
// });
/*-----------------------------getting all  card-----------------------------*/
rout.get("/", cards.get_cards_id);
/*-----------------------------posting a card-----------------------------*/
rout.post("/", upload.single("imagesCard"), cards.post_cards);
/*-----------------------------getting  card-----------------------------*/
rout.get("/:cardId", cards.get_cards);
/*-----------------------------update card-----------------------------*/
rout.patch("/:cardId", cards.patch_cards);
/*-----------------------------delete card-----------------------------*/
rout.delete("/:delete", cards.delete_cards);
module.exports = rout;
