const fs = require("fs");

const readJSONFile = async (filePath = String) => {
  const jsonData = await fs.readFileSync(filePath);
  return JSON.parse(jsonData);
};

const writeJSONFile = async (rawData, fileName = String) => {
  const jsonData = JSON.stringify(rawData);
  await fs.writeFileSync(fileName, jsonData);
};

module.exports = { readJSONFile, writeJSONFile };
