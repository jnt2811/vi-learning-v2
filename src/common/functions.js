const db_connection = require("../config/db_conn");
const jwt = require("jsonwebtoken");
const ShortUniqueId = require("short-unique-id");

function rid(length) {
  const uid = new ShortUniqueId({ length });
  return uid();
}

const db = {
  query: async function (sql) {
    console.log(sql);
    try {
      return await db_connection.query(sql);
    } catch (error) {
      throw `[ERROR] SQL: ${error.message}. ${error.sqlMessage}`;
    }
  },
  genID: function (prefix) {
    const prefix_length = prefix.length + 1;
    const randomId = rid(20 - prefix_length);
    return `${prefix}-${randomId}`;
  },
  genInsertQuery: function (data, table) {
    const column_list = Object.keys(data).join();
    const value_list = Object.values(data)
      .map((item) => (typeof item === "string" ? `'${item}'` : item))
      .join();
    return `
      INSERT INTO ${table} (${column_list}) 
      VALUES (${value_list})
    `;
  },
  genUpdateQuery: function (data, table, condition) {
    const values = Object.keys(data)
      .map((key) =>
        typeof data[key] === "string" ? `${key} = '${data[key]}'` : `${key} = ${data[key]}`
      )
      .join();
    return `
      UPDATE ${table} 
      SET ${values} 
      WHERE TRUE ${condition}
    `;
  },
  genDeleteQuery: function (condition, table) {
    return `
      DELETE FROM ${table} 
      WHERE TRUE ${condition}
    `;
  },
};

function createToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: `${process.env.EXPIRES_IN}`,
  });
}

module.exports = {
  db,
  createToken,
};
