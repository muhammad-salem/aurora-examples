"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const es_module_dependency_1 = require("./es-module-dependency");
const html_to_esmodule_1 = require("./html-to-esmodule");
function main() {
    const args = process.argv;
    const dirs = args.slice(2);
    es_module_dependency_1.replace(dirs);
    html_to_esmodule_1.convert(dirs);
}
main();
