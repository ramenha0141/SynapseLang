import Type from './Type';

class Value {
    private VTy: Type;
    protected constructor(Ty: Type) {
        this.VTy = Ty;
    }
    public getType(): Type {
        return this.VTy;
    }
}
export default Value;