import llvm from 'llvm-bindings';
import * as Expression from './Expression';
import Scope from './Scope';

const isPointerTy = (type: llvm.Type): type is llvm.PointerType => type.isPointerTy();
const toBool = (value: llvm.Value, scope: Scope) => {
    const type = value.getType();
    if (type.getTypeID() === llvm.Type.getInt1Ty(llvmContext).getTypeID()) return value;
    if (type.isIntegerTy()) return builder.CreateICmpNE(value, llvm.ConstantInt.get(llvmContext, 0));
    if (type.isFloatingPointTy()) return builder.CreateFCmpONE(value, llvm.ConstantFP.get(llvmContext, 0));
    if (isPointerTy(type)) return builder.CreateICmpNE(value, llvm.ConstantPointerNull.get(type));
    throw new Error();
};
const Condition = (context: ExpressionContext, scope: Scope) => {
    return toBool(Expression.Expression(context, scope, llvm.Type.getInt1Ty(llvmContext)), scope);
};
export default Condition;