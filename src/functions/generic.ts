import { GenericType } from "../types/GenericType";
import { PrimitiveType } from "../types/PrimitiveType";
import { Type } from "../types/Type";

type RemoveUndefined<T> = T extends [infer First, ...infer Rest]
    ? First extends undefined
        ? [PrimitiveType<"any">, ...RemoveUndefined<Rest>]
        : [First, ...RemoveUndefined<Rest>]
    : [];

export function generic<Parameters extends readonly (Type | undefined)[]>(
    parameters: Parameters,
    type: (...args: RemoveUndefined<Parameters>) => (v: any) => boolean
) {
    return Object.assign(
        (...args: Type[]) => {
            if (args.length !== parameters.length)
                throw new TypeError(`Expected ${parameters.length} argument${parameters.length === 1 ? "" : "s"}, but got ${args.length}.`);

            const i = parameters.findIndex((parameter, i) => (parameter ? !(args[i] instanceof parameter.constructor) : false));

            if (i > -1) throw new Error(`Expected type '${(parameters[i] ?? PrimitiveType.TYPES.any).identifier}' for parameter at index ${i}.`);

            return new GenericType(type.name.length ? type.name : "[anonymous]", args, type(...(args as RemoveUndefined<Parameters>)));
        },
        new GenericType(
            type.name.length ? type.name : "[anonymous]",
            parameters.map((p) => (p === undefined ? PrimitiveType.TYPES.any : p)),
            () => true
        )
    );
}
