const express = require("express");
const router = express.Router();

router.get("/login", (req, res) => {
  res.send("here");
});

router.get("/create", (req, res) => {
  res.send("here");
});


module.exports = router;