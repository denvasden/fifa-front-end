const axios = require("axios").default;

const {
  parseDataString,
} = require("./fifaDataParser/parseDataStringUsingRegExp");
const { writeData } = require("./fifaDataParser/utilities");
const { FIFA_DATA_PATH } = require("./paths");

const URL =
  "https://www.ea.com/games/fifa/fifa-23/news/fifa-23-all-leagues-clubs-teams-list";

function parseFIFAData(string) {
  const indexStart = string.indexOf("<h2>ARGENTINA</h2>");
  const indexEnd = string.indexOf("<h1>WOMEN'S FOOTBALL</h1>");
  const dataString = string.substring(indexStart, indexEnd);

  return parseDataString(dataString);
}

async function getParsedData(URL) {
  const response = await axios(URL);

  return parseFIFAData(response.data);
}

(async function () {
  const fifaData = await getParsedData(URL);

  await writeData(FIFA_DATA_PATH, fifaData);
})();
