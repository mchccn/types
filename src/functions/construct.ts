import { FunctionType } from "../types/FunctionType";
import { ObjectType } from "../types/ObjectType";

export function construct<Obj extends object = object>(type: ObjectType, obj: Obj): Obj;
export function construct<Fn extends (...args: any[]) => any>(type: FunctionType, fn: Fn): Fn;
export function construct(): void;
export function construct(...args: [ObjectType, object] | [FunctionType, (...args: any[]) => any] | []) {
    if (args.length === 0) return;

    if (args.length === 2 && args[0] instanceof ObjectType && typeof args[1] === "object" && args[1]) {
        const [{ props }, obj] = args as [ObjectType, object];

        if (process.env.NODE_ENV === "production") return obj;

        //
    }

    if (args.length === 2 && args[0] instanceof FunctionType && typeof args[1] === "function") {
        const [{ parameters, returnType }, fn] = args as [FunctionType, (...args: any[]) => any];

        if (process.env.NODE_ENV === "production") return fn;

        return function (...args: Parameters<typeof fn>) {
            if (args.length !== parameters.length)
                throw new TypeError(`Expected ${parameters.length} argument${parameters.length === 1 ? "" : "s"}, but got ${args.length}.`);

            const i = parameters.findIndex((parameter, i) => !parameter.validate(args[i]));

            if (i > -1) throw new Error(`Expected type '${parameters[i].identifier}' for parameter at index ${i}.`);

            const v = fn.apply(fn, args);

            if (!returnType.validate(v)) throw new Error(`Expected type '${returnType.identifier}' for the return value.`);

            return v;
        };
    }

    if (args.length > 2) throw new Error(`Expected 0-2 arguments, but got ${args.length}`);

    throw new Error(`Invalid arguments to 'types.construct'.`);
}
