import Type from './Type';

class Value {
    protected Ty: Type;
    protected name: string = '';
    protected constructor(Ty: Type) {
        this.Ty = Ty;
    }
    public getType(): Type {
        return this.Ty;
    }
    public setName(name: string) {
        this.name = name;
    }
    public getName(): string {
        return this.name;
    }
    public toString(): string {
        return `${this.Ty} ${this.name}`;
    }
    public toStringNoType(): string {
        return this.name;
    }
}
export default Value;