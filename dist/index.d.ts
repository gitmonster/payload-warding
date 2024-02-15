import type { Plugin } from "payload/config";
import type { Opts } from "./types";
/**
 * Create the warding {@link Plugin}.
 */
declare function warding({ root, user, role, label, ext, mod, mute }: Opts): Plugin;
export { default as convention } from "./convention";
export { default as access } from "./spec/access";
export { default as cascading } from "./spec/field/cascading";
export { default as shy } from "./spec/field/shy";
export { Warden } from "./spec/warden";
export * from "./types";
export default warding;
