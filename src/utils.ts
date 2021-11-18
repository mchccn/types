import { generic } from "./functions/generic";

const of = <T extends any[]>(...args: T) => args;

export const utils = Object.freeze({
    optional: generic(of(undefined), (t) => (v: any) => t.validate(v) || typeof v === "undefined"),
    array: generic(of(undefined), (t) => (v: any) => Array.isArray(v) && v.every((i) => t.validate(i))),
    promise: generic(
        of(undefined),
        (t) => (v: any) =>
            v instanceof Promise &&
            (() => {
                const then = v.then;

                //@ts-ignore
                v.then = function (...args) {
                    if (!args[0]) return then.apply(this, args);

                    const fulfilled = args[0]!;

                    args[0] = function (val) {
                        if (!t.validate(val)) throw new Error(`Promise value did not resolve to the expected type.`);

                        return fulfilled.call(fulfilled, val);
                    };

                    const v = then.apply(this, args);

                    return v;
                };

                return true;
            })()
    ),
});
