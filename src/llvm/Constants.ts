import Type, { IntegerType, PointerType, TypeID } from './Type';
import Value from './Value';

export class Constant extends Value {
    static getNullValue(type: Type): Constant {
        switch (type.getTypeID()) {
            case TypeID.PointerTyID: return ConstantPointerNull.get(type as PointerType);
            default: throw new Error();
        }
    }
    public isNullValue(): this is ConstantPointerNull {
        return this instanceof ConstantPointerNull;
    }
}
export class ConstantInt extends Constant {
    private value: number;
    protected constructor(type: Type, value: number) {
        super(type);
        this.value = value;
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
    public toString(): string {
        if (this.getType().getBitWidth() === 1) {
            if (this.value === 1) {
                return `${this.Ty} true`;
            } else {
                return `${this.Ty} false`;
            }
        } else {
            return `${this.Ty} ${this.value}`;
        }
    }
}
export class ConstantFP extends Constant {
    private value: number;
    protected constructor(type: Type, value: number) {
        super(type);
        this.value = value;
    }
    static get(type: Type, value: number): ConstantFP {
        return new ConstantFP(type, value);
    }
    public toString(): string {
        return `${this.Ty} ${this.value}`;
    }
}
export class ConstantPointerNull extends Constant {
    protected constructor(Ty: Type) {
        super(Ty);
    }
    static get(type: PointerType): ConstantPointerNull {
        return new ConstantPointerNull(type);
    }
    public toString(): string {
        return `${this.Ty} null`;
    }
}