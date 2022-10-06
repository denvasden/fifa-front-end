const COUNTRIES_WITHOUT_LEAGUES = [
  "WOMEN'S NATIONAL",
  "REST OF WORLD",
  "MEN'S NATIONAL",
];
const NOT_COUNTRIES = ["LALIGA SMARTBANK"];

const COUNTRY_MARKUP = '<h2>.*</h2>|<h2 class=".*">.*</h2>';
const LEAGUE_MARKUP = "<h3>.*</h3>";
const TEAM_MARKUP = "<p>(?!<b>).*(?!</b>)</p>";

module.exports = {
  COUNTRIES_WITHOUT_LEAGUES,
  COUNTRY_MARKUP,
  LEAGUE_MARKUP,
  NOT_COUNTRIES,
  TEAM_MARKUP,
};
