import Module from './Module';

class DeclareDeclaration {
    constructor(context: DeclareDeclarationContext, module: Module) {
        this.context = context;
    }
    context: DeclareDeclarationContext;
    generate() {
        
    }
}
export default DeclareDeclaration;