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
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
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
exports.Warden = exports.shy = exports.cascading = exports.access = exports.convention = void 0;
var warding_1 = require("./factory/warding");
/**
 * Create the warding {@link Plugin}.
 */
function warding(_a) {
    var _this = this;
    var root = _a.root, user = _a.user, role = _a.role, label = _a.label, ext = _a.ext, mod = _a.mod, mute = _a.mute;
    return function (incoming) {
        var _a, _b, _c, _d, _e, _f;
        if (mute !== null && mute !== void 0 ? mute : false)
            return incoming;
        // collection all features
        var features = __spreadArray(__spreadArray(__spreadArray([], ((_a = incoming.globals) !== null && _a !== void 0 ? _a : []), true), ((_b = incoming.collections) !== null && _b !== void 0 ? _b : []), true), (ext !== null && ext !== void 0 ? ext : []), true);
        if (features.length === 0) {
            return incoming;
        }
        // warding build
        var w = new warding_1.Warding(user).build(features, role, label);
        if (mod) {
            // modify the warding built result if possible
            w = mod(w);
        }
        return __assign(__assign({}, incoming), { admin: __assign(__assign({}, incoming.admin), { user: user.slug }), globals: (_d = (_c = incoming.globals) === null || _c === void 0 ? void 0 : _c.map(function (x) { return w.warden.ward(x); })) !== null && _d !== void 0 ? _d : [], collections: __spreadArray(__spreadArray([], ((_f = (_e = incoming.collections) === null || _e === void 0 ? void 0 : _e.map(function (x) { return w.warden.ward(x, true); })) !== null && _f !== void 0 ? _f : []), true), [
                w.warden.ward(w.collections.user, true),
                w.warden.ward(w.collections.role, true),
            ], false), onInit: function (payload) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!incoming.onInit) return [3 /*break*/, 2];
                            return [4 /*yield*/, incoming.onInit(payload)];
                        case 1:
                            _a.sent();
                            _a.label = 2;
                        case 2: return [2 /*return*/, w.initialize(payload, root, w.initializationExtra)];
                    }
                });
            }); }, custom: __assign(__assign({}, incoming.custom), { warding: {
                    warden: w.warden,
                    populate: w.populate,
                } }) });
    };
}
var convention_1 = require("./convention");
Object.defineProperty(exports, "convention", { enumerable: true, get: function () { return __importDefault(convention_1).default; } });
var access_1 = require("./spec/access");
Object.defineProperty(exports, "access", { enumerable: true, get: function () { return __importDefault(access_1).default; } });
var cascading_1 = require("./spec/field/cascading");
Object.defineProperty(exports, "cascading", { enumerable: true, get: function () { return __importDefault(cascading_1).default; } });
var shy_1 = require("./spec/field/shy");
Object.defineProperty(exports, "shy", { enumerable: true, get: function () { return __importDefault(shy_1).default; } });
var warden_1 = require("./spec/warden");
Object.defineProperty(exports, "Warden", { enumerable: true, get: function () { return warden_1.Warden; } });
__exportStar(require("./types"), exports);
exports.default = warding;
//# sourceMappingURL=index.js.map