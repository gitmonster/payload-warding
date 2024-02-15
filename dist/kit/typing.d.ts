/**
 * Derives the type of values of a specific array.
 */
export type Vtypes<T extends any[]> = T[number];
/**
 * Describes a string literal.
 */
export type StringLiteral<T> = T extends `${string & T}` ? T : never;
export type Concrete<T, K extends keyof T> = T & {
    [k in K]-?: T[k];
};
/**
 * Describes a plain object.
 */
export type PlainObject = {
    [k: string]: any;
};
/**
 * Checks if the given value is a {@link string[]}.
 */
export declare function isStringArray(value: unknown): value is string[];
/**
 * Checks if the given value is a {@link PlainObject}.
 */
export declare function isPlainObject(value: unknown): value is PlainObject;
declare const _default: {
    isStringArray: typeof isStringArray;
    isPlainObject: typeof isPlainObject;
};
export default _default;
