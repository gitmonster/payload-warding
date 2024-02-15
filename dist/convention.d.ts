import type { AccessArgs } from "payload/types";
import type { Expectation, LenientOpts, Opts } from "./types";
/**
 * Produces conventional {@link Opts} with given extension {@link LenientOpts}.
 */
export declare function opts(ext: LenientOpts): Opts;
/**
 * A conventional variant of {@link access.check} with the {@link Spec} set to
 * the default user and role slugs.
 */
export declare function check(ex: Expectation, { user, role, }?: {
    user?: string;
    role?: string;
}): (a: AccessArgs<any, any>) => boolean | Promise<boolean>;
declare const _default: {
    opts: typeof opts;
    check: typeof check;
};
export default _default;
