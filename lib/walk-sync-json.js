import fs from 'fs';
import path from 'path';

const walkSyncJson = (dir) => {
    let newFileList = [];

    const files = fs.readdirSync(dir);
    files.forEach(function (file) {
        let stat = fs.statSync(dir + file);
        if (stat.isDirectory()) {
            newFileList = newFileList.concat(walkSyncJson(dir + file + '/'));
        } else {
            if (
                stat.isFile() &&
                path.extname(dir + file).toLowerCase() === '.json'
            ) {
                newFileList.push(path.normalize(dir + file));
            }
        }
    });
    return newFileList;
};

export default walkSyncJson;
