import { TYPE } from "../constants";
import { Type } from "./Type";

export class IntersectionType<Intersection extends Type[] = Type[]> extends Type {
    protected readonly [TYPE] = "IntersectionType";

    public constructor(name: string, public readonly types: Intersection) {
        super(name);

        if (!Array.isArray(types) || !types.every((t) => t instanceof Type)) throw new TypeError(`Members of intersection types must be valid types.`);

        Object.freeze(this);
    }

    public validate(v: any) {
        if (process.env.NODE_ENV === "production") return true;

        return this.types.every((t) => t.validate(v));
    }
}
