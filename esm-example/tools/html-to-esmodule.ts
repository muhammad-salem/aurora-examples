import path, { sep } from 'path';
import { argv } from 'process';
import { readFileSync, promises, writeFileSync, mkdirSync, existsSync } from 'fs';


async function htmlToJsModule(path: string, target: string) {
    const dir = await promises.opendir(path);
    if (!existsSync(target)) {
        mkdirSync(target);
    }
    for await (const dirent of dir) {
        if (dirent.isDirectory()) {
            const newPath = path + (path.endsWith(sep) ? '' : sep) + dirent.name;
            const newTarget = path + (path.endsWith(sep) ? '' : sep) + dirent.name;
            htmlToJsModule(newPath, newTarget);
        }
        else if (dirent.name.match(/\.html$/i)) {
            const content = readFileSync(path + sep + dirent.name, 'utf8');
            const template: string = `export default \`\n${content}\n\`;`;
            writeFileSync(target + sep + dirent.name + '.js', template, 'utf8');
            //console.log(dirent.name, content, template);
        }
    }
}
if (argv.length === 3) {
    htmlToJsModule(argv[2], argv[2]).catch(console.error);
} else {
    htmlToJsModule(argv[2], argv[3]).catch(console.error);
}

