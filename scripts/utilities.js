const fs = require("fs");



function parserText(textData, substrStart = "ARGENTINA", substrEnd = "Wilstermann") {

   const dataFIFA = {
      countries: [],
      leagues: [],
      teams: [],
   };

   let indexStartIncludes = textData.indexOf(substrStart);
   let indexEnd = textData.lastIndexOf(substrEnd);
   let coreText;
   let arrayCountriesAndTeams;

   indexStartIncludes = textData.lastIndexOf("<h2>", indexStartIncludes);
   indexEnd = textData.indexOf("</p>", indexEnd);

   coreText = textData.slice(indexStartIncludes, indexEnd);
   arrayCountriesAndTeams = coreText.split("<h2>");

   arrayCountriesAndTeams.forEach(textBlock => parseBlock(textBlock, dataFIFA));

   return dataFIFA;
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
            error => error ? console.log(`Ошибка при создании файла: ${fileName}`) : null);
      }
      else console.log(("Ошибка при создании каталога: /data"));
   });
}




function parserFIFA(textData, substrStart = "ARGENTINA", substrEnd = "Wilstermann") {

   const indexIncludesSubstrStart = textData.indexOf(substrStart);
   const indexIncludesSubstrEnd = textData.lastIndexOf(substrEnd);

   let coreText;

   const indexStartBlockText = textData.lastIndexOf("<h2>", indexIncludesSubstrStart);
   const indexEndBlockText = textData.indexOf("</p>", indexIncludesSubstrEnd);

   coreText = textData.slice(indexStartBlockText, indexEndBlockText);

   return parserCore(coreText);
}

function parserCore(coreText) {

   const dataFIFA = {
      countries: [],
      leagues: [],
      teams: [],
   };

   let indexStart, indexEnd = 0;

   while (indexEnd !== coreText.length - 1) {

      indexEnd = coreText.indexOf("\r\n", indexStart) < 0 ? coreText.length - 1 : coreText.indexOf("\r\n", indexStart);

      const lastContries = dataFIFA.countries[dataFIFA.countries.length - 1];
      const lastLegaues = dataFIFA.leagues[dataFIFA.leagues.length - 1];

      let oneLine = coreText.slice(indexStart, indexEnd);

      const country = parseCountry(oneLine);
      const league = parseLeague(oneLine);
      const team = parseTeam(oneLine);

      country && dataFIFA.countries.push(country);
      league && dataFIFA.leagues.push({ "country": lastContries, "league": league });
      team && dataFIFA.teams.push({ ...lastLegaues, "team": team });

      if (dataFIFA.leagues[dataFIFA.leagues.length - 1] && dataFIFA.leagues[dataFIFA.leagues.length - 1].country !== lastContries)
         dataFIFA.leagues.push({ "country": lastContries, "league": lastContries })
      // indexEnd +1 necessarily, otherwise it enters an infinite loop, because always finds a substring in the same place
      indexStart = indexEnd + 1;
   }

   return dataFIFA;
}


function parseCountry(textLine) {

   if (textLine.includes("<h2>"))
      return filterString(getCleanString(textLine))
}

function parseLeague(textLine) {

   if (textLine.includes("<b>"))
      return filterString(getCleanString(textLine))
}

function parseTeam(textLine) {

   if (textLine.includes("<p>") && !textLine.includes("<b>"))
      return filterString(getCleanString(textLine))
}

function getCleanString(line) {

   const cleanString = line.replace(/\n/, '').replace(/<\/?[a-z][a-z0-9]*>/gi, '');

   return cleanString;
}

function benchmark(func, ...funcArgs) {
   const now = Date.now();

   func(...funcArgs);

   return Date.now() - now;
}

module.exports = {
   writeDataToJSONFiles, parserText, parserFIFA, benchmark
}