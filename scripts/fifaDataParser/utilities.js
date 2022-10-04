const fs = require("fs/promises");

const { COUNTRY_MARKUP, LEAGUE_MARKUP, TEAM_MARKUP } = require("./constants");

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

module.exports = {
  parseCountry,
  parseLeague,
  parseTeam,
  writeData,
};
