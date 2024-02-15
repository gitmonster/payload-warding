import type { Payload } from "payload";
import type { CollectionConfig, Field, Where } from "payload/types";
import { APIError } from "payload/errors";
import type { Concrete } from "../kit/typing";
import { type Spec } from "../spec/definition/collections";
import { type Feature, type FeatureValue } from "../spec/definition/feat";
import type { Label as SpecLabel, Labels as SpecLabels } from "../spec/definition/label";
import type { RuleLabel } from "../spec/definition/rule";
import { type VerbLabel } from "../spec/definition/verb";
import type { Warden } from "../spec/warden";
/**
 * The {@link Warding} options.
 */
export type Options = {
    slug: string;
    fields?: Field[];
    tag?: SpecLabels;
};
/**
 * The {@link Concrete} variant of {@link Options}.
 */
export type ConcreteOptions = Concrete<Options, "fields">;
/**
 * The {@link Warding} label map.
 */
export type Label = {
    [k in "active" | "roleName" | "features" | "feature" | "verbs" | "traits" | keyof RuleLabel | keyof VerbLabel]: SpecLabel;
};
/**
 * The result type of {@link Warding.build}.
 */
export type Built = {
    collections: {
        user: CollectionConfig;
        role: CollectionConfig;
    };
    warden: Warden;
    populate: Populate;
    initialize: Initialize;
    initializationExtra?: {
        user: any;
        role: any;
    };
};
export type Initialize = (payload: Payload, root?: {
    email: string;
    password: string;
}, extra?: {
    user: any;
    role: any;
}) => Promise<void>;
export type Populate = {
    role: RolePopulate;
    user: UserPopulate;
};
export type RolePopulate = (payload: Payload, role: {
    name: string;
    features: FeatureValue[];
}, extra?: any) => Promise<string | number>;
export type UserPopulate = (payload: Payload, user: {
    email: string;
    password: string;
    roles: (string | number)[];
}, extra?: any) => Promise<string | number>;
/**
 * The {@link APIError} for a conflict condition caused by something that is
 * still in use.
 */
export declare class StillInUse extends APIError {
    constructor(slug: string);
}
export declare function theInitialize(populate: Populate, features: Feature[]): Initialize;
export declare function theRolePopulate(slug: string): RolePopulate;
export declare function theUserPopulate(slug: Spec): UserPopulate;
export declare function has(payload: Payload, { slug, where, }: {
    slug: string;
    where: Where;
}): Promise<string | number>;
declare const _default: {
    theRolePopulate: typeof theRolePopulate;
    theUserPopulate: typeof theUserPopulate;
    has: typeof has;
};
export default _default;
