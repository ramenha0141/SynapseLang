import llvm from 'llvm-bindings';
import Scope, { Symbols } from './Scope';
import toBool from './toBool';

export const Statement = (context: StatementContext, scope: Scope) => {
    switch (context.type) {
        case 'BlockStatement': return BlockStatement(context, scope);
    }
};
export const BlockStatement = (context: BlockStatementContext, scope: Scope, injectSymbols?: Symbols) => {
    const blockScope = new Scope(scope, injectSymbols);
    for (const statementContext of context.statements) Statement(statementContext, blockScope);
    return blockScope;
};
export const VariableDeclaration = (context: VariableDeclarationContext, scope: Scope) => {};
export const ExpressionStatement = (context: ExpressionStatementContext, scope: Scope) => {
    // Expression.Expression(context.expression, scope);
};
export const ReturnStatement = (context: ReturnStatementContext, scope: Scope) => {
    // builder.CreateRet()
};
export const IfStatement = (context: IfStatementContext, scope: Scope) => {
    const functionContext = scope.getFunctionContext();
    // const condition = toBool(Expression.Expression(context.condition, scope), scope);
    if (context.else) {

    } else {
        
    }
}