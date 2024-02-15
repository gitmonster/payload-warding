import type { AccessArgs, AccessResult } from "payload/config";
import { type Role, type Spec } from "./definition/collections";
/**
 * Describes the common access function that fits both collection and field accesses.
 */
export type Access<T = AccessResult | boolean> = (a: AccessArgs<any, any>) => T | Promise<T>;
/**
 * The expected `feature` + `traits` + `verbs` combination.
 */
export type Expectation = {
    feature: string;
    traits?: string[];
    verbs?: string[];
};
export declare function allow({ lookup }: Role, { feature, traits, verbs }: Expectation): boolean;
/**
 * Creates an access function for the given slug and the expected `feature` + `traits` +
 * `verbs` combination.
 */
export declare function check(ex: Expectation, spec: Spec): (a: AccessArgs<any, any>) => boolean | Promise<boolean>;
declare const _default: {
    allow: typeof allow;
    check: typeof check;
};
export default _default;
