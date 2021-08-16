import { TYPE } from "../constants";
import { Type } from "./Type";

export class UnionType extends Type {
        private readonly [TYPE] = "UnionType";

        public constructor (name: string, public readonly types: Type[]) {
                super(name);

                if (!Array.isArray(types) || !types.every((t) => t instanceof Type))
                        throw new TypeError(`Members of union types must be valid types.`);

                Object.freeze(this);
        }

        public validate(v: any) {
                return this.types.some((t) => t.validate(v));
        }
}
