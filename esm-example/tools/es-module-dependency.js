"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.replace = void 0;
const path_1 = require("path");
const fs_1 = require("fs");
function replace(dirs) {
    // const args = process.argv;
    // const dirs = args.slice(2);
    const sourceDir = dirs[0];
    const target = dirs[1] || dirs[0];
    copyHtmlFiles(sourceDir, target);
    scanDir(target);
}
exports.replace = replace;
function copyHtmlFiles(dirPath, targetPath) {
    const dir = fs_1.opendirSync(dirPath);
    let dirent;
    while ((dirent = dir.readSync()) !== null) {
        const childPath = dirPath + (dirPath.endsWith(path_1.sep) ? '' : path_1.sep) + dirent.name;
        const childTargetPath = targetPath + (targetPath.endsWith(path_1.sep) ? '' : path_1.sep) + dirent.name;
        if (dirent.isDirectory()) {
            copyHtmlFiles(childPath, childTargetPath);
        }
        else if (dirent.name.match(/\.html$/i)) {
            fs_1.copyFileSync(childPath, childTargetPath);
        }
    }
}
function scanDir(dirPath) {
    const dir = fs_1.opendirSync(dirPath);
    let dirent;
    while ((dirent = dir.readSync()) !== null) {
        const childPath = dirPath + (dirPath.endsWith(path_1.sep) ? '' : path_1.sep) + dirent.name;
        if (dirent.isDirectory()) {
            scanDir(childPath);
        }
        else {
            changeFile(dirPath, dirent.name);
        }
    }
}
function changeFile(parentPath, fileName) {
    const filePath = path_1.resolve(parentPath, fileName);
    const fileString = fs_1.readFileSync(filePath).toString();
    const regex = /Component\(\{(.*\n)+.*template: ['|"](.*\.html)['|"]\s*\}\)/;
    const match = fileString.match(regex);
    if (!match) {
        return;
    }
    console.log('match', match);
    console.log('match0', match[0]);
    console.log('match1', match[1]);
    console.log('match2', match[2]);
    console.log('match3', match[3]);
    // match.forEach(console.log);
    const htmlPath = match[2];
    if (!htmlPath) {
        return;
    }
    // console.log(htmlPath);
    const content = fs_1.readFileSync(parentPath + path_1.sep + htmlPath.replace('./', ''), 'utf8');
    // const replacementLookup = `template: ${htmlPath}`;
    // const replacement = `template: \`${content}\``;
    // console.log('replacement', replacement);
    // const newFileString = fileString.replace(replacementLookup, replacement);
    const newFileString = fileString.replace('\'' + htmlPath + '\'', `\`${content}\``);
    console.log('newFileString', newFileString);
    fs_1.writeFileSync(filePath, newFileString, 'utf8');
}
