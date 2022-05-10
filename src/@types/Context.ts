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
type ExpressionContext = IndexExpressionContext;
interface IndexExpressionContext {
    type: 'IndexExpression'
}
interface ParameterContext {
    type: 'Parameter',
    identifier: string,
    typeAnnotation: TypeContext
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