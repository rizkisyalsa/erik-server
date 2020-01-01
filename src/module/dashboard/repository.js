const { pool } = require("../../core/database/pg");



const getlastSevenDaysPo = async () => {
  let query = `select * from po where tgl_po > current_date - interval '7 days'`;
  try {
    let result = await pool.query(query)
    return {
      data: result.rows
    } 
  } catch (err) {
    throw err;
  }
};

module.exports = {
  getlastSevenDaysPo
};
