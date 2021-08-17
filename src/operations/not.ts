import { NegatedType } from "../types/NegatedType";
import { PrimitiveType } from "../types/PrimitiveType";
import { Type } from "../types/Type";

export function not<T extends Type = Type>(name: string, type: Type): NegatedType<T>;
export function not<T extends Type = Type>(type: Type): NegatedType<T>;
export function not(): NegatedType;
export function not(...args: [string, Type] | [Type] | []) {
    if (args.length === 0) return new NegatedType("[anonymous]", PrimitiveType.TYPES.any);

    if (args.length === 1 && args[0] instanceof Type) return new NegatedType("[anonymous]", args[0]);

    if (args.length === 2 && typeof args[0] === "string" && args[1] instanceof Type) return new NegatedType(args[0], args[1]);

    if (args.length > 2) throw new Error(`Expected 0-2 arguments, but got ${args.length}.`);

    throw new Error(`Invalid arguments to 'types.not'.`);
}
