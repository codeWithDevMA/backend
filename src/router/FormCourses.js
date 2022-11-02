const express = require("express");
const router = express.Router();
const FormCourses = require("../controllers/formCourses");
/*-----------------------------get all orders-----------------------------*/
router.get("/", FormCourses.get_FormCourse);
/*-----------------------------post order -----------------------------*/
router.post("/", FormCourses.post_FormCourse);
/*-----------------------------update order-----------------------------*/
router.patch("/:FormCoursesId", FormCourses.patch_FormCourse);
/*----------------------------delete order-----------------------------*/
router.delete("/:delete", FormCourses.delete_FormCourse);
module.exports = router;
