/**
 * Describes the label of fields
 */
export type Label = Record<string, string> | string;
/**
 * Describes the labels of collections
 */
export type Labels = {
    plural?: Record<string, string> | string;
    singular?: Record<string, string> | string;
};
export declare function tagSanitize(tag: Labels): Labels;
export declare function labelSanitize(sanitize: (word: string) => string, label: Label): Label;
declare const _default: {
    tagSanitize: typeof tagSanitize;
    labelSanitize: typeof labelSanitize;
};
export default _default;
