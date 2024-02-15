import type { CollectionConfig } from "payload/types";
import { type Feature } from "../spec/definition/feat";
import { type Built, type Label, type Options } from "./spec";
/**
 * The {@link Warding} that can build a proper role based {@link CollectionConfig}s.
 */
export declare class Warding {
    private readonly options;
    constructor(options: Options);
    /**
     * Creates a role based {@link CollectionConfig} together with a foreign role {@link CollectionConfig}.
     */
    build(features: Feature[], { fields, slug, tag }: Options, label?: Label): Built;
    private role;
    private roleSynopsis;
    private user;
    /**
     * Creates a {@link CollectionConfig} based on the given {@link Options}.
     */
    static create({ fields, slug, tag }: Options, title: string): CollectionConfig;
}
declare const _default: {
    Warding: typeof Warding;
};
export default _default;
