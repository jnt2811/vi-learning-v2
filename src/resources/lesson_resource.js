const lessonRepository = require("../repositories/lesson_repository");

function Resource() {
  this.getLessons = getLessons;
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

module.exports = new Resource();
