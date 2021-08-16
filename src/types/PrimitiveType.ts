import { TYPE } from "../constants";
import { Type } from "./Type";

export class PrimitiveType<Name extends string = string> extends Type {
    public static readonly TYPES = {
        string: new PrimitiveType("string", (v) => typeof v === "string"),
        number: new PrimitiveType("number", (v) => typeof v === "number"),
        boolean: new PrimitiveType("boolean", (v) => typeof v === "boolean"),
        bigint: new PrimitiveType("bigint", (v) => typeof v === "bigint"),
        symbol: new PrimitiveType("symbol", (v) => typeof v === "symbol"),
        function: new PrimitiveType("function", (v) => typeof v === "function"),
        undefined: new PrimitiveType("undefined", (v) => typeof v === "undefined"),
        null: new PrimitiveType("null", (v) => v === null),
        void: new PrimitiveType("void", (v) => v === undefined),
        any: new PrimitiveType("any", (v) => true),
        unknown: new PrimitiveType("unknown", (v) => true),
        never: new PrimitiveType("never", (v) => false),
    };

    private readonly [TYPE] = "PrimitiveType";

    public constructor(name: Name, public readonly validate: (v: any) => boolean) {
        super(name);

        if (typeof validate !== "function") throw new TypeError(`Primitive type validators must be functions.`);
    }
}
