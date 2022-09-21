const axios = require("axios").default;

const { parseText } = require("./fifaDataParser/parseWithArray");
const { writeDataToJSONFiles } = require("./fifaDataParser/utilities");
const { FIFA_DATA_PATH } = require("./paths");

const URL =
  "https://www.ea.com/games/fifa/fifa-22/news/fifa-22-all-leagues-clubs-teams-list";

async function getParsedData(URL) {
  const response = await axios(URL);

  return parseText(response.data);
}

(async function () {
  const dataFIFA = await getParsedData(URL);

  writeDataToJSONFiles(FIFA_DATA_PATH, dataFIFA);
})();
