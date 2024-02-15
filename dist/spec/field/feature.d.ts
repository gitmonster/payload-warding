import type { Field, SelectField } from "payload/types";
import type { Feature } from "../definition/feat";
import type { Label } from "../definition/label";
import type { RuleLabel } from "../definition/rule";
import type { VerbLabel } from "../definition/verb";
export declare function feature(features: Feature[], label?: Label): SelectField;
export declare function traits(features: Feature[], label?: {
    [k in "traits" | keyof RuleLabel]: Label;
}): Field;
export declare function verbs(label?: {
    [k in "verbs" | keyof VerbLabel]: Label;
}): SelectField;
declare const _default: {
    feature: typeof feature;
    traits: typeof traits;
    verbs: typeof verbs;
};
export default _default;
