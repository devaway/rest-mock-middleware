const fs = require('fs');
const path = require('path');

const walkSyncJson = function(dir) {
  let newFileList = [];

  files = fs.readdirSync(dir);
  files.forEach(function(file) {
    let stat = fs.statSync(dir + file);
    if (stat.isDirectory()) {
      newFileList = newFileList.concat(walkSyncJson(dir + file + '/'));
    } else {
      if (stat.isFile() && path.extname(dir + file).toLowerCase() === ".json") {
        newFileList.push(path.normalize(dir + file));
      }
    }
  });
  return newFileList;
};

module.exports = walkSyncJson;