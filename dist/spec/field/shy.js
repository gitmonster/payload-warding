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
exports.Checkbox = exports.Relationship = exports.shy = void 0;
var React = __importStar(require("react"));
var forms_1 = require("payload/components/forms");
var Relationship_1 = require("payload/components/fields/Relationship");
function shy(props) {
    if (!props.permissions)
        return true;
    var _a = props.permissions, c = _a.create.permission, r = _a.read.permission, u = _a.update.permission, d = _a.delete.permission;
    return !(c || r || u || d);
}
exports.shy = shy;
var Relationship = function (props) {
    return shy(props) ? React.createElement(React.Fragment, null) : React.createElement(Relationship_1.RelationshipComponent, __assign({}, props));
};
exports.Relationship = Relationship;
var Checkbox = function (props) {
    return shy(props) ? React.createElement(React.Fragment, null) : React.createElement(forms_1.Checkbox, __assign({}, props));
};
exports.Checkbox = Checkbox;
exports.default = { Relationship: exports.Relationship, Checkbox: exports.Checkbox, shy: shy };
//# sourceMappingURL=shy.js.map