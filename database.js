const mysql = require("mysql2");
const bcrypt = require("bcryptjs");
const user = process.env.USER;
const password = process.env.DB_PASSWORD;

const pool = mysql
  .createPool({
    host: "127.0.0.1",
    user: user,
    password: password,
    database: "notesAppDB",
  })
  .promise();

async function login(userName, pass) {
  let [user] = await pool.query(`SELECT * FROM users WHERE username = ?`, [
    userName,
  ]);

  async function createUser(userName, pass) {
    await pool.query(`INSERT INTO users (username, password) VALUES (? , ?)`, [
      userName,
      pass,
    ]);
    return "user created";
  }

	async function getNotes(id){
		let notes = pool.query(`SELECT * FROM notes WHERE id = ?`, [id]);
		return notes;
	}
}
