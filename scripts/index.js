const axios = require("axios").default;
const { parserText, writeDataToJSONFiles, parserFIFA, benchmark } = require("./utilities");

const URLFIFA = "https://www.ea.com/games/fifa/fifa-22/news/fifa-22-all-leagues-clubs-teams-list?setLocale=en-us"

async function getAndWriteDataFifa(URL) {

   const response = await axios(URL);

   const dataFIFA = parserFIFA(response.data);
   writeDataToJSONFiles("../data", dataFIFA);
}

getAndWriteDataFifa(URLFIFA);




