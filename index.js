const express = require("express");
const cors = require("cors");
require("dotenv").config();

const port = process.env.PORT;
const users = require("./routes/users.js");

const app = express();
app.use(express.json());
app.use(cors());

app.use("/", users);

app.listen(port, (req, res) => {
  console.log(`Listening on port ${port}`);
});
