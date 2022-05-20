import Scope, { Symbols } from './Scope';
import FunctionDeclaration from './FunctionDeclaration';
import DeclareDeclaration from './DeclareDeclaration';
import VariableDeclaration from './VariableDeclaration';
import ClassDeclaration from './ClassDeclaration';

class Module extends Scope {
    constructor(id: string, declarations: DeclarationContext[], injectSymbols?: Symbols) {
        super(undefined, injectSymbols);
        this.id = id;
        this.init_declarations(declarations);
    }
    private init_declarations(declarationContexts: DeclarationContext[]) {
        for (const declarationContext of declarationContexts) {
            switch (declarationContext.type) {
                case 'FunctionDeclaration': {
                    this.declarations.push(new FunctionDeclaration(declarationContext, this));
                    break;
                }
                case 'DeclareDeclaration': {
                    this.declarations.push(new DeclareDeclaration(declarationContext, this));
                    break;
                }
                case 'VariableDeclaration': {
                    this.declarations.push(new VariableDeclaration(declarationContext, this));
                    break;
                }
                case 'ClassDeclaration': {
                    this.declarations.push(new ClassDeclaration(declarationContext, this));
                    break;
                }
            }
        }
    }
    id: string;
    declarations: (FunctionDeclaration | DeclareDeclaration | VariableDeclaration | ClassDeclaration)[] = [];
}
export interface ModuleMap {
    [key: string]: Module
}
export default Module;