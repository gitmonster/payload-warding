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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.check = exports.allow = void 0;
var basic_1 = __importDefault(require("../kit/basic"));
var collections_1 = __importDefault(require("./definition/collections"));
var rule_1 = __importDefault(require("./definition/rule"));
var verb_1 = __importDefault(require("./definition/verb"));
function operationMe(_a, _b, _c) {
    var _d;
    var usr = _a.user, role = _a.role;
    var id = _b.id, _e = _b.req, user = _e.user, collection = _e.collection, url = _e.url;
    var feature = _c.feature, traits = _c.traits, verbs = _c.verbs;
    if (feature !== usr && ((_d = collection === null || collection === void 0 ? void 0 : collection.config) === null || _d === void 0 ? void 0 : _d.slug) !== usr) {
        return false;
    }
    // a '/me' or a '/login' is always an operation-me
    if (url === "/me" || url === "/login")
        return true;
    // the user id should match
    if (id !== user.id)
        return false;
    // when dealing with non-rule, non-role, non-active traits along with read and update
    // verbs, it surely is an operation-me
    return (basic_1.default.expect.apply(basic_1.default, __spreadArray(__spreadArray([false,
        traits], rule_1.default.rules, false), [role,
        collections_1.default.name("active")], false)) && basic_1.default.expect(true, verbs, verb_1.default.Verb.READ, verb_1.default.Verb.UPDATE));
}
function allow(_a, _b) {
    var lookup = _a.lookup;
    var feature = _b.feature, _c = _b.traits, traits = _c === void 0 ? [] : _c, _d = _b.verbs, verbs = _d === void 0 ? [] : _d;
    if (!lookup || !Object.prototype.hasOwnProperty.call(lookup, feature)) {
        return false;
    }
    var fv = lookup[feature];
    if (!traits || traits.length === 0) {
        // skip traits check, check only verbs
        var v = Object.keys(fv)
            .filter(function (x) { return !rule_1.default.rules.includes(x); })
            .flatMap(function (k) { return fv[k]; });
        return basic_1.default.expect.apply(basic_1.default, __spreadArray([true, verbs], v, false));
    }
    return traits.every(function (trait) {
        var v = fv[trait];
        // every expected trait should present
        if (!v) {
            return false;
        }
        // all the expected verbs should be included, vacuously true if verbs is empty
        return basic_1.default.expect.apply(basic_1.default, __spreadArray([true, verbs], v, false));
    });
}
exports.allow = allow;
/**
 * Creates an access function for the given slug and the expected `feature` + `traits` +
 * `verbs` combination.
 */
function check(ex, spec) {
    return function (a) {
        var user = a.req.user;
        // no user, no further
        if (!user || !user[collections_1.default.name("active")])
            return false;
        // the operation of me myself is totally fine
        if (operationMe(spec, a, ex))
            return true;
        var role = user[spec.role];
        // no role, no further
        if (!role)
            return false;
        if (role instanceof Array) {
            return role.some(function (r) { return allow(r, ex); });
        }
        return allow(role, ex);
    };
}
exports.check = check;
exports.default = { allow: allow, check: check };
//# sourceMappingURL=access.js.map