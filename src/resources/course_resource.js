const courseRepository = require("../repositories/course_repository");
const lessonRepository = require("../repositories/lesson_repository");
const { db } = require("../common/functions");

function Resource() {
  this.getCourses = getCourses;
  this.addCourse = addCourse;
  this.editCourse = editCourse;
}

async function getCourses(req, res, next) {
  try {
    const result = await courseRepository.queryCourses(req.body);
    res.json(result);
  } catch (err) {
    next(err);
  }
}

async function addCourse(req, res, next) {
  try {
    const { lessons } = req.body;

    const list_lesson = lessons || [];

    delete req.body.lessons;

    const course_id = db.genID("COR");

    req.body.id = course_id;

    await courseRepository.insertCourse(req.body);

    await Promise.all(list_lesson.map((item) => lessonRepository.insertLesson(item, course_id)));

    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
}

async function editCourse(req, res, next) {
  try {
    const { id, lessons } = req.body;

    if (!id) return res.status(403).json("course/id-not-found");

    const list_lesson = lessons || [];

    delete req.body.created_by;
    delete req.body.lessons;

    await courseRepository.updateCourse(req.body);

    await lessonRepository.deleteLessons(id);

    await Promise.all(list_lesson.map((item) => lessonRepository.insertLesson(item, id)));

    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
}

module.exports = new Resource();
