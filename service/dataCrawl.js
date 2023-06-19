// setup cheerio and request-promise
const cheerio = require("cheerio");
const request = require("request-promise");
const fs = require("fs");
const {
  trimWhiteSpace,
  articleFilter,
  handleRaceResultsData,
} = require("../helper/dataHandler");
const { writeJSONFile } = require("../helper/jsonFileHandler");

const getLatestPageData = async () => {
  const latest = "https://formula1.com/en/latest.html";
  return request(latest, (err, res, html) => {
    if (!err && res.statusCode === 200) {
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

const getPageResultsData = async (year, field, outputFile) => {
  const target = `https://formula1.com/en/results.html/${year}/${field}.html`;
  console.log(target);
  return request(target, (err, res, html) => {
    if (!err && res.statusCode === 200) {
      // Setup cheerio to use jquery on html
      const $ = cheerio.load(html);

      // const table = $(".resultsarchive-table");

      // table.find("thead tr").each((i, header) => {
      //   const headerData = {};

      //   $(header).find("th").each((j, cell) => {
      //     headerData[j] = $(cell).text()
      //   })

      //   tableData.head.push(headerData);
      // });

      // tableData.head.forEach((item, idx) => {
      //   delete item[0]
      //   delete item[7]
      //   for (const key in item) {
      //     item[key] = trimWhiteSpace(item[key]);
      //   }
      // })

      // table.find("tbody tr").each((i, row) => {
      //   const rowData = {};

      //   $(row)
      //     .find("td")
      //     .each((j, cell) => {
      //       rowData[j] = $(cell).text();
      //     });
      //   tableData.body.push(rowData);
      // });

      // tableData.body.forEach((item, idx) => {
      //   delete item[0];
      //   delete item[7];
      //   for (const key in item) {
      //     item[key] = trimWhiteSpace(item[key]);
      //   }
      // });

      const tableData = handleRaceResultsData($, ".resultsarchive-table");

      writeJSONFile(tableData, outputFile);
    } else {
      console.log(err);
    }
  });
};

module.exports = { getLatestPageData, getPageResultsData };
