import Type, { IntegerType } from './Type';
import Value from './Value';

export class Constant extends Value {

}
export class ConstantInt extends Constant {
    private Val: number;
    protected constructor(Ty: Type, V: number) {
        super(Ty);
        this.Val = V;
    }
    static get(type: IntegerType, value: number): ConstantInt {
        if (value !== parseInt(value.toString())) throw new Error();
        return new ConstantInt(type, value);
    }
    static getTrue(): ConstantInt {
        return new ConstantInt(Type.getInt1Ty(), 1);
    }
    static getFalse(): ConstantInt {
        return new ConstantInt(Type.getInt1Ty(), 0);
    }
}