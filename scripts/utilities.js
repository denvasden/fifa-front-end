const fs = require("fs");

function parserText(textData, dataFIFA, substrStart = "ARGENTINA", substrEnd = "Wilstermann") {

   let indexStartIncludes = textData.indexOf(substrStart);
   let indexEnd = textData.lastIndexOf(substrEnd);
   let coreText;
   let arrayCountriesAndTeams;

   indexStartIncludes = textData.lastIndexOf("<h2>", indexStartIncludes);
   indexEnd = textData.indexOf("</p>", indexEnd);

   coreText = textData.slice(indexStartIncludes, indexEnd);
   arrayCountriesAndTeams = coreText.split("<h2>");

   arrayCountriesAndTeams.forEach(textBlock => parseBlock(textBlock, dataFIFA));
}

function parseBlock(textBlock, objectArrays) {

   let tempString;
   let endIndexTemp;
   let leaguesAndTeams;

   endIndexTemp = textBlock.indexOf("</h2>");
   tempString = filterString(textBlock.slice(0, endIndexTemp));

   if (tempString) objectArrays.countries.push(tempString);

   leaguesAndTeams = textBlock.split("<p>");
   leaguesAndTeams.splice(0, 1);

   leaguesAndTeams.forEach((leagueAndTeam, index) => {

      if (index === 0 && !leagueAndTeam.startsWith("<b>")) {
         objectArrays.leagues.push({ "country": objectArrays.countries[objectArrays.countries.length - 1], "league": objectArrays.countries[objectArrays.countries.length - 1] });
      }
      if (leagueAndTeam.startsWith("<b>")) {

         endIndexTemp = leagueAndTeam.indexOf("</b>")
         tempString = filterString(leagueAndTeam.slice(3, endIndexTemp));
         if (tempString) objectArrays.leagues.push({ "country": objectArrays.countries[objectArrays.countries.length - 1], "league": tempString });
      }
      else {

         endIndexTemp = leagueAndTeam.indexOf("</p>")
         tempString = filterString(leagueAndTeam.slice(0, endIndexTemp));

         if (tempString) objectArrays.teams.push({ ...objectArrays.leagues[objectArrays.leagues.length - 1], "team": tempString });
      }
   })
}

function filterString(str) {

   const unnecessarySimbols = ["(", "&", "*"];

   unnecessarySimbols.forEach(simbol =>
      str.indexOf(simbol) >= 0 ? str = str.slice(0, str.indexOf(simbol)) : null)

   if (str.length < 50) return str
   else return null;
}

function writeDataToJSONFiles(path, dataObject) {

   Object.keys(dataObject).forEach(key => writeToJSONFile(path, `${key}.json`, dataObject[key]));
}

function writeToJSONFile(path, fileName, data) {

   fs.mkdir(path, error => {
      if (!error || error.code === "EEXIST") {

         fs.writeFile(`${path}/${fileName}`, JSON.stringify(data),
            error => error ? alert(`Ошибка при создании файла: ${fileName}`) : null);
      }
      else alert("Ошибка при создании каталога: /data")
   });
}

module.exports = {
   writeDataToJSONFiles, parserText,
}