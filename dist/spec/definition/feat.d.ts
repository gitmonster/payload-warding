import { type CollectionConfig, type Field, type GlobalConfig, type OptionObject } from "payload/types";
import type { Label } from "./label";
import { type RuleLabel } from "./rule";
/**
 * The synopsis of a feature.
 */
export type Synopsis = {
    slug: string;
    traits: [string, Label | undefined][];
    label?: Label;
};
/**
 * Describes a feature.
 */
export type Feature = CollectionConfig | GlobalConfig | Synopsis;
/**
 * Describes the structure of the value extracted from a {@link Feature}.
 */
export type FeatureValue = {
    feature: string;
    traits: string[];
    verbs: string[];
};
export type NameLabelPair = [string, Label];
/**
 * All peripheral fields that are introduced by Payload.
 */
export declare const peripherals: string[];
export declare function fvName(name: keyof FeatureValue): keyof FeatureValue;
/**
 * Checks if the given {@link Feature} is a {@link Synopsis}.
 */
export declare function synopsis(feature: Feature): feature is Synopsis;
/**
 * Checks if the given {@link Feature} is a {@link CollectionConfig}.
 */
export declare function collection(feature: Feature, term: keyof CollectionConfig | true): feature is CollectionConfig;
/**
 * Picks the label from the given {@link Feature}.
 */
export declare function pickLabel(feature: Feature): Label | undefined;
/**
 * Picks the name and label from the given {@link Field}, excluding those in the
 * `excludes` array.
 */
export declare function pick(field: Field, excludes?: string[]): NameLabelPair | false;
/**
 * Extracts all the possible traits from the given {@link Feature}.
 */
export declare function traits(feature: Feature, label?: RuleLabel): [string, Label][] | undefined;
/**
 * Creates a lookup table of {@link OptionObject}s from the given {@link Feature}s.
 */
export declare function lookup(features: Feature[], label?: RuleLabel): {
    [k: string]: OptionObject[];
};
declare const _default: {
    peripherals: string[];
    fvName: typeof fvName;
    synopsis: typeof synopsis;
    collection: typeof collection;
    pickLabel: typeof pickLabel;
    pick: typeof pick;
    traits: typeof traits;
    lookup: typeof lookup;
};
export default _default;
