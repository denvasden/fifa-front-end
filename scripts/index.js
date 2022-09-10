const axios = require("axios").default;
const { parserText, writeDataToJSONFiles } = require("./utilities");

const dataFIFA = {
   countries: [],
   leagues: [],
   teams: [],
};

const URLFIFA = "https://www.ea.com/ru-ru/games/fifa/fifa-22/news/fifa-22-all-leagues-clubs-teams-list";

async function getAndWriteDataFifa(URL) {

   const response = await axios(URL);

   parserText(response.data, dataFIFA);
   writeDataToJSONFiles("../data", dataFIFA);
}

getAndWriteDataFifa(URLFIFA);




