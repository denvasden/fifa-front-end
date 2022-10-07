const path = require("path");

const DATA_DIRECTORY_NAME = "data";
const PROJECT_DIRECTORY_NAME = "fifa-front-end";

const PROJECT_ROOT_PATH = path.resolve(
  __dirname.slice(0, __dirname.indexOf(PROJECT_DIRECTORY_NAME)),
  PROJECT_DIRECTORY_NAME
);
const FIFA_DATA_PATH = path.resolve(PROJECT_ROOT_PATH, DATA_DIRECTORY_NAME);

module.exports = {
  FIFA_DATA_PATH,
};
