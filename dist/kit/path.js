"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sibling = exports.dirname = void 0;
/**
 * Gets the dirname of the given payload field path.
 *
 * @param path the payload field path
 * @returns [`dir` the dirname, `ok` if it is successfully extracted]
 */
function dirname(path) {
    var dot = path.lastIndexOf(".");
    if (dot === -1) {
        return [path, false];
    }
    return [path.substring(0, dot), true];
}
exports.dirname = dirname;
/**
 * Gets the sibling's path of the given payload field path, identified by the
 * given name.
 *
 * @param path the payload field path
 * @param name the name of the target sibling
 * @returns the sibling's payload field path
 */
function sibling(path, name) {
    var _a = dirname(path), dir = _a[0], ok = _a[1];
    if (!ok) {
        // if the dir could not be obtained, assume it as the root
        return name;
    }
    return "".concat(dir, ".").concat(name);
}
exports.sibling = sibling;
exports.default = { dirname: dirname, sibling: sibling };
//# sourceMappingURL=path.js.map