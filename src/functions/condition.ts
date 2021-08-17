import { ConditionalType } from "../types/ConditionalType";
import { PrimitiveType } from "../types/PrimitiveType";
import { Type } from "../types/Type";

export function condition<IfTrue extends Type = Type, IfFalse extends Type = Type>(
    name: string,
    picker: (v: any) => boolean,
    ifTrue: IfTrue,
    ifFalse: IfFalse
): ConditionalType<IfTrue, IfFalse>;
export function condition<IfTrue extends Type = Type, IfFalse extends Type = Type>(
    picker: (v: any) => boolean,
    ifTrue: IfTrue,
    ifFalse: IfFalse
): ConditionalType<IfTrue, IfFalse>;
export function condition<IfTrue extends Type = Type>(picker: (v: any) => boolean, ifTrue: IfTrue): ConditionalType<IfTrue, PrimitiveType<"never">>;
export function condition(): void;
export function condition(...args: [] | [(v: any) => boolean, Type] | [(v: any) => boolean, Type, Type] | [string, (v: any) => boolean, Type, Type]) {
    if (args.length === 0) return;

    if (args.length === 2 && typeof args[0] === "function" && args[1] instanceof Type)
        return new ConditionalType("[anonymous]", args[0], args[1], PrimitiveType.TYPES.never);

    if (args.length === 3 && typeof args[0] === "function" && args[1] instanceof Type && args[2] instanceof Type)
        return new ConditionalType("[anonymous]", args[0], args[1], args[2]);

    if (args.length === 4 && typeof args[0] === "string" && typeof args[1] === "function" && args[2] instanceof Type && args[3] instanceof Type)
        return new ConditionalType(args[0], args[1], args[2], args[3]);

    if (args.length > 4) throw new Error(`Expected 0-4 arguments, but got ${args.length}`);

    throw new Error(`Invalid arguments to 'types.condition'.`);
}
