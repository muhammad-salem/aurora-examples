"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.convert = void 0;
const path_1 = require("path");
const fs_1 = require("fs");
function htmlToJsModule(path, target) {
    var e_1, _a;
    return __awaiter(this, void 0, void 0, function* () {
        const dir = yield fs_1.promises.opendir(path);
        if (!fs_1.existsSync(target)) {
            fs_1.mkdirSync(target);
        }
        try {
            for (var dir_1 = __asyncValues(dir), dir_1_1; dir_1_1 = yield dir_1.next(), !dir_1_1.done;) {
                const dirent = dir_1_1.value;
                if (dirent.isDirectory()) {
                    const newPath = path + (path.endsWith(path_1.sep) ? '' : path_1.sep) + dirent.name;
                    const newTarget = path + (path.endsWith(path_1.sep) ? '' : path_1.sep) + dirent.name;
                    htmlToJsModule(newPath, newTarget);
                }
                else if (dirent.name.match(/\.html$/i)) {
                    const content = fs_1.readFileSync(path + path_1.sep + dirent.name, 'utf8');
                    const template = `export default \`\n${content}\n\`;`;
                    fs_1.writeFileSync(target + path_1.sep + dirent.name + '.js', template, 'utf8');
                    //console.log(dirent.name, content, template);
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (dir_1_1 && !dir_1_1.done && (_a = dir_1.return)) yield _a.call(dir_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
    });
}
function convert(dirs) {
    if (dirs.length === 1) {
        htmlToJsModule(dirs[0], dirs[0]).catch(console.error);
    }
    else {
        htmlToJsModule(dirs[0], dirs[1]).catch(console.error);
    }
}
exports.convert = convert;
