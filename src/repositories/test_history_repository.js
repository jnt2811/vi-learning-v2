const table = require("../config/table_names");
const { db } = require("../common/functions");

function Repository() {
  this.queryTestHistory = queryTestHistory;
  this.insertTestHistory = insertTestHistory;
}

async function queryTestHistory(input) {
  try {
    const { id, test_id, user_id, order_by } = input;

    let condition = "";
    let order = "";

    if (!!id) condition += ` and ${table.TEST_HISTORY}.id = '${id}'`;
    if (!!test_id) condition += ` and ${table.TEST_HISTORY}.test_id = '${test_id}'`;
    if (!!user_id) condition += ` and ${table.TEST_HISTORY}.user_id = '${user_id}'`;
    if (!!order_by && order_by === "score") order += ` and ${table.TEST_HISTORY}.score DESC`;
    if (!!order_by && order_by === "date") order += ` and ${table.TEST_HISTORY}.created_at DESC`;

    const sql = `
      select ${table.TEST_HISTORY}.*,
        ${table.USER}.name as student,
        ${table.TEST}.name as test
      from ${table.TEST_HISTORY} 
      left join ${table.USER} on ${table.TEST_HISTORY}.user_id = ${table.USER}.id
      left join ${table.TEST} on ${table.TEST_HISTORY}.test_id = ${table.TEST}.id
      group by ${table.TEST_HISTORY}.id
      having true ${condition}
      order by true ${order}
    `;

    const [result] = await db.query(sql);

    return result;
  } catch (err) {
    throw err;
  }
}

async function insertTestHistory(data) {
  try {
    const sql = db.genInsertQuery(data, table.TEST_HISTORY);

    return await db.query(sql);
  } catch (err) {
    throw err;
  }
}

module.exports = new Repository();
