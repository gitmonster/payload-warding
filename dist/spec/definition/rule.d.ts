import type { Vtypes } from "../../kit/typing";
import type { Label } from "./label";
/**
 * The particular rules of authentication.
 */
export declare enum Rule {
    ADMIN = "<admin>",
    UNLOCK = "<unlock>"
}
/**
 * All the values of the {@link Rule}.
 */
export declare const rules: Rule[];
/**
 * The label definition of the {@link Rule}s.
 */
export type RuleLabel = {
    [k in Vtypes<typeof rules>]: Label;
};
declare const _default: {
    rules: Rule[];
    Rule: typeof Rule;
};
export default _default;
