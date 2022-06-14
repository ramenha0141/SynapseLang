import Scope from '../common/Scope';
import * as llvm from '../llvm';

const i32 = llvm.Type.getInt32Ty();
const i8_ptr = llvm.Type.getInt8Ty().getPointerTo();

const console = (llvmModule: llvm.Module) => {
    const console = new Scope(undefined);
    const printf_type = llvm.FunctionType.get(i32, [i8_ptr], true);
    const printf = llvm.Function.Create(printf_type, 'printf', llvmModule);
    // put int
    const puts_str = builder.CreateGlobalString('%s\n', 'puts_str');
    const puts_type = llvm.FunctionType.get(i32, [i8_ptr], false);
    const puts = llvm.Function.Create(puts_type, '"console::puts"', llvmModule);
    builder.SetInsertPoint(llvm.BasicBlock.Create(puts));
    builder.CreateRet(builder.CreateCall(printf, [puts_str, puts.getArg(0)]));
    console.import('puts', puts);
    return console;
};
export default console;