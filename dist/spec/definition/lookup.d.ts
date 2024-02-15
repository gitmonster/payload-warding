import type { FeatureValue } from "./feat";
/**
 * Describes the lookup table of features.
 */
export type Lookup = {
    [k: string]: {
        [k: string]: string[];
    };
};
/**
 * Creates a {@link Lookup} from the given {@link FeatureValue}s.
 */
export declare function toLookup(fvs: FeatureValue[]): Lookup;
declare const _default: {
    toLookup: typeof toLookup;
};
export default _default;
