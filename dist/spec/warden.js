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
exports.Warden = void 0;
var errors_1 = require("payload/errors");
var types_1 = require("payload/types");
var basic_1 = __importDefault(require("../kit/basic"));
var access_1 = __importDefault(require("./access"));
var feat_1 = __importDefault(require("./definition/feat"));
var rule_1 = __importDefault(require("./definition/rule"));
var verb_1 = __importDefault(require("./definition/verb"));
var ward_1 = __importDefault(require("./definition/ward"));
/**
 * Warden of the north!
 */
var Warden = /** @class */ (function () {
    function Warden(spec) {
        this.spec = spec;
    }
    /**
     * Wards the given {@link CollectionConfig} or {@link GlobalConfig}.
     */
    Warden.prototype.ward = function (config, collection, verbsToAffect) {
        if (verbsToAffect === void 0) { verbsToAffect = verb_1.default.verbs; }
        if (!config.access)
            config.access = {};
        if (collection && feat_1.default.collection(config, true)) {
            config = this.collectionSpecific(config);
        }
        return this.endpoints(this.fields(this.cru(config, { feature: config.slug }, {}, verbsToAffect), verbsToAffect));
    };
    /**
     * Wards {@link CollectionConfig} specific accesses.
     */
    Warden.prototype.collectionSpecific = function (config) {
        // ward for 'delete'
        config.access.delete = this.ck({ feature: config.slug, verbs: [verb_1.default.Verb.DELETE] }, config, verb_1.default.Verb.DELETE);
        if (config.auth) {
            // ward for 'admin'
            config.access.admin = this.ck({ feature: config.slug, traits: [rule_1.default.Rule.ADMIN] }, config, "admin");
            // ward for 'unlock'
            config.access.unlock = this.ck({
                feature: config.slug,
                traits: [rule_1.default.Rule.UNLOCK],
            }, config, "unlock");
        }
        return config;
    };
    /**
     * Wards fields.
     */
    Warden.prototype.fields = function (config, allowedVerbs) {
        var _this = this;
        config.fields = config.fields.map(function (x) {
            if ((0, types_1.fieldAffectsData)(x)) {
                if (!x.access)
                    x.access = {};
                x = _this.cru(x, { feature: config.slug, trait: x.name }, config, allowedVerbs);
            }
            return x;
        });
        return config;
    };
    /**
     * Wards endpoints.
     */
    Warden.prototype.endpoints = function (config) {
        var _this = this;
        if (config.endpoints) {
            config.endpoints = config.endpoints.map(function (x) {
                var v = verb_1.default.map[x.method];
                var ck = access_1.default.check({
                    feature: config.slug,
                    traits: [x.path],
                    verbs: [v],
                }, _this.spec);
                // if the custom setting rejects warding, decorate the handler's
                // req.context with the ck as the 'warding' function
                if (!ward_1.default.should(x, v, ward_1.default.should(config, v))) {
                    x.handler = basic_1.default.map(x.handler, function (handle) { return function (req, res, next) {
                        req.context.warding = ck;
                        return handle(req, res, next);
                    }; });
                    return x;
                }
                // otherwise insert the ck into the handler, meaning the endpoint
                // needs the warding
                x.handler = __spreadArray([
                    function (req, _, next) {
                        // access control
                        if (!ck({ req: req })) {
                            throw new errors_1.Forbidden(req.t);
                        }
                        next();
                    }
                ], (x.handler instanceof Array ? x.handler : [x.handler]), true);
                return x;
            });
        }
        return config;
    };
    /**
     * Wards `create` / `read` / `update` accesses.
     */
    Warden.prototype.cru = function (it, _a, parent, verbsToAffect) {
        var feature = _a.feature, trait = _a.trait;
        var ex = {
            feature: feature,
            traits: trait ? [trait] : [],
        };
        if (verbsToAffect.includes(verb_1.default.Verb.CREATE)) {
            it.access.create = this.verbed(ex, it, verb_1.default.Verb.CREATE, parent);
        }
        if (verbsToAffect.includes(verb_1.default.Verb.READ)) {
            it.access.read = this.verbed(ex, it, verb_1.default.Verb.READ, parent);
        }
        if (verbsToAffect.includes(verb_1.default.Verb.UPDATE)) {
            it.access.update = this.verbed(ex, it, verb_1.default.Verb.UPDATE, parent);
        }
        return it;
    };
    /**
     * A verbed variant of {@link ck}, which will check the parent for the verb's
     * access, and then put the verb in the verbs array.
     */
    Warden.prototype.verbed = function (ex, config, verb, parent) {
        return this.ck(__assign(__assign({}, ex), { verbs: [verb] }), config, verb, ward_1.default.should(parent, verb));
    };
    /**
     * Creates a {@link Access} for the given `config` and `verb` expecting
     * the given {@link Expectation}.
     */
    Warden.prototype.ck = function (ex, config, verb, pshould) {
        var _a;
        if (pshould === void 0) { pshould = true; }
        var ck = access_1.default.check(ex, this.spec);
        var acc = (_a = config.access) === null || _a === void 0 ? void 0 : _a[verb];
        if (!acc) {
            // respect the current 'warding.should' setting, and fallback to the
            // designated parent 'should' value
            if (ward_1.default.should(config, verb, pshould)) {
                return ck;
            }
            // reject warding
            return undefined;
        }
        // with a designated access function
        return function (a) {
            // pass the ck to it so that it by itself can decide to and how to use the
            // ck function
            a.req.context.warding = ck;
            return acc(a);
        };
    };
    return Warden;
}());
exports.Warden = Warden;
exports.default = { Warden: Warden };
//# sourceMappingURL=warden.js.map