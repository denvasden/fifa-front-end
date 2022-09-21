const { getSanitizeString } = require("./utilities");

const { COUNTRIES_WITHOUT_LEAGUE } = require("./constants");

function parseFIFA(
  textData,
  substrStart = "<h2>ARGENTINA</h2>",
  substrEnd = "<p>Wilstermann</p>"
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

  const regExp = /(<h2>.*<\/h2>)|(<p>.*<\/p>)|(<p>.*<br>)|(.*<\/p>)/g;
  let abstraction;

  while ((abstraction = regExp.exec(coreText))) {
    const lastCountries = dataFIFA.countries[dataFIFA.countries.length - 1];
    const lastLegaues = dataFIFA.leagues[dataFIFA.leagues.length - 1];
    console.log(abstraction[0]);
    const country = getSanitizeString(abstraction[0], "h2");
    const league = getSanitizeString(abstraction[0], "b");
    const team = getSanitizeString(abstraction[0], "p");

    country && dataFIFA.countries.push(country);
    league && dataFIFA.leagues.push({ country: lastCountries, league: league });
    team && dataFIFA.teams.push({ ...lastLegaues, team: team });

    if (COUNTRIES_WITHOUT_LEAGUE.includes(country))
      dataFIFA.leagues.push({ country: country, league: country });
  }
  return dataFIFA;
}

module.exports = {
  parseFIFA,
};
