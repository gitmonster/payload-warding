"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verbs = exports.traits = exports.feature = void 0;
var feat_1 = __importDefault(require("../definition/feat"));
var verb_1 = __importDefault(require("../definition/verb"));
var cascading_1 = __importDefault(require("./cascading"));
function feature(features, label) {
    return {
        type: "select",
        name: feat_1.default.fvName("feature"),
        options: features.map(function (f) {
            var label = feat_1.default.pickLabel(f);
            if (label) {
                return { label: label, value: f.slug };
            }
            return f.slug;
        }),
        label: label,
    };
}
exports.feature = feature;
function traits(features, label) {
    var _a;
    // create a lookup table for the given features
    var lookup = feat_1.default.lookup(features, label);
    return cascading_1.default.field({
        ref: "feature",
        label: (_a = label === null || label === void 0 ? void 0 : label.traits) !== null && _a !== void 0 ? _a : "Traits",
        selector: function (v) { var _a; return (_a = lookup[v]) !== null && _a !== void 0 ? _a : []; },
    }, { name: feat_1.default.fvName("traits") });
}
exports.traits = traits;
function verbs(label) {
    return {
        type: "select",
        name: feat_1.default.fvName("verbs"),
        options: verb_1.default.verbs.map(function (x) { var _a; return ({ value: x, label: (_a = label === null || label === void 0 ? void 0 : label[x]) !== null && _a !== void 0 ? _a : x }); }),
        hasMany: true,
        defaultValue: verb_1.default.verbs,
        label: label === null || label === void 0 ? void 0 : label.verbs,
    };
}
exports.verbs = verbs;
exports.default = { feature: feature, traits: traits, verbs: verbs };
//# sourceMappingURL=feature.js.map