const lessonRepository = require("../repositories/lesson_repository");
const { db } = require("../common/functions");

function Resource() {
  this.getLessons = getLessons;
  this.addLessons = addLessons;
  this.deleteLessons = deleteLessons;
}

async function getLessons(req, res, next) {
  try {
    const { course_id } = req.body;

    if (!course_id) return res.status(403).json("lesson/course-id-not-found");

    const result = await lessonRepository.queryLessons(req.body);
    res.json(result);
  } catch (err) {
    next(err);
  }
}

async function addLessons(req, res, next) {
  try {
    req.body.id = db.genID("LES");

    await lessonRepository.insertLesson(req.body);

    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
}

async function deleteLessons(req, res, next) {
  try {
    const { course_id } = req.body;

    if (!course_id) return res.status(403).json("lesson/course-id-not-found");

    await lessonRepository.deleteLessons(course_id);

    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
}

module.exports = new Resource();
