const router = require("express").Router();

const userResource = require("../resources/user_resource");
const courseResource = require("../resources/course_resource");
const lessonResource = require("../resources/lesson_resource");
const testResource = require("../resources/test_resource");
const questionResource = require("../resources/question_resource");
const bookResource = require("../resources/book_resource");
const audioResource = require("../resources/audio_resource");
const testHistoryResource = require("../resources/test_history_resource");

// user
router.post("/api/public/user/login", userResource.login);
router.post("/api/resources/user/get_users", userResource.getUsers);
router.post("/api/public/user/add_user", userResource.addUser);
router.post("/api/resources/user/edit_user", userResource.editUser);

// course
router.post("/api/public/course/get_courses", courseResource.getCourses);
router.post("/api/resources/course/add_course", courseResource.addCourse);
router.post("/api/resources/course/edit_course", courseResource.editCourse);

// lesson
router.post("/api/resources/lesson/get_lessons", lessonResource.getLessons);

// test
router.post("/api/resources/test/get_tests", testResource.getTests);
router.post("/api/resources/test/add_test", testResource.addTest);
router.post("/api/resources/test/edit_test", testResource.editTest);

// question
router.post("/api/resources/question/get_questions", questionResource.getQuestions);

// test history
router.post("/api/resources/test_history/get_test_history", testHistoryResource.getTestHistory);
router.post("/api/resources/test_history/add_test_history", testHistoryResource.addTestHistory);

// book
router.post("/api/public/book/get_books", bookResource.getBooks);
router.post("/api/resources/book/add_book", bookResource.addBook);
router.post("/api/resources/book/edit_book", bookResource.editBook);
router.post("/api/resources/book/delete_book", bookResource.deleteBook);

// audio
router.post("/api/public/audio/get_audios", audioResource.getAudios);
router.post("/api/resources/audio/add_audio", audioResource.addAudio);
router.post("/api/resources/audio/edit_audio", audioResource.editAudio);
router.post("/api/resources/audio/delete_audio", audioResource.deleteAudio);

module.exports = router;
