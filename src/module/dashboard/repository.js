const { pool } = require("../../core/database/pg");



const getlastSevenDaysPo = async () => {
  let query = `select * from po where tgl_po > current_date - interval '7 days'`;
  let query2 = `select DISTINCT tgl_po from po where tgl_po > current_date - interval '7 days'`;
  try {
    let result = await pool.query(query);
    let result2 = await pool.query(query2);
    return {
      tgl_po: result2.rows,
      data: result.rows
    } 
  } catch (err) {
    throw err;
  }
};

module.exports = {
  getlastSevenDaysPo
};
