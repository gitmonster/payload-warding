import { type PlainObject } from "./typing";
/**
 * Map the possible {@link T} or an array of {@link T} to a corresponding
 * {@link V} or an array of {@link V}.
 */
export declare function map<T, V>(v: T | T[], fn: (x: T) => V): V | V[];
/**
 * Checks if every elements of the given list are included / excluded in the
 * expected strings.
 */
export declare function expect(included?: boolean, list?: string[], ...expected: string[]): boolean;
/**
 * Patchs a {@link PlainObject} with a key-value pair. This implements the
 * RFC-7386. See {@link https://datatracker.ietf.org/doc/html/rfc7386} for
 * details
 */
export declare function patch(to: PlainObject, key: string, value: any): void;
/**
 * Merges multiple subsequent {@link T}s into the first {@link T}, deeply, using
 * the {@link patch} function.
 */
export declare function merge<T extends PlainObject>(to: T, ...froms: T[]): T;
declare const _default: {
    map: typeof map;
    expect: typeof expect;
    patch: typeof patch;
    merge: typeof merge;
};
export default _default;
