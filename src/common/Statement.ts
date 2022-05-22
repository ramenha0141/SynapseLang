import llvm from 'llvm-bindings';

import Scope, { Symbols } from './Scope';
import * as Expression from './Expression';
import Condition from './Condition';

export const Statement = (context: StatementContext, scope: Scope) => {
    switch (context.type) {
        case 'BlockStatement': return BlockStatement(context, scope);
        case 'VariableDeclaration': return VariableDeclaration(context, scope);
        case 'ExpressionStatement': return ExpressionStatement(context, scope);
        case 'ReturnStatement': return ReturnStatement(context, scope);
        case 'IfStatement': return IfStatement(context, scope);
    }
};
export const BlockStatement = (context: BlockStatementContext, scope: Scope, injectSymbols?: Symbols) => {
    const blockScope = new Scope(scope, injectSymbols);
    for (const statementContext of context.statements) Statement(statementContext, blockScope);
    return blockScope;
};
export const VariableDeclaration = (context: VariableDeclarationContext, scope: Scope) => {
    // Unexpected void type
    if (context.typeAnnotation?.isVoid) throw Error();
    // Constant variable requires assignment
    if (!context.expression && context.isConstant) throw Error();
    // Type annotation or expression are required
    if (!context.expression && !context.typeAnnotation) throw Error();
    const expectedType = context.typeAnnotation && scope.getType(context.typeAnnotation.identifier.identifiers);
    const expression = context.expression && Expression.Expression(context.expression, scope, expectedType);
    // Type conflict between type annotation and expression
    if (expression && expectedType && expression?.getType().getTypeID() === expectedType.getTypeID()) throw Error();
    const variable = builder.CreateAlloca(expectedType ?? expression?.getType() ?? llvm.Type.getInt32Ty(llvmContext));
    if (expression) builder.CreateStore(expression, variable);
};
export const ExpressionStatement = (context: ExpressionStatementContext, scope: Scope) => {
    Expression.Expression(context.expression, scope);
};
export const ReturnStatement = (context: ReturnStatementContext, scope: Scope) => {
    const functionContext = scope.getFunctionContext();
    const expectedType = functionContext.getReturnType();
    const returnValue = context.expression
        ? Expression.Expression(context.expression, scope, expectedType)
        : llvm.UndefValue.get(llvm.Type.getVoidTy(llvmContext));
    builder.CreateRet(returnValue);
};
export const IfStatement = (context: IfStatementContext, scope: Scope) => {
    const functionContext = scope.getFunctionContext();
    const condition = Condition(context.condition, scope);
    if (context.else) {
        const thenBlock = llvm.BasicBlock.Create(llvmContext, undefined, functionContext);
        const elseBlock = llvm.BasicBlock.Create(llvmContext, undefined, functionContext);
        const endBlock = llvm.BasicBlock.Create(llvmContext, undefined, functionContext);
        builder.CreateCondBr(condition, thenBlock, elseBlock);
        builder.SetInsertPoint(thenBlock);
        Statement(context.then, scope);
        builder.CreateBr(endBlock);
        builder.SetInsertPoint(elseBlock);
        Statement(context.else, scope);
        builder.SetInsertPoint(endBlock);
    } else {
        const thenBlock = llvm.BasicBlock.Create(llvmContext, undefined, functionContext);
        const endBlock = llvm.BasicBlock.Create(llvmContext, undefined, functionContext);
        builder.CreateCondBr(condition, thenBlock, endBlock);
        builder.SetInsertPoint(thenBlock);
        Statement(context.then, scope);
        builder.CreateBr(endBlock);
        builder.SetInsertPoint(endBlock);
    }
};