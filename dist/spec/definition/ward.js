"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.should = void 0;
function should(_a, verb, fallback) {
    var _b, _c;
    var custom = _a.custom;
    if (fallback === void 0) { fallback = true; }
    var should = (_b = custom === null || custom === void 0 ? void 0 : custom.warding) === null || _b === void 0 ? void 0 : _b.should;
    if (typeof should === "boolean") {
        return should;
    }
    if (verb) {
        return (_c = should === null || should === void 0 ? void 0 : should[verb]) !== null && _c !== void 0 ? _c : fallback;
    }
    // always return true when there's no explicit boolean value 'should' assigned
    // in cases where the 'verb' is not specified.
    return true;
}
exports.should = should;
exports.default = { should: should };
//# sourceMappingURL=ward.js.map