"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.labelSanitize = exports.tagSanitize = void 0;
var pluralize_1 = __importStar(require("pluralize"));
function tagSanitize(tag) {
    if ((tag === null || tag === void 0 ? void 0 : tag.singular) && !(tag === null || tag === void 0 ? void 0 : tag.plural)) {
        tag.plural = labelSanitize(pluralize_1.default, tag.singular);
    }
    else if ((tag === null || tag === void 0 ? void 0 : tag.plural) && !(tag === null || tag === void 0 ? void 0 : tag.singular)) {
        tag.singular = labelSanitize(pluralize_1.singular, tag.plural);
    }
    return tag;
}
exports.tagSanitize = tagSanitize;
function labelSanitize(sanitize, label) {
    if (!label)
        return label;
    if (typeof label === "string") {
        return sanitize(label);
    }
    return Object.keys(label).reduce(function (m, k) {
        m[k] = sanitize(label[k]);
        return m;
    }, {});
}
exports.labelSanitize = labelSanitize;
exports.default = { tagSanitize: tagSanitize, labelSanitize: labelSanitize };
//# sourceMappingURL=label.js.map