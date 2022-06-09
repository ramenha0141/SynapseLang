import * as llvm from './llvm';
import Module from './common/Module';
const create_main = (mainModule: Module) => {
    const i32 = llvm.Type.getInt32Ty();
    const i8ptr = llvm.Type.getInt8Ty().getPointerTo();
    const func_type = llvm.FunctionType.get(i32, [i32, i8ptr], false);
    const func = llvm.Function.Create(func_type, 'main', llvmModule);
    builder.SetInsertPoint(llvm.BasicBlock.Create(func));
    const mainFunction = mainModule.getFunction('main');
    builder.CreateCall(mainFunction, []);
    builder.CreateRet(llvm.ConstantInt.get(i32, 0));
};
export default create_main;