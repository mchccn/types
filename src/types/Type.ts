export abstract class Type {
    public constructor(public readonly identifier: string) {
        if (typeof identifier !== "string") throw new TypeError(`Type names must be strings.`);
    }

    public abstract validate(value: any): boolean;
}
