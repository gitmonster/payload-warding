import type { ArrayField, JSONField } from "payload/types";
import type { Feature } from "../definition/feat";
import type { Label } from "../definition/label";
import type { RuleLabel } from "../definition/rule";
import type { VerbLabel } from "../definition/verb";
/**
 * Creates an {@link ArrayField} of features consisting of feature, traits and verbs, and
 * a {@link JSONField} of the lookup table.
 */
export declare function field(features: Feature[], label?: {
    [k in "features" | "feature" | "verbs" | "traits" | keyof RuleLabel | keyof VerbLabel]: Label;
}): [ArrayField, JSONField];
declare const _default: {
    field: typeof field;
};
export default _default;
