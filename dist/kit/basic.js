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
exports.merge = exports.patch = exports.expect = exports.map = void 0;
var typing_1 = require("./typing");
/**
 * Map the possible {@link T} or an array of {@link T} to a corresponding
 * {@link V} or an array of {@link V}.
 */
function map(v, fn) {
    return Array.isArray(v) ? v.map(fn) : fn(v);
}
exports.map = map;
/**
 * Checks if every elements of the given list are included / excluded in the
 * expected strings.
 */
function expect(included, list) {
    var expected = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        expected[_i - 2] = arguments[_i];
    }
    return (list !== null && list !== void 0 ? list : []).every(function (x) { return expected.includes(x) === (included !== null && included !== void 0 ? included : true); });
}
exports.expect = expect;
/**
 * Patchs a {@link PlainObject} with a key-value pair. This implements the
 * RFC-7386. See {@link https://datatracker.ietf.org/doc/html/rfc7386} for
 * details
 */
function patch(to, key, value) {
    if (!to)
        return;
    if (value === null) {
        // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
        delete to[key];
        return;
    }
    // ignore undefined values
    if (value === undefined)
        return;
    var t = to[key];
    if ((0, typing_1.isPlainObject)(value)) {
        if (!(0, typing_1.isPlainObject)(t)) {
            // expecting a plain object yet got something else other than nothing, so
            // stop here
            if (t !== undefined && t !== null)
                return;
            // and if that is undefined or null, create a new plain object then
            t = to[key] = {};
        }
        // patch nested plain objects
        Object.keys(value).forEach(function (key) { return patch(t, key, value[key]); });
        return;
    }
    // otherwise just set the value
    to[key] = value;
}
exports.patch = patch;
/**
 * Merges multiple subsequent {@link T}s into the first {@link T}, deeply, using
 * the {@link patch} function.
 */
function merge(to) {
    var froms = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        froms[_i - 1] = arguments[_i];
    }
    if (froms.length === 0)
        return to;
    var from = froms.shift();
    // patch the `to` object
    Object.keys(from).forEach(function (k) { return patch(to, k, from[k]); });
    // go on merging the rest froms
    return merge.apply(void 0, __spreadArray([to], froms, false));
}
exports.merge = merge;
exports.default = { map: map, expect: expect, patch: patch, merge: merge };
//# sourceMappingURL=basic.js.map