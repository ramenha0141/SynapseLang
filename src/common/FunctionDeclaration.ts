import * as llvm from '../llvm';

import Module from './Module';
import Scope from './Scope';
import Type from './Type';
import * as Statement from './Statement';

class FunctionDeclaration extends Scope {
    constructor(context: FunctionDeclarationContext, module: Module) {
        super(module);
        this.context = context;
        const returnType = context.typeAnnotation
            ? Type(context.typeAnnotation, module)
            : llvm.Type.getVoidTy();
        const parameterTypes = context.parameterList.map((parameter) => {
            if (parameter.typeAnnotation.isVoid) throw new Error();
            return Type(parameter.typeAnnotation, module);
        });
        const functionType = llvm.FunctionType.get(returnType, parameterTypes, false);
        module.import(
            context.identifier,
            (this.llvmFunction = llvm.Function.Create(
                functionType,
                global.options.wasm ? context.identifier : `"${module.id}::${context.identifier}"`,
                llvmModule
            ))
        );
        this.setFunctionContext(this.llvmFunction);
        builder.SetInsertPoint(llvm.BasicBlock.Create(this.llvmFunction));
        for (let i = 0; i < context.parameterList.length; i++) {
            const variable = builder.CreateAlloca(parameterTypes[i]);
            builder.CreateStore(this.llvmFunction.getArg(i), variable);
            this.import(context.parameterList[i].identifier, variable);
        }
    }
    context: FunctionDeclarationContext;
    llvmFunction: llvm.Function;
    generate() {
        builder.SetInsertPoint(this.llvmFunction.getLastBasicBlock());
        Statement.Statement(this.context.body, this);
        if (this.llvmFunction.getType().getReturnType().isVoidTy()) builder.CreateRetVoid();
    }
}
export default FunctionDeclaration;
