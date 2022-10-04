const express = require("express");
const {login, createUser, getNotes} = require("../database.js");
const router = express.Router();

router.post("/login", async (req, res) => {
	let {name, password} = req.body;
	let isValidUser = await login(name, password);
	console.log(isValidUser);
  res.send(isValidUser);
});

router.post("/create", (req, res) => {
	let {name, password} = req.body;
	createUser(name, password);
  res.send("here");
});

module.exports = router;