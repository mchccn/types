import { MappedType } from "../types/MappedType";
import { PrimitiveType } from "../types/PrimitiveType";
import { Type } from "../types/Type";

export function mapped<Key extends Type = Type, Value extends Type = Type>(name: string, key: Key, value: Value): MappedType<Key, Value>;
export function mapped<Key extends Type = Type, Value extends Type = Type>(key: Key, value: Value): MappedType<Key, Value>;
export function mapped<Value extends Type = Type>(value: Value): MappedType<PrimitiveType<"string">, Value>;
export function mapped<Key extends Type = Type, Value extends Type = Type>(
    ...args: [Value] | [Key, Value] | [string, Key, Value] | []
): MappedType<Key, Value> {
    if (args.length === 1) return new MappedType("[anonymous]", PrimitiveType.TYPES.string as Type as Key, args[0]);

    if (args.length === 2) return new MappedType("[anonymous]", ...args);

    if (args.length === 3) return new MappedType(...args);

    if (args.length < 1 || args.length > 3) throw new Error(`Expected 1-3 arguments, but got ${args.length}.`);

    throw new Error(`Invalid arguments to 'types.mapped'.`);
}
