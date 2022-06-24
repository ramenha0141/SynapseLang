import * as llvm from '../llvm';
import Scope from './Scope';

const Type = (context: TypeContext | undefined, scope: Scope): llvm.Type => {
    if (!context || context.isVoid) return llvm.Type.getVoidTy();
    let type = scope.getType(context.identifier.identifiers);
    const dimensions = [...context.dimensions];
    while(dimensions.length > 0) {
        type = llvm.ArrayType.get(type, dimensions.pop()!);
    }
    if (type.isArrayTy()) type = type.getPointerTo();
    return type;
};
export default Type;