import Type, { PointerType, TypeID } from './Type';
import Value from './Value';
import { ConstantPointerNull } from './Constants';

class Constant extends Value {
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
export default Constant;