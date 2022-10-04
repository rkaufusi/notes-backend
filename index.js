const express = require("express");
const cors = require("cors");
const {pool} = require("./database.js")
require("dotenv").config();

const port = process.env.PORT;
const users = require("./routes/users.js");
const notes = require("./routes/notes.js");

const app = express();
app.use(express.json());
app.use(cors());

app.use("/", users);
app.use("notes", notes);

app.listen(port, (req, res) => {
  console.log(`Listening on port ${port}`);
});
