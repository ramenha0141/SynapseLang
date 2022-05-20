import Module from './Module';

class ClassDeclaration {
    constructor(context: ClassDeclarationContext, module: Module) {
        this.context = context;
    }
    context: ClassDeclarationContext;
}
export default ClassDeclaration;