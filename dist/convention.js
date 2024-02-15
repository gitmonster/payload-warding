"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.check = exports.opts = void 0;
var basic_1 = __importDefault(require("./kit/basic"));
var access_1 = __importDefault(require("./spec/access"));
var defaults = {
    user: {
        slug: "user",
        tag: { singular: { en: "User", zh: "用户" } },
    },
    role: {
        slug: "role",
        tag: { singular: { en: "Role", zh: "角色" } },
    },
    label: {
        active: { en: "Active Flag", zh: "生效标记" },
        features: { en: "Features", zh: "功能" },
        verbs: { en: "Verbs", zh: "谓词" },
        traits: { en: "Traits", zh: "特征" },
        feature: { en: "Feature", zh: "功能" },
        roleName: { en: "Role Name", zh: "角色名" },
        "<admin>": { en: "< Admin Panel >", zh: "< 管理面板 >" },
        "<unlock>": { en: "< Unlock >", zh: "< 解锁用户 >" },
        create: { en: "Create", zh: "新增" },
        read: { en: "Read", zh: "读取" },
        update: { en: "Update", zh: "更新" },
        delete: { en: "Delete", zh: "删除" },
    },
};
/**
 * Produces conventional {@link Opts} with given extension {@link LenientOpts}.
 */
function opts(ext) {
    return basic_1.default.merge({}, defaults, ext);
}
exports.opts = opts;
/**
 * A conventional variant of {@link access.check} with the {@link Spec} set to
 * the default user and role slugs.
 */
function check(ex, _a) {
    var _b = _a === void 0 ? {} : _a, _c = _b.user, user = _c === void 0 ? defaults.user.slug : _c, _d = _b.role, role = _d === void 0 ? defaults.role.slug : _d;
    return access_1.default.check(ex, { user: user, role: role });
}
exports.check = check;
exports.default = { opts: opts, check: check };
//# sourceMappingURL=convention.js.map