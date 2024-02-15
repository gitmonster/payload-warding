import * as React from "react";
import type { Field, OptionObject } from "payload/types";
import type { Label } from "../definition/label";
/**
 * The {@link Select}'s options.
 */
export type CascadingOptions = {
    ref: string;
    label: Label;
    selector: (value: string) => OptionObject[];
};
/**
 * Creates a {@link React.FC} that renders a cascading {@link SelectInput}, using the
 * information provided in the given {@link CascadingOptions}.
 */
export declare function Select({ ref, label, selector, }: CascadingOptions): React.FC<{
    path: string;
    options: string[];
}>;
/**
 * Creates a decent cascading {@link Select} field.
 */
export declare function field(options: CascadingOptions, { name }: {
    name?: string | undefined;
}): Field;
declare const _default: {
    Select: typeof Select;
    field: typeof field;
};
export default _default;
