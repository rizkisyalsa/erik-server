const { pool } = require("../../core/database/pg");

const getNamaBarang = async () => {
   let query = 'SELECT nama_barang FROM barang'
   try {
      data = await pool.query(query);
      return data
   } catch (err) {
      throw err
   }
}

const getBarang = async (limit, page, search) => {
   let result = [];
   let offset = 0;
   if (limit && page) {
      offset = (page - 1) * limit;
   }
   let data;
   let values = [limit, offset]
   let count = `SELECT COUNT(*) AS total FROM barang`;
   let query = `SELECT * FROM barang`;
   if (search) {
      count += ` WHERE nama_barang ILIKE '%${search}%' OR tipe ILIKE '%${search}%'`;
      query += ` WHERE nama_barang ILIKE '%${search}%' OR tipe ILIKE '%${search}%'`;
   }
   query += ` ORDER BY kode_barang LIMIT $1 OFFSET $2`;
   try {

      data = await pool.query(query, values);
      total = await pool.query(count);
      result.push({
         data: data.rows,
         page,
         total: total.rows[0].total
      })
      return result
   } catch (err) {
      throw err
   }
}

const addBarang = async (body) => {
   const {
      kode_barang,
      nama_barang,
      tipe,
      accept,
      rejects,
      harga
   } = body

   const query = `INSERT INTO barang (kode_barang, nama_barang, tipe, accept, rejects, harga) 
   VALUES ($1, $2, $3, $4, $5, $6)`;
   const values = [kode_barang, nama_barang, tipe, accept, rejects, harga];
   try {
      await pool.query(query, values);
      return {msg: 'Tambah barang berhasil'}
   } catch (err) {
      throw err
   }
}

const updateBarang = async (param, data) => {
   let {kode_barang, nama_barang, tipe, accept, rejects, harga} =data
   const query = `UPDATE barang SET kode_barang = $1, nama_barang = $2, tipe = $3, accept = $4, rejects = $5, 
   harga = $6 WHERE kode_barang = $7`;
   const values = [kode_barang, nama_barang, tipe, accept, rejects, harga, param];
   try {
     await pool.query(query, values);
      return {mas: 'Update barang berhasil'}
   } catch (err) {
     throw err
   }
 }

const deleteBarang = async (kode_barang) => {
   const query = `DELETE FROM barang WHERE kode_barang = $1`;
   const values = [kode_barang]
   try {
      await pool.query(query, values);
      return {msg: 'Delete barang berhasil'}
   } catch (err) {
      throw err
   }
}

module.exports = {
   getNamaBarang,
   updateBarang,
   getBarang,
   addBarang,
   deleteBarang
};