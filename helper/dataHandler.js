const trimWhiteSpace = (rawStr = String) => {
  const str = rawStr.trim().replace(/\s+/g, "_").replaceAll("_", " ");
  return str;
};

const articleFilter = (rawData = Array) => {
  return rawData.map((item, idx) => {
    const separate = item[idx].split(":");
    let content = separate[1];
    if (!content) {
      content = "";
    }
    content = content.trim();
    // console.log(separate);
    const titleLength = separate[0].indexOf(" ");

    const title = separate[0].substring(0, titleLength);
    let tag = separate[0].substring(titleLength);
    if (!tag) {
      tag = "";
    }
    tag = tag.trim();

    return { title: title, tag: tag, content: content };
  });
};

const handleTableData = (tableData) => {
  for (const idx in tableData) {
    tableData[idx].forEach((item) => {
      delete item[0];
      delete item[7];
      for (const key in item) {
        item[key] = trimWhiteSpace(item[key]);
      }
    });
  }
  return tableData
};

const handleRaceResultsData = (cheerioLoad, loadTableClassName) => {
  const rawTableData = {
    head: [],
    body: [],
  };

  const listTarget = [
    { field: "head", parent: "thead tr", child: "th" },
    { field: "body", parent: "tbody tr", child: "td" },
  ];

  const table = cheerioLoad(loadTableClassName);

  listTarget.forEach((item) => {
    // $ = cheerio.load(html)
    // cheerioLoad = $
    // table = $(".loadTableClassName")
    table.find(item.parent).each((i, field) => {
      const fieldData = {};

      cheerioLoad(field)
        .find(item.child)
        .each((j, cell) => {
          fieldData[j] = cheerioLoad(cell).text();
        });

      rawTableData[item.field].push(fieldData);
    });
  });

  const tableData = handleTableData(rawTableData);

  return tableData;
};

module.exports = { trimWhiteSpace, articleFilter, handleRaceResultsData };
