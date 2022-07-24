const questionRepository = require("../repositories/question_repository");

function Resource() {
  this.getQuestions = getQuestions;
}

async function getQuestions(req, res, next) {
  try {
    const { test_id } = req.body;

    if (!test_id) return res.status(403).json("question/test-id-not-found");

    const result = await questionRepository.queryQuestions(req.body);

    res.json(result.map((item) => ({ ...item, answers: JSON.parse(item.answers) })));
  } catch (err) {
    next(err);
  }
}

module.exports = new Resource();
