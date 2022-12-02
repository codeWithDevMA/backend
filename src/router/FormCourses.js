const express = require("express");
const router = express.Router();
const FormCourses = require("../controllers/formCourses");
const checkAuth = require("../middleware/checkAuth");
/*-----------------------------get all orders-----------------------------*/
router.get("/", FormCourses.get_FormCourse);
/*-----------------------------post order -----------------------------*/
router.post("/", checkAuth,FormCourses.post_FormCourse);
/*-----------------------------update order-----------------------------*/
router.patch("/:courseId",checkAuth, FormCourses.patch_FormCourse);
/*----------------------------delete order-----------------------------*/
router.delete("/:delete",checkAuth, FormCourses.delete_FormCourse);
module.exports = router;
