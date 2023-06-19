const express = require("express");
const { getLatestPageData } = require("../service/dataCrawl");
const router = express.Router();

/* GET home page. */
router.get("/latest", async (req, res) => {
  await getLatestPageData();
  res.render("index", { title: "Express" });
});

module.exports = router;
