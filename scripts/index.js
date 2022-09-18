const axios = require("axios").default;
const {  parseFIFA } = require("./parseData");
const { writeDataToJSONFiles } = require("./utilities");

const URL = "https://www.ea.com/games/fifa/fifa-22/news/fifa-22-all-leagues-clubs-teams-list?setLocale=en-us"

async function getParsedData(URL) {

   const response = await axios(URL);

   return parseFIFA(response.data);
}

(async function () {

   const dataFIFA = await getParsedData(URL);

   writeDataToJSONFiles("../data", dataFIFA);
})()







