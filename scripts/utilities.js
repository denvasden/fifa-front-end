const fs = require("fs");


function benchmark(numberIterations = 10, func, ...funcArgs) {
   const now = Date.now();

   for (let i = 0; i < numberIterations; i++)
      func(...funcArgs);

   return Date.now() - now;
}

function sanitize(string) {

   const HTMLRemove = string.replace(/<\/?\w*>/gi, '');

   return HTMLRemove.replace(/\r?\n/g, '').replace(/(Please note|[(,&,*]).*/, '')
}

function getOneAbstraction(string, tag, unincludesTag = "<b>") {

   const regExp = new RegExp(`<${tag}>.*</${tag}>`);
   const abstraction = string.match(regExp);

   if (abstraction && abstraction[0].includes(`>${unincludesTag}`)) return null

   return abstraction ? sanitize(abstraction[0]) : null;
}

function writeDataToJSONFiles(path, dataObject) {

   Object.keys(dataObject).forEach(key => writeToJSONFile(path, `${key}.json`, dataObject[key]));
}

function writeToJSONFile(path, fileName, data) {

   fs.mkdir(path, error => {
      if (!error || error.code === "EEXIST") {

         fs.writeFile(`${path}/${fileName}`, JSON.stringify(data),
            error => error ? console.log(`Ошибка при создании файла: ${fileName}`) : null);
      }
      else console.log(("Ошибка при создании каталога: /data"));
   });
}

function parseCountry(string){

   if (string.includes("</h2>")) {
      return sanitize(string);
   }   

}
function parseLeague(string){
   
   if (string.includes("</b2>")) {
      return sanitize(string);
   }   

}
function parseTeam(string){
   
   if (string.includes("</p>") && !string.includes("</b>")) {
      return sanitize(string);
   }
}

module.exports = {
   writeDataToJSONFiles, getOneAbstraction, benchmark, parseCountry, parseLeague, parseTeam
}