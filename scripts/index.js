const axios = require("axios").default;
const path = require("path");
const { parseText } = require("./fifaDataParser/parseWithArray");
const { writeDataToJSONFiles } = require("./fifaDataParser/utilities");

const URL =
  "https://www.ea.com/games/fifa/fifa-22/news/fifa-22-all-leagues-clubs-teams-list?setLocale=en-us";

const pathToData = path.dirname(__dirname, "index.js") + "/data";

async function getParsedData(URL) {
  const response = await axios(URL);

  return parseText(response.data);
}

(async function () {
  const dataFIFA = await getParsedData(URL);

  writeDataToJSONFiles(pathToData, dataFIFA);
})();
