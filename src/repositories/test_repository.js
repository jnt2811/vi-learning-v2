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

    let condition = "and visible = 1";

    if (!!id) condition += ` and id = '${id}'`;
    if (!!active) condition += ` and active = ${active}`;
    if (!!created_by) condition += ` and created_by = '${created_by}'`;

    const sql = `
      select *
      from ${table.TEST} 
      where true ${condition}
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
