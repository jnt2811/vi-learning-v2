const table = require("../config/table_names");
const { db } = require("../common/functions");

function Repository() {
  this.queryCourses = queryCourses;
  this.insertCourse = insertCourse;
  this.updateCourse = updateCourse;
}

async function queryCourses(input) {
  try {
    const { id, active, created_by } = input;

    let condition = `and ${table.COURSE}.visible = 1`;

    if (!!id) condition += ` and ${table.COURSE}.id = '${id}'`;
    if (!!active) condition += ` and ${table.COURSE}.active = ${active}`;
    if (!!created_by) condition += ` and ${table.COURSE}.created_by = '${created_by}'`;

    const sql = `
      select ${table.COURSE}.*, sum((case when ${table.LESSON}.course_id is not null then 1 else 0 end)) as total_lessons
      from ${table.COURSE} 
      left join ${table.LESSON} on ${table.COURSE}.id = ${table.LESSON}.course_id
      group by ${table.COURSE}.id
      having true ${condition}
    `;

    const [result] = await db.query(sql);

    return result;
  } catch (err) {
    throw err;
  }
}

async function insertCourse(data) {
  try {
    const sql = db.genInsertQuery(data, table.COURSE);

    return await db.query(sql);
  } catch (err) {
    throw err;
  }
}

async function updateCourse(data) {
  try {
    const condition = `AND id = '${data.id}'`;

    delete data.id;

    const sql = db.genUpdateQuery(data, table.COURSE, condition);

    return await db.query(sql);
  } catch (err) {
    throw err;
  }
}

module.exports = new Repository();
