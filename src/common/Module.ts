import Scope, { Symbols } from './Scope';

class Module extends Scope {
    constructor(id: string, declarations: DeclarationContext[], injectSymbols?: Symbols) {
        super(undefined, injectSymbols);
        this.id = id;
        this.declarations = declarations;
    }
    id: string;
    declarations: DeclarationContext[];
}
export interface ModuleMap {
    [key: string]: Module
}
export default Module;