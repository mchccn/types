import { TYPE } from "../constants";
import { Type } from "./Type";

export class GenericType extends Type {
    protected readonly [TYPE] = "GenericType";

    public constructor(name: string, public readonly parameters: Type[], public readonly type: (v: any) => boolean) {
        super(name);

        if (!Array.isArray(parameters) || !parameters.every((p) => p instanceof Type)) throw new TypeError(`Generic type parameter types must be valid types.`);

        if (typeof type !== "function") throw new TypeError(`Generic type must be a validator function.`);

        Object.freeze(this);
    }

    public validate(v: any) {
        return this.type(v);
    }
}
