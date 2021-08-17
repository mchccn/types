import { FunctionType } from "../types/FunctionType";
import { PrimitiveType } from "../types/PrimitiveType";
import { Type } from "../types/Type";

export function fn<Parameters extends Type[] = Type[], ReturnType extends Type = Type>(
    name: string,
    parameters: Type[],
    returnType: Type
): FunctionType<Parameters, ReturnType>;
export function fn<Parameters extends Type[] = Type[], ReturnType extends Type = Type>(
    parameters: Type[],
    returnType: Type
): FunctionType<Parameters, ReturnType>;
export function fn<ReturnType extends Type>(returnType: ReturnType): FunctionType<Type[], ReturnType>;
export function fn(): FunctionType;
export function fn(...args: [string, Type[], Type] | [Type[], Type] | [Type] | []) {
    if (args.length === 0) return new FunctionType("[anonymous]", [], PrimitiveType.TYPES.any);

    if (args.length === 1 && args[0] instanceof Type) return new FunctionType("[anonymous]", [], args[0]);

    if (args.length === 2 && Array.isArray(args[0]) && args[0].every((p) => p instanceof Type) && args[1] instanceof Type)
        return new FunctionType("[anonymous]", args[0], args[1]);

    if (args.length === 3 && typeof args[0] === "string" && Array.isArray(args[1]) && args[1].every((p) => p instanceof Type) && args[2] instanceof Type)
        return new FunctionType(args[0], args[1], args[2]);

    if (args.length > 3) throw new TypeError(`Expected 0-3 arguments, but got ${args.length}.`);

    throw new Error(`Invalid arguments to 'types.fn'.`);
}
