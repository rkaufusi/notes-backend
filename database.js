const mysql = require("mysql2");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const user = process.env.APP_USER;
const password = process.env.DB_PASSWORD;

const pool = mysql
  .createPool({
    host: "127.0.0.1",
    user: user,
    password: password,
    database: "notesAppDB",
  })
  .promise();

async function createTables() {
  await pool.query(`CREATE TABLE if not exists users (
    UserID int NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name varchar(255),
    password varchar(255)
	);`);

  await pool.query(`CREATE TABLE if not exists notes (
    NoteID int NOT NULL PRIMARY KEY AUTO_INCREMENT,
		noteTitle varchar(255),
    note varchar(255),
    UserID int,
    FOREIGN KEY (UserID) REFERENCES users(UserID)
	);`);
}

createTables();

async function login(userName, pass) {
  let [user] = await pool.query(`SELECT * FROM users WHERE username = ?`, [
    userName,
  ]);
}
async function createUser(userName, pass) {
  await pool.query(`INSERT INTO users (username, password) VALUES (? , ?)`, [
    userName,
    pass,
  ]);
  return "user created";
}

async function getNotes(id) {
  let notes = pool.query(`SELECT * FROM notes WHERE id = ?`, [id]);
  return notes;
}

async function createNote(){
	// stuff
}

module.exports = { pool, login, createUser, getNotes };
