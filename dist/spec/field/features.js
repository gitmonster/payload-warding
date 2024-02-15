"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.field = void 0;
var pluralize_1 = __importDefault(require("pluralize"));
var collections_1 = __importDefault(require("../definition/collections"));
var label_1 = require("../definition/label");
var lookup_1 = __importDefault(require("../definition/lookup"));
var feature_1 = __importDefault(require("./feature"));
/**
 * Creates an {@link ArrayField} of features consisting of feature, traits and verbs, and
 * a {@link JSONField} of the lookup table.
 */
function field(features, label) {
    return [
        {
            type: "array",
            name: collections_1.default.name("features"),
            required: true,
            fields: [
                {
                    type: "row",
                    fields: [
                        __assign(__assign({}, feature_1.default.feature(features, label === null || label === void 0 ? void 0 : label.feature)), { admin: { width: "50%" } }),
                        __assign(__assign({}, feature_1.default.verbs(label)), { admin: { width: "50%" } }),
                    ],
                },
                feature_1.default.traits(features, label),
            ],
            label: label === null || label === void 0 ? void 0 : label.features,
            labels: (label === null || label === void 0 ? void 0 : label.features)
                ? {
                    singular: label.features,
                    plural: (0, label_1.labelSanitize)(pluralize_1.default, label.features),
                }
                : undefined,
        },
        {
            type: "json",
            name: collections_1.default.name("lookup"),
            admin: {
                disabled: true,
            },
            hooks: {
                beforeValidate: [
                    function (_a) {
                        var _b = collections_1.default.name("features"), fvs = _a.siblingData[_b];
                        return lookup_1.default.toLookup(fvs);
                    },
                ],
            },
            custom: {
                warding: {
                    should: false,
                },
            },
        },
    ];
}
exports.field = field;
exports.default = { field: field };
//# sourceMappingURL=features.js.map