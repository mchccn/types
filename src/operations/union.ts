import { Type } from "../types/Type";
import { UnionType } from "../types/UnionType";

export function union(name: string, types: Type[]): UnionType;
export function union(types: Type[]): UnionType;
export function union(): UnionType;
export function union(...args: [string, Type[]] | [Type[]] | []) {
    if (args.length === 0) return new UnionType("[anonymous]", []);

    if (args.length === 1 && Array.isArray(args[0]) && args[0].every((t) => t instanceof Type)) return new UnionType("[anonymous]", args[0]);

    if (args.length === 2 && typeof args[0] === "string" && Array.isArray(args[1]) && args[1].every((t) => t instanceof Type))
        return new UnionType(args[0], args[1]);

    if (args.length > 1) throw new Error(`Expected 0-2 arguments, but got ${args.length}.`);

    throw new Error(`Invalid arguments to 'types.union'.`);
}
