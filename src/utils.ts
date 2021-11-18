import { generic } from "./functions/generic";

const of = <T extends any[]>(...args: T) => args;

export const utils = Object.freeze({
    optional: generic(of(undefined), (t) => (v: any) => t.validate(v) || typeof v === "undefined"),
    array: generic(of(undefined), (t) => (v: any) => Array.isArray(v) && v.every((i) => t.validate(i))),
});
