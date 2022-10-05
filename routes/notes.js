const express = require("express");
const { getNotes, createNote, deleteNote } = require("../database.js");
const router = express.Router();

router.get("/", async (req, res) => {
  let notes = getNotes();
	res.send(notes)
});

router.post("/create", (req, res) => {
	const {noteTitle, note, UserID} = req.body;
	createNote(noteTitle, note, UserID)
	res.send("note created");
})

router.delete("delete", (req, res) => {
	
})

module.exports = router;
