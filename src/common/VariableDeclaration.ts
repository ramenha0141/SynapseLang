import Module from './Module';

class VariableDeclaration {
    constructor(context: VariableDeclarationContext, module: Module) {
        this.context = context;
    }
    context: VariableDeclarationContext;
}
export default VariableDeclaration;