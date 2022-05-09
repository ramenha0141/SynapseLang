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
    typeAnnotation: TypeContext
}
interface DeclareDeclarationContext {
    type: 'DeclareDeclaration'
}
interface VariableDeclarationContext {
    type: 'VariableDeclaration'
}
interface ClassDeclarationContext {
    type: 'ClassDeclaration'
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