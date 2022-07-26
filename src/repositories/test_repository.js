const table = require("../config/table_names");
const { db } = require("../common/functions");

function Repository() {
  this.queryTests = queryTests;
  this.insertTest = insertTest;
  this.updateTest = updateTest;
}

async function queryTests(input) {
  try {
    const { id, active, created_by } = input;

    let condition = `and ${table.TEST}.visible = 1`;

    if (!!id) condition += ` and ${table.TEST}.id = '${id}'`;
    if (!!active) condition += ` and ${table.TEST}.active = ${active}`;
    if (!!created_by) condition += ` and ${table.TEST}.created_by = '${created_by}'`;

    const sql = `
      select ${table.TEST}.*, 
        sum((case when ${table.QUESTION}.test_id is not null then 1 else 0 end)) as total_questions,
        sum((case when ${table.TEST_HISTORY}.test_id is not null then 1 else 0 end)) as total_do_test,
        avg(${table.TEST_HISTORY}.score) as average_score
      from ${table.TEST} 
      left join ${table.QUESTION} on ${table.TEST}.id = ${table.QUESTION}.test_id
      left join ${table.TEST_HISTORY} on ${table.TEST}.id = ${table.TEST_HISTORY}.test_id
      group by ${table.TEST}.id
      having true ${condition}
    `;

    const [result] = await db.query(sql);

    return result;
  } catch (err) {
    throw err;
  }
}

async function insertTest(data) {
  try {
    const sql = db.genInsertQuery(data, table.TEST);

    return await db.query(sql);
  } catch (err) {
    throw err;
  }
}

async function updateTest(data) {
  try {
    const condition = `AND id = '${data.id}'`;

    delete data.id;

    const sql = db.genUpdateQuery(data, table.TEST, condition);

    return await db.query(sql);
  } catch (err) {
    throw err;
  }
}

module.exports = new Repository();
