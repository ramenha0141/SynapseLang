import Type, { ArrayType, IntegerType, PointerType, TypeID } from './Type';
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
    static getTrue(type: Type): ConstantInt {
        return new ConstantInt(type, 1);
    }
    static getFalse(type: Type): ConstantInt {
        return new ConstantInt(type, 0);
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
    private value: string;
    protected constructor(type: Type, value: string) {
        super(type);
        this.value = value;
    }
    static get(type: Type, fp: number): ConstantFP {
        const buffer = new ArrayBuffer(8);
        const float64Array = new Float64Array(buffer);
        const uint64Array = new BigUint64Array(buffer);
        float64Array[0] = fp;
        const doubleString = uint64Array[0].toString(16);
        if (type.isDoubleTy()) {
            return new ConstantFP(type, `0x${doubleString}`);
        } else {
            const floatStringArray = [...doubleString.slice(0, 9), ...'0'.repeat(7)];
            if (parseInt(floatStringArray[8], 16) % 2 === 1) floatStringArray[8] = (parseInt(floatStringArray[8], 16) - 1).toString(16);
            const floatString = floatStringArray.join('');
            return new ConstantFP(type, `0x${floatString}`);
        }
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
const textEncoder = new TextEncoder();
export class ConstantString extends Constant {
    private value: string;
    protected constructor(type: Type, value: string) {
        super(type);
        this.value = value;
    }
    static get(str: string): ConstantString {
        const stringUInt8Array = textEncoder.encode(str);
        const stringArray = [...stringUInt8Array].map((decimal) => `\\${decimal.toString(16)}`);
        stringArray.push('\\00');
        const string = stringArray.join('');
        return new ConstantString(ArrayType.get(Type.getInt8Ty(), stringArray.length), string);
    }
    public toString(): string {
        return `${this.getType()} c"${this.value}"`;
    }
}