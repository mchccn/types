import { TupleType } from "../types/TupleType";
import { Type } from "../types/Type";

export function tuple<Types extends Type[] = Type[]>(name: string, ...types: Types): TupleType<Types>;
export function tuple<Types extends Type[] = Type[]>(...types: Types): TupleType<Types>;
export function tuple<Types extends Type[] = Type[]>(...args: Types | [string, ...Types]): TupleType<Types> {
    if (typeof args[0] === "string") return new TupleType(args[0], args.slice(0) as Types);

    new TupleType("[anonymous]", args as Types);
}
