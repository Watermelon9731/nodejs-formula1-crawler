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

module.exports = { trimWhiteSpace, articleFilter };
