import * as llvm from '../llvm';

import Module from './Module';
import Scope from './Scope';
import * as Statement from './Statement';

class FunctionDeclaration extends Scope {
    constructor(context: FunctionDeclarationContext, module: Module) {
        super(module);
        this.context = context;
        const returnType = context.typeAnnotation
            ? context.typeAnnotation.isVoid
                ? llvm.Type.getVoidTy()
                : module.getType(context.typeAnnotation.identifier.identifiers)
            : llvm.Type.getVoidTy();
        const parameterTypes = context.parameterList.map((parameter) => {
            if (parameter.typeAnnotation.isVoid) throw new Error();
            return module.getType(parameter.typeAnnotation.identifier.identifiers);
        });
        const functionType = llvm.FunctionType.get(returnType, parameterTypes, false);
        module.import(
            context.identifier,
            this.llvmFunction = llvm.Function.Create(functionType, `${module.id}::${context.identifier}`, llvmModule)
        );
        module.setFunctionContext(this.llvmFunction);
        const basicBlock = this.basicBlock = llvm.BasicBlock.Create(this.llvmFunction);
        builder.SetInsertPoint(basicBlock);
        for (let i = 0; i < context.parameterList.length; i++) {
            const variable = builder.CreateAlloca(parameterTypes[i]);
            builder.CreateStore(this.llvmFunction.getArg(i), variable);
            module.import(context.parameterList[i].identifier, variable);
        };
    }
    context: FunctionDeclarationContext;
    llvmFunction: llvm.Function;
    basicBlock: llvm.BasicBlock;
    generate() {
        builder.SetInsertPoint(this.basicBlock);
        Statement.Statement(this.context.body, this);
    }
}
export default FunctionDeclaration;