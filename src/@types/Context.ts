interface ModuleContext {
    type: 'Module',
    importDeclarations: ImportDeclarationContext[],
    declarations: DeclarationContext[]
}
type ImportDeclarationContext = ImportDefineDeclarationContext
    | ImportNamespaceDeclarationContext
    | ImportBuiltinDeclarationContext;
interface ImportDefineDeclarationContext {
    type: 'ImportDefineDeclaration',
    defines: string[],
    path: string
}
interface ImportNamespaceDeclarationContext {
    type: 'ImportNamespaceDeclaration',
    identifier: string,
    path: string
}
interface ImportBuiltinDeclarationContext {
    type: 'ImportBuiltinDeclaration',
    identifier: string
}
type DeclarationContext = FunctionDeclarationContext
    | DeclareDeclarationContext
    | VariableDeclarationContext
    | ClassDeclarationContext;
interface FunctionDeclarationContext {
    type: 'FunctionDeclaration',
    identifier: string,
    parameterList: ParameterContext[],
    typeAnnotation: TypeContext,
    body: BlockStatementContext
}
interface DeclareDeclarationContext {
    type: 'DeclareDeclaration',
    identifier: string,
    alias?: string,
    parameters: ParameterContext[],
    typeAnnotation: TypeContext
}
interface VariableDeclarationContext {
    type: 'VariableDeclaration',
    isConstant: boolean,
    identifier: string,
    typeAnnotation?: TypeContext,
    expression?: ExpressionContext
}
interface ClassDeclarationContext {
    type: 'ClassDeclaration',
    identifier: string,
    extends?: IdentifierContext,
    constructor: ClassConstructorContext,
    fields: ClassFieldContext[],
    methods: ClassMethodContext[]
}
interface ClassConstructorContext {
    type: 'ClassConstructor',
    parameterList: ParameterContext[],
    body: BlockStatementContext
}
interface ClassFieldContext {
    type: 'ClassField',
    identifier: string,
    typeAnnotation: TypeContext
}
interface ClassMethodContext {
    type: 'ClassMethod',
    identifier: string,
    parameterList: ParameterContext[],
    typeAnnotation: TypeContext,
    body: BlockStatementContext
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
    statements: StatementContext[]
}
interface ExpressionStatementContext {
    type: 'ExpressionStatement',
    expression: ExpressionContext
}
interface ReturnStatementContext {
    type: 'ReturnStatement',
    expression: ExpressionContext
}
interface IfStatementContext {
    type: 'IfStatement',
    condition: ExpressionContext,
    then: StatementContext,
    else?: StatementContext
}
interface WhileStatementContext {
    type: 'WhileStatement',
    condition: ExpressionContext,
    then: StatementContext
}
type ForStatementContext = ForNormalStatementContext | ForInStatementContext;
interface ForNormalStatementContext {
    type: 'ForNormalStatement',
    initialization: VariableDeclarationContext,
    condition: ExpressionContext,
    final: ExpressionContext,
    then: StatementContext
}
interface ForInStatementContext {
    type: 'ForInStatement',
    identifier: string,
    expression: ExpressionContext,
    then: StatementContext
}
interface BreakStatementContext {
    type: 'BreakStatement'
}
interface ContinueStatementContext {
    type: 'ContinueStatement'
}
type ExpressionContext = IndexExpressionContext
    | MemberExpressionContext
    | NewExpressionContext
    | DeleteExpressionContext
    | CallExpressionContext
    | PostIncrementExpressionContext
    | PostDecrementExpressionContext
    | PreIncrementExpressionContext
    | PreDecrementExpressionContext
    | UnaryPlusExpressionContext
    | UnaryMinusExpressionContext
    | BitNotExpressionContext
    | NotExpressionContext
    | AssertionExpressionContext
    | MultiplicativeExpressionContext
    | AdditiveExpressionContext
    | BitShiftExpressionContext
    | RelationalExpressionContext
    | EqualityExpressionContext
    | BitAndExpressionContext
    | BitXOrExpressionContext
    | BitOrExpressionContext
    | LogicalAndExpressionContext
    | LogicalOrExpressionContext
    | TernaryExpressionContext
    | AssignmentExpressionContext
    | SizeofExpressionContext
    | ThisExpressionContext
    | IdentifierContext
    | SuperExpressionContext
    | LiteralContext
    | ParenthesizedExpressionContext;
