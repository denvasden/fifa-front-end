const COUNTRIES_WITHOUT_LEAGUES = [
  "WOMEN'S NATIONAL",
  "REST OF WORLD",
  "MEN'S NATIONAL",
];

const COUNTRY_MARKUP = "<h2>.*</h2>";
const LEAGUE_MARKUP = "<p><b>.*</b></p>";
const TEAM_MARKUP = "<p>(?!<b>).*(?!</b>)</p>";

module.exports = {
  COUNTRIES_WITHOUT_LEAGUES,
  COUNTRY_MARKUP,
  LEAGUE_MARKUP,
  TEAM_MARKUP,
};
