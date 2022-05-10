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
    identifiers: string[],
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
    type: 'ClassDeclaration'
}
interface ClassFieldContext {
    type: 'ClassField'
}
interface ClassMethodContext {
    type: 'ClassMethod'
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
    type: 'BlockStatement'
}
interface ExpressionStatementContext {
    type: 'ExpressionStatement'
}
interface ReturnStatementContext {
    type: 'ReturnStatement'
}
interface IfStatementContext {
    type: 'IfStatement'
}
interface WhileStatementContext {
    type: 'WhileStatement'
}
interface ForStatementContext {
    type: 'ForStatement'
}
interface BreakStatementContext {
    type: 'BreakStatement'
}
interface ContinueStatementContext {
    type: 'ContinueStatement'
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