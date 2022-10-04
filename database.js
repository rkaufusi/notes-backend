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
  let [[user]] = await pool.query(`SELECT * FROM users WHERE name = ?`, [
    userName,
  ]);
	console.log(user.UserID);
	const isValidUser = await bcrypt.compare(pass, user.password);
	if(isValidUser){
		let notes = getNotes(user.UserID)
		return notes;
	}
	return false;
}

async function createUser(name, pass) {
	const encryptedPassword = await bcrypt.hash(pass, 10);
  await pool.query(`INSERT INTO users (name, password) VALUES (? , ?)`, [
    name,
    encryptedPassword,
  ]);
	console.log("user created");
  return "user created";
}

async function getNotes(id) {
  let [notes] = await pool.query(`SELECT * FROM notes WHERE userid = ?`, [id]);
  return notes;
}

async function createNote(){
	// stuff
}
async function deleteUser(){
	// stuff
}
async function deleteNotes(){
	// stuff
}

module.exports = { pool, login, createUser, getNotes };