interface AssignmentExpressionContext {
    type: 'AssignmentExpression',
    left: ExpressionContext,
    operator: '=' | '*=' | '/=' | '%=' | '+=' | '-=',
    right: ExpressionContext
}
interface TernaryExpressionContext {
    type: 'TernaryExpression',
    condition: ExpressionContext,
    then: ExpressionContext,
    else: ExpressionContext
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
    operator: '<<' | '>>' | '>>>',
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
interface IndexExpressionContext {
    type: 'IndexExpression',
    expression: ExpressionContext,
    index: ExpressionContext
}
interface MemberExpressionContext {
    type: 'MemberExpression',
    expression: ExpressionContext,
    identifier: string
}
interface CallExpressionContext {
    type: 'CallExpression',
    expression: ExpressionContext,
    arguments: ArgumentsContext
}
interface PostIncrementExpressionContext {
    type: 'PostIncrementExpression',
    expression: ExpressionContext
}
interface PostDecrementExpressionContext {
    type: 'PostDecrementExpression',
    expression: ExpressionContext
}
interface PreIncrementExpressionContext {
    type: 'PreIncrementExpression',
    expression: ExpressionContext
}
interface PreDecrementExpressionContext {
    type: 'PreDecrementExpression',
    expression: ExpressionContext
}
interface AssertionExpressionContext {
    type: 'AssertionExpression',
    expression: ExpressionContext,
    typeAnnotation: TypeContext
}
interface UnaryPlusExpressionContext {
    type: 'UnaryPlusExpression',
    expression: ExpressionContext
}
interface UnaryMinusExpressionContext {
    type: 'UnaryMinusExpression',
    expression: ExpressionContext
}
interface BitNotExpressionContext {
    type: 'BitNotExpression',
    expression: ExpressionContext
}
interface NotExpressionContext {
    type: 'NotExpression',
    expression: ExpressionContext
}
interface NewExpressionContext {
    type: 'NewExpression',
    identifier: IdentifierContext,
    arguments: ArgumentsContext
}
interface DeleteExpressionContext {
    type: 'DeleteExpression',
    expression: ExpressionContext
}
interface SizeofExpressionContext {
    type: 'SizeofExpression',
    identifier: IdentifierContext
}
interface ThisExpressionContext {
    type: 'ThisExpression'
}
interface SuperExpressionContext {
    type: 'SuperExpression'
}
interface ParenthesizedExpressionContext {
    type: 'ParenthesizedExpression',
    expression: ExpressionContext
}
type LiteralContext = NullLiteralContext
    | BooleanLiteralContext
    | StringLiteralContext
    | NumberLiteralContext
    | ArrayLiteralContext;
interface NullLiteralContext {
    type: 'NullLiteral'
}
interface BooleanLiteralContext {
    type: 'BooleanLiteral',
    text: string
}
interface StringLiteralContext {
    type: 'StringLiteral',
    text: string
}
interface NumberLiteralContext {
    type: 'NumberLiteral',
    isFloat: boolean,
    text: string
}
interface ArrayLiteralContext {
    type: 'ArrayLiteral',
    items: ExpressionContext[]
}
interface ParameterContext {
    type: 'Parameter',
    identifier: string,
    typeAnnotation: TypeContext
}
interface ArgumentsContext {
    type: 'Arguments',
    items: ExpressionContext[]
}
type TypeContext = VoidTypeContext | NotVoidTypeContext
interface VoidTypeContext {
    type: 'Type',
    isVoid: true
}
interface NotVoidTypeContext {
    type: 'Type',
    isVoid: false,
    identifier: IdentifierContext,
    dimension: number[]
}
interface IdentifierContext {
    type: 'Identifier',
    identifiers: string[]
}