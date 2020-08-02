
import { resolve, sep } from 'path';
import {
    readFileSync, opendirSync, Dirent,
    writeFileSync, copyFileSync, unlinkSync
} from 'fs';



export function replace(dirs: string[]) {
    // const args = process.argv;
    // const dirs = args.slice(2);

    const sourceDir = dirs[0];
    const target = dirs[1] || dirs[0];

    copyHtmlFiles(sourceDir, target);
    scanDir(target);
    removeHtmlFiles(target);
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

function removeHtmlFiles(targetPath: string) {
    const dir = opendirSync(targetPath);
    let dirent: Dirent;
    while ((dirent = dir.readSync()) !== null) {
        const childPath = targetPath + (targetPath.endsWith(sep) ? '' : sep) + dirent.name;
        if (dirent.isDirectory()) {
            removeHtmlFiles(childPath);
        }
        else if (dirent.name.match(/\.html$/i)) {
            unlinkSync(childPath);
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
    dir.close();
}
function changeFile(parentPath: string, fileName: string) {
    const filePath = resolve(parentPath, fileName);
    const fileString = readFileSync(filePath).toString();
    const regex = /Component\(\{(.*\n)+.*template: ['|"](.*\.html)['|"]\s*\}\)/;

    const match = fileString.match(regex);


    if (!match) {
        return;
    }
    const htmlPath = match[2];
    if (!htmlPath) {
        return;
    }
    const content = readFileSync(parentPath + sep + htmlPath.replace('./', ''), 'utf8');

    const replacementLookup = `template: '${htmlPath}'`;
    const replacement = `template: \`${content}\``;
    const newFileString = fileString.replace(replacementLookup, replacement);
    // const newFileString = fileString.replace('\'' + htmlPath + '\'', `\`${content}\``);

    writeFileSync(filePath, newFileString, 'utf8');
}
