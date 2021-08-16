export abstract class Type {
    public constructor(public readonly name: string) {
        if (typeof name !== "string") throw new TypeError(`Type names must be strings.`);
    }

    public abstract validate(value: any): boolean;
}
