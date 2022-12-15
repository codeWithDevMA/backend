const express = require("express");
const router = express.Router();
const FormCourses = require("../controllers/formCourses");
const checkAuth = require("../middleware/checkAuth");
const multer = require("multer");

const storageautre = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/filesautre");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
  },
});
const fileFilterautre = (req, file, cb) => {
  // reject a file
  if (file.mimetype === "application/*") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const uploadautre = multer({
  storage: storageautre,
  fileFilter: fileFilterautre,
});

////////
const storagevideo = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/filesvideo");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
  },
});
const fileFiltervideo = (req, file, cb) => {
  // reject a file
  if (file.mimetype === "application/video") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const uploadvideo = multer({
  storage: storagevideo,
  fileFilter: fileFiltervideo,
});
// \\\\\\\\
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/files");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});
/*-----------------------------get all orders-----------------------------*/
router.get("/", FormCourses.get_FormCourse);
/*-----------------------------post order -----------------------------*/
router.post(
  "/",
  uploadautre.single("file"),
  uploadvideo.single("video"),
  upload.single("pdf"),
  FormCourses.post_FormCourse
);
/*-----------------------------update order-----------------------------*/
router.patch("/:courseId", checkAuth, FormCourses.patch_FormCourse);
/*----------------------------delete order-----------------------------*/
router.delete("/:delete", checkAuth, FormCourses.delete_FormCourse);
module.exports = router;
