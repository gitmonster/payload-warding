"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.lookup = exports.traits = exports.pick = exports.pickLabel = exports.collection = exports.synopsis = exports.fvName = exports.peripherals = void 0;
var types_1 = require("payload/types");
var rule_1 = require("./rule");
var ward_1 = __importDefault(require("./ward"));
/**
 * All peripheral fields that are introduced by Payload.
 */
exports.peripherals = ["createdAt", "updatedAt"];
function fvName(name) {
    return name;
}
exports.fvName = fvName;
/**
 * Checks if the given {@link Feature} is a {@link Synopsis}.
 */
function synopsis(feature) {
    return feature.traits !== undefined;
}
exports.synopsis = synopsis;
/**
 * Checks if the given {@link Feature} is a {@link CollectionConfig}.
 */
function collection(feature, term) {
    if (term === true) {
        return true;
    }
    return feature[term] !== undefined;
}
exports.collection = collection;
/**
 * Picks the label from the given {@link Feature}.
 */
function pickLabel(feature) {
    var _a;
    if (collection(feature, "labels")) {
        return (_a = feature.labels) === null || _a === void 0 ? void 0 : _a.singular;
    }
    return feature.label;
}
exports.pickLabel = pickLabel;
/**
 * Picks the name and label from the given {@link Field}, excluding those in the
 * `excludes` array.
 */
function pick(field, excludes) {
    if (excludes === void 0) { excludes = exports.peripherals; }
    if ((0, types_1.fieldAffectsData)(field)) {
        if (!ward_1.default.should(field) || excludes.includes(field.name)) {
            return false;
        }
        if (!field.label || typeof field.label === "boolean") {
            return [field.name, field.name];
        }
        return [field.name, field.label];
    }
    return false;
}
exports.pick = pick;
/**
 * Extracts all the possible traits from the given {@link Feature}.
 */
function traits(feature, label) {
    var _a, _b;
    var set = new Map();
    if (synopsis(feature)) {
        feature.traits.forEach(function (_a) {
            var v = _a[0], l = _a[1];
            return set.set(v, l !== null && l !== void 0 ? l : v);
        });
        return Array.from(set);
    }
    if (!ward_1.default.should(feature))
        return undefined;
    // extract valid field names
    (_a = feature.fields) === null || _a === void 0 ? void 0 : _a.forEach(function (x) {
        var name = pick(x);
        if (name) {
            set.set.apply(set, name);
        }
    });
    // admin and unlock
    if (collection(feature, "auth") && feature.auth) {
        rule_1.rules.forEach(function (x) { var _a; return set.set(x, (_a = label === null || label === void 0 ? void 0 : label[x]) !== null && _a !== void 0 ? _a : x); });
    }
    if (feature.endpoints) {
        // extract valid endpoint paths
        (_b = feature.endpoints) === null || _b === void 0 ? void 0 : _b.filter(function (x) { return ward_1.default.should(x); }).forEach(function (x) { return set.set(x.path, x.path); });
    }
    return Array.from(set);
}
exports.traits = traits;
/**
 * Creates a lookup table of {@link OptionObject}s from the given {@link Feature}s.
 */
function lookup(features, label) {
    var m = {};
    return features.reduce(function (m, feature) {
        var _a;
        var t = (_a = traits(feature, label)) === null || _a === void 0 ? void 0 : _a.map(function (_a) {
            var value = _a[0], label = _a[1];
            return ({
                value: value,
                label: label,
            });
        });
        if (t)
            m[feature.slug] = t;
        return m;
    }, m);
}
exports.lookup = lookup;
exports.default = {
    peripherals: exports.peripherals,
    fvName: fvName,
    synopsis: synopsis,
    collection: collection,
    pickLabel: pickLabel,
    pick: pick,
    traits: traits,
    lookup: lookup,
};
//# sourceMappingURL=feat.js.map