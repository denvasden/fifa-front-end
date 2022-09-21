const fs = require("fs");

function benchmark(numberIterations = 10, func, ...funcArgs) {
  const now = Date.now();

  for (let i = 0; i < numberIterations; i++) func(...funcArgs);

  return Date.now() - now;
}

function sanitize(string) {
  // Remove tags, unnecessary substrings, line break characters from the passed string
  return string
    .replace(/<\/?\w*>|\r?\n/g, "")
    .replace(/Please note.*|[(,&*].*/g, "");
}

function getSanitizeString(string, tag, unincludesTag = "<b>") {
  // Unique case, works only with non-standard command markup
  const uniqueMarkupTeam = string.match(/(.*<\/p>)|<p>.*<br>/);
  if (uniqueMarkupTeam && tag === "p") return sanitize(uniqueMarkupTeam[0]);

  // Standard case
  const regExp = new RegExp(`<${tag}>.*</${tag}>`);
  const abstraction = string.match(regExp);

  if (abstraction && abstraction[0].includes(`>${unincludesTag}`)) return null;

  return abstraction ? sanitize(abstraction[0]) : null;
}

function writeDataToJSONFiles(path, dataObject) {
  Object.keys(dataObject).forEach((key) =>
    writeToJSONFile(path, `${key}.json`, dataObject[key])
  );
}

function writeToJSONFile(path, fileName, data) {
  fs.mkdir(path, (error) => {
    if (!error || error.code === "EEXIST") {
      fs.writeFile(`${path}/${fileName}`, JSON.stringify(data), (error) =>
        error ? console.log(`Ошибка при создании файла: ${fileName}`) : null
      );
    } else console.log("Ошибка при создании каталога: /data");
  });
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
  writeDataToJSONFiles,
  getSanitizeString,
  benchmark,
  parseCountry,
  parseLeague,
  parseTeam,
  fixMarkupUniqueCommand,
};
