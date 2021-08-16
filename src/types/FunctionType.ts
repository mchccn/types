import { TYPE } from "../constants";
import { Type } from "./Type";

export class FunctionType extends Type {
    private readonly [TYPE] = "FunctionType";

    public constructor(name: string, public readonly parameters: Type[], public readonly returnType: Type) {
        super(name);

        if (!Array.isArray(parameters) || !parameters.every((p) => p instanceof Type)) throw new TypeError(`Parameter types must be valid types.`);

        if (!(returnType instanceof Type)) throw new TypeError(`Return type must be a valid type.`);

        Object.freeze(this);
    }

    public validate(v: any) {
        return typeof v === "function";
    }
}
