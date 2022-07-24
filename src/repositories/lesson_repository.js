const table = require("../config/table_names");
const { db } = require("../common/functions");
const table_names = require("../config/table_names");

function Repository() {
  this.queryLessons = queryLessons;
  this.insertLesson = insertLesson;
  this.updateLesson = updateLesson;
}

async function queryLessons(input) {
  try {
    const { id, course_id } = input;

    let condition = "and visible = 1";

    if (!!id) condition += ` and id = '${id}'`;
    if (!!course_id) condition += ` and course_id = ${course_id}`;

    const sql = `
      select *
      from ${table.LESSON} 
      where true ${condition}
    `;

    const [result] = await db.query(sql);

    return result;
  } catch (err) {
    throw err;
  }
}

async function insertLesson(data) {
  try {
    const sql = db.genInsertQuery(data, table_names.LESSON);

    return await db.query(sql);
  } catch (err) {
    throw err;
  }
}

async function updateLesson(data) {
  try {
    const condition = `AND id = '${data.id}'`;
    delete data.id;
    const sql = db.genUpdateQuery(data, table_names.LESSON, condition);

    return await db.query(sql);
  } catch (err) {
    throw err;
  }
}

module.exports = new Repository();
