import * as llvm from '../llvm';

import Scope from './Scope';
import Condition from './Condition';

const i32 = llvm.Type.getInt32Ty();

const Reference = (context: ExpressionContext, scope: Scope): llvm.Value => {
    switch (context.type) {
        case 'IndexExpression': return IndexReference(context, scope);
        case 'MemberExpression': return MemberReference(context, scope);
        case 'Identifier': return IdentifierReference(context, scope);
        default: throw new Error();
    }
};
const IndexReference = (context: IndexExpressionContext, scope: Scope): llvm.Value => {
    const reference = Reference(context.expression, scope);
    const index = Expression(context.index, scope, i32);
    return builder.CreateGEP(reference.getType().getPointerElementType(), reference, [llvm.ConstantInt.get(i32, 0), index]);
};
//@ts-expect-error
const MemberReference = (context: MemberExpressionContext, scope: Scope): llvm.Value => {
    const reference = Reference(context.expression, scope);
};
const IdentifierReference = (context: IdentifierContext, scope: Scope): llvm.Value => {
    return scope.getVariable(context.identifiers);
};
export const Expression = (context: ExpressionContext, scope: Scope, expectedType?: llvm.Type): llvm.Value => {
    switch (context.type) {
        case 'AssignmentExpression': return AssignmentExpression(context, scope, expectedType);
        case 'TernaryExpression': return TernaryExpression(context, scope, expectedType);
        case 'LogicalOrExpression': return LogicalOrExpression(context, scope, expectedType);
        case 'LogicalAndExpression': return LogicalAndExpression(context, scope, expectedType);
        case 'BitOrExpression': return BitOrExpression(context, scope, expectedType);
        case 'BitXOrExpression': return BitXOrExpression(context, scope, expectedType);
        case 'BitAndExpression': return BitAndExpression(context, scope, expectedType);
        case 'EqualityExpression': return EqualityExpression(context, scope, expectedType);
        case 'RelationalExpression': return RelationalExpression(context, scope, expectedType);
        case 'BitShiftExpression': return BitShiftExpression(context, scope, expectedType);
        case 'AdditiveExpression': return AdditiveExpression(context, scope, expectedType);
        case 'MultiplicativeExpression': return MultiplicativeExpression(context, scope, expectedType);
        case 'AssertionExpression': return AssertionExpression(context, scope, expectedType);
        case 'UnaryPlusExpression': return UnaryPlusExpression(context, scope, expectedType);
        case 'UnaryMinusExpression': return UnaryMinusExpression(context, scope, expectedType);
        case 'BitNotExpression': return BitNotExpression(context, scope, expectedType);
        case 'NotExpression': return NotExpression(context, scope, expectedType);
        case 'NewExpression': return NewExpression(context, scope, expectedType);
        case 'DeleteExpression': return DeleteExpression(context, scope, expectedType);
        case 'SizeofExpression': return SizeofExpression(context, scope, expectedType);
        case 'PreIncrementExpression': return PreIncrementExpression(context, scope, expectedType);
        case 'PreDecrementExpression': return PreDecrementExpression(context, scope, expectedType);
        case 'PostIncrementExpression': return PostIncrementExpression(context, scope, expectedType);
        case 'PostDecrementExpression': return PostDecrementExpression(context, scope, expectedType);
        case 'IndexExpression': return IndexExpression(context, scope, expectedType);
        case 'MemberExpression': return MemberExpression(context, scope, expectedType);
        case 'CallExpression': return CallExpression(context, scope, expectedType);
        case 'ThisExpression': return ThisExpression(context, scope, expectedType);
        case 'SuperExpression': return SuperExpression(context, scope, expectedType);
        case 'ParenthesizedExpression': return ParenthesizedExpression(context, scope, expectedType);
        case 'NullLiteral': return NullLiteral(context, scope, expectedType);
        case 'BooleanLiteral': return BooleanLiteral(context, scope, expectedType);
        case 'StringLiteral': return StringLiteral(context, scope, expectedType);
        case 'NumberLiteral': return NumberLiteral(context, scope, expectedType);
        case 'ArrayLiteral': return ArrayLiteral(context, scope, expectedType);
        case 'Identifier': return Identifier(context, scope, expectedType);
        default: throw new Error();
    }
};
export const AssignmentExpression = (context: AssignmentExpressionContext, scope: Scope, expectedType?: llvm.Type): llvm.Value => {
    const variable = Reference(context.left, scope);
    const expression = Expression(context.right, scope, variable.getType().getPointerElementType());
    switch (context.operator) {
        case '=': {
            builder.CreateStore(expression, variable);
            break;
        }
    }
    return expression;
};
export const TernaryExpression = (context: TernaryExpressionContext, scope: Scope, expectedType?: llvm.Type): llvm.Value => {
    const functionContext = scope.getFunctionContext();
    const condition = Condition(context.condition, scope);
    const thenBlock = llvm.BasicBlock.Create(functionContext);
    const elseBlock = llvm.BasicBlock.Create(functionContext);
    const endBlock = llvm.BasicBlock.Create(functionContext);
    builder.CreateCondBr(condition, thenBlock, elseBlock);
    builder.SetInsertPoint(thenBlock);
    const thenExpression = Expression(context.then, scope, expectedType);
    builder.CreateBr(endBlock);
    builder.SetInsertPoint(elseBlock);
    const elseExpression = Expression(context.else, scope, expectedType);
    builder.CreateBr(endBlock);
    builder.SetInsertPoint(endBlock);
    // Type conflict between then expression and else expression
    if (thenExpression.getType().getTypeID() !== elseExpression.getType().getTypeID()) throw new Error();
    const expression = builder.CreatePHI(thenExpression.getType(), [[thenExpression, thenBlock], [elseExpression, elseBlock]]);
    return expression;
};
export const LogicalOrExpression = (context: LogicalOrExpressionContext, scope: Scope, expectedType?: llvm.Type): llvm.Value => {
    const left = Condition(context.left, scope);
    const right = Condition(context.right, scope);
    return builder.CreateOr(left, right);
};
export const LogicalAndExpression = (context: LogicalAndExpressionContext, scope: Scope, expectedType?: llvm.Type): llvm.Value => {
    const left = Condition(context.left, scope);
    const right = Condition(context.right, scope);
    return builder.CreateAnd(left, right);
};
export const BitOrExpression = (context: BitOrExpressionContext, scope: Scope, expectedType?: llvm.Type): llvm.Value => {
    const left = Expression(context.left, scope, expectedType);
    const right = Expression(context.right, scope, expectedType);
    if (left.getType().getTypeID() !== right.getType().getTypeID()) throw new Error();
    return builder.CreateOr(right, left);
};
export const BitXOrExpression = (context: BitXOrExpressionContext, scope: Scope, expectedType?: llvm.Type): llvm.Value => {
    const left = Expression(context.left, scope, expectedType);
    const right = Expression(context.right, scope, expectedType);
    if (left.getType().getTypeID() !== right.getType().getTypeID()) throw new Error();
    return builder.CreateXor(right, left);
};
export const BitAndExpression = (context: BitAndExpressionContext, scope: Scope, expectedType?: llvm.Type): llvm.Value => {
    const left = Expression(context.left, scope, expectedType);
    const right = Expression(context.right, scope, expectedType);
    if (left.getType().getTypeID() !== right.getType().getTypeID()) throw new Error();
    return builder.CreateAnd(right, left);
};
export const EqualityExpression = (context: EqualityExpressionContext, scope: Scope, expectedType?: llvm.Type): llvm.Value => {
    const left = Expression(context.left, scope);
    const right = Expression(context.right, scope, left.getType());
    if (left.getType().getTypeID() !== right.getType().getTypeID()) throw new Error();
    const type = left.getType();
    if (type.isIntegerTy() || type.isPointerTy()) {
        switch (context.operator) {
            case '==':
            case '===': return builder.CreateICmpEQ(left, right);
            case '!=':
            case '!==': return builder.CreateICmpNE(left, right);
        }
    } else if (type.isFloatingPointTy()) {
        switch (context.operator) {
            case '==':
            case '===': return builder.CreateFCmpOEQ(left, right);
            case '!=':
            case '!==': return builder.CreateFCmpONE(left, right);
        }
    }
    throw new Error();
};
export const RelationalExpression = (context: RelationalExpressionContext, scope: Scope, expectedType?: llvm.Type): llvm.Value => {
    const left = Expression(context.left, scope);
    const right = Expression(context.right, scope, left.getType());
    if (left.getType().getTypeID() !== right.getType().getTypeID()) throw new Error();
    const type = left.getType();
    if (type.isIntegerTy()) {
        switch (context.operator) {
            case '<': return builder.CreateICmpSLT(left, right);
            case '>': return builder.CreateICmpSGT(left, right);
            case '<=': return builder.CreateICmpSLE(left, right);
            case '>=': return builder.CreateICmpSGE(left, right);
        }
    } else if (type.isFloatingPointTy()) {
        switch (context.operator) {
            case '<': return builder.CreateFCmpOLT(left, right);
            case '>': return builder.CreateFCmpOGT(left, right);
            case '<=': return builder.CreateFCmpOLE(left, right);
            case '>=': return builder.CreateFCmpOGE(left, right);
        }
    }
    throw new Error();
};
export const BitShiftExpression = (context: BitShiftExpressionContext, scope: Scope, expectedType?: llvm.Type): llvm.Value => {
    const left = Expression(context.left, scope, expectedType);
    const right = Expression(context.right, scope, expectedType);
    if (left.getType().getTypeID() !== right.getType().getTypeID()) throw new Error();
    switch (context.operator) {
        case '<<': return builder.CreateShl(left, right);
        case '>>': return builder.CreateAShr(left, right);
        case '>>>': return builder.CreateLShr(left, right);
    }
};
export const AdditiveExpression = (context: AdditiveExpressionContext, scope: Scope, expectedType?: llvm.Type): llvm.Value => {
    const left = Expression(context.left, scope, expectedType);
    const right = Expression(context.right, scope, expectedType);
    if (left.getType().getTypeID() !== right.getType().getTypeID()) throw new Error();
    const type = left.getType();
    if (type.isIntegerTy()) {
        switch (context.operator) {
            case '+': return builder.CreateAdd(left, right);
            case '-': return builder.CreateSub(left, right);
        }
    } else if (type.isFloatingPointTy()) {
        switch (context.operator) {
            case '+': return builder.CreateFAdd(left, right);
            case '-': return builder.CreateFSub(left, right);
        }
    }
    throw new Error();
};
export const MultiplicativeExpression = (context: MultiplicativeExpressionContext, scope: Scope, expectedType?: llvm.Type): llvm.Value => {
    const left = Expression(context.left, scope, expectedType);
    const right = Expression(context.right, scope, expectedType);
    if (left.getType().getTypeID() !== right.getType().getTypeID()) throw new Error();
    const type = left.getType();
    if (type.isIntegerTy()) {
        switch (context.operator) {
            case '*': return builder.CreateMul(left, right);
            case '/': return builder.CreateSDiv(left, right);
            case '%': return builder.CreateSRem(left, right);
        }
    } else if (type.isFloatingPointTy()) {
        switch (context.operator) {
            case '*': return builder.CreateFMul(left, right);
            case '/': return builder.CreateFDiv(left, right);
            case '%': return builder.CreateFRem(left, right);
        }
    }
    throw new Error();
};
export const AssertionExpression = (context: AssertionExpressionContext, scope: Scope, expectedType?: llvm.Type): llvm.Value => {
    // Unexpected void
    if (context.typeAnnotation.isVoid) throw new Error();
    const expression = Expression(context.expression, scope);
    const fromType = expression.getType();
    const toType = scope.getType(context.typeAnnotation.identifier.identifiers);
    if (expression.getType().getTypeID() === toType.getTypeID()) throw new Error();
    if (fromType.isIntegerTy()) {
        if (toType.isIntegerTy()) {
            if (fromType.getPrimitiveSizeInBits() > toType.getPrimitiveSizeInBits()) {
                return builder.CreateTrunc(expression, toType);
            } else if (fromType.getPrimitiveSizeInBits() < toType.getPrimitiveSizeInBits()) {
                return builder.CreateSExt(expression, toType);
            } else {
                throw new Error();
            }
        } else if (toType.isFloatingPointTy()) {
            return builder.CreateSIToFP(expression, toType);
        } else if (toType.isPointerTy()) {
            return builder.CreateIntToPtr(expression, toType);
        } else {
            throw new Error();
        }
    } else if (fromType.isFloatingPointTy()) {
        if (toType.isIntegerTy()) {
            return builder.CreateFPToSI(expression, toType);
        } else if (toType.isFloatingPointTy()) {
            if (expression.getType().getPrimitiveSizeInBits() > toType.getPrimitiveSizeInBits()) {
                return builder.CreateFPTrunc(expression, toType);
            } else {
                return builder.CreateFPExt(expression, toType);
            }
        } else {
            throw new Error();
        }
    } else if (fromType.isPointerTy()) {
        if (toType.isIntegerTy()) {
            return builder.CreatePtrToInt(expression, toType);
        } else if (toType.isPointerTy()) {
            return builder.CreateBitCast(expression, toType);
        } else {
            throw new Error();
        }
    } else {
        throw new Error();
    }
};
export const UnaryPlusExpression = (context: UnaryPlusExpressionContext, scope: Scope, expectedType?: llvm.Type): llvm.Value => {
    const expression = Expression(context.expression, scope, expectedType);
    return expression;
};
export const UnaryMinusExpression = (context: UnaryMinusExpressionContext, scope: Scope, expectedType?: llvm.Type): llvm.Value => {
    const expression = Expression(context.expression, scope, expectedType);
    const type = expression.getType();
    if (type.isIntegerTy()) {
        return builder.CreateSub(llvm.ConstantInt.get(type, 0), expression);
    } else if (type.isFloatingPointTy()) {
        return builder.CreateFSub(llvm.ConstantFP.get(type, 0), expression);
    } else {
        throw new Error();
    }
};
export const BitNotExpression = (context: BitNotExpressionContext, scope: Scope, expectedType?: llvm.Type): llvm.Value => {
    const expression = Expression(context.expression, scope, expectedType);
    const type = expression.getType();
    if (type.isIntegerTy()) {
        return builder.CreateXor(expression, llvm.ConstantInt.get(type, -1));
    } else {
        throw new Error();
    }
};
export const NotExpression = (context: NotExpressionContext, scope: Scope, expectedType?: llvm.Type): llvm.Value => {
    const condition = Condition(context.expression, scope);
    return builder.CreateICmpNE(condition, llvm.ConstantInt.getFalse(llvm.Type.getInt1Ty()));
};
//@ts-expect-error
export const NewExpression = (context: NewExpressionContext, scope: Scope, expectedType?: llvm.Type): llvm.Value => {

};
//@ts-expect-error
export const DeleteExpression = (context: DeleteExpressionContext, scope: Scope, expectedType?: llvm.Type): llvm.Value => {

};
const isPointerTy = (type: llvm.Type): type is llvm.PointerType => type.isPointerTy();
export const SizeofExpression = (context: SizeofExpressionContext, scope: Scope, expectedType?: llvm.Type): llvm.Value => {
    // Unexpected void
    if (context.typeAnnotation.isVoid) throw new Error();
    const type = scope.getType(context.typeAnnotation.identifier.identifiers);
    const primitiveSize = type.getPrimitiveSizeInBits();
    if (primitiveSize) {
        return llvm.ConstantInt.get(type, Math.ceil(primitiveSize / 4));
    } else if (isPointerTy(type)) {
        const ptr = builder.CreateGEP(type, llvm.ConstantPointerNull.get(type), [llvm.ConstantInt.get(i32, 1)]);
        return builder.CreatePtrToInt(ptr, expectedType ?? i32);
    } else {
        throw new Error();
    }
};
export const PreIncrementExpression = (context: PreIncrementExpressionContext, scope: Scope, expectedType?: llvm.Type): llvm.Value => {
    const variable = Reference(context.expression, scope);
    const type = variable.getType().getPointerElementType();
    const value = builder.CreateLoad(type, variable);
    if (type.isIntegerTy()) {
        const expression = builder.CreateAdd(value, llvm.ConstantInt.get(type, 1));
        builder.CreateStore(expression, variable);
        return expression;
    } else if (type.isFloatingPointTy()) {
        const expression = builder.CreateFAdd(value, llvm.ConstantInt.get(type, 1));
        builder.CreateStore(expression, variable);
        return expression;
    } else {
        throw new Error();
    }
};
export const PreDecrementExpression = (context: PreDecrementExpressionContext, scope: Scope, expectedType?: llvm.Type): llvm.Value => {
    const variable = Reference(context.expression, scope);
    const type = variable.getType().getPointerElementType();
    const value = builder.CreateLoad(type, variable);
    if (type.isIntegerTy()) {
        const expression = builder.CreateSub(value, llvm.ConstantInt.get(type, 1));
        builder.CreateStore(expression, variable);
        return expression;
    } else if (type.isFloatingPointTy()) {
        const expression = builder.CreateFSub(value, llvm.ConstantInt.get(type, 1));
        builder.CreateStore(expression, variable);
        return expression;
    } else {
        throw new Error();
    }
};
export const PostIncrementExpression = (context: PostIncrementExpressionContext, scope: Scope, expectedType?: llvm.Type): llvm.Value => {
    const variable = Reference(context.expression, scope);
    const type = variable.getType().getPointerElementType();
    const value = builder.CreateLoad(type, variable);
    if (type.isIntegerTy()) {
        const expression = builder.CreateAdd(value, llvm.ConstantInt.get(type, 1));
        builder.CreateStore(expression, variable);
        return value;
    } else if (type.isFloatingPointTy()) {
        const expression = builder.CreateFAdd(value, llvm.ConstantInt.get(type, 1));
        builder.CreateStore(expression, variable);
        return value;
    } else {
        throw new Error();
    }
};
export const PostDecrementExpression = (context: PostDecrementExpressionContext, scope: Scope, expectedType?: llvm.Type): llvm.Value => {
    const variable = Reference(context.expression, scope);
    const type = variable.getType().getPointerElementType();
    const value = builder.CreateLoad(type, variable);
    if (type.isIntegerTy()) {
        const expression = builder.CreateSub(value, llvm.ConstantInt.get(type, 1));
        builder.CreateStore(expression, variable);
        return value;
    } else if (type.isFloatingPointTy()) {
        const expression = builder.CreateFSub(value, llvm.ConstantInt.get(type, 1));
        builder.CreateStore(expression, variable);
        return value;
    } else {
        throw new Error();
    }
};
export const IndexExpression = (context: IndexExpressionContext, scope: Scope, expectedType?: llvm.Type): llvm.Value => {
    const variable = IndexReference(context, scope);
    return builder.CreateLoad(variable.getType().getPointerElementType(), variable);
};
export const MemberExpression = (context: MemberExpressionContext, scope: Scope, expectedType?: llvm.Type): llvm.Value => {
    const variable = MemberReference(context, scope);
    return builder.CreateLoad(variable.getType().getPointerElementType(), variable);
};
export const CallExpression = (context: CallExpressionContext, scope: Scope, expectedType?: llvm.Type): llvm.Value => {
    const func = Reference(context.expression, scope);
    if (!(func instanceof llvm.Function)) throw new Error();
    const args = context.arguments.items.map(arg => Expression(arg, scope));
    return builder.CreateCall(func, args);
};
//@ts-expect-error
export const ThisExpression = (context: ThisExpressionContext, scope: Scope, expectedType?: llvm.Type): llvm.Value => {

};
//@ts-expect-error
export const SuperExpression = (context: SuperExpressionContext, scope: Scope, expectedType?: llvm.Type): llvm.Value => {

};
export const ParenthesizedExpression = (context: ParenthesizedExpressionContext, scope: Scope, expectedType?: llvm.Type): llvm.Value => {
    return Expression(context.expression, scope, expectedType);
};
export const NullLiteral = (context: NullLiteralContext, scope: Scope, expectedType?: llvm.Type): llvm.Value => {
    if (!expectedType) throw new Error();
    if (!expectedType.isPointerTy()) throw new Error();
    return llvm.ConstantPointerNull.get(expectedType);
};
export const BooleanLiteral = (context: BooleanLiteralContext, scope: Scope, expectedType?: llvm.Type): llvm.Value => {
    return context.text === 'true'
        ? llvm.ConstantInt.getTrue(expectedType ?? llvm.Type.getInt1Ty())
        : llvm.ConstantInt.getFalse(expectedType ?? llvm.Type.getInt1Ty());
};
export const StringLiteral = (context: StringLiteralContext, scope: Scope, expectedType?: llvm.Type): llvm.Value => {
    const variable = builder.CreateGlobalString(context.text);
    return builder.CreateGEP(llvm.Type.getInt8Ty().getPointerTo(), variable, [llvm.ConstantInt.get(i32, 0), llvm.ConstantInt.get(i32, 0)]);
};
export const NumberLiteral = (context: NumberLiteralContext, scope: Scope, expectedType?: llvm.Type): llvm.Value => {
    if (expectedType) {
        if (expectedType.isIntegerTy()) {
            if (context.isFloat) throw new Error();
            return llvm.ConstantInt.get(expectedType, context.number);
        } else if (expectedType.isFloatingPointTy()) {
            return llvm.ConstantFP.get(expectedType, context.number);
        } else {
            throw new Error();
        }
    } else {
        if (!context.isFloat) {
            return llvm.ConstantInt.get(i32, context.number);
        } else {
            return llvm.ConstantFP.get(llvm.Type.getFloatTy(), context.number);
        }
    }
};
//@ts-expect-error
export const ArrayLiteral = (context: ArrayLiteralContext, scope: Scope, expectedType?: llvm.Type): llvm.Value => {

};
export const Identifier = (context: IdentifierContext, scope: Scope, expectedType?: llvm.Type): llvm.Value => {
    const variable = IdentifierReference(context, scope);
    return builder.CreateLoad(variable.getType().getPointerElementType(), variable);
};