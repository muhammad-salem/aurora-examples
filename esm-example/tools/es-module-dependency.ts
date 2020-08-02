
import { resolve, sep } from 'path';
import { readFileSync, opendirSync, Dirent, writeFileSync, existsSync, mkdirSync, copyFileSync } from 'fs';



export function replace(dirs: string[]) {
    // const args = process.argv;
    // const dirs = args.slice(2);

    const sourceDir = dirs[0];
    const target = dirs[1] || dirs[0];

    copyHtmlFiles(sourceDir, target);
    scanDir(target);
}

function copyHtmlFiles(dirPath: string, targetPath: string) {
    const dir = opendirSync(dirPath);
    let dirent: Dirent;
    while ((dirent = dir.readSync()) !== null) {
        const childPath = dirPath + (dirPath.endsWith(sep) ? '' : sep) + dirent.name;
        const childTargetPath = targetPath + (targetPath.endsWith(sep) ? '' : sep) + dirent.name;
        if (dirent.isDirectory()) {
            copyHtmlFiles(childPath, childTargetPath);
        }
        else if (dirent.name.match(/\.html$/i)) {
            copyFileSync(childPath, childTargetPath);
        }
    }

}


function scanDir(dirPath: string) {
    const dir = opendirSync(dirPath);
    let dirent: Dirent;
    while ((dirent = dir.readSync()) !== null) {
        const childPath = dirPath + (dirPath.endsWith(sep) ? '' : sep) + dirent.name;
        if (dirent.isDirectory()) {
            scanDir(childPath);
        }
        else {
            changeFile(dirPath, dirent.name);
        }
    }
}
function changeFile(parentPath: string, fileName: string) {
    const filePath = resolve(parentPath, fileName);
    const fileString = readFileSync(filePath).toString();
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

    const content = readFileSync(parentPath + sep + htmlPath.replace('./', ''), 'utf8');

    // const replacementLookup = `template: ${htmlPath}`;
    // const replacement = `template: \`${content}\``;
    // console.log('replacement', replacement);
    // const newFileString = fileString.replace(replacementLookup, replacement);
    const newFileString = fileString.replace('\'' + htmlPath + '\'', `\`${content}\``);
    console.log('newFileString', newFileString);

    writeFileSync(filePath, newFileString, 'utf8');
}
