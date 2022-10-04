const express = require("express");
const {login, createUser, deleteUser} = require("../database.js");
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
  res.send("user created");
});

router.delete("/delete", (req, res) => {
	let { name } = req.body;
	deleteUser(name);
	res.send("user deleted");
})

module.exports = router;