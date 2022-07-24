const router = require("express").Router();

const userResource = require("../resources/user_resource");
const courseResource = require("../resources/course_resource");

// user
router.post("/api/public/user/login", userResource.login);
router.post("/api/resources/user/get_users", userResource.getUsers);
router.post("/api/public/user/add_user", userResource.addUser);
router.post("/api/resources/user/edit_user", userResource.editUser);

// course
router.post("/api/resources/course/get_courses", courseResource.getCourses);
router.post("/api/resources/course/add_course", courseResource.addCourse);
router.post("/api/resources/course/edit_course", courseResource.editCourse);

module.exports = router;
