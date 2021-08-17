import { TYPE } from "../constants";
import { PrimitiveType } from "./PrimitiveType";
import { Type } from "./Type";

export type ObjectTypeProps = [PropertyKey, PrimitiveType | ObjectTypeProps][];
export type FinalObjectTypeProps = [PropertyKey, PrimitiveType | ObjectType][];

export class ObjectType<Props extends ObjectTypeProps = ObjectTypeProps> extends Type {
    private readonly [TYPE] = "ObjectType";

    public readonly props: FinalObjectTypeProps;

    public constructor(name: string, properties: ObjectTypeProps) {
        super(name);

        if (!Array.isArray(properties)) throw new Error(`Properties must be in an array.`);

        if (
            !properties.every(
                ([_, type]) =>
                    type instanceof Type ||
                    (() => {
                        try {
                            new ObjectType("[temporary]", type);

                            return true;
                        } catch {
                            return false;
                        }
                    })()
            )
        )
            throw new TypeError(`Property types must be valid types.`);

        if (!properties.every(([key, _]) => ["string", "number", "boolean"].includes(typeof key)))
            throw new TypeError(`Property names must be valid property keys.`);

        this.props = (function transform(props, path = name) {
            props.forEach((prop) => {
                if (Array.isArray(prop[1])) {
                    transform(prop[1], `${path}.${String(prop[0])}`);

                    (prop as FinalObjectTypeProps[number])[1] = new ObjectType(`${path}.${String(prop[0])}`, prop[1]);
                }
            });

            return props as FinalObjectTypeProps;
        })(properties, name);

        Object.freeze(this);
    }

    public validate(v: any) {
        if (typeof v !== "object" || !v) return false;

        for (const [key, type] of this.props) {
            if (!(key in v)) return false;

            if (!type.validate(v[key])) return false;
        }

        return true;
    }
}
