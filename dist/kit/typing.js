"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isPlainObject = exports.isStringArray = void 0;
/**
 * Checks if the given value is a {@link string[]}.
 */
function isStringArray(value) {
    return Array.isArray(value) && value.every(function (x) { return typeof x === "string"; });
}
exports.isStringArray = isStringArray;
/**
 * Checks if the given value is a {@link PlainObject}.
 */
function isPlainObject(value) {
    return typeof value === "object" && value !== null;
}
exports.isPlainObject = isPlainObject;
exports.default = { isStringArray: isStringArray, isPlainObject: isPlainObject };
//# sourceMappingURL=typing.js.map