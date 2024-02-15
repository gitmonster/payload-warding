import { type CollectionConfig, type GlobalConfig } from "payload/types";
import type { StringLiteral } from "../kit/typing";
import { type Access, type Expectation } from "./access";
import type { Spec } from "./definition/collections";
import { Verb } from "./definition/verb";
/**
 * Warden of the north!
 */
export declare class Warden {
    private readonly spec;
    constructor(spec: Spec);
    /**
     * Wards the given {@link CollectionConfig} or {@link GlobalConfig}.
     */
    ward<T extends CollectionConfig | GlobalConfig>(config: T, collection?: true, verbsToAffect?: Verb[]): T;
    /**
     * Wards {@link CollectionConfig} specific accesses.
     */
    collectionSpecific<T extends CollectionConfig>(config: T): T;
    /**
     * Wards fields.
     */
    fields<T extends CollectionConfig | GlobalConfig>(config: T, allowedVerbs: Verb[]): T;
    /**
     * Wards endpoints.
     */
    endpoints<T extends CollectionConfig | GlobalConfig>(config: T): T;
    /**
     * Wards `create` / `read` / `update` accesses.
     */
    cru<T extends {
        access?: {
            create?: Access;
            read?: Access;
            update?: Access;
        };
        custom?: any;
    }>(it: T, { feature, trait }: {
        feature: string;
        trait?: string;
    }, parent: {
        custom?: any;
    }, verbsToAffect: Verb[]): T;
    /**
     * A verbed variant of {@link ck}, which will check the parent for the verb's
     * access, and then put the verb in the verbs array.
     */
    verbed<T, K>(ex: Expectation, config: {
        access?: {
            [k in StringLiteral<K>]?: Access<T>;
        };
        custom?: any;
    }, verb: StringLiteral<K>, parent: {
        custom?: any;
    }): Access<T> | Access<boolean> | undefined;
    /**
     * Creates a {@link Access} for the given `config` and `verb` expecting
     * the given {@link Expectation}.
     */
    ck<T, K>(ex: Expectation, config: {
        access?: {
            [k in StringLiteral<K>]?: Access<T>;
        };
        custom?: any;
    }, verb: StringLiteral<K>, pshould?: boolean): Access<T> | Access<boolean> | undefined;
}
declare const _default: {
    Warden: typeof Warden;
};
export default _default;
