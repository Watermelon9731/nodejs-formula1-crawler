// setup cheerio and request-promise
const cheerio = require("cheerio");
const request = require("request-promise");
const fs = require("fs");
const { trimWhiteSpace, articleFilter } = require("../helper/dataHandler");

const latest = "https://formula1.com/en/latest.html";

const getLatestPageData = async () => {
  return request(latest, (err, res, html) => {
    if (!err && res.statusCode == 200) {
      const $ = cheerio.load(html);
      let rawData = [];

      $(".f1-cc--caption").each((idx, el) => {
        const article = $(el).find(".f1-cc--caption p").text();

        const handleData = trimWhiteSpace(article);

        rawData.push({ [idx]: handleData });
      });
      const jsonRawData = JSON.stringify(rawData);

      fs.writeFileSync("rawData.json", jsonRawData);

      const dataRestructuring = articleFilter(rawData);

      const jsonData = JSON.stringify(dataRestructuring);

      fs.writeFileSync("data.json", jsonData);
    } else {
      console.log(err);
    }
  });
};

module.exports = getLatestPageData;
