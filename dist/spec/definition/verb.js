"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verbs = exports.map = exports.Verb = void 0;
/**
 * The available verbs of feature keys.
 */
var Verb;
(function (Verb) {
    Verb["CREATE"] = "create";
    Verb["READ"] = "read";
    Verb["UPDATE"] = "update";
    Verb["DELETE"] = "delete";
})(Verb = exports.Verb || (exports.Verb = {}));
/**
 * The http methods to {@link Verb} mapping.
 */
exports.map = {
    // create
    post: Verb.CREATE,
    // read
    connect: Verb.READ,
    options: Verb.READ,
    head: Verb.READ,
    get: Verb.READ,
    // update
    put: Verb.UPDATE,
    patch: Verb.UPDATE,
    // delete
    delete: Verb.DELETE,
};
/**
 * All the values of the {@link Verb}.
 */
exports.verbs = Object.values(Verb);
exports.default = { Verb: Verb, verbs: exports.verbs, map: exports.map };
//# sourceMappingURL=verb.js.map