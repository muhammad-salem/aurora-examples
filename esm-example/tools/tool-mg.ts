import { replace } from "./es-module-dependency";
import { convert } from "./html-to-esmodule";

function main() {
    const args = process.argv;
    const dirs = args.slice(2);
    replace(dirs);
    convert(dirs);
}
main();