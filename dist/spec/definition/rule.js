"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rules = exports.Rule = void 0;
/**
 * The particular rules of authentication.
 */
var Rule;
(function (Rule) {
    Rule["ADMIN"] = "<admin>";
    Rule["UNLOCK"] = "<unlock>";
})(Rule = exports.Rule || (exports.Rule = {}));
/**
 * All the values of the {@link Rule}.
 */
exports.rules = Object.values(Rule);
exports.default = { rules: exports.rules, Rule: Rule };
//# sourceMappingURL=rule.js.map