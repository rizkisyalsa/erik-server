const { pool } = require("../../core/database/pg");

const getSj = async (limit, page, search) => {
  let result = [];
  let offset = 0;
  if (limit && page) {
    offset = (page - 1) * limit;
  }
  let count = `SELECT COUNT(*) AS total FROM po WHERE status = 'success'`;
  let query = `SELECT * FROM po WHERE status = 'success'`;
  if (search) {
    count += ` AND no_po ILIKE '%${search}%' OR nama_plg ILIKE '%${search}%' OR nama_brg ILIKE '%${search}%'`;
    query += ` AND no_po ILIKE '%${search}%' OR nama_plg ILIKE '%${search}%' OR nama_brg ILIKE '%${search}%'`;
  }
  query += ` ORDER BY no_po LIMIT ${limit} OFFSET ${offset}`;
  try {
    let data = await pool.query(query);
    total = await pool.query(count);
    result.push({
      data: data.rows,
      page,
      total: total.rows[0].total
    });
    return result;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  getSj
};
