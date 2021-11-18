import { TYPE } from "../constants";

export abstract class Type {
    protected readonly [TYPE] = "Type" as string;

    public constructor(public readonly identifier: string) {
        if (typeof identifier !== "string") throw new TypeError(`Type names must be strings.`);
    }

    public abstract validate(value: any): boolean;
}
