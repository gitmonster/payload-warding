import type { Vtypes } from "../../kit/typing";
import type { Label } from "./label";
/**
 * The available verbs of feature keys.
 */
export declare enum Verb {
    CREATE = "create",
    READ = "read",
    UPDATE = "update",
    DELETE = "delete"
}
/**
 * The http methods to {@link Verb} mapping.
 */
export declare const map: {
    post: Verb;
    connect: Verb;
    options: Verb;
    head: Verb;
    get: Verb;
    put: Verb;
    patch: Verb;
    delete: Verb;
};
/**
 * All the values of the {@link Verb}.
 */
export declare const verbs: Verb[];
/**
 * The label definition of the {@link Verb}s.
 */
export type VerbLabel = {
    [k in Vtypes<typeof verbs>]: Label;
};
declare const _default: {
    Verb: typeof Verb;
    verbs: Verb[];
    map: {
        post: Verb;
        connect: Verb;
        options: Verb;
        head: Verb;
        get: Verb;
        put: Verb;
        patch: Verb;
        delete: Verb;
    };
};
export default _default;
