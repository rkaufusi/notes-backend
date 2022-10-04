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

pool.query(`CREATE TABLE if not exists users (
    UserID int NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name varchar(255),
    password varchar(255)
	);`);

pool.query(`CREATE TABLE if not exists notes (
    NoteID int NOT NULL PRIMARY KEY AUTO_INCREMENT,
		noteTitle varchar(255),
    note varchar(255),
    UserID int,
    FOREIGN KEY (UserID) REFERENCES users(UserID) ON DELETE CASCADE
	);`);

async function login(userName, pass) {
  try {
    let [[user]] = await pool.query(`SELECT * FROM users WHERE name = ?`, [
      userName,
    ]);
    console.log(user.UserID);
    const isValidUser = await bcrypt.compare(pass, user.password);
    if (isValidUser) {
      let notes = getNotes(user.UserID);
      return notes;
    }
  } catch (error) {
    console.log(error);
  }
  return false;
}

async function createUser(name, pass) {
  try {
    const encryptedPassword = await bcrypt.hash(pass, 10);
    await pool.query(`INSERT INTO users (name, password) VALUES (? , ?)`, [
      name,
      encryptedPassword,
    ]);
    console.log("user created");
    return "user created";
  } catch (error) {
    console.log(error);
		return "user note created";
  }
}

async function getNotes(id) {
	try {
		let [notes] = await pool.query(`SELECT * FROM notes WHERE userid = ?`, [id]);
		return notes;
	} catch (error) {
		console.log(error);
	}
}

async function createNote(userID, title, note) {
  await pool.query(
    `INSERT INTO notes (noteTitle, note, UserID) 
	VALUES (?, ?, ?)`,
    [title, note, userID]
  );
  return;
}
async function deleteUser(name) {
  await pool.query(`DELETE from users WHERE name = ?`, [name]);
  return;
}
async function deleteNote(title) {
  await pool.query(`DELETE from notes WHERE name = noteTitle`, [title]);
  return;
}

module.exports = {
  pool,
  login,
  createUser,
  getNotes,
  deleteUser,
  createNote,
  deleteNote,
};
