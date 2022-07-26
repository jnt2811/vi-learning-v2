const table = require("../config/table_names");
const { db } = require("../common/functions");

function Repository() {
  this.queryAudios = queryAudios;
  this.insertAudio = insertAudio;
  this.updateAudio = updateAudio;
  this.deleteAudio = deleteAudio;
}

async function queryAudios(input) {
  try {
    const { id } = input;

    let condition = "";

    if (!!id) condition += ` and id = '${id}'`;

    const sql = `
      select *
      from ${table.AUDIO} 
      where true ${condition}
    `;

    const [result] = await db.query(sql);

    return result;
  } catch (err) {
    throw err;
  }
}

async function insertAudio(data) {
  try {
    const sql = db.genInsertQuery(data, table.AUDIO);

    return await db.query(sql);
  } catch (err) {
    throw err;
  }
}

async function updateAudio(data) {
  try {
    const condition = `AND id = '${data.id}'`;

    delete data.id;

    const sql = db.genUpdateQuery(data, table.AUDIO, condition);

    return await db.query(sql);
  } catch (err) {
    throw err;
  }
}

async function deleteAudio(data) {
  try {
    const condition = `AND id = '${data.id}'`;

    delete data.id;

    const sql = db.genDeleteQuery(condition, table.AUDIO);

    return await db.query(sql);
  } catch (err) {
    throw err;
  }
}

module.exports = new Repository();
