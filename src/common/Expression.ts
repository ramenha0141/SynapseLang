import llvm from 'llvm-bindings';

import Scope, { Symbols } from './Scope';
import Condition from './Condition';

const Reference = (context: ExpressionContext, scope: Scope): llvm.Value => {
    switch (context.type) {
        case 'Identifier': return IdentifierReference(context, scope);
        default: throw new Error();
    }
};
const IdentifierReference = (context: IdentifierContext, scope: Scope): llvm.Value => {
    return scope.getVariable(context.identifiers);
};
//@ts-expect-error
export const Expression = (context: ExpressionContext, scope: Scope, expectedType?: llvm.Type): llvm.Value => {
    switch (context.type) {
        case 'AssignmentExpression': return AssignmentExpression(context, scope, expectedType);
        case 'TernaryExpression': return TernaryExpression(context, scope, expectedType);
    }
};
export const AssignmentExpression = (context: AssignmentExpressionContext, scope: Scope, expectedType?: llvm.Type): llvm.Value => {
    const variable = Reference(context.left, scope);
    const expression = Expression(context.right, scope, variable.getType());
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
    const thenBlock = llvm.BasicBlock.Create(llvmContext, undefined, functionContext);
    const elseBlock = llvm.BasicBlock.Create(llvmContext, undefined, functionContext);
    const endBlock = llvm.BasicBlock.Create(llvmContext, undefined, functionContext);
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
    const expression = builder.CreatePHI(thenExpression.getType(), 2);
    expression.addIncoming(thenExpression, thenBlock);
    expression.addIncoming(elseExpression, elseBlock);
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
    const left = Expression(context.left, scope, expectedType);
    const right = Expression(context.right, scope, expectedType);
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
    const left = Expression(context.left, scope, expectedType);
    const right = Expression(context.right, scope, expectedType);
    if (left.getType().getTypeID() !== right.getType().getTypeID()) throw new Error();
    const type = left.getType();
    if (type.isIntegerTy()) {
        switch (context.operator) {
            case '<': return builder.CreateICmpSLT(left, right);
            case '>': return builder.CreateICmpSGT(left, right);
            case '<=': return builder.CreateICmpSGE(left, right);
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