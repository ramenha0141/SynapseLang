type Range_ = import('../parser/applyRange').Range;
interface ModuleContext {
    type: 'Module',
    importDeclarations: ImportDeclarationContext[],
    declarations: DeclarationContext[],
    range: Range_
}
type ImportDeclarationContext = ImportDefineDeclarationContext
    | ImportNamespaceDeclarationContext
    | ImportBuiltinDeclarationContext;
interface ImportDefineDeclarationContext {
    type: 'ImportDefineDeclaration',
    defines: string[],
    path: string,
    range: Range_
}
interface ImportNamespaceDeclarationContext {
    type: 'ImportNamespaceDeclaration',
    identifier: string,
    path: string,
    range: Range_
}
interface ImportBuiltinDeclarationContext {
    type: 'ImportBuiltinDeclaration',
    identifier: string,
    range: Range_
}
type DeclarationContext = FunctionDeclarationContext
    | DeclareDeclarationContext
    | VariableDeclarationContext
    | ClassDeclarationContext;
interface FunctionDeclarationContext {
    type: 'FunctionDeclaration',
    identifier: string,
    parameterList: ParameterContext[],
    typeAnnotation?: TypeContext,
    body: BlockStatementContext,
    range: Range_
}
interface DeclareDeclarationContext {
    type: 'DeclareDeclaration',
    identifier: string,
    alias?: string,
    parameters: ParameterContext[],
    typeAnnotation: TypeContext,
    range: Range_
}
interface VariableDeclarationContext {
    type: 'VariableDeclaration',
    isConstant: boolean,
    identifier: string,
    typeAnnotation?: TypeContext,
    expression?: ExpressionContext,
    range: Range_
}
interface ClassDeclarationContext {
    type: 'ClassDeclaration',
    identifier: string,
    extends?: IdentifierContext,
    constructor?: ClassConstructorContext,
    fields: ClassFieldContext[],
    methods: ClassMethodContext[],
    range: Range_
}
interface ClassConstructorContext {
    type: 'ClassConstructor',
    parameterList: ParameterContext[],
    body: BlockStatementContext,
    range: Range_
}
interface ClassFieldContext {
    type: 'ClassField',
    identifier: string,
    typeAnnotation: TypeContext,
    range: Range_
}
interface ClassMethodContext {
    type: 'ClassMethod',
    identifier: string,
    parameterList: ParameterContext[],
    typeAnnotation?: TypeContext,
    body: BlockStatementContext,
    range: Range_
}
type StatementContext = BlockStatementContext
    | VariableDeclarationContext
    | ExpressionStatementContext
    | ReturnStatementContext
    | IfStatementContext
    | WhileStatementContext
    | ForStatementContext
    | BreakStatementContext
    | ContinueStatementContext;
interface BlockStatementContext {
    type: 'BlockStatement',
    statements: StatementContext[],
    range: Range_
}
interface ExpressionStatementContext {
    type: 'ExpressionStatement',
    expression: ExpressionContext,
    range: Range_
}
interface ReturnStatementContext {
    type: 'ReturnStatement',
    expression?: ExpressionContext,
    range: Range_
}
interface IfStatementContext {
    type: 'IfStatement',
    condition: ExpressionContext,
    then: StatementContext,
    else?: StatementContext,
    range: Range_
}
interface WhileStatementContext {
    type: 'WhileStatement',
    condition: ExpressionContext,
    then: StatementContext,
    range: Range_
}
type ForStatementContext = ForNormalStatementContext | ForInStatementContext;
interface ForNormalStatementContext {
    type: 'ForNormalStatement',
    initialization: VariableDeclarationContext,
    condition: ExpressionContext,
    final: ExpressionContext,
    then: StatementContext,
    range: Range_
}
interface ForInStatementContext {
    type: 'ForInStatement',
    identifier: string,
    expression: ExpressionContext,
    then: StatementContext,
    range: Range_
}
interface BreakStatementContext {
    type: 'BreakStatement',
    range: Range_
}
interface ContinueStatementContext {
    type: 'ContinueStatement',
    range: Range_
}
type ExpressionContext = AssignmentExpressionContext
    | TernaryExpressionContext
    | LogicalOrExpressionContext
    | LogicalAndExpressionContext
    | BitOrExpressionContext
    | BitXOrExpressionContext
    | BitAndExpressionContext
    | EqualityExpressionContext
    | RelationalExpressionContext
    | BitShiftExpressionContext
    | AdditiveExpressionContext
    | MultiplicativeExpressionContext
    | AssertionExpressionContext
    | PreIncrementExpressionContext
    | PreDecrementExpressionContext
    | UnaryPlusExpressionContext
    | UnaryMinusExpressionContext
    | BitNotExpressionContext
    | NotExpressionContext
    | NewExpressionContext
    | DeleteExpressionContext
    | SizeofExpressionContext
    | IndexExpressionContext
    | MemberExpressionContext
    | CallExpressionContext
    | PostIncrementExpressionContext
    | PostDecrementExpressionContext
    | ThisExpressionContext
    | IdentifierContext
    | SuperExpressionContext
    | LiteralContext
    | ParenthesizedExpressionContext;
