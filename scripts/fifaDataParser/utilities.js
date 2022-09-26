const fs = require("fs/promises");

const { COUNTRY_MARKUP, LEAGUE_MARKUP, TEAM_MARKUP } = require("./constants");

function benchmark(numberIterations = 10, func, ...funcArgs) {
  const now = Date.now();

  for (let i = 0; i < numberIterations; i++) func(...funcArgs);

  return Date.now() - now;
}

function sanitize(string = "") {
  const controlCharacters = "\\r?\\n";
  const htmlMarkup = "<\\/?\\w*>";
  const specialCharacters = "[(,&*].*";
  const specialStrings = "Please note.*";

  return string.replace(
    new RegExp(
      `${controlCharacters}|${htmlMarkup}|${specialCharacters}|${specialStrings}`,
      "gi"
    ),
    ""
  );
}

function getSanitizedString(string, tag, unincludesTag = "<b>") {
  // Unique case, works only with non-standard command markup
  const uniqueMarkupTeam = string.match(/(.*<\/p>)|<p>.*<br>/);
  if (uniqueMarkupTeam && tag === "p") return sanitize(uniqueMarkupTeam[0]);

  // Standard case
  const regExp = new RegExp(`<${tag}>.*</${tag}>`);
  const abstraction = string.match(regExp);

  if (abstraction && abstraction[0].includes(`>${unincludesTag}`)) return null;

  return abstraction ? sanitize(abstraction[0]) : null;
}

async function writeData(path, data) {
  try {
    await fs.rm(path, { recursive: true });
    await fs.mkdir(path);
  } catch (error) {
    console.error(error);
  }

  Object.entries(data).forEach(([fileName, data]) =>
    writeFile(`${path}/${fileName}.json`, JSON.stringify(data))
  );
}

async function writeFile(path, data) {
  try {
    await fs.writeFile(path, data);
  } catch (error) {
    console.error(error);
  }
}

function parseCountry(string = "") {
  const regExp = new RegExp(COUNTRY_MARKUP, "gi");
  const match = regExp.exec(string);

  if (!match) {
    return null;
  }

  return sanitize(match[0]);
}

function parseLeague(string = "") {
  const regExp = new RegExp(LEAGUE_MARKUP, "gi");
  const match = regExp.exec(string);

  if (!match) {
    return null;
  }

  return sanitize(match[0]);
}

function parseTeam(string = "") {
  const regExp = new RegExp(TEAM_MARKUP, "gi");
  const match = regExp.exec(string);

  if (!match) {
    return null;
  }

  return sanitize(match[0]);
}

function fixMarkupUniqueCommand(string) {
  return string.replace("<br>", "</p><p>");
}

module.exports = {
  getSanitizedString,
  benchmark,
  parseCountry,
  parseLeague,
  parseTeam,
  fixMarkupUniqueCommand,
  writeData,
};
