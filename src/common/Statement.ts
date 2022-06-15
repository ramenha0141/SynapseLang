import * as llvm from '../llvm';

import Scope, { Symbols } from './Scope';
import Type from './Type';
import * as Expression from './Expression';
import Condition from './Condition';

export const Statement = (context: StatementContext, scope: Scope) => {
    switch (context.type) {
        case 'BlockStatement': return BlockStatement(context, scope);
        case 'VariableDeclaration': return VariableDeclaration(context, scope);
        case 'ExpressionStatement': return ExpressionStatement(context, scope);
        case 'ReturnStatement': return ReturnStatement(context, scope);
        case 'IfStatement': return IfStatement(context, scope);
        case 'WhileStatement': return WhileStatement(context, scope);
        case 'ForNormalStatement': return ForNormalStatement(context, scope);
        case 'ForInStatement': return ForInStatement(context, scope);
        case 'BreakStatement': return BreakStatement(context, scope);
        case 'ContinueStatement': return ContinueStatement(context, scope);
    }
};
export const BlockStatement = (context: BlockStatementContext, scope: Scope, injectSymbols?: Symbols) => {
    const blockScope = new Scope(scope, injectSymbols);
    for (const statementContext of context.statements) Statement(statementContext, blockScope);
    return blockScope;
};
export const VariableDeclaration = (context: VariableDeclarationContext, scope: Scope) => {
    // Unexpected void type
    if (context.typeAnnotation?.isVoid) throw new Error();
    // Constant variable requires assignment
    if (!context.expression && context.isConstant) throw new Error();
    // Type annotation or expression are required
    if (!context.expression && !context.typeAnnotation) throw new Error();
    const typeAnnotation = context.typeAnnotation && Type(context.typeAnnotation, scope);
    const expression = context.expression && Expression.Expression(context.expression, scope, typeAnnotation);
    // Type conflict between type annotation and expression
    if (expression && typeAnnotation && expression?.getType().getTypeID() !== typeAnnotation.getTypeID()) throw new Error();
    // dev
    if (dev) builder.CreateComment(`${context.isConstant ? 'const' : 'let'} ${context.identifier}`);
    const variable = builder.CreateAlloca(typeAnnotation ?? expression?.getType() ?? llvm.Type.getInt32Ty());
    if (expression) builder.CreateStore(expression, variable);
    scope.import(context.identifier, variable);
};
export const ExpressionStatement = (context: ExpressionStatementContext, scope: Scope) => {
    Expression.Expression(context.expression, scope);
};
export const ReturnStatement = (context: ReturnStatementContext, scope: Scope) => {
    const functionContext = scope.getFunctionContext();
    const expectedType = functionContext.getReturnType();
    if (context.expression) {
        const returnValue = Expression.Expression(context.expression, scope, expectedType);
        builder.CreateRet(returnValue);
    } else {
        builder.CreateRetVoid();
    }
};
export const IfStatement = (context: IfStatementContext, scope: Scope) => {
    const functionContext = scope.getFunctionContext();
    const condition = Condition(context.condition, scope);
    if (context.else) {
        const thenBlock = llvm.BasicBlock.Create();
        const elseBlock = llvm.BasicBlock.Create();
        const endBlock = llvm.BasicBlock.Create();
        builder.CreateCondBr(condition, thenBlock, elseBlock);
        thenBlock.insertTo(functionContext);
        builder.SetInsertPoint(thenBlock);
        Statement(context.then, scope);
        builder.CreateBr(endBlock);
        elseBlock.insertTo(functionContext);
        builder.SetInsertPoint(elseBlock);
        Statement(context.else, scope);
        builder.CreateBr(endBlock);
        endBlock.insertTo(functionContext);
        builder.SetInsertPoint(endBlock);
    } else {
        const thenBlock = llvm.BasicBlock.Create();
        const endBlock = llvm.BasicBlock.Create();
        builder.CreateCondBr(condition, thenBlock, endBlock);
        thenBlock.insertTo(functionContext);
        builder.SetInsertPoint(thenBlock);
        Statement(context.then, scope);
        builder.CreateBr(endBlock);
        endBlock.insertTo(functionContext);
        builder.SetInsertPoint(endBlock);
    }
};
export const WhileStatement = (context: WhileStatementContext, scope: Scope) => {
    const functionContext = scope.getFunctionContext();
    const conditionBlock = llvm.BasicBlock.Create();
    const thenBlock = llvm.BasicBlock.Create();
    const endBlock = llvm.BasicBlock.Create();
    builder.CreateBr(conditionBlock);
    conditionBlock.insertTo(functionContext);
    builder.SetInsertPoint(conditionBlock);
    const condition = Condition(context.condition, scope);
    builder.CreateCondBr(condition, thenBlock, endBlock);
    thenBlock.insertTo(functionContext);
    builder.SetInsertPoint(thenBlock);
    Statement(context.then, scope);
    builder.CreateBr(conditionBlock);
    endBlock.insertTo(functionContext);
    builder.SetInsertPoint(endBlock);
};
export const ForNormalStatement = (context: ForNormalStatementContext, scope: Scope) => {
    const functionContext = scope.getFunctionContext();
    const conditionBlock = llvm.BasicBlock.Create();
    const thenBlock = llvm.BasicBlock.Create();
    const finalBlock = llvm.BasicBlock.Create();
    const endBlock = llvm.BasicBlock.Create();
    VariableDeclaration(context.initialization, scope);
    builder.CreateBr(conditionBlock);
    conditionBlock.insertTo(functionContext);
    builder.SetInsertPoint(conditionBlock);
    const condition = Condition(context.condition, scope);
    builder.CreateCondBr(condition, thenBlock, endBlock);
    thenBlock.insertTo(functionContext);
    builder.SetInsertPoint(thenBlock);
    Statement(context.then, scope);
    builder.CreateBr(finalBlock);
    finalBlock.insertTo(functionContext);
    builder.SetInsertPoint(finalBlock);
    Expression.Expression(context.final, scope);
    builder.CreateBr(conditionBlock);
    endBlock.insertTo(functionContext);
    builder.SetInsertPoint(endBlock);
};
export const ForInStatement = (context: ForInStatementContext, scope: Scope) => {};
export const BreakStatement = (context: BreakStatementContext, scope: Scope) => {
    const breakBlock = scope.getBreakBlock();
    builder.CreateBr(breakBlock);
};
export const ContinueStatement = (context: ContinueStatementContext, scope: Scope) => {
    const continueBlock = scope.getContinueBlock();
    builder.CreateBr(continueBlock);
};