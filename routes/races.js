const express = require("express");
const { getPageResultsData } = require("../service/dataCrawl");
const { readJSONFile } = require("../helper/jsonFileHandler");
const router = express.Router();

router.get("/races/:slug", async (req, res) => {
  const slug = req.params.slug;
  const query = req.query;

  if (!slug || !query.field || !query.location) {
    return res.status(404).send({ message: "Not found" });
  }

  let data = {};
  try {
    switch (query.field) {
      case "team":
        await getPageResultsData(
          slug,
          query.field,
          "constructorStandings.json"
        );
        data = await readJSONFile("./constructorStandings.json");
        break;

      case "drivers":
        await getPageResultsData(slug, query.field, "driverStandings.json");
        data = await readJSONFile("./driverStandings.json");
        break;

      default:
        await getPageResultsData(slug, query.field, "raceResults.json");
        data = await readJSONFile("./raceResults.json");
        break;
    }
    res.send(data);
  } catch (err) {
    res.status(404).send({ message: "Not found" });
  }
});

module.exports = router;
