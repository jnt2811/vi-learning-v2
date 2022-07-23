const table = require("../config/table_names");
const { db } = require("../common/functions");
const table_names = require("../config/table_names");

function Repository() {
  this.queryUsers = queryUsers;
  this.insertUser = insertUser;
  this.updateUser = updateUser;
}

async function queryUsers(input) {
  try {
    const { username, id, role, active } = input;

    let condition = "and visible = 1";

    if (!!username) condition += ` and username = '${username}'`;
    if (!!id) condition += ` and id = '${id}'`;
    if (!!role) condition += ` and role = '${role}'`;
    if (!!active) condition += ` and active = ${active}`;

    const sql = `
      select *
      from ${table.USER} 
      where true ${condition}
    `;

    const [result] = await db.query(sql);

    return result;
  } catch (err) {
    throw err;
  }
}

async function insertUser(data) {
  try {
    data.id = db.genID("USR");
    const sql = db.genInsertQuery(data, table_names.USER);

    return await db.query(sql);
  } catch (err) {
    throw err;
  }
}

async function updateUser(data) {
  try {
    const condition = `AND id = '${data.id}'`;
    delete data.id;
    const sql = db.genUpdateQuery(data, table_names.USER, condition);

    return await db.query(sql);
  } catch (err) {
    throw err;
  }
}

module.exports = new Repository();
