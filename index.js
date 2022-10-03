const express = require("express");
const cors = require("cors");
const PORT = process.env.PORT || 3500;
const users = require('./routes/users.js')
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/", users);

app.listen(PORT, (req, res) => {
  console.log(`Listening on port ${PORT}`);
});
