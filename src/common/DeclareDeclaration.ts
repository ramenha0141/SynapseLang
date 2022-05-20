import Module from './Module';

class DeclareDeclaration {
    constructor(context: DeclareDeclarationContext, module: Module) {
        this.context = context;
    }
    context: DeclareDeclarationContext;
}
export default DeclareDeclaration;