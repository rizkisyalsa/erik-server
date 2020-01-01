const { pool } = require("../database/pg");

const getAuth = async username => {
  const text = "SELECT * FROM users WHERE username = $1";
  const value = [username];

  try {
    const data = await pool.query(text, value);
    return data.rows[0];
  } catch (err) {
    throw err;
  }
};

const getAllUser = async () => {
  const text = "SELECT * FROM users";

  try {
    const data = await pool.query(text);
    return data.rows;
  } catch (err) {
    throw err;
  }
};

const getUser = async id => {
  const text = "SELECT * FROM users WHERE id=$1";
  const value = [id];

  try {
    const data = await pool.query(text, value);
    return data.rows[0];
  } catch (err) {
    throw err;
  }
};

const checkUsername = async username => {
  const text = "SELECT * FROM users WHERE username=$1";
  const value = [username];

  try {
    const data = await pool.query(text, value);
    return data.rows[0];
  } catch (err) {
    throw err;
  }
};

const createUser = async (username, hashPassword, name, role) => {
  const text =
    "INSERT INTO users (username, password, name, role) VALUES($1, $2, $3, $4) RETURNING *";
  const value = [username, hashPassword, name, role];

  try {
    const data = await pool.query(text, value);
    return data.rows[0];
  } catch (err) {
    throw err;
  }
};

const setFoto = async (newFoto, id) => {
  try {
    await pool.query(`UPDATE users SET foto='${newFoto}' WHERE id=${id}`);
    return {
      msg: 'set image success'
    }
  } catch (err) {
    throw err;
  }
}

const deleteUser = async (id) => {
  const query = `DELETE FROM users WHERE id = $1`;
  const values = [id]
  try {
     await pool.query(query, values);
     return {msg: 'Delete User berhasil'}
  } catch (err) {
     throw err
  }
}

module.exports = {
  getAuth,
  getUser,
  checkUsername,
  createUser,
  setFoto,
  getAllUser,
  deleteUser
};
