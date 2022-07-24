const courseRepository = require("../repositories/course_repository");
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
    req.body.id = db.genID("COR");

    await courseRepository.insertCourse(req.body);

    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
}

async function editCourse(req, res, next) {
  try {
    const { id } = req.body;

    if (!id) return res.status(403).json("course/id-not-found");

    delete req.body.created_by;

    await courseRepository.updateCourse(req.body);

    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
}

module.exports = new Resource();
