const express = require("express");
const router = express.Router();

router.get("/races", async (req, res) => {
  res.send("race results");
});

module.exports = router;
