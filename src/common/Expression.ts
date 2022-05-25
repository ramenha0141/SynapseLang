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