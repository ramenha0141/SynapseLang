type Position = import('typescript-parsec').TokenPosition;
interface ModuleContext {
    type: 'Module',
    importDeclarations: ImportDeclarationContext[],
    declarations: DeclarationContext[],
    position: Position
}
type ImportDeclarationContext = ImportDefineDeclarationContext
    | ImportNamespaceDeclarationContext
    | ImportBuiltinDeclarationContext;
interface ImportDefineDeclarationContext {
    type: 'ImportDefineDeclaration',
    defines: string[],
    path: string,
    position: Position
}
interface ImportNamespaceDeclarationContext {
    type: 'ImportNamespaceDeclaration',
    identifier: string,
    path: string,
    position: Position
}
interface ImportBuiltinDeclarationContext {
    type: 'ImportBuiltinDeclaration',
    identifier: string,
    position: Position
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
    position: Position
}
interface DeclareDeclarationContext {
    type: 'DeclareDeclaration',
    identifier: string,
    alias?: string,
    parameters: ParameterContext[],
    typeAnnotation: TypeContext,
    position: Position
}
interface VariableDeclarationContext {
    type: 'VariableDeclaration',
    isConstant: boolean,
    identifier: string,
    typeAnnotation?: TypeContext,
    expression?: ExpressionContext,
    position: Position
}
interface ClassDeclarationContext {
    type: 'ClassDeclaration',
    identifier: string,
    extends?: IdentifierContext,
    constructor?: ClassConstructorContext,
    fields: ClassFieldContext[],
    methods: ClassMethodContext[],
    position: Position
}
interface ClassConstructorContext {
    type: 'ClassConstructor',
    parameterList: ParameterContext[],
    body: BlockStatementContext,
    position: Position
}
interface ClassFieldContext {
    type: 'ClassField',
    identifier: string,
    typeAnnotation: TypeContext,
    position: Position
}
interface ClassMethodContext {
    type: 'ClassMethod',
    identifier: string,
    parameterList: ParameterContext[],
    typeAnnotation?: TypeContext,
    body: BlockStatementContext,
    position: Position
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
    position: Position
}
interface ExpressionStatementContext {
    type: 'ExpressionStatement',
    expression: ExpressionContext,
    position: Position
}
interface ReturnStatementContext {
    type: 'ReturnStatement',
    expression?: ExpressionContext,
    position: Position
}
interface IfStatementContext {
    type: 'IfStatement',
    condition: ExpressionContext,
    then: StatementContext,
    else?: StatementContext,
    position: Position
}
interface WhileStatementContext {
    type: 'WhileStatement',
    condition: ExpressionContext,
    then: StatementContext,
    position: Position
}
type ForStatementContext = ForNormalStatementContext | ForInStatementContext;
interface ForNormalStatementContext {
    type: 'ForNormalStatement',
    initialization: VariableDeclarationContext,
    condition: ExpressionContext,
    final: ExpressionContext,
    then: StatementContext,
    position: Position
}
interface ForInStatementContext {
    type: 'ForInStatement',
    identifier: string,
    expression: ExpressionContext,
    then: StatementContext,
    position: Position
}
interface BreakStatementContext {
    type: 'BreakStatement',
    position: Position
}
interface ContinueStatementContext {
    type: 'ContinueStatement',
    position: Position
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
    position: Position
}
interface TernaryExpressionContext {
    type: 'TernaryExpression',
    condition: ExpressionContext,
    then: ExpressionContext,
    else: ExpressionContext,
    position: Position
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
    position: Position
}
interface UnaryMinusExpressionContext {
    type: 'UnaryMinusExpression',
    expression: ExpressionContext,
    position: Position
}
interface BitNotExpressionContext {
    type: 'BitNotExpression',
    expression: ExpressionContext,
    position: Position
}
interface NotExpressionContext {
    type: 'NotExpression',
    expression: ExpressionContext,
    position: Position
}
interface NewExpressionContext {
    type: 'NewExpression',
    identifier: IdentifierContext,
    arguments: ArgumentsContext,
    position: Position
}
interface DeleteExpressionContext {
    type: 'DeleteExpression',
    expression: ExpressionContext,
    position: Position
}
interface SizeofExpressionContext {
    type: 'SizeofExpression',
    typeAnnotation: TypeContext,
    position: Position
}
interface PreIncrementExpressionContext {
    type: 'PreIncrementExpression',
    expression: ExpressionContext,
    position: Position
}
interface PreDecrementExpressionContext {
    type: 'PreDecrementExpression',
    expression: ExpressionContext,
    position: Position
}
interface PostIncrementExpressionContext {
    type: 'PostIncrementExpression',
    expression: ExpressionContext,
    position: Position
}
interface PostDecrementExpressionContext {
    type: 'PostDecrementExpression',
    expression: ExpressionContext,
    position: Position
}
interface IndexExpressionContext {
    type: 'IndexExpression',
    expression: ExpressionContext,
    index: ExpressionContext,
    position: Position
}
interface MemberExpressionContext {
    type: 'MemberExpression',
    expression: ExpressionContext,
    identifier: string,
    position: Position
}
interface CallExpressionContext {
    type: 'CallExpression',
    expression: ExpressionContext,
    arguments: ArgumentsContext,
    position: Position
}
interface ThisExpressionContext {
    type: 'ThisExpression',
    position: Position
}
interface SuperExpressionContext {
    type: 'SuperExpression',
    position: Position
}
interface ParenthesizedExpressionContext {
    type: 'ParenthesizedExpression',
    expression: ExpressionContext,
    position: Position
}
type LiteralContext = NullLiteralContext
    | BooleanLiteralContext
    | StringLiteralContext
    | NumberLiteralContext
    | ArrayLiteralContext;
interface NullLiteralContext {
    type: 'NullLiteral',
    position: Position
}
interface BooleanLiteralContext {
    type: 'BooleanLiteral',
    text: 'true' | 'false',
    position: Position
}
interface StringLiteralContext {
    type: 'StringLiteral',
    text: string,
    position: Position
}
interface NumberLiteralContext {
    type: 'NumberLiteral',
    isFloat: boolean,
    number: number,
    position: Position
}
interface ArrayLiteralContext {
    type: 'ArrayLiteral',
    items: ExpressionContext[],
    position: Position
}
interface ParameterContext {
    type: 'Parameter',
    identifier: string,
    typeAnnotation: TypeContext,
    position: Position
}
interface ArgumentsContext {
    type: 'Arguments',
    items: ExpressionContext[],
    position: Position
}
type TypeContext = VoidTypeContext | NotVoidTypeContext
interface VoidTypeContext {
    type: 'Type',
    isVoid: true,
    position: Position
}
interface NotVoidTypeContext {
    type: 'Type',
    isVoid: false,
    identifier: IdentifierContext,
    dimensions: number[],
    position: Position
}
interface IdentifierContext {
    type: 'Identifier',
    identifiers: string[],
    position: Position
}