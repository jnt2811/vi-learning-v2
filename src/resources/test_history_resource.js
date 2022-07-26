const testHistoryRepository = require("../repositories/test_history_repository");
const { db } = require("../common/functions");

function Resource() {
  this.getTestHistory = getTestHistory;
  this.addTestHistory = addTestHistory;
}

async function getTestHistory(req, res, next) {
  try {
    const result = await testHistoryRepository.queryTestHistory(req.body);
    res.json(result);
  } catch (err) {
    next(err);
  }
}

async function addTestHistory(req, res, next) {
  try {
    const testHistory_id = db.genID("TEH");

    req.body.id = testHistory_id;

    await testHistoryRepository.insertTestHistory(req.body);

    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
}

module.exports = new Resource();
