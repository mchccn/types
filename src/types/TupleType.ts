import { TYPE } from "../constants";
import { Type } from "./Type";

export class TupleType<Tuple extends Type[] = Type[]> extends Type {
    protected readonly [TYPE] = "TupleType";

    public constructor(name: string, public readonly types: Tuple) {
        super(name);

        if (!Array.isArray(types) || !types.every((t) => t instanceof Type)) throw new TypeError(`Members of tuple types must be valid types.`);

        Object.freeze(this);
    }

    public validate(v: any) {
        return Array.isArray(v) && v.length <= this.types.length && this.types.every((t, i) => t.validate(v[i]));
    }
}
