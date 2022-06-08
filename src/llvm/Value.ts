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
    public print(): string {
        return ``;
    }
    public toStringNoType(): string {
        return ``;
    }
}
export default Value;