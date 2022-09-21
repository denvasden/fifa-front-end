const {
  parseCountry,
  parseLeague,
  parseTeam,
  fixMarkupUniqueCommand,
} = require("./utilities");

const { COUNTRIES_WITHOUT_LEAGUE } = require("./constants");

function parseText(
  textData,
  substrStart = "<h2>ARGENTINA</h2",
  substrEnd = "<p>Wilstermann</p>"
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

  coreText = textData.slice(indexStartIncludes, indexEnd) + substrEnd;
  // Search for unique markup and reduction to standard
  coreText = fixMarkupUniqueCommand(coreText);

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

module.exports = {
  parseText,
};
