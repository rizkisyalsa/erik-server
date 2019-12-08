const { pool } = require("../../core/database/pg");

const moment = require("moment");

const getPo = async (limit, page, search) => {
  let result = [];
  let offset = 0;
  if (limit && page) {
    offset = (page - 1) * limit;
  }
  let data;
  let values = [limit, offset];
  let count = `SELECT COUNT(*) AS total FROM po`;
  let query = `SELECT * FROM po`;
  if (search) {
    count += ` WHERE no_po ILIKE '%${search}%' OR nama_plg ILIKE '%${search}%' OR nama_brg ILIKE '%${search}%'`;
    query += ` WHERE no_po ILIKE '%${search}%' OR nama_plg ILIKE '%${search}%' OR nama_brg ILIKE '%${search}%'`;
  }
  query += ` ORDER BY no_po LIMIT $1 OFFSET $2`;
  try {
    data = await pool.query(query, values);
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

const addPo = async body => {
  const { nama_plg, nama_brg, jumlah, tgl_krm } = body;

  const query = `INSERT INTO po (no_po, tgl_po, nama_plg, nama_brg, jumlah, tgl_krm, status) 
   VALUES ('${Date.now()}','${moment(Date.now()).format(
    "YYYY-MM-DD"
  )}', '${nama_plg}', '${nama_brg}', ${jumlah}, '${moment(tgl_krm).format(
    "YYYY-MM-DD"
  )}', 'pending')`;

  try {
    await pool.query(query);
    return {
      msg: "Tambah PO berhasil"
    };
  } catch (err) {
    throw err;
  }
};

const updatePo = async (param, data) => {
  let { status } = data;
  const query = `UPDATE po SET status = $2 WHERE no_po = $1`;
  const values = [param, status];
  try {
    await pool.query(query, values);
    return {
      msg: "Update po berhasil"
    };
  } catch (err) {
    throw err;
  }
};

const deletePo = async no_po => {
  const query = `DELETE FROM po WHERE no_po = $1`;
  const values = [no_po];
  try {
    await pool.query(query, values);
    return {
      msg: "Delete po berhasil"
    };
  } catch (err) {
    throw err;
  }
};

module.exports = {
  updatePo,
  getPo,
  addPo,
  deletePo
};
