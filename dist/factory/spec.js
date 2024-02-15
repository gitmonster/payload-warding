"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.has = exports.theUserPopulate = exports.theRolePopulate = exports.theInitialize = exports.StillInUse = void 0;
var errors_1 = require("payload/errors");
var collections_1 = __importDefault(require("../spec/definition/collections"));
var feat_1 = __importDefault(require("../spec/definition/feat"));
var lookup_1 = __importDefault(require("../spec/definition/lookup"));
var verb_1 = __importDefault(require("../spec/definition/verb"));
/**
 * The {@link APIError} for a conflict condition caused by something that is
 * still in use.
 */
var StillInUse = /** @class */ (function (_super) {
    __extends(StillInUse, _super);
    function StillInUse(slug) {
        return _super.call(this, "This ".concat(slug, " is still in use!"), 404, {}, true) || this;
    }
    return StillInUse;
}(errors_1.APIError));
exports.StillInUse = StillInUse;
function theInitialize(populate, features) {
    var _this = this;
    return function (payload, root, extra) { return __awaiter(_this, void 0, void 0, function () {
        var role;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, populate.role(payload, {
                        name: collections_1.default.root,
                        features: features
                            .map(function (x) {
                            var _a;
                            var t = (_a = feat_1.default.traits(x)) === null || _a === void 0 ? void 0 : _a.map(function (_a) {
                                var value = _a[0];
                                return value;
                            });
                            if (!t)
                                return undefined;
                            return {
                                feature: x.slug,
                                traits: t,
                                verbs: verb_1.default.verbs,
                            };
                        })
                            .filter(function (x) { return !!x; }),
                    }, extra === null || extra === void 0 ? void 0 : extra.role)];
                case 1:
                    role = _a.sent();
                    if (!root)
                        return [2 /*return*/];
                    return [4 /*yield*/, populate.user(payload, {
                            email: root === null || root === void 0 ? void 0 : root.email,
                            password: root === null || root === void 0 ? void 0 : root.password,
                            roles: [role],
                        }, extra === null || extra === void 0 ? void 0 : extra.user)];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); };
}
exports.theInitialize = theInitialize;
function theRolePopulate(slug) {
    var _this = this;
    return function (payload, _a, extra) {
        var name = _a.name, features = _a.features;
        return __awaiter(_this, void 0, void 0, function () {
            var id;
            var _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, has(payload, {
                            slug: slug,
                            where: { name: { equals: name } },
                        })];
                    case 1:
                        id = _c.sent();
                        if (id) {
                            return [2 /*return*/, id];
                        }
                        return [4 /*yield*/, payload.create({
                                collection: slug,
                                data: __assign(__assign({}, extra), (_b = { name: name }, _b[collections_1.default.name("features")] = features, _b[collections_1.default.name("lookup")] = lookup_1.default.toLookup(features), _b)),
                            })];
                    case 2: return [2 /*return*/, (_c.sent()).id];
                }
            });
        });
    };
}
exports.theRolePopulate = theRolePopulate;
function theUserPopulate(slug) {
    var _this = this;
    return function (payload, _a, extra) {
        var email = _a.email, password = _a.password, roles = _a.roles;
        return __awaiter(_this, void 0, void 0, function () {
            var id;
            var _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, has(payload, {
                            slug: slug.user,
                            where: { email: { equals: email } },
                        })];
                    case 1:
                        id = _c.sent();
                        if (id) {
                            return [2 /*return*/, id];
                        }
                        return [4 /*yield*/, payload.create({
                                collection: slug.user,
                                data: __assign(__assign({}, extra), (_b = { email: email, password: password }, _b[slug.role] = roles, _b)),
                            })];
                    case 2: return [2 /*return*/, (_c.sent()).id];
                }
            });
        });
    };
}
exports.theUserPopulate = theUserPopulate;
function has(payload, _a) {
    var slug = _a.slug, where = _a.where;
    return __awaiter(this, void 0, void 0, function () {
        var v;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, payload.find({
                        collection: slug,
                        where: where,
                        limit: 1,
                    })];
                case 1:
                    v = _b.sent();
                    if (v.totalDocs > 0) {
                        return [2 /*return*/, v.docs[0].id];
                    }
                    return [2 /*return*/, 0];
            }
        });
    });
}
exports.has = has;
exports.default = { theRolePopulate: theRolePopulate, theUserPopulate: theUserPopulate, has: has };
//# sourceMappingURL=spec.js.map