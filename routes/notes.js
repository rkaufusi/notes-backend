const express = require("express");
const { getNotes } = require("../database.js");
const router = express.Router();

router.get("/", async (req, res) => {
  let notes = getNotes();
	res.send(notes)
});

module.exports = router;
