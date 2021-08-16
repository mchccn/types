import { TYPE } from "../constants";
import { Type } from "./Type";

export class IntersectionType extends Type {
        private readonly [TYPE] = "IntersectionType";

        public constructor (name: string, public readonly types: Type[]) {
                super(name);

                if (!Array.isArray(types) || !types.every((t) => t instanceof Type))
                        throw new TypeError(`Members of intersection types must be valid types.`);

                Object.freeze(this);
        }

        public validate(v: any) {
                return this.types.every((t) => t.validate(v));
        }
}
