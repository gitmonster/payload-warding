/**
 * Gets the dirname of the given payload field path.
 *
 * @param path the payload field path
 * @returns [`dir` the dirname, `ok` if it is successfully extracted]
 */
export declare function dirname(path: string): [dir: string, ok: boolean];
/**
 * Gets the sibling's path of the given payload field path, identified by the
 * given name.
 *
 * @param path the payload field path
 * @param name the name of the target sibling
 * @returns the sibling's payload field path
 */
export declare function sibling(path: string, name: string): string;
declare const _default: {
    dirname: typeof dirname;
    sibling: typeof sibling;
};
export default _default;
