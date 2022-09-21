const fs = require("fs/promises");

function benchmark(numberIterations = 10, func, ...funcArgs) {
  const now = Date.now();

  for (let i = 0; i < numberIterations; i++) func(...funcArgs);

  return Date.now() - now;
}

function sanitize(string) {
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

function parseCountry(string) {
  if (string.includes("</h2>")) {
    return sanitize(string);
  }
}

function parseLeague(string) {
  if (string.includes("</b>")) {
    return sanitize(string);
  }
}

function parseTeam(string) {
  if (string.includes("</p>") && !string.includes("</b>")) {
    return sanitize(string);
  }
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
