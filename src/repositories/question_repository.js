const table = require("../config/table_names");
const { db } = require("../common/functions");

function Repository() {
  this.queryQuestions = queryQuestions;
  this.insertQuestion = insertQuestion;
  this.deleteQuestions = deleteQuestions;
}

async function queryQuestions(input) {
  try {
    const { id, test_id } = input;

    let condition = "and visible = 1";

    if (!!id) condition += ` and id = '${id}'`;
    if (!!test_id) condition += ` and test_id = '${test_id}'`;

    const sql = `
      select *
      from ${table.QUESTION} 
      where true ${condition}
    `;

    const [result] = await db.query(sql);

    return result;
  } catch (err) {
    throw err;
  }
}

async function insertQuestion(data, test_id) {
  try {
    data.id = db.genID("QES");

    data.test_id = test_id;

    data.answers = JSON.stringify(data.answers);

    const sql = db.genInsertQuery(data, table.QUESTION);

    return await db.query(sql);
  } catch (err) {
    throw err;
  }
}

async function deleteQuestions(test_id) {
  try {
    const condition = `AND test_id = '${test_id}'`;
    const sql = db.genDeleteQuery(condition, table.QUESTION);

    return await db.query(sql);
  } catch (err) {
    throw err;
  }
}

module.exports = new Repository();
