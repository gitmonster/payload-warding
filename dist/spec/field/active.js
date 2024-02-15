"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.active = void 0;
var collections_1 = __importDefault(require("../definition/collections"));
var shy_1 = __importDefault(require("./shy"));
function active(label) {
    return {
        type: "checkbox",
        name: collections_1.default.name("active"),
        defaultValue: true,
        required: true,
        admin: { components: { Field: shy_1.default.Checkbox } },
        label: label,
    };
}
exports.active = active;
exports.default = { active: active };
//# sourceMappingURL=active.js.map