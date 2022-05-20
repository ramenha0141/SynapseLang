import llvm from 'llvm-bindings';

import Module from './Module';

class FunctionDeclaration {
    constructor(context: FunctionDeclarationContext, module: Module) {
        this.context = context;
    }
    context: FunctionDeclarationContext;
}
export default FunctionDeclaration;