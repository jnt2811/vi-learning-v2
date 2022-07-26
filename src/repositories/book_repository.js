const table = require("../config/table_names");
const { db } = require("../common/functions");

function Repository() {
  this.queryBooks = queryBooks;
  this.insertBook = insertBook;
  this.updateBook = updateBook;
  this.deleteBook = deleteBook;
}

async function queryBooks(input) {
  try {
    const { id } = input;

    let condition = "";

    if (!!id) condition += ` and id = '${id}'`;

    const sql = `
      select *
      from ${table.BOOK} 
      where true ${condition}
    `;

    const [result] = await db.query(sql);

    return result;
  } catch (err) {
    throw err;
  }
}

async function insertBook(data) {
  try {
    const sql = db.genInsertQuery(data, table.BOOK);

    return await db.query(sql);
  } catch (err) {
    throw err;
  }
}

async function updateBook(data) {
  try {
    const condition = `AND id = '${data.id}'`;

    delete data.id;

    const sql = db.genUpdateQuery(data, table.BOOK, condition);

    return await db.query(sql);
  } catch (err) {
    throw err;
  }
}

async function deleteBook(data) {
  try {
    const condition = `AND id = '${data.id}'`;

    delete data.id;

    const sql = db.genDeleteQuery(condition, table.BOOK);

    return await db.query(sql);
  } catch (err) {
    throw err;
  }
}

module.exports = new Repository();
