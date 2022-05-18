import Scope, { Symbols } from './Scope';

class Module extends Scope {
    constructor(id: string, injectSymbols: Symbols) {
        super(undefined, injectSymbols);
        this.id = id;
    }
    id: string;
    ast: DeclarationContext[] = [];
}
export default Module;