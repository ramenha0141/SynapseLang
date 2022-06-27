import * as llvm from '../llvm';
import Module from './Module';
import Scope from './Scope';
import { Statement } from './Statement';
import Type from './Type';

class Class {
    public readonly struct: llvm.StructType;
    public readonly parent?: Class;
    public readonly Constructor?: [ClassConstructorContext, llvm.Function, Scope];
    public readonly fieldNames: string[] = [];
    public readonly fieldTypes: llvm.Type[] = [];
    public readonly methods: {[key: string]: [ClassMethodContext, llvm.Function, Scope]} = {};
    constructor(private context: ClassDeclarationContext, module: Module) {
        this.parent = context.extends && module.getClass(context.extends?.identifiers);
        if (this.parent) {
            this.fieldNames = [...this.parent.fieldNames];
            this.fieldTypes = [...this.parent.fieldTypes];
            this.Constructor = this.parent.Constructor;
        }
        for (const field of context.fields) {
            if (field.typeAnnotation.isVoid) throw new Error();
            this.fieldNames.push(field.identifier);
            this.fieldTypes.push(module.getType(field.typeAnnotation.identifier.identifiers));
        }
        this.struct = llvm.StructType.get(llvmModule, this.fieldTypes, `"${module.id}::${context.identifier}"`);
        const struct_ptr = this.struct.getPointerTo();
        module.import(context.identifier, this);
        classMap.set(this.struct, this);
        if (context.constructor) {
            const constructorContext = context.constructor;
            const parameterTypes = [struct_ptr, ...constructorContext.parameterList.map((parameter) => {
                if (parameter.typeAnnotation.isVoid) throw new Error();
                return Type(parameter.typeAnnotation, module);
            })];
            const constructorType = llvm.FunctionType.get(llvm.Type.getVoidTy(), parameterTypes, false);
            const Constructor = llvm.Function.Create(constructorType, `"${module.id}::${context.identifier}#constructor"`, llvmModule);
            builder.SetInsertPoint(llvm.BasicBlock.Create(Constructor));
            const constructorScope = new Scope(module);
            constructorScope.setFunctionContext(Constructor);
            constructorScope.setThis(Constructor.getArg(0));
            for (let i = 0; i < constructorContext.parameterList.length; i++) {
                const variable = builder.CreateAlloca(parameterTypes[i + 1]);
                builder.CreateStore(Constructor.getArg(i + 1), variable);
                constructorScope.import(constructorContext.parameterList[i].identifier, variable);
            }
            this.Constructor = [constructorContext, Constructor, constructorScope];
        }
        for (const methodContext of context.methods) {
            const returnType = Type(methodContext.typeAnnotation, module);
            const parameterTypes = [struct_ptr, ...methodContext.parameterList.map((parameter) => {
                if (parameter.typeAnnotation.isVoid) throw new Error();
                return Type(parameter.typeAnnotation, module);
            })];
            const methodType = llvm.FunctionType.get(returnType, parameterTypes, false);
            const method = llvm.Function.Create(methodType, `"${module.id}::${context.identifier}#${methodContext.identifier}"`, llvmModule);
            builder.SetInsertPoint(llvm.BasicBlock.Create(method));
            const methodScope = new Scope(module);
            methodScope.setFunctionContext(method);
            methodScope.setThis(method.getArg(0));
            for (let i = 0; i < methodContext.parameterList.length; i++) {
                const variable = builder.CreateAlloca(parameterTypes[i + 1]);
                builder.CreateStore(method.getArg(i + 1), variable);
                methodScope.import(methodContext.parameterList[i].identifier, variable);
            }
            this.methods[methodContext.identifier] = [methodContext, method, methodScope];
        }
    }
    public getMethod(identifier: string): [ClassMethodContext, llvm.Function, Scope] {
        if (this.methods[identifier]) return this.methods[identifier];
        if (this.parent) return this.parent.getMethod(identifier);
        throw new Error();
    }
    public generate() {
        if (this.context.constructor && this.Constructor) {
            const [context, Constructor, scope] = this.Constructor;
            builder.SetInsertPoint(Constructor.getLastBasicBlock());
            Statement(context.body, scope);
            builder.CreateRetVoid();
        }
        Object.values(this.methods).map(([context, method, scope]) => {
            builder.SetInsertPoint(method.getLastBasicBlock());
            Statement(context.body, scope);
            if (method.getType().getReturnType().isVoidTy()) builder.CreateRetVoid();
        });
    }
}
export default Class;