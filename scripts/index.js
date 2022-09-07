<<<<<<< HEAD
const axios = require("axios").default;
const { parserText, writeDataToJSONFiles, parserFIFA, benchmark } = require("./utilities");

const URLFIFA = "https://www.ea.com/games/fifa/fifa-22/news/fifa-22-all-leagues-clubs-teams-list?setLocale=en-us"

async function getAndWriteDataFifa(URL) {

   const response = await axios(URL);

   // parserText(response.data);
   // writeDataToJSONFiles("../data", dataFIFA);
   console.log(benchmark(parserText, response.data));
   console.log(benchmark(parserFIFA, response.data));
   
    
   
}

getAndWriteDataFifa(URLFIFA);




=======
>>>>>>> 5228d93 (Revert "Verify lint-staged")
