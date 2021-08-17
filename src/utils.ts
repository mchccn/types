import { generic } from "./functions/generic";

const tuple = <T extends any[]>(...args: T) => args;

export const utils = Object.freeze({
    optional: generic(tuple(undefined), (t) => (v: any) => t.validate(v) || typeof v === "undefined"),
    array: generic(tuple(undefined), (t) => (v: any) => Array.isArray(v) && v.every((i) => t.validate(i))),
});
