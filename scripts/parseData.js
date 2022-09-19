const {
  getOneAbstraction,
  parseCountry,
  parseLeague,
  parseTeam,
} = require("./utilities");

const COUNTRIES_WITHOUT_LEAGUE = [
  "WOMEN'S NATIONAL",
  "REST OF WORLD",
  "MEN'S NATIONAL",
];

function parseText(
  textData,
  substrStart = "ARGENTINA",
  substrEnd = "Wilstermann"
) {
  const dataFIFA = {
    countries: [],
    leagues: [],
    teams: [],
  };

  let indexStartIncludes = textData.indexOf(substrStart);
  let indexEnd = textData.lastIndexOf(substrEnd);
  let coreText;
  let arrayCountriesAndTeams;

  indexEnd = textData.indexOf("</p>", indexEnd);

  coreText = textData.slice(indexStartIncludes, indexEnd) + "</p>";

  arrayCountriesAndTeams = coreText.split("<h2>");

  arrayCountriesAndTeams.forEach((textBlock) =>
    parseBlock(textBlock, dataFIFA)
  );

  return dataFIFA;
}

function parseBlock(textBlock, dataFIFA) {
  let contriesLeaguesAndTeams = textBlock.split("<p>");

  contriesLeaguesAndTeams.forEach((line) => {
    const country = parseCountry(line);
    const league = parseLeague(line);
    const team = parseTeam(line);

    country && dataFIFA.countries.push(country);
    league &&
      dataFIFA.leagues.push({
        country: dataFIFA.countries[dataFIFA.countries.length - 1],
        league: league,
      });
    team &&
      dataFIFA.teams.push({
        ...dataFIFA.leagues[dataFIFA.leagues.length - 1],
        team: team,
      });

    if (COUNTRIES_WITHOUT_LEAGUE.includes(country))
      dataFIFA.leagues.push({ country: country, league: country });
  });
}

// -----------------------------------------------------------------------------------------------//

function parseFIFA(
  textData,
  substrStart = "<h2>ARGENTINA",
  substrEnd = "Wilstermann</p>"
) {
  const indexIncludesSubstrStart = textData.indexOf(substrStart);
  const indexIncludesSubstrEnd = textData.lastIndexOf(substrEnd);

  const coreText =
    textData.slice(indexIncludesSubstrStart, indexIncludesSubstrEnd) +
    substrEnd;

  return parseCore(coreText);
}

function parseCore(coreText) {
  const dataFIFA = {
    countries: [],
    leagues: [],
    teams: [],
  };

  const regExp = /<h2>.*<\/h2>|<p>.*<\/p>/g;
  let abstraction;

  while ((abstraction = regExp.exec(coreText))) {
    const lastCountries = dataFIFA.countries[dataFIFA.countries.length - 1];
    const lastLegaues = dataFIFA.leagues[dataFIFA.leagues.length - 1];

    const country = getOneAbstraction(abstraction[0], "h2");
    const league = getOneAbstraction(abstraction[0], "b");
    const team = getOneAbstraction(abstraction[0], "p");

    country && dataFIFA.countries.push(country);
    league && dataFIFA.leagues.push({ country: lastCountries, league: league });
    team && dataFIFA.teams.push({ ...lastLegaues, team: team });

    if (COUNTRIES_WITHOUT_LEAGUE.includes(country))
      dataFIFA.leagues.push({ country: country, league: country });
  }
  return dataFIFA;
}

module.exports = {
  parseText,
  parseFIFA,
};
