"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.toLookup = void 0;
/**
 * Creates a {@link Lookup} from the given {@link FeatureValue}s.
 */
function toLookup(fvs) {
    return fvs.reduce(function (m, _a) {
        var _b;
        var feature = _a.feature, _c = _a.traits, traits = _c === void 0 ? [] : _c, _d = _a.verbs, verbs = _d === void 0 ? [] : _d;
        var t = (_b = m[feature]) !== null && _b !== void 0 ? _b : (m[feature] = {});
        ((traits === null || traits === void 0 ? void 0 : traits.length) === 0 ? ["_"] : traits).forEach(function (x) { return (t[x] = t[x] ? Array.from(new Set(__spreadArray(__spreadArray([], t[x], true), verbs, true))) : verbs); });
        return m;
    }, {});
}
exports.toLookup = toLookup;
exports.default = { toLookup: toLookup };
//# sourceMappingURL=lookup.js.map