import { IntersectionType } from "../types/IntersectionType";
import { Type } from "../types/Type";

export function intersection<Intersection extends Type[] = Type[]>(name: string, types: Intersection): IntersectionType<Intersection>;
export function intersection<Intersection extends Type[] = Type[]>(types: Intersection): IntersectionType<Intersection>;
export function intersection(): IntersectionType;
export function intersection(...args: [string, Type[]] | [Type[]] | []) {
    if (args.length === 0) return new IntersectionType("[anonymous]", []);

    if (args.length === 1 && Array.isArray(args[0]) && args[0].every((t) => t instanceof Type)) return new IntersectionType("[anonymous]", args[0]);

    if (args.length === 2 && typeof args[0] === "string" && Array.isArray(args[1]) && args[1].every((t) => t instanceof Type))
        return new IntersectionType(args[0], args[1]);

    if (args.length > 1) throw new Error(`Expected 0-2 arguments, but got ${args.length}.`);

    throw new Error(`Invalid arguments to 'types.intersection'.`);
}
