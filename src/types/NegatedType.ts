import { TYPE } from "../constants";
import { Type } from "./Type";

export class NegatedType<T extends Type = Type> extends Type {
    private readonly [TYPE] = "NegatedType";

    public constructor(name: string, public readonly type: T) {
        super(name);

        if (!(type instanceof Type)) throw new TypeError(`Type to negate must be a valid type.`);

        Object.freeze(this);
    }

    public validate(v: any) {
        return !this.type.validate(v);
    }
}
