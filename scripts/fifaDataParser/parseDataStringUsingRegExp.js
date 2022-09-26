const { parseCountry, parseLeague, parseTeam } = require("./utilities");
const {
  COUNTRIES_WITHOUT_LEAGUES,
  COUNTRY_MARKUP,
  LEAGUE_MARKUP,
  TEAM_MARKUP,
} = require("./constants");

function parseDataString(dataString = "") {
  const result = {
    countries: [],
    leagues: [],
    teams: [],
  };
  const regExp = new RegExp(
    `${COUNTRY_MARKUP}|${LEAGUE_MARKUP}|${TEAM_MARKUP}`,
    "gi"
  );
  let match;

  while ((match = regExp.exec(dataString))) {
    if (!match) {
      break;
    }

    const country = parseCountry(match[0]);
    const league = parseLeague(match[0]);
    const team = parseTeam(match[0]);

    const lastFoundCountry = result.countries[result.countries.length - 1];
    const lastFoundLeague = result.leagues[result.leagues.length - 1];

    country && result.countries.push(country);
    league && result.leagues.push({ country: lastFoundCountry, league });
    team && result.teams.push({ ...lastFoundLeague, team });

    if (COUNTRIES_WITHOUT_LEAGUES.includes(country)) {
      result.leagues.push({ country, league: country });
    }
  }

  return result;
}

module.exports = {
  parseDataString,
};
