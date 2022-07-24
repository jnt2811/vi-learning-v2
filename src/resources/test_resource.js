const testRepository = require("../repositories/test_repository");
const questionRepository = require("../repositories/question_repository");
const { db } = require("../common/functions");

function Resource() {
  this.getTests = getTests;
  this.addTest = addTest;
  this.editTest = editTest;
}

async function getTests(req, res, next) {
  try {
    const result = await testRepository.queryTests(req.body);
    res.json(result);
  } catch (err) {
    next(err);
  }
}

async function addTest(req, res, next) {
  try {
    const { questions } = req.body;

    const list_question = questions || [];

    delete req.body.questions;

    const test_id = db.genID("TES");

    req.body.id = test_id;

    await testRepository.insertTest(req.body);

    await Promise.all(
      list_question.map((item) => questionRepository.insertQuestion(item, test_id))
    );

    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
}

async function editTest(req, res, next) {
  try {
    const { id, questions } = req.body;

    if (!id) return res.status(403).json("test/id-not-found");

    const list_question = questions;

    delete req.body.created_by;
    delete req.body.questions;

    await testRepository.updateTest(req.body);

    if (!!list_question && list_question?.length > 0) {
      await questionRepository.deleteQuestions(id);
      await Promise.all(list_question.map((item) => questionRepository.insertQuestion(item, id)));
    }

    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
}

module.exports = new Resource();