interface AssignmentExpressionContext {
    type: 'AssignmentExpression',
    left: ExpressionContext,
    operator: '=' | '*=' | '/=' | '%=' | '+=' | '-=',
    right: ExpressionContext,
    range: Range_
}
interface TernaryExpressionContext {
    type: 'TernaryExpression',
    condition: ExpressionContext,
    then: ExpressionContext,
    else: ExpressionContext,
    range: Range_
}
interface LogicalOrExpressionContext {
    type: 'LogicalOrExpression',
    left: ExpressionContext,
    right: ExpressionContext
}
interface LogicalAndExpressionContext {
    type: 'LogicalAndExpression',
    left: ExpressionContext,
    right: ExpressionContext
}
interface BitOrExpressionContext {
    type: 'BitOrExpression',
    left: ExpressionContext,
    right: ExpressionContext
}
interface BitXOrExpressionContext {
    type: 'BitXOrExpression',
    left: ExpressionContext,
    right: ExpressionContext
}
interface BitAndExpressionContext {
    type: 'BitAndExpression',
    left: ExpressionContext,
    right: ExpressionContext
}
interface EqualityExpressionContext {
    type: 'EqualityExpression',
    left: ExpressionContext,
    operator: '==' | '!=' | '===' | '!==',
    right: ExpressionContext
}
interface RelationalExpressionContext {
    type: 'RelationalExpression',
    left: ExpressionContext,
    operator: '<' | '>' | '<=' | '>=',
    right: ExpressionContext
}
interface BitShiftExpressionContext {
    type: 'BitShiftExpression',
    left: ExpressionContext,
    operator: '<<' |'>>' |  '>>>',
    right: ExpressionContext
}
interface AdditiveExpressionContext {
    type: 'AdditiveExpression',
    left: ExpressionContext,
    operator: '+' | '-',
    right: ExpressionContext
}
interface MultiplicativeExpressionContext {
    type: 'MultiplicativeExpression',
    left: ExpressionContext,
    operator: '*' | '/' | '%',
    right: ExpressionContext
}
interface AssertionExpressionContext {
    type: 'AssertionExpression',
    expression: ExpressionContext,
    typeAnnotation: TypeContext
}
interface UnaryPlusExpressionContext {
    type: 'UnaryPlusExpression',
    expression: ExpressionContext,
    range: Range_
}
interface UnaryMinusExpressionContext {
    type: 'UnaryMinusExpression',
    expression: ExpressionContext,
    range: Range_
}
interface BitNotExpressionContext {
    type: 'BitNotExpression',
    expression: ExpressionContext,
    range: Range_
}
interface NotExpressionContext {
    type: 'NotExpression',
    expression: ExpressionContext,
    range: Range_
}
interface NewExpressionContext {
    type: 'NewExpression',
    identifier: IdentifierContext,
    arguments: ArgumentsContext,
    range: Range_
}
interface DeleteExpressionContext {
    type: 'DeleteExpression',
    expression: ExpressionContext,
    range: Range_
}
interface SizeofExpressionContext {
    type: 'SizeofExpression',
    typeAnnotation: TypeContext,
    range: Range_
}
interface PreIncrementExpressionContext {
    type: 'PreIncrementExpression',
    expression: ExpressionContext,
    range: Range_
}
interface PreDecrementExpressionContext {
    type: 'PreDecrementExpression',
    expression: ExpressionContext,
    range: Range_
}
interface PostIncrementExpressionContext {
    type: 'PostIncrementExpression',
    expression: ExpressionContext,
    range: Range_
}
interface PostDecrementExpressionContext {
    type: 'PostDecrementExpression',
    expression: ExpressionContext,
    range: Range_
}
interface IndexExpressionContext {
    type: 'IndexExpression',
    expression: ExpressionContext,
    index: ExpressionContext,
    range: Range_
}
interface MemberExpressionContext {
    type: 'MemberExpression',
    expression: ExpressionContext,
    identifier: string,
    range: Range_
}
interface CallExpressionContext {
    type: 'CallExpression',
    expression: ExpressionContext,
    arguments: ArgumentsContext,
    range: Range_
}
interface ThisExpressionContext {
    type: 'ThisExpression',
    range: Range_
}
interface SuperExpressionContext {
    type: 'SuperExpression',
    range: Range_
}
interface ParenthesizedExpressionContext {
    type: 'ParenthesizedExpression',
    expression: ExpressionContext,
    range: Range_
}
type LiteralContext = NullLiteralContext
    | BooleanLiteralContext
    | StringLiteralContext
    | NumberLiteralContext
    | ArrayLiteralContext;
interface NullLiteralContext {
    type: 'NullLiteral',
    range: Range_
}
interface BooleanLiteralContext {
    type: 'BooleanLiteral',
    text: 'true' | 'false',
    range: Range_
}
interface StringLiteralContext {
    type: 'StringLiteral',
    text: string,
    range: Range_
}
interface NumberLiteralContext {
    type: 'NumberLiteral',
    isFloat: boolean,
    number: number,
    range: Range_
}
interface ArrayLiteralContext {
    type: 'ArrayLiteral',
    items: ExpressionContext[],
    range: Range_
}
interface ParameterContext {
    type: 'Parameter',
    identifier: string,
    typeAnnotation: TypeContext,
    range: Range_
}
interface ArgumentsContext {
    type: 'Arguments',
    items: ExpressionContext[],
    range: Range_
}
type TypeContext = VoidTypeContext | NotVoidTypeContext
interface VoidTypeContext {
    type: 'Type',
    isVoid: true,
    range: Range_
}
interface NotVoidTypeContext {
    type: 'Type',
    isVoid: false,
    identifier: IdentifierContext,
    dimensions: number[],
    range: Range_
}
interface IdentifierContext {
    type: 'Identifier',
    identifiers: string[],
    range: Range_
}