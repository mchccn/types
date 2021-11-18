import { TYPE } from "../constants";
import { PrimitiveType } from "./PrimitiveType";
import { Type } from "./Type";

export class MappedType<Key extends Type = Type, Value extends Type = Type> extends Type {
    protected readonly [TYPE] = "MappedType";

    public constructor(name: string, public readonly key: Key, public readonly value: Value) {
        super(name);

        if (!(key instanceof Type)) throw new TypeError(`Key type must be a valid type.`);

        if (!(value instanceof Type)) throw new TypeError(`Value type must be a valid type.`);

        Object.freeze(this);
    }

    public validate(v: any) {
        if (process.env.NODE_ENV === "production") return true;

        return Object.getOwnPropertyNames(v).every(
            (k) =>
                this.value.validate(v[k]) &&
                (this.key === (PrimitiveType.TYPES.number as Type)
                    ? !Number.isNaN(Number(k))
                    : this.key === (PrimitiveType.TYPES.boolean as Type)
                    ? ["true", "false"].includes(k)
                    : this.key === (PrimitiveType.TYPES.string as Type)
                    ? true
                    : this.key === (PrimitiveType.TYPES.symbol as Type)
                    ? typeof k === "symbol"
                    : false)
        );
    }
}
