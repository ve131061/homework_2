const pool = require('../config/db');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

/*exports.getUsers = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users');
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};*/
exports.getUserSearch = async (req, res) => {
//  console.log(req);
  const { first_name, second_name } = req.body;
  
  try {
    const result = await pool.query('SELECT * FROM people where first_name LIKE $1 and second_name LIKE $2', [first_name, second_name]);
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.loginUser = async (req, res) => {
  const { id, password } = req.body;
  try {
    const result = await pool.query('SELECT * FROM users WHERE id = $1 and password = $2', [id,crypto.createHash('sha256').update(password).digest('hex')]);
//    const result = await pool.query('SELECT password FROM users WHERE id = $1', [id]);
    if (result.rowCount>0) {
      res.status(200).send(jwt.sign(id,password));
    } else {
      res.status(200).send('Incorrect login / password');
    }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

exports.getUser = async (req, res) => {
const {id} = req.body;
try {
  const result = await pool.query('SELECT first_name, second_name, sex, age, city, interests FROM users WHERE id = $1', [id]);
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createUser = async (req, res) => {
  const { first_name, second_name, sex, age, city, interests, password } = req.body;
  try {
    const result = await pool.query('INSERT INTO users (first_name, second_name, sex, age, city, interests, password) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id', [first_name, second_name, sex, age, city, interests, crypto.createHash('sha256').update(password).digest('hex')]);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/*exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  try {
    const result = await pool.query('UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *', [name, email, id]);
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM users WHERE id = $1', [id]);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
*/