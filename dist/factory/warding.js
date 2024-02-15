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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
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
exports.Warding = void 0;
var collections_1 = __importDefault(require("../spec/definition/collections"));
var feat_1 = __importDefault(require("../spec/definition/feat"));
var label_1 = require("../spec/definition/label");
var active_1 = require("../spec/field/active");
var features_1 = __importDefault(require("../spec/field/features"));
var shy_1 = __importDefault(require("../spec/field/shy"));
var warden_1 = require("../spec/warden");
var spec_1 = require("./spec");
/**
 * The {@link Warding} that can build a proper role based {@link CollectionConfig}s.
 */
var Warding = /** @class */ (function () {
    function Warding(options) {
        this.options = options;
    }
    /**
     * Creates a role based {@link CollectionConfig} together with a foreign role {@link CollectionConfig}.
     */
    Warding.prototype.build = function (features, _a, label) {
        var _this = this;
        var _b = _a.fields, fields = _b === void 0 ? [] : _b, slug = _a.slug, tag = _a.tag;
        // the user with the foreign role
        var user = this.user({ slug: slug, tag: tag }, label);
        user.auth = true;
        user.hooks = {
            beforeValidate: [
                function (_a) {
                    var data = _a.data, req = _a.req;
                    return __awaiter(_this, void 0, void 0, function () {
                        var _b, _c;
                        return __generator(this, function (_d) {
                            switch (_d.label) {
                                case 0:
                                    if (!data || req.url !== "/first-register")
                                        return [2 /*return*/, data];
                                    // assign the root role for the user of first registration
                                    _b = data;
                                    _c = slug;
                                    return [4 /*yield*/, (0, spec_1.has)(req.payload, {
                                            slug: slug,
                                            where: { name: { equals: collections_1.default.root } },
                                        })];
                                case 1:
                                    // assign the root role for the user of first registration
                                    _b[_c] = _d.sent();
                                    return [2 /*return*/, data];
                            }
                        });
                    });
                },
            ],
        };
        // all features including the user and the foreign role
        features = __spreadArray(__spreadArray([], features, true), [user, this.roleSynopsis({ fields: fields, slug: slug, tag: tag })], false);
        // the foreign role
        var role = this.role(features, { fields: fields, slug: slug, tag: tag }, label);
        role.hooks = {
            beforeDelete: [
                function (_a) {
                    var id = _a.id, payload = _a.req.payload;
                    return __awaiter(_this, void 0, void 0, function () {
                        var _b;
                        return __generator(this, function (_c) {
                            switch (_c.label) {
                                case 0: return [4 /*yield*/, (0, spec_1.has)(payload, {
                                        slug: this.options.slug,
                                        where: (_b = {}, _b[slug] = { equals: id }, _b),
                                    })];
                                case 1:
                                    if (_c.sent()) {
                                        throw new spec_1.StillInUse(slug);
                                    }
                                    return [2 /*return*/];
                            }
                        });
                    });
                },
            ],
        };
        var shape = { user: user.slug, role: slug };
        var populate = {
            role: (0, spec_1.theRolePopulate)(slug),
            user: (0, spec_1.theUserPopulate)(shape),
        };
        return {
            collections: { user: user, role: role },
            initialize: (0, spec_1.theInitialize)(populate, features),
            warden: new warden_1.Warden(shape),
            populate: populate,
        };
    };
    Warding.prototype.role = function (features, _a, label) {
        var fields = _a.fields, slug = _a.slug, tag = _a.tag;
        return Warding.create({
            fields: __spreadArray(__spreadArray([
                {
                    type: "text",
                    name: collections_1.default.name("name"),
                    required: true,
                    unique: true,
                    index: true,
                    label: label === null || label === void 0 ? void 0 : label.roleName,
                }
            ], features_1.default.field(features, label), true), fields, true),
            slug: slug,
            tag: tag ? (0, label_1.tagSanitize)(tag) : tag,
        }, collections_1.default.name("name"));
    };
    Warding.prototype.roleSynopsis = function (_a, label) {
        var fields = _a.fields, slug = _a.slug, tag = _a.tag;
        return {
            slug: slug,
            traits: __spreadArray([
                [collections_1.default.name("name"), label === null || label === void 0 ? void 0 : label.roleName],
                [collections_1.default.name("features"), label === null || label === void 0 ? void 0 : label.features]
            ], fields.map(function (x) { return feat_1.default.pick(x); }).filter(function (x) { return !!x; }), true),
            label: tag === null || tag === void 0 ? void 0 : tag.singular,
        };
    };
    Warding.prototype.user = function (role, label) {
        var _a, _b;
        return __assign({}, Warding.create(__assign(__assign({}, this.options), { fields: __spreadArray([
                (0, active_1.active)(label === null || label === void 0 ? void 0 : label.active),
                {
                    type: "relationship",
                    name: role.slug,
                    relationTo: role.slug,
                    hasMany: true,
                    index: true,
                    admin: { components: { Field: shy_1.default.Relationship } },
                    label: (_a = role.tag) === null || _a === void 0 ? void 0 : _a.singular,
                }
            ], ((_b = this.options.fields) !== null && _b !== void 0 ? _b : []), true) }), collections_1.default.name("email")));
    };
    /**
     * Creates a {@link CollectionConfig} based on the given {@link Options}.
     */
    Warding.create = function (_a, title) {
        var _b = _a.fields, fields = _b === void 0 ? [] : _b, slug = _a.slug, tag = _a.tag;
        // sanitizes the tag
        if (tag)
            tag = (0, label_1.tagSanitize)(tag);
        return { slug: slug, admin: { useAsTitle: title }, fields: fields, labels: tag };
    };
    return Warding;
}());
exports.Warding = Warding;
exports.default = { Warding: Warding };
//# sourceMappingURL=warding.js.map