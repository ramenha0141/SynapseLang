import * as llvm from '../llvm';
import Module from './Module';
import Scope from './Scope';
import { Statement } from './Statement';
import Type from './Type';

class Class {
    private struct: llvm.StructType;
    private fieldNames: string[] = [];
    private methods: {[key: string]: [ClassMethodContext, llvm.Function, Scope]} = {};
    constructor(private context: ClassDeclarationContext, module: Module) {
        const fieldTypes: llvm.Type[] = [];
        for (const field of context.fields) {
            if (field.typeAnnotation.isVoid) throw new Error();
            this.fieldNames.push(field.identifier);
            fieldTypes.push(module.getType(field.typeAnnotation.identifier.identifiers));
        }
        this.struct = llvm.StructType.get(llvmModule, fieldTypes, `"${module.id}::${context.identifier}"`);
        for (const methodContext of context.methods) {
            const returnType = Type(methodContext.typeAnnotation, module);
            const parameterTypes = [this.struct, ...methodContext.parameterList.map((parameter) => {
                if (parameter.typeAnnotation.isVoid) throw new Error();
                return Type(parameter.typeAnnotation, module);
            })];
            const methodType = llvm.FunctionType.get(returnType, parameterTypes, false);
            const method = llvm.Function.Create(methodType, `"${module.id}::${context.identifier}#${methodContext.identifier}"`, llvmModule);
            builder.SetInsertPoint(llvm.BasicBlock.Create(method));
            const methodScope = new Scope(module);
            methodScope.setThis(method.getArg(0));
            for (let i = 0; i < methodContext.parameterList.length; i++) {
                const variable = builder.CreateAlloca(parameterTypes[i + 1]);
                builder.CreateStore(method.getArg(i), variable);
                methodScope.import(methodContext.parameterList[i].identifier, variable);
            }
            this.methods[methodContext.identifier] = [methodContext, method, methodScope];
        }
    }
    public generate() {
        Object.entries(this.methods).map(([identifier, [context, method, scope]]) => {
            builder.SetInsertPoint(method.getLastBasicBlock());
            Statement(context.body, scope);
            if (method.getType().getReturnType().isVoidTy()) builder.CreateRetVoid();
        });
    }
}
export default Class;